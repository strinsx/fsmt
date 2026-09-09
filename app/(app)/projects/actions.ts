"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import {
  projectStatuses,
  type CreateProjectInput,
  type DeleteProjectResult,
  type ProjectMutationResult,
  type ProjectRecord,
  type ProjectStatus,
  type UpdateProjectInput,
} from "@/lib/projects/types"

const projectColumns = "id,name,status,created_at,updated_at,client,project_value"
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

function isProjectStatus(value: unknown): value is ProjectStatus {
  return typeof value === "string" && projectStatuses.includes(value as ProjectStatus)
}

function validateName(value: unknown) {
  if (typeof value !== "string" || !value.trim()) return null
  return value.trim()
}

function validateClient(value: unknown) {
  if (typeof value !== "string" || !value.trim()) return null
  return value.trim()
}

function validateProjectValue(value: unknown) {
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0) return null
  return Math.round(value * 100) / 100
}

async function getAuthenticatedClient() {
  const supabase = await createClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  return { supabase, user, error }
}

export async function createProject(input: CreateProjectInput): Promise<ProjectMutationResult> {
  const name = validateName(input?.name)
  const client = validateClient(input?.client)
  const projectValue = validateProjectValue(input?.projectValue)

  if (!name || !client || projectValue === null || !isProjectStatus(input?.status)) {
    return { data: null, error: "Enter valid project details and try again." }
  }

  const { supabase, user, error: authError } = await getAuthenticatedClient()
  if (authError || !user) return { data: null, error: "You must be signed in to create a project." }

  const { data, error } = await supabase
    .from("projects")
    .insert({
      user_id: user.id,
      name,
      client,
      project_value: projectValue,
      status: input.status,
    })
    .select(projectColumns)
    .single()

  if (error || !data) return { data: null, error: error?.message ?? "The project could not be created." }

  if ((data as ProjectRecord).status === "completed") {
    const projectValue = (data as ProjectRecord).project_value
    const amount = typeof projectValue === "number" ? projectValue : Number(projectValue ?? 0)
    if (amount > 0) {
      const insertRes = await supabase.from("income_transactions").insert({
        user_id: user.id,
        project_id: (data as ProjectRecord).id,
        amount,
        received_at: new Date().toISOString().slice(0, 10),
        status: "pending",
      } as never)
      if (insertRes.error && /status/i.test(String(insertRes.error.message))) {
        await supabase.from("income_transactions").insert({
          user_id: user.id,
          project_id: (data as ProjectRecord).id,
          amount,
          received_at: new Date().toISOString().slice(0, 10),
        } as never)
      }
      revalidatePath("/transactions")
    }
  }

  revalidatePath("/projects")
  return { data: data as ProjectRecord, error: null }
}

export async function updateProject(id: string, input: UpdateProjectInput): Promise<ProjectMutationResult> {
  if (!uuidPattern.test(id)) return { data: null, error: "The selected project is invalid." }

  const changes: Record<string, string | number> = {}

  if (input.name !== undefined) {
    const name = validateName(input.name)
    if (!name) return { data: null, error: "Project name is required." }
    changes.name = name
  }

  if (input.client !== undefined) {
    const client = validateClient(input.client)
    if (!client) return { data: null, error: "Client is required." }
    changes.client = client
  }

  if (input.projectValue !== undefined) {
    const projectValue = validateProjectValue(input.projectValue)
    if (projectValue === null) return { data: null, error: "Project value is invalid." }
    changes.project_value = projectValue
  }

  if (input.status !== undefined) {
    if (!isProjectStatus(input.status)) return { data: null, error: "Project status is invalid." }
    changes.status = input.status
  }

  if (Object.keys(changes).length === 0) return { data: null, error: "No project changes were provided." }

  const { supabase, user, error: authError } = await getAuthenticatedClient()
  if (authError || !user) return { data: null, error: "You must be signed in to update a project." }

  const { data, error } = await supabase
    .from("projects")
    .update(changes)
    .eq("id", id)
    .eq("user_id", user.id)
    .select(projectColumns)
    .single()

  if (error || !data) return { data: null, error: error?.message ?? "The project could not be updated." }

  if ((data as ProjectRecord).status === "completed") {
    const projectValue = (data as ProjectRecord).project_value
    const amount = typeof projectValue === "number" ? projectValue : Number(projectValue ?? 0)
    if (amount > 0) {
      const { data: existing } = await supabase
        .from("income_transactions")
        .select("id")
        .eq("project_id", id)
        .limit(1)
        .maybeSingle()
      if (!existing) {
        const insertRes = await supabase.from("income_transactions").insert({
          user_id: user.id,
          project_id: id,
          amount,
          received_at: new Date().toISOString().slice(0, 10),
          status: "pending",
        } as never)
        if (insertRes.error && /status/i.test(String(insertRes.error.message))) {
          await supabase.from("income_transactions").insert({
            user_id: user.id,
            project_id: id,
            amount,
            received_at: new Date().toISOString().slice(0, 10),
          } as never)
        }
      }
      revalidatePath("/transactions")
    }
  }

  revalidatePath("/projects")
  return { data: data as ProjectRecord, error: null }
}

export async function deleteProject(id: string): Promise<DeleteProjectResult> {
  if (!uuidPattern.test(id)) return { id: null, error: "The selected project is invalid." }

  const { supabase, user, error: authError } = await getAuthenticatedClient()
  if (authError || !user) return { id: null, error: "You must be signed in to delete a project." }

  const { data, error } = await supabase
    .from("projects")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id)
    .select("id")
    .single()

  if (error || !data) return { id: null, error: error?.message ?? "The project could not be deleted." }

  revalidatePath("/projects")
  return { id: data.id as string, error: null }
}
