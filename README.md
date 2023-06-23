# Para começar
## Tecnologias utilizadas no projeto:

* NextJS: frontend e bff ( backend for frontend ) para fazer intermediário entre a API real e nossa aplicação, utilizada também para facilitar os testes.
  
* Typescript: tipagem para javascript
  
* NextUI: biblioteca de estilo para react

* NextUI: biblioteca de estilos para react

* Cypress: biblioteca de testes e2e e de componentes
  
* Prettier: formatação do código

## Requisitos funcionais:
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
![image](https://github.com/TheMiranha/game-list-test/assets/53923502/10861959-bb1f-4820-a687-c8bde4a7cb11)

![image](https://github.com/TheMiranha/game-list-test/assets/53923502/d26c846c-5943-43e4-9757-b0240e35cc16)



Feito com ❤️ por Lucas Miranda 🦄
