# AutoStar - Sistema de Gerenciamento de Veículos

Este projeto foi desenvolvido para da atividade avaliativa da 3ª unidade da disciplina de **DESENVOLVIMENTO DE SISTEMAS WEB I** do curso de **Bacharelado em Tecnologia da Informação** da **Universidade Federal do Rio Grande do Norte (UFRN)**. A ideia principal foi criar um pequeno site para uma concessionária de veículos novos e seminovos, com funcionalidades básicas de cadastro, listagem, busca e exclusão de veículos.

## Estrutura do Projeto

O projeto consiste em 5 páginas principais:

1. **Página de Login (`index.html`)**
2. **Página de Menu (`menus.html`)**
3. **Página de Cadastro de Veículos (`cadastrar_veiculos.html`)**
4. **Página de Listagem e Busca de Veículos (`listar_buscar_veiculos.html`)**
5. **Página de Exclusão de Veículos (`excluir_veiculos.html`)**

## Funcionalidades Implementadas

### Página de Login (`index.html`)
- Solicitação de login e senha (credenciais padrão: "admin" e "admin").
- Caso as credenciais estejam corretas, o usuário é redirecionado para a página de menus.
- Caso contrário, é exibido um alerta informando que as credenciais estão incorretas.

### Página de Menu (`menus.html`)
- Contém botões que direcionam para as páginas de cadastro, listagem e exclusão de veículos.
- Implementação de um botão de logout que retorna o usuário para a página de login.

### Página de Cadastro de Veículos (`cadastrar_veiculos.html`)
- Formulário para cadastro de novos veículos com os seguintes campos:
  - Marca
  - Modelo
  - Ano de Fabricação
  - Cor
  - Tipo
  - Quilometragem
  - Número de Portas
  - Preço
  - Imagem do veículo
- Validação dos campos obrigatórios.
- Salvamento dos dados em um vetor e armazenamento no `localStorage`.
- Exibição de um alerta ao cadastrar um veículo com sucesso.

### Página de Listagem e Busca de Veículos (`listar_buscar_veiculos.html`)
- Permite a listagem de todos os veículos cadastrados.
- Formulário de filtro para busca de veículos por marca, modelo, ano de fabricação, cor e tipo.
- Exibição dos veículos filtrados ou todos os veículos cadastrados, com informações detalhadas e imagem.

### Página de Exclusão de Veículos (`excluir_veiculos.html`)
- Exibição de todos os veículos cadastrados com a opção de seleção para exclusão.
- Botão para exclusão dos veículos selecionados.
- Recebe e manipula o vetor de veículos do `localStorage`.

## Tecnologias Utilizadas

- **HTML5**: Estrutura das páginas web.
- **CSS3**: Estilização das páginas utilizando Bootstrap e estilos customizados.
- **JavaScript**: Manipulação de dados, interação com o usuário e operações de CRUD (Create, Read, Update, Delete) no `localStorage`.
- **Bootstrap 4**: Framework CSS para responsividade e componentes estilizados.

## Como Executar o Projeto

1. Clone o repositório ou faça o download do código fonte.
2. Abra o arquivo `index.html` no seu navegador web preferido e use as credenciais:

         login: admin
         senha: admin

3. Navegue pelas páginas utilizando o menu disponível após a autenticação.

## Estrutura de Diretórios

```plaintext
.
├── index.html
├── menus.html
├── cadastrar_veiculos.html
├── listar_buscar_veiculos.html
├── excluir_veiculos.html
├── styles.css
├── script.js
└── resources
    └── logoautostar.png
```

## Sobre o Desenvolvedor

Este projeto foi desenvolvido como parte das atividades acadêmicas do curso de Bacharelado em Tecnologia da Informação da UFRN. Ele serve como um exercício prático para aplicar os conhecimentos adquiridos na disciplina de Desenvolvimento de Sistemas Web I.
