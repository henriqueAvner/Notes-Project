# Notes_API :computer:

## Sobre o projeto:
<summary><strong>O que foi desenvolvido:</strong></summary>

Neste projeto foi desenvolvida uma API de anotações com `PostgreSQL` usando `Nest.js`.

As tecnologias utilizadas foram: `Node.js`, `Nest.js`, `class-validator`, `PostgreSQL` e testes com `Jest`.

1. Foram desenvolvidos endpoints que seguem os princípios REST para gerenciar anotações e reuniões;

2. Os dados são mantidos em um banco `PostgreSQL` criado para consulta, leitura, autalização e deleção.

3. As rotas estão organizadas em módulos (`anotacoes`, `reunioes`) e seguem as convenções do Nest.js;

4. Arquivos dentro da pasta `src` que foram desenvolvidos:
   - A pasta `anotacoes` (controller, service, dto, repository, entities/interfaces);
   - A pasta `reunioes` (controller, service, dto, repository, interfaces);
   - A pasta `utils` com helpers (ex.: `formatDate`);

### :heavy_exclamation_mark:ATENÇÃO!:heavy_exclamation_mark:: Alguns arquivos de configuração e testes podem ter sido adicionados automaticamente pelo scaffolding do projeto.

<br />

## Orientações:

## Rodando localmente

> :pushpin: Instale as dependências com `npm install`

- Para rodar o projeto localmente, use o script disponível (ex.: `npm run start:dev`).

- :pushpin: Para rodar o projeto desta forma, você deve ter o `node` instalado em seu computador.

<br/>

## Instruções de utilização do projeto:

| Rota                      | Funcionalidade                            | Tipo da Requisição |
|---------------------------|-------------------------------------------|--------------------|
| /anotacoes                | Obter todas as anotações                  | GET                |
| /anotacoes/:id            | Obter anotação por ID                     | GET                |
| /anotacoes               | Criar nova anotação                        | POST               |
| /anotacoes/:id           | Atualizar anotação por ID                  | PATCH              |
| /anotacoes/:id           | Excluir anotação por ID                    | DELETE             |
| /reunioes                | Obter todas as reuniões                    | GET                |
| /reunioes/:id            | Obter reunião por ID                       | GET                |
| /reunioes               | Criar nova reunião                         | POST               |
| /reunioes/:id            | Atualizar reunião por ID                   | PATCH              |
| /reunioes/:id            | Excluir reunião por ID                     | DELETE             |

### Utilização:
:pushpin: Utilize algum aplicativo ou extensão do VSCode para realizar as requisições.

> Exemplo: ThunderClient, Insomnia, entre outros.

<br />

### Exemplos de payload

- `POST /anotacoes` (criar anotação)

```json
{
  "titulo": "Lista de compras",
  "conteudo": "Comprar leite, pão e ovos"
}
```

- `POST /reunioes` (criar reunião)

```json
{
  "titulo": "Sprint Planning",
  "descricao": "Planejar as tarefas do próximo sprint",
  "horario": "05/12/2025 14:00",
  "confirmacao": false
}
```

<br />

## Observações sobre formatos de data
- Internamente as datas são armazenadas como `Date`.
- Caso queira apresentar datas no formato `dd/MM/YYYY`, utilize o helper `src/utils/formatDate.ts` na saída (controller, repositório ou via interceptor).

<br />

## Estrutura de pastas (resumida)
- `src/anotacoes` — controller, service, dto, repository, entities/interfaces
- `src/reunioes` — controller, service, dto, repository, interfaces
- `src/utils` — helpers (ex.: `formatDate`)
- `src/main.ts` — bootstrap da aplicação (onde pipes/interceptors globais podem ser configurados)

<br />

## Executando os testes
- Este projeto contém specs com `Jest` em `src/*/*.spec.ts`.
- Execute os testes com o comando `npm test`.
