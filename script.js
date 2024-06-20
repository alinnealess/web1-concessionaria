//pagina de login

document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username === 'admin' && password === 'admin') {
    window.location.href = 'menus.html';
  } else {
    alert('Nome de usuário ou senha incorretos!');
  }
});

// Script para a página de login
document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username === 'admin' && password === 'admin') {
    window.location.href = 'menus.html';
  } else {
    alert('Nome de usuário ou senha incorretos!');
  }
});

// Script para cadastrar veículos
function cadastrarVeiculo() {
  const marca = document.getElementById('marca').value;
  const modelo = document.getElementById('modelo').value;
  const anoFabricacao = document.getElementById('anoFabricacao').value;
  const cor = document.getElementById('inputCor').value;
  const tipo = document.getElementById('inputTipo').value;
  const quilometragem = document.getElementById('km').value;
  const numeroPortas = document.querySelector('input[name="numeroPortas"]:checked').value;
  const preco = document.getElementById('preco').value;
  const imagem = document.getElementById('exampleFormControlFile1').files[0] ? document.getElementById('exampleFormControlFile1').files[0].name : 'car_placeholder.jpg';

  if (!marca || !modelo || !anoFabricacao || !cor || !tipo || !quilometragem || !numeroPortas || !preco) {
    alert('Por favor, preencha todos os campos obrigatórios.');
    return;
  }

  const veiculo = {
    marca,
    modelo,
    anoFabricacao,
    cor,
    tipo,
    quilometragem,
    numeroPortas,
    preco,
    imagem
  };

  let veiculos = JSON.parse(localStorage.getItem('veiculos')) || [];
  veiculos.push(veiculo);
  localStorage.setItem('veiculos', JSON.stringify(veiculos));

  alert('Veículo cadastrado com sucesso!');
  window.location.href = 'listar_buscar_veiculos.html';
}

// Script para listar veículos
document.addEventListener('DOMContentLoaded', function() {
  carregarVeiculos();
});

function carregarVeiculos() {
  const veiculos = JSON.parse(localStorage.getItem('veiculos')) || [];
  const veiculosLista = document.getElementById('veiculosLista');
  veiculosLista.innerHTML = '';

  veiculos.forEach(veiculo => {
    const veiculoItem = document.createElement('div');
    veiculoItem.className = 'card';
    veiculoItem.innerHTML = `
      <img class="card-img-top" src="resources/${veiculo.imagem}" alt="Imagem de capa do card">
      <div class="card-body">
        <h5 class="card-title">${veiculo.marca} ${veiculo.modelo}</h5>
        <p class="card-text">Ano: ${veiculo.anoFabricacao}</p>
        <p class="card-text">Cor: ${veiculo.cor}</p>
        <p class="card-text">Tipo: ${veiculo.tipo}</p>
        <p class="card-text">Quilometragem: ${veiculo.quilometragem} km</p>
        <p class="card-text">Número de Portas: ${veiculo.numeroPortas}</p>
        <p class="card-text">Preço: R$ ${veiculo.preco}</p>
        <p class="card-text"><small class="text-muted">Atualizados agora</small></p>
      </div>
    `;
    veiculosLista.appendChild(veiculoItem);
  });
}

