// Prefer full base with "/api" if provided; else build from origin
const originEnv = import.meta.env.VITE_API_ORIGIN
let baseEnv = import.meta.env.VITE_API_BASE_URL

const normalize = (s = '') => s.replace(/\/$/, '')
const ensureApi = (s) => (/(^|\/)api$/.test(s) ? s : `${normalize(s)}/api`)

const BASE = baseEnv ? normalize(baseEnv) : ensureApi(originEnv || 'http://localhost:3001')

const handle = async (res) => {
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || res.statusText)
  }
  const json = await res.json()
  // Expect shape { data: ..., status: 'success' }
  return json.data
}

export const fetchBlogs = async () => {
  const res = await fetch(`${BASE}/blogs`)
  return handle(res)
}

export const updateBlog = async (id, payload) => {
  const res = await fetch(`${BASE}/blogs/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  return handle(res)
}
