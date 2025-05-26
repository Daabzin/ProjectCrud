document.addEventListener('DOMContentLoaded', () => {
  const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

  if (!usuarioLogado) {
    alert('Você precisa estar logado para acessar o perfil.');
    window.location.href = '../index.html';
    return;
  }

  document.getElementById('nome').textContent = usuarioLogado.nome || '';
  document.getElementById('email').textContent = usuarioLogado.email || '';
  document.getElementById('cpf').textContent = usuarioLogado.cpf || '';
  document.getElementById('nascimento').textContent = usuarioLogado.nascimento || '';

  const btnEditar = document.getElementById('btnEditar');
  if (btnEditar) {
    btnEditar.addEventListener('click', () => {
      window.location.href = 'editar-perfil.html';
    });
  } else {
    console.warn('Botão "Editar" não encontrado no perfil.html');
  }
});
