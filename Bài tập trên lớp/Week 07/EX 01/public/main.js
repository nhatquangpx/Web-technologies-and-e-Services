const API = '/api/todos';

async function fetchTodos() {
  const res = await fetch(API);
  return res.json();
}

function el(tag, text = '') {
  const e = document.createElement(tag);
  e.textContent = text;
  return e;
}

async function render() {
  const listEl = document.getElementById('list');
  listEl.innerHTML = '<p>Đang tải...</p>';
  try {
    const todos = await fetchTodos();
    listEl.innerHTML = '';
    if (!todos.length) listEl.innerHTML = '<p>Chưa có todo nào</p>';

    todos.forEach(t => {
      const div = document.createElement('div');
      div.className = 'todo' + (t.completed ? ' completed' : '');
      const title = el('strong', t.title);
      div.appendChild(title);

      if (t.description) {
        const p = el('p', t.description);
        div.appendChild(p);
      }

      const btnToggle = document.createElement('button');
      btnToggle.textContent = t.completed ? 'Unmark' : 'Complete';
      btnToggle.onclick = async () => {
        await fetch(`${API}/${t._id}`, {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ completed: !t.completed, title: t.title, description: t.description })
        });
        render();
      };

      const btnEdit = document.createElement('button');
      btnEdit.textContent = 'Edit';
      btnEdit.onclick = async () => {
        const newTitle = prompt('New title', t.title);
        if (newTitle == null) return;
        const newDesc = prompt('New description', t.description || '');
        await fetch(`${API}/${t._id}`, {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ title: newTitle, description: newDesc, completed: t.completed })
        });
        render();
      };

      const btnDel = document.createElement('button');
      btnDel.textContent = 'Delete';
      btnDel.onclick = async () => {
        if (!confirm('Xác nhận xóa?')) return;
        await fetch(`${API}/${t._id}`, { method: 'DELETE' });
        render();
      };

      div.appendChild(btnToggle);
      div.appendChild(btnEdit);
      div.appendChild(btnDel);

      listEl.appendChild(div);
    });
  } catch (err) {
    listEl.innerHTML = '<p>Lỗi khi tải dữ liệu.</p>';
    console.error(err);
  }
}

const form = document.getElementById('todoForm');
form.onsubmit = async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value.trim();
  const description = document.getElementById('description').value.trim();
  if (!title) return alert('Title is required');
  await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description })
  });
  form.reset();
  render();
};

render();

