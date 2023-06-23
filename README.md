# Para começar
## Tecnologias utilizadas no projeto:

* NextJS: frontend e bff ( backend for frontend ) para fazer intermediário entre a API real e nossa aplicação, utilizada também para facilitar os testes.
  
* Typescript: tipagem para javascript
  
* NextUI: biblioteca de estilo para react

* NextUI: biblioteca de estilos para react

* Cypress: biblioteca de testes e2e e de componentes
  
* Prettier: formatação do código

## Arquitetura de padrões de código:
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

Feito com ❤️ por Lucas Miranda