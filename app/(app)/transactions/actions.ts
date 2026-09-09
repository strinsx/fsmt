"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { incomeTransactionStatuses, type IncomeTransactionStatus } from "@/lib/transactions/types"

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

function isTransactionStatus(value: unknown): value is IncomeTransactionStatus {
  return typeof value === "string" && (incomeTransactionStatuses as readonly string[]).includes(value as IncomeTransactionStatus)
}

export async function updateTransactionStatus(id: string, status: IncomeTransactionStatus) {
  if (!uuidPattern.test(id)) return { data: null, error: "The selected transaction is invalid." }
  if (!isTransactionStatus(status)) return { data: null, error: "Transaction status is invalid." }

  const supabase = await createClient()
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()
  if (authError || !user) return { data: null, error: "You must be signed in to update a transaction." }

  const { data, error } = await supabase
    .from("income_transactions")
    .update({ status })
    .eq("id", id)
    .eq("user_id", user.id)
    .select("id,status")
    .single()

  if (error || !data) return { data: null, error: error?.message ?? "The transaction could not be updated." }

  revalidatePath("/transactions")
  return { data, error: null }
}