function filtrarVeiculos() {
  const marcaFiltro = document.getElementById('marcaFiltro').value.toLowerCase();
  const modeloFiltro = document.getElementById('modeloFiltro').value.toLowerCase();
  const anoFiltro = document.getElementById('anoFiltro').value.toLowerCase();
  const corFiltro = document.getElementById('corFiltro').value.toLowerCase();
  const tipoFiltro = document.getElementById('tipoFiltro').value.toLowerCase();

  const veiculos = JSON.parse(localStorage.getItem('veiculos')) || [];
  const veiculosLista = document.getElementById('veiculosLista');
  veiculosLista.innerHTML = '';

  veiculos.forEach(veiculo => {
    if (
      (marcaFiltro === '' || veiculo.marca.toLowerCase().includes(marcaFiltro)) &&
      (modeloFiltro === '' || veiculo.modelo.toLowerCase().includes(modeloFiltro)) &&
      (anoFiltro === '' || veiculo.anoFabricacao.toLowerCase().includes(anoFiltro)) &&
      (corFiltro === '' || veiculo.cor.toLowerCase().includes(corFiltro)) &&
      (tipoFiltro === '' || veiculo.tipo.toLowerCase().includes(tipoFiltro))
    ) {
      const veiculoItem = document.createElement('div');
      veiculoItem.className = 'card';
      veiculoItem.innerHTML = `
        <img class="card-img-top" src="resources/${veiculo.imagem}" alt="Imagem de capa do card">
        <div class="card-body">
          <h5 class="card-title">${veiculo.marca} ${veiculo.modelo}</h5>
          <p class="card-text">Ano: ${veiculo.anoFabricacao}</p>
          <p class="card-text">Cor: ${veiculo.cor}</p>
          <p class="card-text">Tipo: ${veiculo.tipo}</p>
          <p class="card-text">Quilometragem: ${veiculo.quilometragem} km</p>
          <p class="card-text">Número de Portas: ${veiculo.numeroPortas}</p>
          <p class="card-text">Preço: R$ ${veiculo.preco}</p>
          <p class="card-text"><small class="text-muted">Atualizados agora</small></p>
        </div>
      `;
      veiculosLista.appendChild(veiculoItem);
    }
  });
}


// Carregar veículos na página de exclusão
document.addEventListener('DOMContentLoaded', function() {
  if (window.location.pathname.includes('excluir_veiculos.html')) {
    carregarVeiculosParaExcluir();
  }
});

function carregarVeiculosParaExcluir() {
  const veiculos = JSON.parse(localStorage.getItem('veiculos')) || [];
  const veiculosLista = document.getElementById('veiculosLista');
  veiculosLista.innerHTML = '';

  veiculos.forEach((veiculo, index) => {
    const veiculoItem = document.createElement('div');
    veiculoItem.className = 'list-group-item';
    veiculoItem.innerHTML = `
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="${index}" id="veiculo${index}">
        <label class="form-check-label" for="veiculo${index}">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">${veiculo.marca} ${veiculo.modelo}</h5>
            <small>Ano: ${veiculo.anoFabricacao}</small>
          </div>
          <p class="mb-1">Cor: ${veiculo.cor}, Tipo: ${veiculo.tipo}</p>
          <small>Quilometragem: ${veiculo.quilometragem} km, Preço: R$ ${veiculo.preco}</small>
        </label>
      </div>
    `;
    veiculosLista.appendChild(veiculoItem);
  });
}

function excluirVeiculos() {
  const checkboxes = document.querySelectorAll('.form-check-input:checked');
  if (checkboxes.length === 0) {
    alert('Por favor, selecione pelo menos um veículo para excluir.');
    return;
  }

  let veiculos = JSON.parse(localStorage.getItem('veiculos')) || [];
  const indicesParaExcluir = Array.from(checkboxes).map(checkbox => parseInt(checkbox.value));

  // Remover os veículos dos índices maiores primeiro para evitar problemas de reindexação
  indicesParaExcluir.sort((a, b) => b - a).forEach(index => veiculos.splice(index, 1));

  localStorage.setItem('veiculos', JSON.stringify(veiculos));
  alert('Veículo(s) excluído(s) com sucesso!');
  carregarVeiculosParaExcluir();
}


// Função de logout
function logout() {
  // Limpa qualquer informação de sessão (se necessário)
  localStorage.clear(); // Descomente esta linha se desejar limpar o localStorage ao deslogar
  alert('Você foi deslogado com sucesso!')

  // Redireciona para a página de login
  window.location.href = 'index.html';
}