# Para começar
## Tecnologias utilizadas no projeto:

* NextJS: frontend e bff ( backend for frontend ) para fazer intermediário entre a API real e nossa aplicação, utilizada também para facilitar os testes.
  
* Typescript: tipagem para javascript

* Tailwind: estilização

* NextUI: biblioteca de estilos para react

* Cypress: biblioteca de testes e2e e de componentes
  
* Prettier: formatação do código

## Requisitos funcionais ( 1 ):
* [x] O projeto deve ser feito usando React ou Next.JS
* [x] Apresentar um loader enquanto os dados são obtidos
* [x] Apresentar os jogos em três colunas (no computador)
* [x] Em cada card apresentar o título e imagem pelo ao menos
* [x] Lidar com a responsividade, para que fique bem apresentado no computador, tablets ou celular
* [x] Quando a API retornar o `status code` 500, 502, 503, 504, 507, 508 ou 509 apresentar ao usuário `O servidor fahou em responder, tente recarregar a página`
* [x] Caso a API retorne outros erros, apresentar `O servidor não conseguirá responder por agora, tente voltar novamente mais tarde`
* [x] Ao realizar uma chamada, não esperar mais que 5 segundos pelo retorno. Se os dados demorarem mais de 5 segundos para retornar apresentar `O servidor demorou para responder, tente mais tarde`
* [x] Sempre que apresentar uma mensagem para o usuário, ou tiver os dados em mãos para apresentar, ocultar o loader
* [x] Incluir um campo de busca, que permite localizar jogos pelo título, com busca case insensitive
* [x] Uma vez que tenha os dados em mãos, veja quais `genre` foram retornados e permita ao usuário selecionar um deles, e então filtre para exibir apenas jogos do gênero selecionado


## Requisitos funcionais ( 2 ):
* [x] Utilizar Firebase para realizar autenticação usando email/senha
* [x] Ter um 🩶 para o usuário favoritar o jogo diretamente na lista, ficando vermelho quando marcado
* [x] Salvar no firebase os jogos favoritos do usuário, no realtime ou firestore
* [x] Ter um botão “Favoritos” que apresenta apenas jogos favoritados, permitindo ainda buscar e filtrar estes jogos. Pode ser na própria lista já apresentada ou em uma separada se preferir.
* [x] Ao lado do coração, ter ★★★★ para o usuário avaliar o jogo, podendo marcar de uma em uma. Ou seja, ele pode escolher 1, 2, 3 ou as 4.
* [x] Ter uma forma de ordenar por avaliação, vendo os melhores (ou piores) primeiro, clicando novamente para inverter a ordem.
* [x] Ao carregar a interface, deixar o ❤️ vermelho para os itens favoritos e as ⭐️ amarelas nos itens avaliados
* [x] Ao acessar sem estar autenticado, os ícones 🩶 e ★ deverão estar visíveis, mas ao clicar irá solicitar a autenticação
* [x] Ao obter os jogos da API e os dados do firebase, apresentar. Manter o loading para os jogos. Não precisa de loading enquanto espera o firebase, até porque o firebase devolverá os dados mais rapidamente e pode ser complicado “esperar o firebase” se estiver “escutando o firebase”.
* [x] A autenticação deve acontecer na rota `/auth/` do frontend, usando o provedor “E-mail/senha” do firebase, onde o usuário poderá criar uma conta ou acessar a conta já existente (se mantendo apenas nesta rota)
* [x] Escolher um item para aplicar uma animação com CSS, pode ser ao favoritar, ou avaliar, ou quando os itens surgirem -> Ao favoritar um jogo
* [x] Publicar seu projeto online para testarmos (na mesma url de antes)

# Arquitetura de padrões de código:
Este projeto foi feito com noções de Clean Architecture, DDD e SOLID

# Scripts
```bash
    - yarn dev: execução do servidor de desenvolvimento
    - yarn build: build da aplicação ( frontend e backend )
    - yarn start: inicia servidor da build
    - yarn lint: verifica erros de formatação e padrões de códigos mais simples
    - yarn prettier: formata o código pelas configurações do prettier.config.js
    - yarn cypress: abre a aplicação do Cypress para configuração base de testes
    - yarn test: inicia um motor web interno para execução de testes ( neste projeto, e2e )
```

# Prints
![image](https://github.com/TheMiranha/game-list-test/assets/53923502/12701bcf-67dc-46e2-bf45-bdd0ae8718b8)


![image](https://github.com/TheMiranha/game-list-test/assets/53923502/2d7c635f-9142-4956-ac8a-d85c654abb89)




Feito com ❤️ por Lucas Miranda 🦄
