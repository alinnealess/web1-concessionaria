// Definindo classes Veiculo e Carro
class Veiculo {
  constructor(marca, modelo, anoFabricacao, cor, tipo, quilometragem, numeroPortas, preco, imagem) {
    this.marca = marca;
    this.modelo = modelo;
    this.anoFabricacao = anoFabricacao;
    this.cor = cor;
    this.tipo = tipo;
    this.quilometragem = quilometragem;
    this.numeroPortas = numeroPortas;
    this.preco = preco;
    this.imagem = imagem;
  }
}

class Carro extends Veiculo {
  constructor(marca, modelo, anoFabricacao, cor, tipo, quilometragem, numeroPortas, preco, imagem) {
    super(marca, modelo, anoFabricacao, cor, tipo, quilometragem, numeroPortas, preco, imagem);
  }
}

// Função de login
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

// Função de logout
function logout() {
  alert('Você foi deslogado com sucesso!');
  window.location.href = 'index.html';
}

// Função para cadastrar veículos
function cadastrarVeiculo() {
  const marca = document.getElementById('marca').value;
  const modelo = document.getElementById('modelo').value;
  const anoFabricacao = document.getElementById('anoFabricacao').value;
  const cor = document.getElementById('inputCor').value;
  const tipo = document.getElementById('inputTipo').value;
  const quilometragem = document.getElementById('km').value;
  const numeroPortas = document.querySelector('input[name="numeroPortas"]:checked').value;
  const preco = document.getElementById('preco').value;
  const imagemInput = document.getElementById('exampleFormControlFile1').files[0];

  if (!marca || !modelo || !anoFabricacao || !cor || !tipo || !quilometragem || !numeroPortas || !preco || !imagemInput) {
    alert('Por favor, preencha todos os campos obrigatórios, incluindo a imagem.');
    return;
  }

  const imagem = imagemInput.name;
  const carro = new Carro(marca, modelo, anoFabricacao, cor, tipo, quilometragem, numeroPortas, preco, imagem);

  let veiculos = JSON.parse(localStorage.getItem('veiculos')) || [];
  veiculos.push(carro);
  localStorage.setItem('veiculos', JSON.stringify(veiculos));

  alert('Veículo cadastrado com sucesso!');
  window.location.href = 'listar_buscar_veiculos.html';
}


// Função para listar veículos
document.addEventListener('DOMContentLoaded', function() {
  if (window.location.pathname.includes('listar_buscar_veiculos.html')) {
    exibirTodos();
  } else if (window.location.pathname.includes('excluir.html')) {
    exibirTodosExcluir();
  }
});

function exibirTodos() {
  const veiculos = JSON.parse(localStorage.getItem('veiculos')) || [];
  const veiculosLista = document.getElementById('veiculosLista');
  veiculosLista.innerHTML = '';

  let row;
  veiculos.forEach((veiculo, index) => {
    if (index % 3 === 0) {
      row = document.createElement('div');
      row.className = 'row mb-4';
      veiculosLista.appendChild(row);
    }

    const veiculoItem = document.createElement('div');
    veiculoItem.className = 'col-md-4';
    veiculoItem.innerHTML = `
      <div class="card">
        <img class="card-img-top" src="resources/${veiculo.imagem}" alt="Imagem de capa do card">
        <div class="card-body">
          <h5 class="card-title">${veiculo.marca} ${veiculo.modelo}</h5>
          <p class="card-text">Ano: ${veiculo.anoFabricacao}</p>
          <p class="card-text">Cor: ${veiculo.cor}</p>
          <p class="card-text">Tipo: ${veiculo.tipo}</p>
          <p class="card-text">Quilometragem: ${veiculo.quilometragem} km</p>
          <p class="card-text">Número de Portas: ${veiculo.numeroPortas}</p>
          <p class="card-text">Preço: R$ ${veiculo.preco}</p>
        </div>
      </div>
    `;
    row.appendChild(veiculoItem);
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

  let row;
  let encontrouVeiculo = false;
  veiculos.forEach((veiculo, index) => {
    if (
      (marcaFiltro === '' || veiculo.marca.toLowerCase().includes(marcaFiltro)) &&
      (modeloFiltro === '' || veiculo.modelo.toLowerCase().includes(modeloFiltro)) &&
      (anoFiltro === '' || veiculo.anoFabricacao.toLowerCase().includes(anoFiltro)) &&
      (corFiltro === '' || veiculo.cor.toLowerCase().includes(corFiltro)) &&
      (tipoFiltro === '' || veiculo.tipo.toLowerCase().includes(tipoFiltro))
    ) {
      if (index % 3 === 0) {
        row = document.createElement('div');
        row.className = 'row mb-4';
        veiculosLista.appendChild(row);
      }

      const veiculoItem = document.createElement('div');
      veiculoItem.className = 'col-md-4';
      veiculoItem.innerHTML = `
        <div class="card">
          <img class="card-img-top" src="resources/${veiculo.imagem}" alt="Imagem de capa do card">
          <div class="card-body">
            <h5 class="card-title">${veiculo.marca} ${veiculo.modelo}</h5>
            <p class="card-text">Ano: ${veiculo.anoFabricacao}</p>
            <p class="card-text">Cor: ${veiculo.cor}</p>
            <p class="card-text">Tipo: ${veiculo.tipo}</p>
            <p class="card-text">Quilometragem: ${veiculo.quilometragem} km</p>
            <p class="card-text">Número de Portas: ${veiculo.numeroPortas}</p>
            <p class="card-text">Preço: R$ ${veiculo.preco}</p>
          </div>
        </div>
      `;
      row.appendChild(veiculoItem);
      encontrouVeiculo = true;
    }
  });

  if (!encontrouVeiculo) {
    alert('Não há veículos correspondentes ao filtro.');
  }
}

function exibirTodosExcluir() {
  const veiculos = JSON.parse(localStorage.getItem('veiculos')) || [];
  const veiculosLista = document.getElementById('veiculosLista');
  veiculosLista.innerHTML = '';

  let row;
  veiculos.forEach((veiculo, index) => {
    if (index % 3 === 0) {
      row = document.createElement('div');
      row.className = 'row mb-4';
      veiculosLista.appendChild(row);
    }

    const veiculoItem = document.createElement('div');
    veiculoItem.className = 'col-md-4';
    veiculoItem.innerHTML = `
      <div class="card">
        <div class="form-check">
          <img class="card-img-top" src="resources/${veiculo.imagem}" alt="Imagem de capa do card">
          <div class="card-body">
            <h5 class="card-title">${veiculo.marca} ${veiculo.modelo}</h5>
            <p class="card-text">Ano: ${veiculo.anoFabricacao}</p>
            <p class="card-text">Cor: ${veiculo.cor}</p>
            <p class="card-text">Tipo: ${veiculo.tipo}</p>
            <p class="card-text">Quilometragem: ${veiculo.quilometragem} km</p>
            <p class="card-text">Número de Portas: ${veiculo.numeroPortas}</p>
            <p class="card-text">Preço: R$ ${veiculo.preco}</p>
            <div class="d-flex align-items-center mt-3">
              <input class="form-check-input" type="checkbox" value="${index}" id="veiculo${index}">
              <label class="form-check-label ml-2" for="veiculo${index}">Excluir este item</label>
            </div>
          </div>
        </div>
      </div>
    `;
    row.appendChild(veiculoItem);
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
  exibirTodosExcluir();
}
