import { requireAdmin, jsonResponse } from './_auth.js'

export const config = {
  runtime: 'edge',
}

export default async function handler(req) {
  const denied = await requireAdmin(req)
  if (denied) return denied

  return jsonResponse({ success: true }, 200)
}
