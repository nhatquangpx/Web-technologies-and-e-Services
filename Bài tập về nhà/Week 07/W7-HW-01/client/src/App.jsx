import React, { useEffect, useState } from 'react'
import { fetchBlogs, updateBlog } from './api'

function App() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editing, setEditing] = useState(null) // blog object
  const [form, setForm] = useState({ title: '', body: '', image: '' })

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await fetchBlogs()
      setBlogs(data)
    } catch (e) {
      setError(e.message || 'Lỗi tải dữ liệu')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const startEdit = (blog) => {
    setEditing(blog)
    setForm({ title: blog.title || '', body: blog.body || '', image: blog.image || '' })
  }

  const cancelEdit = () => {
    setEditing(null)
    setForm({ title: '', body: '', image: '' })
  }

  const submitEdit = async (e) => {
    e.preventDefault()
    if (!editing) return
    setError('')
    try {
      const updated = await updateBlog(editing._id, form)
      // Replace in list
      setBlogs((prev) => prev.map((b) => (b._id === updated._id ? updated : b)))
      cancelEdit()
    } catch (e) {
      setError(e.message || 'Cập nhật thất bại')
    }
  }

  return (
    <div className="container">
      <h1>Danh sách Blog</h1>
      {error && <div className="error">{error}</div>}
      {loading ? (
        <div>Đang tải…</div>
      ) : (
        <div className="grid">
          <div className="list">
            {blogs.length === 0 ? (
              <div>Không có blog nào.</div>
            ) : (
              <ul>
                {blogs.map((b) => (
                  <li key={b._id} className="card">
                    <div className="card-header">
                      <h3>{b.title}</h3>
                      <button onClick={() => startEdit(b)}>Sửa</button>
                    </div>
                    {b.image && (
                      <img src={b.image} alt={b.title} onError={(e)=>{e.currentTarget.style.display='none'}} />
                    )}
                    <p>{b.body}</p>
                    <small>id: {b._id}</small>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="editor">
            <h2>{editing ? 'Cập nhật Blog' : 'Chọn một blog để sửa'}</h2>
            {editing && (
              <form onSubmit={submitEdit} className="form">
                <label>
                  Tiêu đề
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                  />
                </label>
                <label>
                  Nội dung
                  <textarea
                    rows="6"
                    value={form.body}
                    onChange={(e) => setForm({ ...form, body: e.target.value })}
                    required
                  />
                </label>
                <label>
                  Ảnh (URL)
                  <input
                    type="url"
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                  />
                </label>
                <div className="actions">
                  <button type="submit">Lưu</button>
                  <button type="button" className="secondary" onClick={cancelEdit}>Hủy</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
