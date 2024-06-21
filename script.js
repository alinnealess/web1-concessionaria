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
  // Obtém os valores dos campos de entrada do formulário
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

  //Instancia um novo objeto do tipo Carro
  const imagem = imagemInput.name;
  const carro = new Carro(marca, modelo, anoFabricacao, cor, tipo, quilometragem, numeroPortas, preco, imagem);

  // Adiciona o veículo ao localStorage
  let veiculos = JSON.parse(localStorage.getItem('veiculos')) || [];
  veiculos.push(carro);
  localStorage.setItem('veiculos', JSON.stringify(veiculos));

  alert('Veículo cadastrado com sucesso!'); // Exibe um alerta de sucesso
  window.location.href = 'listar_buscar_veiculos.html'; // Redireciona para a página de listagem de veículos
}


// Função para listar veículos
document.addEventListener('DOMContentLoaded', function() {
  // Verifica se a página atual é a de listagem de veículos
  if (window.location.pathname.includes('listar_buscar_veiculos.html')) {
    exibirTodos();
  } else if (window.location.pathname.includes('excluir.html')) {
    exibirTodosExcluir();
  }
});

// Função que exibe todos os veículos armazenados no localStorage
function exibirTodos() {
  const veiculos = JSON.parse(localStorage.getItem('veiculos')) || [];
  const veiculosLista = document.getElementById('veiculosLista');
  veiculosLista.innerHTML = '';

  let row;
  // Cria uma nova linha a cada três veículos
  veiculos.forEach((veiculo, index) => {
    if (index % 3 === 0) {
      row = document.createElement('div');
      row.className = 'row mb-4';
      veiculosLista.appendChild(row);
    }

    // Cria um novo elemento para o veículo
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

// Função para filtrar veículos
function filtrarVeiculos() {
  // Obtém os valores dos filtros de entrada e converte para letras minúsculas
  const marcaFiltro = document.getElementById('marcaFiltro').value.toLowerCase();
  const modeloFiltro = document.getElementById('modeloFiltro').value.toLowerCase();
  const anoFiltro = document.getElementById('anoFiltro').value.toLowerCase();
  const corFiltro = document.getElementById('corFiltro').value.toLowerCase();
  const tipoFiltro = document.getElementById('tipoFiltro').value.toLowerCase();

  // Recupera a lista de veículos do localStorage, ou usa uma lista vazia se não houver veículos salvos
  const veiculos = JSON.parse(localStorage.getItem('veiculos')) || [];
  
  // Seleciona o elemento HTML onde os veículos filtrados serão exibidos
  const veiculosLista = document.getElementById('veiculosLista');
  
  // Limpa qualquer conteúdo anterior
  veiculosLista.innerHTML = '';

  // Variável para agrupar os veículos em linhas de três itens
  let row;
  let encontrouVeiculo = false;

  // Itera sobre cada veículo na lista
  veiculos.forEach((veiculo, index) => {
    // Verifica se o veículo corresponde a todos os filtros aplicados
    if (
      (marcaFiltro === '' || veiculo.marca.toLowerCase().includes(marcaFiltro)) &&
      (modeloFiltro === '' || veiculo.modelo.toLowerCase().includes(modeloFiltro)) &&
      (anoFiltro === '' || veiculo.anoFabricacao.toLowerCase().includes(anoFiltro)) &&
      (corFiltro === '' || veiculo.cor.toLowerCase().includes(corFiltro)) &&
      (tipoFiltro === '' || veiculo.tipo.toLowerCase().includes(tipoFiltro))
    ) {
      // Cria uma nova linha a cada três veículos
      if (index % 3 === 0) {
        row = document.createElement('div');
        row.className = 'row mb-4'; // Adiciona classes de Bootstrap para estilo
        veiculosLista.appendChild(row); // Adiciona a linha ao container principal
      }

      // Cria um novo elemento para o veículo
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
      
      // Adiciona o item do veículo à linha atual
      row.appendChild(veiculoItem);
      
      // Define a flag para indicar que pelo menos um veículo foi encontrado
      encontrouVeiculo = true;
    }
  });

  // Exibe um alerta se nenhum veículo correspondente ao filtro foi encontrado
  if (!encontrouVeiculo) {
    alert('Não há veículos correspondentes ao filtro.');
  }
}


// Função para excluir veículos na página de exlusão
function exibirTodosExcluir() {
  var veiculos = JSON.parse(localStorage.getItem('veiculos')) || [];
  var veiculosLista = document.getElementById('veiculosLista');
  veiculosLista.innerHTML = '';

  var row;
  veiculos.forEach(function(veiculo, index) {
    if (index % 3 === 0) {
      row = document.createElement('div');
      row.className = 'row mb-4';
      veiculosLista.appendChild(row);
    }

    var veiculoItem = document.createElement('div');
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
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="${index}" id="veiculo${index}">
            <label class="form-check-label" for="veiculo${index}">Excluir este item</label>
          </div>
        </div>
      </div>
    `;
    row.appendChild(veiculoItem);
  });
}

// Função para excluir veículos selecionados
function excluirVeiculos() {
  var checkboxes = document.querySelectorAll('.form-check-input:checked');
  if (checkboxes.length === 0) {
    alert('Por favor, selecione pelo menos um veículo para excluir.');
    return;
  }


  var veiculos = JSON.parse(localStorage.getItem('veiculos')) || [];
  var indicesParaExcluir = [];
  for (var i = 0; i < checkboxes.length; i++) {
    indicesParaExcluir.push(parseInt(checkboxes[i].value));
  }

  indicesParaExcluir.sort(function(a, b) {
    return b - a;
  });
  for (var j = 0; j < indicesParaExcluir.length; j++) {
    veiculos.splice(indicesParaExcluir[j], 1); 
  }

  localStorage.setItem('veiculos', JSON.stringify(veiculos));
  alert('Veículo(s) excluído(s) com sucesso!'); 
  exibirTodosExcluir(); 
}
