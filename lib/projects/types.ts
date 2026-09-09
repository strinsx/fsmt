export const projectStatuses = ["active", "pending", "completed"] as const

export type ProjectStatus = (typeof projectStatuses)[number]

export type ProjectRecord = {
  id: string
  name: string
  status: ProjectStatus
  created_at: string
  updated_at: string
  client: string | null
  project_value: number | null
}

export type CreateProjectInput = {
  name: string
  client: string
  projectValue: number
  status: ProjectStatus
}

export type UpdateProjectInput = Partial<CreateProjectInput>

export type ProjectMutationResult =
  | { data: ProjectRecord; error: null }
  | { data: null; error: string }

export type DeleteProjectResult =
  | { id: string; error: null }
  | { id: null; error: string }
