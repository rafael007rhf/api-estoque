# Guardião do Almoxarifado

API REST de controle de estoque com Node.js, Express, MongoDB/Mongoose, JWT e bcrypt.

## Executar localmente

```bash
npm install
cp .env.example .env
npm run dev
```

Configure `MONGODB_URI` e `JWT_SECRET` no `.env`.

## Perfis

- `ADMIN`: cadastra/edita/exclui produtos e registra movimentações.
- `LEITOR`: consulta produtos e relatórios.

## Endpoints

| Método | Endpoint | Acesso |
|---|---|---|
| POST | `/api/auth/register` | Público |
| POST | `/api/auth/login` | Público |
| POST | `/api/produtos` | ADMIN |
| GET | `/api/produtos` | Logado |
| GET | `/api/produtos/:id` | Logado |
| PUT | `/api/produtos/:id` | ADMIN |
| DELETE | `/api/produtos/:id` | ADMIN |
| POST | `/api/movimentacoes` | ADMIN |
| GET | `/api/relatorios/saldo` | Logado |
| GET | `/api/relatorios/historico` | Logado |

Use `Authorization: Bearer TOKEN` nas rotas privadas.

### Exemplos

Cadastro:
```json
{ "name": "Administrador", "email": "admin@email.com", "password": "123456", "role": "ADMIN" }
```

Produto:
```json
{ "name": "Papel A4", "code": "PAP-A4", "description": "Resma com 500 folhas", "price": 32.9, "category": "Papelaria" }
```

Movimentação:
```json
{ "productId": "ID_DO_PRODUTO", "type": "ENTRADA", "quantity": 10, "reason": "Compra mensal" }
```

## Deploy no Render

O projeto inclui `render.yaml`. No Render, conecte o repositório e informe `MONGODB_URI`. A variável `JWT_SECRET` pode ser gerada automaticamente pelo Blueprint.
