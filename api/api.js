document.addEventListener('DOMContentLoaded', () => {
  const userList = document.getElementById('userList');
  const userTable = document.getElementById('userTable');
  const loading = document.getElementById('loading');
  const searchInput = document.getElementById('searchInput');

  let users = [];

  async function fetchUsers() {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) {
        throw new Error('Erro ao buscar dados da API');
      }
      users = await response.json();
      loading.style.display = 'none';
      userTable.style.display = 'table';
      displayUsers(users);
    } catch (error) {
      loading.textContent = 'Falha ao carregar os dados. Tente novamente mais tarde.';
      console.error(error);
    }
  }

  function displayUsers(usersArray) {
    userList.innerHTML = '';
    usersArray.forEach(user => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.address.city}</td>
        <td>${user.address.street}</td>
        <td>
          <button class="btn-acao btn-editar" data-id="${user.id}">Editar</button>
          <button class="btn-acao btn-excluir" data-id="${user.id}">Excluir</button>
        </td>
      `;
      userList.appendChild(tr);
    });
  }

  searchInput.addEventListener('input', () => {
    const term = searchInput.value.toLowerCase();
    const filteredUsers = users.filter(user =>
      user.name.toLowerCase().includes(term)
    );
    displayUsers(filteredUsers);
  });

  userList.addEventListener('click', (e) => {
    if(e.target.classList.contains('btn-editar')){
      const userId = e.target.getAttribute('data-id');
      alert(`Editar usuário ID ${userId} (funcionalidade não implementada)`);
    }
    if(e.target.classList.contains('btn-excluir')){
      const userId = e.target.getAttribute('data-id');
      if(confirm('Confirma exclusão do usuário?')){
        alert(`Excluir usuário ID ${userId} (funcionalidade não implementada)`);
      }
    }
  });

  fetchUsers();
});
