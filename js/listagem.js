document.addEventListener('DOMContentLoaded', () => {
  const tabelaBody = document.getElementById('tabelaUsuarios');
  const inputBusca = document.getElementById('procurarInput');

  function getUsuarios() {
    const data = localStorage.getItem('usuarios');
    return data ? JSON.parse(data) : [];
  }

  function salvarUsuarios(usuarios) {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
  }

  function renderUsuarios(filtro = '') {
    const usuarios = getUsuarios();
    tabelaBody.innerHTML = '';

    const usuariosFiltrados = usuarios.filter(usuario =>
      usuario.nome.toLowerCase().includes(filtro.toLowerCase())
    );

    usuariosFiltrados.forEach((usuario, index) => {
      const linha = document.createElement('tr');
      linha.innerHTML = `
        <td>${usuario.nome}</td>
        <td>${usuario.email}</td>
        <td>${usuario.cpf}</td>
        <td>${usuario.nascimento}</td>
        <td>
          <button class="action-btn edit-btn" data-index="${index}">Editar</button>
          <button class="action-btn delete-btn" data-index="${index}">Excluir</button>
        </td>
      `;
      tabelaBody.appendChild(linha);
    });

    adicionarEventosBotoes();
  }

  function adicionarEventosBotoes() {
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = e.target.dataset.index;
        const usuarios = getUsuarios();
        if (confirm(`Deseja realmente excluir ${usuarios[index].nome}?`)) {
          usuarios.splice(index, 1);
          salvarUsuarios(usuarios);
          renderUsuarios(inputBusca.value);
        }
      });
    });

    document.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = e.target.dataset.index;
        window.location.href = `editar-perfil.html?index=${index}`;
      });
    });
  }

  inputBusca.addEventListener('input', () => {
    renderUsuarios(inputBusca.value);
  });

  renderUsuarios();
});
