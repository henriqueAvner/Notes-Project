# API de Notas (Notes) — Requisitos e Guia de Implementação

Bem-vindo! Este README descreve, de forma processual, os requisitos para você implementar uma API de anotações (Notes API) usando Nest.js sem banco de dados — os dados serão mockados em memória.

Use este documento como checklist: implemente cada requisito, valide as mensagens e códigos HTTP exatamente como descritos e escreva testes para cobrir os casos.

**Stack sugerida:** Node.js 16+, Nest.js, Jest, `class-validator` (validações). Não usar ORM nem banco.

**Sumário**
- **Requisitos Obrigatórios**
- **Requisitos Bônus**
- **Orientações de implementação (Nest.js)**
- **Checklist passo-a-passo**
- **Exemplos de requests / responses**

**Requisitos Obrigatórios**

Objetivo: construir uma API que gerencie anotações pessoais com três tipos: `note` (anotações), `todo` (tarefas) e `meeting` (reuniões). Os dados ficarão em memória (mock). As mensagens de erro e os códigos HTTP descritos são usados nos testes; implemente-as exatamente.

Modelo de dados (mock)
- `Note` (objeto):
	- `id` (number)
	- `title` (string) — obrigatório, mínimo 3 caracteres
	- `content` (string) — obrigatório
	- `type` (string) — `note` | `todo` | `meeting`
	- `date` (string ISO) — obrigatório quando `type` === `meeting`
	- `completed` (boolean) — apenas para `todo`, default `false`
	- `createdAt` (string ISO)
	- `updatedAt` (string ISO)

Endpoints obrigatórios (comportamento e mensagens)

1) POST `/auth/login`
- Body: `{ "username": "user1", "password": "secret" }`
- Comportamento: autenticação simulada com dados mock em `src/mocks/users.ts`.
- Respostas esperadas:
	- 400 quando campos faltando:
		- `{ "message": "Some required fields are missing" }`
	- 401 quando credenciais inválidas:
		- `{ "message": "Invalid credentials" }`
	- 200 quando sucesso:
		- `{ "token": "<token>" }` (pode ser um JWT assinado com `JWT_SECRET` ou um token mock)

2) POST `/notes`
- Requere autenticação (header `Authorization: Bearer <token>`).
- Body mínimo: `{ "title": "...", "content": "...", "type": "note|todo|meeting"[, "date": "ISO-date"] }`
- Validações / respostas:
	- 400 se `title` ausente ou menor que 3 caracteres:
		- `{ "message": "\"title\" length must be at least 3 characters long" }`
	- 400 se `content` ausente:
		- `{ "message": "Some required fields are missing" }`
	- 400 se `type` inválido:
		- `{ "message": "\"type\" must be one of [note,todo,meeting]" }`
	- 400 se `type` === `meeting` e `date` ausente:
		- `{ "message": "\"date\" is required for meeting type" }`
	- 201 quando criado: retorna o objeto criado com `id`, `createdAt`, `updatedAt`.

3) GET `/notes`
- Requere autenticação.
- 200: retorna um array com todas as notas (padrão). Suportar filtros:
	- `?type=todo` filtra por tipo
	- `?completed=true` filtra tarefas concluídas

4) GET `/notes/:id`
- Requere autenticação.
- 200: retorna o objeto nota.
- 404 se não existe:
	- `{ "message": "Note does not exist" }`

5) PUT `/notes/:id`
- Requere autenticação.
- Permite atualizar `title`, `content` e `completed` (quando `type === 'todo'`).
- 400 se campos obrigatórios faltando.
- 200 retorna o objeto atualizado.

6) DELETE `/notes/:id`
- Requere autenticação.
- 204 sem conteúdo quando deletado com sucesso.
- 404 se não existe: `{ "message": "Note does not exist" }`

