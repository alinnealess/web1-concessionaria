// Classe Veiculo
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

// Classe Carro que herda de Veiculo
class Carro extends Veiculo {
  constructor(marca, modelo, anoFabricacao, cor, tipo, quilometragem, numeroPortas, preco, imagem) {
    super(marca, modelo, anoFabricacao, cor, tipo, quilometragem, numeroPortas, preco, imagem);
  }
}


// Função de login
function login(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username === 'admin' && password === 'admin') {
    window.location.href = 'menus.html';
  } else {
    alert('Nome de usuário ou senha incorretos!');
  }
  return false; 
}


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

  // Instancia um novo objeto do tipo Carro
  const imagem = imagemInput.name;
  const carro = new Carro(marca, modelo, anoFabricacao, cor, tipo, quilometragem, numeroPortas, preco, imagem);

  // Adiciona o veículo ao localStorage
  let veiculos = JSON.parse(localStorage.getItem('veiculos')) || [];
  console.log(veiculos);
  veiculos.push(carro);
  localStorage.setItem('veiculos', JSON.stringify(veiculos));

  alert('Veículo cadastrado com sucesso!'); // Exibe um alerta de sucesso
  
  // Limpa os campos do formulário
  document.getElementById('marca').value = '';
  document.getElementById('modelo').value = '';
  document.getElementById('anoFabricacao').value = '';
  document.getElementById('inputCor').value = '';
  document.getElementById('inputTipo').value = '';
  document.getElementById('km').value = '';
  document.querySelector('input[name="numeroPortas"]:checked').checked = false;
  document.getElementById('preco').value = '';
  document.getElementById('exampleFormControlFile1').value = '';
}

// Função que exibe todos os veículos armazenados no localStorage
function exibirTodos() {
  const veiculos = JSON.parse(localStorage.getItem('veiculos')) || [];
  console.log(veiculos);
  const veiculosLista = document.getElementById('veiculosLista');
  veiculosLista.innerHTML = '';

  let group;
  veiculos.forEach((veiculo, index) => {
    if (index % 3 === 0) {
      group = document.createElement('div');
      group.className = 'card-group mb-4';
      veiculosLista.appendChild(group);
    }

    const veiculoItem = document.createElement('div');
    veiculoItem.className = 'card mb-3'; 
    veiculoItem.innerHTML = `
      <img class="card-img-top vehicle-img" src="resources/${veiculo.imagem}" alt="Imagem de capa do card">
      <div class="card-body">
        <h5 class="card-title">${veiculo.marca} ${veiculo.modelo}</h5>
        <p class="card-text">Ano: ${veiculo.anoFabricacao}</p>
        <p class="card-text">Cor: ${veiculo.cor}</p>
        <p class="card-text">Tipo: ${veiculo.tipo}</p>
        <p class="card-text">Quilometragem: ${veiculo.quilometragem} km</p>
        <p class="card-text">Número de Portas: ${veiculo.numeroPortas}</p>
        <p class="card-text">Preço: R$ ${veiculo.preco}</p>
      </div>
    `;
    group.appendChild(veiculoItem);
  });
}

// Função para listar veículos ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
  if (window.location.pathname.includes('listar_buscar_veiculos.html')) {
    exibirTodos();
  } else if (window.location.pathname.includes('excluir_veiculos.html')) {
    exibirTodosExcluir();
  }
});

