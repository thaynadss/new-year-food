# 🔐 Migração para API Routes Seguras

## O que mudou?

A aplicação foi refatorada para **proteger as credenciais do Supabase**, implementando uma arquitetura mais segura usando Next.js API Routes.

## Antes (❌ Inseguro)

```typescript
// Frontend expunha as keys publicamente
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY // ⚠️ Exposto no browser
);

// Chamadas diretas do cliente
await supabase.from("people").select("*");
```

**Problemas:**

- ❌ Keys expostas no código JavaScript do navegador
- ❌ Qualquer pessoa pode inspecionar e copiar as credenciais
- ❌ Sem controle de validação no servidor
- ❌ Difícil adicionar lógica de negócio

## Depois (✅ Seguro)

```typescript
// Backend (servidor) - credenciais privadas
const supabaseServer = createClient(
  process.env.SUPABASE_URL, // Sem NEXT_PUBLIC_
  process.env.SUPABASE_SERVICE_ROLE_KEY // 🔒 Nunca exposto
);

// Frontend faz requisições HTTP
const response = await fetch("/api/people");
const data = await response.json();
```

**Vantagens:**

- ✅ Credenciais mantidas no servidor (nunca expostas)
- ✅ Service Role Key com permissões completas (apenas no servidor)
- ✅ Validações adicionais nas API Routes
- ✅ Controle centralizado de acesso
- ✅ Logs e monitoramento no servidor
- ✅ Fácil adicionar autenticação futuramente

## Arquitetura

```
┌─────────────────────────────────────────────────────────┐
│  Frontend (Browser)                                      │
│  - Componentes React                                     │
│  - Nenhuma credencial                                    │
│  - Apenas chamadas HTTP                                  │
└─────────────┬───────────────────────────────────────────┘
              │ fetch('/api/people')
              ↓
┌─────────────────────────────────────────────────────────┐
│  Next.js API Routes (Server-side)                        │
│  - app/api/people/route.ts                              │
│  - app/api/people/[id]/route.ts                         │
│  - Validações de entrada                                 │
│  - Lógica de negócio                                     │
│  - Credenciais seguras (SUPABASE_SERVICE_ROLE_KEY)      │
└─────────────┬───────────────────────────────────────────┘
              │ supabaseServer.from('people')
              ↓
┌─────────────────────────────────────────────────────────┐
│  Supabase (PostgreSQL)                                   │
│  - Banco de dados                                        │
│  - Row Level Security (RLS)                              │
└─────────────────────────────────────────────────────────┘
```

## Novos Arquivos

### `app/api/people/route.ts`

Gerencia operações de listagem e criação:

- `GET /api/people` - Lista todas as pessoas
- `POST /api/people` - Adiciona nova pessoa

### `app/api/people/[id]/route.ts`

Gerencia atualizações individuais:

- `PATCH /api/people/:id` - Atualiza comida/bebida/sobremesa

### `lib/api.ts`

Funções cliente para chamar as API Routes:

- `fetchPeople()` - Busca lista
- `createPerson(name)` - Adiciona pessoa
- `updatePerson(id, updates)` - Atualiza dados

### `lib/supabase.ts` (modificado)

Agora usa credenciais server-side:

- `supabaseServer` - Cliente com service role key
- Apenas importado pelas API Routes

## Variáveis de Ambiente

### Antes (`.env.local`)

```bash
NEXT_PUBLIC_SUPABASE_URL=...        # ❌ Exposto
NEXT_PUBLIC_SUPABASE_ANON_KEY=...   # ❌ Exposto
```

### Depois (`.env.local`)

```bash
SUPABASE_URL=...                    # ✅ Privado
SUPABASE_SERVICE_ROLE_KEY=...       # ✅ Privado
```

> **IMPORTANTE:** Remova o prefixo `NEXT_PUBLIC_` para que as variáveis não sejam expostas no navegador!

## Como Obter a Service Role Key

1. Acesse o [Supabase Dashboard](https://app.supabase.com/)
2. Selecione seu projeto
3. Vá em **Project Settings** > **API**
4. Procure por **service_role key** (não a anon key!)
5. Copie e adicione ao `.env.local`

⚠️ **ATENÇÃO:** A service role key tem permissões totais. NUNCA a exponha no frontend ou em repositórios públicos!

## Validações Implementadas

### POST /api/people

```typescript
// Valida nome obrigatório
if (!name || !name.trim()) {
  return error 400
}

// Detecta nome duplicado
if (error.code === '23505') {
  return error 409
}
```

### PATCH /api/people/:id

```typescript
// Valida campos permitidos
const updates = { food, drink, dessert } // Apenas estes

// Verifica se pessoa existe
if (!data || data.length === 0) {
  return error 404
}
```

## Benefícios de Segurança

1. **Zero Trust no Frontend**: O navegador não tem acesso direto ao banco
2. **Service Role Protegida**: Credencial poderosa só no servidor
3. **Camada de Validação**: API Routes validam dados antes de salvar
4. **Rate Limiting**: Pode ser adicionado facilmente nas rotas
5. **Auditoria**: Logs centralizados no servidor
6. **Evolução**: Fácil adicionar auth, roles, etc.

## Testando a Segurança

Antes da migração:

```bash
# Inspecionar elemento > Network > people
# Headers continham: Authorization: Bearer <key visível>
```

Depois da migração:

```bash
# Inspecionar elemento > Network > people
# Nenhuma credencial visível! Apenas chamadas HTTP simples
```

## Deploy Seguro

Ao fazer deploy (Vercel, Netlify, etc.):

1. Adicione as variáveis de ambiente no painel da plataforma
2. **NÃO** adicione o prefixo `NEXT_PUBLIC_`
3. Use a **service_role key**, não a anon key
4. Mantenha `.env.local` no `.gitignore`

## Próximos Passos de Segurança

Para tornar ainda mais seguro:

1. **Autenticação**: Adicionar login com Supabase Auth
2. **Rate Limiting**: Limitar requisições por IP
3. **CORS**: Configurar origens permitidas
4. **Validação Avançada**: Sanitizar inputs, limites de tamanho
5. **Auditoria**: Registrar todas as alterações

---

✅ **Aplicação agora está muito mais segura!**
