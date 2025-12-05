# 🎉 Comidas de Ano Novo 2026

Uma aplicação web moderna e responsiva para organizar as contribuições de comida, bebida e sobremesa para a festa de Ano Novo. Construída com Next.js, TypeScript, Tailwind CSS e Supabase.

## 🌟 Funcionalidades

- ✅ **Lista pré-definida de 100 pessoas** injetada no banco de dados
- ✅ **Adicionar novas pessoas** à lista dinamicamente
- ✅ **Editar contribuições** (comida, bebida, sobremesa) de qualquer pessoa
- ✅ **Nomes protegidos** - não podem ser editados, apenas adicionados
- ✅ **Design de Post-its coloridos** com efeito de "alfinete"
- ✅ **Totalmente responsivo** - funciona perfeitamente em mobile, tablet e desktop
- ✅ **Busca em tempo real** por nome
- ✅ **Sincronização automática** com banco de dados

## 🚀 Como Começar

### 1. Pré-requisitos

- Node.js 18+ instalado
- Uma conta no [Supabase](https://supabase.com)

### 2. Configurar o Supabase

1. Acesse [app.supabase.com](https://app.supabase.com/)
2. Crie um novo projeto
3. Vá para a seção **SQL Editor**
4. Execute os scripts SQL na pasta `supabase/` nesta ordem:
   - `01_create_tables.sql` - Cria a tabela e configurações
   - `02_seed_data.sql` - Insere as 100 pessoas iniciais

> **Nota:** Você pode editar `02_seed_data.sql` antes de executá-lo para incluir os nomes reais das pessoas do seu evento.

5. Copie as credenciais do projeto:
   - Vá em **Project Settings** > **API**
   - Copie a **Project URL**
   - Copie a **service_role key** (⚠️ **IMPORTANTE**: Use a service role key, não a anon key, pois será usada apenas no servidor)

### 3. Configurar o Projeto

```bash
# Clone ou navegue até a pasta do projeto
cd new-year-food

# Instale as dependências
npm install

# Crie o arquivo de variáveis de ambiente
cp .env.local.example .env.local

# Edite o .env.local e adicione suas credenciais do Supabase
# SUPABASE_URL=sua_url_aqui
# SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key_aqui
```

### 4. Executar a Aplicação

```bash
# Modo de desenvolvimento
npm run dev

# Build para produção
npm run build
npm start
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## 🎨 Design

A aplicação apresenta:

- **Post-its coloridos** em 6 cores diferentes (amarelo, rosa, azul, verde, roxo, laranja)
- **Rotação aleatória sutil** em cada card para efeito natural
- **Efeito de alfinete** no topo de cada post-it
- **Gradiente de fundo** em roxo/azul
- **Animações suaves** ao passar o mouse
- **Layout responsivo** que se adapta a qualquer tamanho de tela

## 📱 Responsividade

- **Mobile** (< 640px): 1 coluna
- **Tablet** (640px - 1024px): 2 colunas
- **Desktop** (1024px - 1280px): 3 colunas
- **Large Desktop** (> 1280px): 4 colunas

## 🗄️ Estrutura do Banco de Dados

```sql
people (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  food VARCHAR(500),
  drink VARCHAR(500),
  dessert VARCHAR(500),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
```

## 🔐 Segurança

A aplicação utiliza **Next.js API Routes** como camada intermediária entre o frontend e o Supabase. Isso garante que:

- ✅ As credenciais do Supabase **nunca são expostas** no navegador
- ✅ A **service role key** permanece segura no servidor
- ✅ Todas as operações de banco de dados são processadas pelo backend
- ✅ Validações adicionais podem ser implementadas nas rotas da API

### Arquitetura

```
Frontend (Browser)
    ↓ fetch('/api/people')
Next.js API Routes (Server)
    ↓ supabaseServer.from('people')
Supabase (Database)
```

## 🛠️ Tecnologias Utilizadas

- **Next.js 14** - Framework React com API Routes
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Supabase** - Backend as a Service (PostgreSQL)
- **React Hooks** - Gerenciamento de estado

## 📝 Como Usar

1. **Visualizar a lista**: Todos os cards com as pessoas e suas contribuições são exibidos
2. **Buscar uma pessoa**: Use a barra de busca no topo
3. **Adicionar nova pessoa**: Clique em "➕ Adicionar Pessoa" e preencha o nome
4. **Editar contribuições**: Clique em "✏️ Editar" em qualquer card, preencha os campos e salve
5. **As alterações são salvas automaticamente** no banco de dados

## 🔒 Regras de Negócio

- ✅ Todos podem visualizar todas as contribuições
- ✅ Todos podem editar comida, bebida e sobremesa de qualquer pessoa
- ❌ Nomes **não podem ser editados** após serem criados
- ✅ Novos nomes podem ser adicionados a qualquer momento
- ✅ Nomes devem ser únicos (não pode haver duplicatas)

## 📦 Estrutura de Pastas

```
new-year-food/
├── app/
│   ├── api/
│   │   └── people/
│   │       ├── route.ts         # GET e POST pessoas
│   │       └── [id]/route.ts    # PATCH pessoa por ID
│   ├── globals.css              # Estilos globais
│   ├── layout.tsx               # Layout principal
│   └── page.tsx                 # Página inicial
├── components/
│   ├── PostItCard.tsx           # Componente do card post-it
│   └── AddPersonForm.tsx        # Formulário de adicionar pessoa
├── lib/
│   ├── supabase.ts              # Cliente Supabase (servidor)
│   └── api.ts                   # Funções de API (cliente)
├── supabase/
│   ├── 01_create_tables.sql     # Script de criação de tabelas
│   ├── 02_seed_data.sql         # Script de dados iniciais
│   └── README.md                # Instruções do Supabase
└── package.json                 # Dependências
```

## 🚀 Deploy

### Vercel (Recomendado)

1. Faça push do código para um repositório Git
2. Conecte o repositório no [Vercel](https://vercel.com)
3. Adicione as variáveis de ambiente no painel do Vercel
4. Deploy automático!

### Outras Plataformas

A aplicação pode ser deployada em qualquer plataforma que suporte Next.js:

- Netlify
- Railway
- Render
- AWS Amplify

## 📄 Licença

Este projeto foi criado para uso pessoal. Sinta-se livre para adaptá-lo às suas necessidades!

## 🤝 Contribuindo

Este é um projeto pessoal, mas sugestões são bem-vindas!

---

Feito com ❤️ para organizar a melhor festa de Ano Novo! 🎊