Autenticação e mensagens de token
- Implementar middleware que valide `Authorization: Bearer <token>`.
- Mensagens exatas:
	- 401 quando token ausente: `{ "message": "Token not found" }`
	- 401 quando token inválido/expirado: `{ "message": "Expired or invalid token" }`

Requisitos Bônus (opcionais)
- Associar notes a owners (usuários): somente o dono pode editar/deletar. Mensagem de não autorizado: `{ "message": "Unauthorized user" }` com status 401.
- Suporte a paginação em `GET /notes` via `?page=&limit=`.
- Persistência substituível: criar interface de repositório para trocar facilmente por DB.

Orientações de implementação (Nest.js)
- Estrutura sugerida de arquivos:
	- `src/app.module.ts`
	- `src/auth/auth.module.ts`, `auth.service.ts`, `auth.controller.ts`
	- `src/notes/notes.module.ts`, `notes.controller.ts`, `notes.service.ts`
	- `src/notes/dto/create-note.dto.ts`, `update-note.dto.ts`
	- `src/repositories/notes.repository.ts` (mock in-memory)
	- `src/mocks/users.ts`, `src/mocks/notes.ts` (dados iniciais)

- Padrões e dicas:
	- Controllers: apenas lidar com requisões/respostas e validação via DTOs.
	- Services: lógica de negócio (validações mais complexas, regras de autorização).
	- Repository: CRUD em memória (arrays), responsável por timestamps.
	- DTOs com `class-validator`. Para garantir mensagens exatas, trate `ValidationPipe` e intercepte mensagens para formatá-las quando necessário.
	- Para `createdAt` e `updatedAt`, use `new Date().toISOString()`.

Teste local e execução
- Scripts sugeridos no `package.json` (adicione se não existirem):
	- `start` — iniciar a aplicação
	- `start:dev` — iniciar em modo desenvolvimento (nodemon)
	- `test` — rodar Jest

- Rodando local (PowerShell):
```powershell
$env:JWT_SECRET = 'suaSenhaSecreta'
npm run start:dev
```

- Estruture testes Jest cobrindo todos os cenários de sucesso e erro listados (mensagens exatas).

Checklist passo-a-passo (ordem recomendada)
1. Criar a estrutura de módulos, controllers e services no Nest.js.
2. Implementar `src/mocks/users.ts` com ao menos 1 usuário e `auth/login` (mock).
3. Criar `notes.repository` (in-memory) com métodos `getAll`, `getById`, `create`, `update`, `delete`.
4. Implementar DTOs (`create-note.dto`, `update-note.dto`) e configurar `ValidationPipe`.
5. Implementar endpoints: POST `/notes`, GET `/notes`, GET `/notes/:id`, PUT `/notes/:id`, DELETE `/notes/:id`.
6. Implementar middleware de autenticação (verifica token mock/JWT).
7. Escrever testes Jest cobrindo casos positivos e negativos (mensagens exatas).
8. Implementar requisitos bônus se desejar.

Exemplos de request/resposta

- Criar nota (POST /notes)
```
POST /notes
Content-Type: application/json
Authorization: Bearer <token>

{
	"title": "Planejar sprint",
	"content": "Reunião para definir metas",
	"type": "meeting",
	"date": "2025-12-01T10:00:00.000Z"
}
```

Resposta (201):
```
{
	"id": 1,
	"title": "Planejar sprint",
	"content": "Reunião para definir metas",
	"type": "meeting",
	"date": "2025-12-01T10:00:00.000Z",
	"createdAt": "2025-11-29T12:00:00.000Z",
	"updatedAt": "2025-11-29T12:00:00.000Z"
}
```

Erro de validação (exemplo):
```
400 { "message": "Some required fields are missing" }
```

Próximos passos
- Se quiser, eu posso gerar os arquivos esqueleto do Nest.js para este projeto (controllers, services, DTOs e repositório mock). Quer que eu faça isto agora?

---
Arquivo atualizado: `README.md` (guia de implementação para Notes API).

