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

Instalação de dependências (recomendada)

Instale as bibliotecas mínimas necessárias para validação, autenticação (JWT) e ambiente. Execute na raiz do projeto (PowerShell):

```powershell
npm install class-validator class-transformer dotenv jsonwebtoken bcryptjs
```

Dependências opcionais (Passport / Nest JWT):

```powershell
npm install @nestjs/jwt passport passport-jwt
npm install --save-dev @types/passport-jwt
```


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

Instalação de dependências

Recomendo instalar as bibliotecas listadas abaixo para facilitar validação, autenticação (JWT) e gerenciamento de variáveis de ambiente. Rode estes comandos no PowerShell na raiz do projeto.

Dependências essenciais:
```powershell
npm install class-validator class-transformer dotenv jsonwebtoken bcryptjs
```

Dependências opcionais para integração com Passport/Nest JWT (se preferir usar os módulos do Nest):
```powershell
npm install @nestjs/jwt passport passport-jwt
npm install --save-dev @types/passport-jwt
```

Dependências de desenvolvimento (recomendadas):
```powershell
npm install --save-dev nodemon ts-node-dev
```

Após instalar, adicione ao `package.json` scripts úteis, por exemplo:
```json
"scripts": {
	"start": "nest start",
	"start:dev": "ts-node-dev --respawn --transpile-only src/main.ts",
	"test": "jest"
}
```

Modelos de mocks e onde implementá-los

Estrutura sugerida para mocks e repositório em memória:

- `src/mocks/users.ts` — usuários mock (autenticação)
- `src/mocks/notes.ts` — notas iniciais (opcional)
- `src/repositories/notes.repository.ts` — repositório em memória (CRUD)

Exemplo de `src/mocks/users.ts` (TypeScript):
```ts
export const users = [
	{
		id: 1,
		username: 'user1',
		// armazene senha hasheada ou texto plano para desenvolvimento; se usar hash, salve com bcryptjs
		password: '$2a$10$abcdefghijklmnopqrstuv',
		displayName: 'Usuário Teste'
	}
];
```

Exemplo de `src/mocks/notes.ts` (TypeScript):
```ts
export const notes = [
	{
		id: 1,
		title: 'Lembrar de estudar',
		content: 'Revisar padrões do Nest.js',
		type: 'note',
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		id: 2,
		title: 'Comprar material',
		content: 'Caneta, caderno',
		type: 'todo',
		completed: false,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	}
];
```

Exemplo de `src/repositories/notes.repository.ts` (esqueleto):
```ts
import { notes } from '../mocks/notes';

export class NotesRepository {
	private data = notes; // referência ao mock

	getAll() { return this.data; }
	getById(id: number) { return this.data.find(n => n.id === id); }
	create(note) {
		const id = this.data.length ? Math.max(...this.data.map(n => n.id)) + 1 : 1;
		const newNote = { id, ...note, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
		this.data.push(newNote);
		return newNote;
	}
	update(id: number, attrs) {
		const note = this.getById(id);
		if (!note) return null;
		Object.assign(note, attrs, { updatedAt: new Date().toISOString() });
		return note;
	}
	delete(id: number) {
		const idx = this.data.findIndex(n => n.id === id);
		if (idx === -1) return false;
		this.data.splice(idx, 1);
		return true;
	}
}
```

Onde usar cada camada
- `src/mocks` — apenas arrays/objetos que representam dados iniciais; não coloque lógica aqui.
- `src/repositories` — CRUD em memória; centraliza operações com os mocks e gera timestamps/ids.
- `src/notes/notes.service.ts` — usar o `NotesRepository` para regras de negócio (validações específicas, checar tipos, regras de `meeting`/`todo`).
- `src/notes/notes.controller.ts` — expor endpoints e mapear DTOs para chamadas ao service.

Boas práticas ao trabalhar com mocks
- Manter o repositório in-memory separado das rotas facilita substituir por persistência real no futuro.
- Evitar compartilhamento global mutável entre testes: para testes, importe os mocks e faça clones (`JSON.parse(JSON.stringify(...))`) antes de cada caso.

Próximos passos
- Se quiser, eu posso gerar os arquivos esqueleto do Nest.js para este projeto (controllers, services, DTOs e repositório mock). Quer que eu faça isto agora?

---
Arquivo atualizado: `README.md` (guia de implementação para Notes API).