// Função para filtrar veículos
function filtrarVeiculos() {
  const marcaFiltro = document.getElementById('marcaFiltro').value.toLowerCase();
  const modeloFiltro = document.getElementById('modeloFiltro').value.toLowerCase();
  const anoFiltro = document.getElementById('anoFiltro').value.toLowerCase();
  const corFiltro = document.getElementById('corFiltro').value.toLowerCase();
  const tipoFiltro = document.getElementById('tipoFiltro').value.toLowerCase();

  const veiculos = JSON.parse(localStorage.getItem('veiculos')) || [];
  console.log(veiculos);
  const veiculosLista = document.getElementById('veiculosLista');
  veiculosLista.innerHTML = '';

  let group;
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
        group = document.createElement('div');
        group.className = 'card-group mb-4'; 
        veiculosLista.appendChild(group);
      }

      const veiculoItem = document.createElement('div');
      veiculoItem.className = 'card mb-3';
      veiculoItem.innerHTML = `
        <img class="card-img-top vehicle-img" src="resources/${veiculo.imagem}" alt="Imagem de capa do card">
        <div class="card-body">
          <h5 class="card-title">${veiculo.marca} ${veiculo.modelo}</h5>
          <p class="card-text">Ano: ${veiculo.anoFabricacao}</p>
          <p class="card-text">Cor: ${veiculo.cor}</p>
          <p class="card-text">Tipo: ${veiculo.tipo}</p>
          <p class="card-text">Quilometragem: ${veiculo.quilometragem} km</p>
          <p class="card-text">Número de Portas: ${veiculo.numeroPortas}</p>
          <p class="card-text">Preço: R$ ${veiculo.preco}</p>
        </div>
      `;
      group.appendChild(veiculoItem);
      encontrouVeiculo = true;
    }
  });

  if (!encontrouVeiculo) {
    alert('Não há veículos correspondentes ao filtro.');
  }
}

// Função para excluir veículos na página de exclusão
function exibirTodosExcluir() {
  const veiculos = JSON.parse(localStorage.getItem('veiculos')) || [];
  console.log(veiculos);
  const veiculosLista = document.getElementById('veiculosLista');
  veiculosLista.innerHTML = '';

  let group;
  veiculos.forEach((veiculo, index) => {
    if (index % 3 === 0) {
      group = document.createElement('div');
      group.className = 'card-group mb-4';
      veiculosLista.appendChild(group);
    }

    const veiculoItem = document.createElement('div');
    veiculoItem.className = 'card mb-3';
    veiculoItem.innerHTML = `
      <img class="card-img-top vehicle-img" src="resources/${veiculo.imagem}" alt="Imagem de capa do card">
      <div class="card-body">
        <h5 class="card-title">${veiculo.marca} ${veiculo.modelo}</h5>
        <p class="card-text">Ano: ${veiculo.anoFabricacao}</p>
        <p class="card-text">Cor: ${veiculo.cor}</p>
        <p class="card-text">Tipo: ${veiculo.tipo}</p>
        <p class="card-text">Quilometragem: ${veiculo.quilometragem} km</p>
        <p class="card-text">Número de Portas: ${veiculo.numeroPortas}</p>
        <p class="card-text">Preço: R$ ${veiculo.preco}</p>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="${index}" id="veiculo${index}">
          <label class="form-check-label" for="veiculo${index}">Excluir este item</label>
        </div>
      </div>
    `;
    group.appendChild(veiculoItem);
  });
}

// Função para excluir veículos selecionados
function excluirVeiculos() {
  const checkboxes = document.querySelectorAll('.form-check-input:checked');
  if (checkboxes.length === 0) {
    alert('Por favor, selecione pelo menos um veículo para excluir.');
    return;
  }

  let veiculos = JSON.parse(localStorage.getItem('veiculos')) || [];
  console.log(veiculos);
  const indicesParaExcluir = Array.from(checkboxes).map(checkbox => parseInt(checkbox.value));

  indicesParaExcluir.sort((a, b) => b - a);
  indicesParaExcluir.forEach(index => veiculos.splice(index, 1));

  localStorage.setItem('veiculos', JSON.stringify(veiculos));
  alert('Veículo(s) excluído(s) com sucesso!');
  exibirTodosExcluir();
}

// Carregar todos os veículos na página de exclusão ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
  if (window.location.pathname.includes('excluir_veiculos.html')) {
    exibirTodosExcluir();
  } else {
    exibirTodos();
  }
});