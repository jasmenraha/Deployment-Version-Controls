async function fetchItems() {
  const res = await fetch('api/get_items.php');
  const items = await res.json();
  renderItems(items);
}

function renderItems(items) {
  const list = document.getElementById('itemList');
  list.innerHTML = '';
  items.forEach((item) => {
    list.innerHTML += `
      <li>
        ${item.name}
        <button onclick="editItem(${item.id}, '${item.name}')">Edit</button>
        <button onclick="deleteItem(${item.id})">Delete</button>
      </li>
    `;
  });
}

async function addItem() {
  const input = document.getElementById('itemInput');
  const name = input.value.trim();
  if (name !== '') {
    await fetch('api/add_item.php', {
      method: 'POST',
      body: JSON.stringify({ name }),
    });
    input.value = '';
    fetchItems();
  }
}

async function editItem(id, oldName) {
  const newName = prompt("Edit item:", oldName);
  if (newName && newName.trim() !== '') {
    await fetch('api/update_item.php', {
      method: 'POST',
      body: JSON.stringify({ id, name: newName }),
    });
    fetchItems();
  }
}

async function deleteItem(id) {
  if (confirm("Are you sure you want to delete this item?")) {
    await fetch('api/delete_item.php', {
      method: 'POST',
      body: JSON.stringify({ id }),
    });
    fetchItems();
  }
}

fetchItems();
