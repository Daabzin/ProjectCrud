document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('cadastroForm');
  const nomeInput = document.getElementById('nome');
  const emailInput = document.getElementById('email');
  const senhaInput = document.getElementById('senha');
  const cpfInput = document.getElementById('cpf');
  const nascimentoInput = document.getElementById('nascimento');

  function showError(input, message) {
    let existingTooltip = input.parentNode.querySelector('.error-tooltip');
    if (existingTooltip) {
      existingTooltip.remove();
    }

    const tooltip = document.createElement('div');
    tooltip.classList.add('error-tooltip');
    tooltip.textContent = message;

    input.parentNode.appendChild(tooltip);

    const inputHeight = input.offsetHeight;
    tooltip.style.top = (inputHeight + 6) + 'px';

    setTimeout(() => tooltip.classList.add('show'), 10);

    setTimeout(() => {
      tooltip.classList.remove('show');
      setTimeout(() => tooltip.remove(), 300);
    }, 3000);
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function getUsuarios() {
    const usuariosJSON = localStorage.getItem('usuarios');
    return usuariosJSON ? JSON.parse(usuariosJSON) : [];
  }

  function salvarUsuario(usuario) {
    const usuarios = getUsuarios();
    usuarios.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = nomeInput.value.trim();
    const email = emailInput.value.trim();
    const senha = senhaInput.value.trim();
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

    if (senha.length < 6) {
      showError(senhaInput, 'Senha deve ter pelo menos 6 caracteres.');
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

    const usuarios = getUsuarios();

    const emailExiste = usuarios.some(u => u.email.toLowerCase() === email.toLowerCase());
    if (emailExiste) {
      showError(emailInput, 'E-mail já cadastrado.');
      return;
    }

    const cpfExiste = usuarios.some(u => u.cpf === cpf);
    if (cpfExiste) {
      showError(cpfInput, 'CPF já cadastrado.');
      return;
    }

    const novoUsuario = {
      nome,
      email,
      senha,
      cpf,
      nascimento,
      dataRegistro: new Date().toISOString(),
    };

    salvarUsuario(novoUsuario);

    form.reset();
    alert('Cadastro realizado com sucesso!');
    window.location.href = '../index.html'; 
  });
});
