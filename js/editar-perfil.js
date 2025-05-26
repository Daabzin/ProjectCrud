document.addEventListener('DOMContentLoaded', () => {
  const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
  if (!usuarioLogado) {
    alert('Você precisa estar logado para acessar essa página.');
    window.location.href = 'login.html';
    return;
  }

  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  const indexParam = getQueryParam('index');
  let usuario = null;
  let isEditFromListagem = false;

  if (indexParam !== null) {
    const index = parseInt(indexParam, 10);
    if (!isNaN(index) && usuarios[index]) {
      usuario = usuarios[index];
      isEditFromListagem = true;
    } else {
      alert('Usuário inválido para edição.');
      window.location.href = 'listagem.html';
      return;
    }
  } else {
    usuario = usuarioLogado;
  }

  document.getElementById('nome').value = usuario.nome || '';
  document.getElementById('email').value = usuario.email || '';
  document.getElementById('cpf').value = usuario.cpf || '';
  document.getElementById('nascimento').value = usuario.nascimento || '';

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showError(input, message) {
    alert(message);
    input.focus();
  }

  document.getElementById('formEditarPerfil').addEventListener('submit', (e) => {
    e.preventDefault();

    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const cpfInput = document.getElementById('cpf');
    const nascimentoInput = document.getElementById('nascimento');

    const nome = nomeInput.value.trim();
    const email = emailInput.value.trim();
    const cpf = cpfInput.value.trim();
    const nascimento = nascimentoInput.value;

    if (nome.length < 3) {
      showError(nomeInput, 'Nome deve ter pelo menos 3 caracteres.');
      return;
    }

    if (!isValidEmail(email)) {
      showError(emailInput, 'E-mail inválido.');
      return;
    }

    if (!/^\d{11}$/.test(cpf)) {
      showError(cpfInput, 'CPF deve conter 11 dígitos numéricos.');
      return;
    }

    if (!nascimento) {
      showError(nascimentoInput, 'Data de nascimento é obrigatória.');
      return;
    }

    const emailExiste = usuarios.some((u, i) => 
      u.email.toLowerCase() === email.toLowerCase() && 
      i !== (isEditFromListagem ? parseInt(indexParam) : usuarios.findIndex(user => user.email === usuario.email && user.senha === usuario.senha))
    );
    if (emailExiste) {
      showError(emailInput, 'E-mail já cadastrado por outro usuário.');
      return;
    }

    const cpfExiste = usuarios.some((u, i) => 
      u.cpf === cpf && 
      i !== (isEditFromListagem ? parseInt(indexParam) : usuarios.findIndex(user => user.email === usuario.email && user.senha === usuario.senha))
    );
    if (cpfExiste) {
      showError(cpfInput, 'CPF já cadastrado por outro usuário.');
      return;
    }

    const novosDados = { nome, email, cpf, nascimento };

    if (isEditFromListagem) {
      const idx = parseInt(indexParam, 10);
      usuarios[idx] = { ...usuarios[idx], ...novosDados };
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      alert('Usuário atualizado com sucesso!');
      window.location.href = 'listagem.html';
    } else {
      const idx = usuarios.findIndex(u => u.email === usuario.email && u.senha === usuario.senha);
      if (idx !== -1) {
        usuarios[idx] = { ...usuarios[idx], ...novosDados };
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarios[idx]));
      }
      alert('Perfil atualizado com sucesso!');
      window.location.href = 'perfil.html';
    }
  });
});
