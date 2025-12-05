# Scripts SQL para Supabase

Esta pasta contém os scripts SQL necessários para configurar o banco de dados no Supabase.

## Como usar

1. Acesse o [Supabase Dashboard](https://app.supabase.com/)
2. Selecione seu projeto ou crie um novo
3. Vá para a seção **SQL Editor** no menu lateral
4. Execute os scripts na seguinte ordem:

### 1. Criar tabelas (01_create_tables.sql)

- Abre o arquivo `01_create_tables.sql`
- Copia todo o conteúdo
- Cola no SQL Editor do Supabase
- Clica em "Run" para executar

Este script irá:

- Criar a tabela `people` com os campos: id, name, food, drink, dessert
- Criar índices para melhor performance
- Configurar trigger para atualizar automaticamente o campo `updated_at`
- Habilitar Row Level Security (RLS)
- Criar políticas de acesso público (leitura e escrita)

### 2. Popular com dados iniciais (02_seed_data.sql)

- Abre o arquivo `02_seed_data.sql`
- Copia todo o conteúdo
- Cola no SQL Editor do Supabase
- Clica em "Run" para executar

Este script irá:

- Inserir 100 pessoas pré-definidas na tabela
- Os campos de comida, bebida e sobremesa estarão vazios inicialmente

## Personalização

Você pode editar o arquivo `02_seed_data.sql` para incluir os nomes reais das pessoas que participarão do evento antes de executá-lo no Supabase.

## Estrutura da Tabela

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

## Configuração das Credenciais

Após executar os scripts, você precisará:

1. Copiar a URL do projeto (Project URL)
2. Copiar a chave anônima (anon/public key)
3. Criar um arquivo `.env.local` na raiz do projeto
4. Adicionar as credenciais (veja `.env.local.example`)
