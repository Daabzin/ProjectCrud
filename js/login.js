document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const errorTooltip = document.getElementById('errorTooltip');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = form.email.value.trim();
    const password = form.password.value.trim();

    const usuariosJSON = localStorage.getItem('usuarios');
    const usuarios = usuariosJSON ? JSON.parse(usuariosJSON) : [];

    const usuario = usuarios.find(u => u.email === email && u.senha === password);

    if (!usuario) {
      errorTooltip.textContent = 'E-mail ou senha inválidos.';
      errorTooltip.style.display = 'block';
      return;
    }

    errorTooltip.style.display = 'none';
    errorTooltip.textContent = '';

    localStorage.setItem('usuarioLogado', JSON.stringify(usuario));

    window.location.href = 'crud/perfil.html';
  });

  form.email.addEventListener('input', () => {
    errorTooltip.style.display = 'none';
  });

  form.password.addEventListener('input', () => {
    errorTooltip.style.display = 'none';
  });
});
