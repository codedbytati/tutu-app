# Tutu app

Tutu app é um organizador de finanças pessoais construído com Next.js (App Router), focado em controle de transações, agrupamento de extratos por data e gestão de saldo.

Atualmente, a aplicação usa dados mockados locais em utils/data.ts e estado em memória gerenciado com Context e Hooks do React.

## Funcionalidades principais

- Layout de dashboard com menu lateral, header, saldo atual e seção de extrato
- Adição, edição e exclusão de transações por fluxos em modal
- Regras automáticas de atualização de saldo:
	- Adicionar despesa: subtrai do saldo
	- Adicionar receita: soma ao saldo
	- Excluir despesa: devolve o valor ao saldo
	- Excluir receita: subtrai do saldo
- Agrupamento de transações por rótulos de data (Hoje, Ontem, dia da semana ou data formatada)
- Padronização de parsing/formatação de valores monetários por helpers utilitários
- Biblioteca de componentes de UI com stories no Storybook

## Stack tecnológica

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Headless UI
- Lucide React
- Storybook 10

## Estrutura do projeto

```text
app/
	(dashboard)/
		components/              # Dashboard shell components (Header, Menu, CurrentBalance)
		extract/
			components/            # Extract list item UI (Card)
			page.tsx               # Extract composition component used by dashboard page
		layout.tsx               # Dashboard layout + TransactionsProvider
		page.tsx                 # Dashboard route entry
	components/ui/             # Reusable UI primitives (Button, Modal, Dropdown, etc.)
	features/transactions/
		components/              # Feature components (Add/Edit/Delete/BaseForm)
		context/                 # Transactions context provider
		hooks/                   # Transactions state/actions hook
utils/
	data.ts                    # Mock finance model data
	types.ts                   # Shared domain types
	money.ts                   # Money parsing/formatting helpers
	groupByDate.ts             # Date-grouping helper for extract rendering
.storybook/                 # Storybook config
```

## Como executar

Instale as dependências:

```bash
npm install
```

Rode o servidor de desenvolvimento:

```bash
npm run dev
```

Abra http://localhost:3000.

## Scripts disponíveis

- npm run dev - Inicia o Next.js em modo de desenvolvimento
- npm run build - Gera o build de produção
- npm run start - Executa o servidor de produção
- npm run lint - Executa o ESLint
- npm run storybook - Inicia o Storybook na porta 6006
- npm run build-storybook - Gera o build estático do Storybook
- npm run chromatic - Publica o Storybook no Chromatic

## Storybook e testes de stories

As stories são descobertas a partir de:

- ../stories/**/*.mdx
- ../app/**/*.stories.@(js|jsx|mjs|ts|tsx)

Para iniciar a interface do Storybook:

```bash
npm run storybook
```

Para rodar os testes do Storybook via projeto Vitest:

```bash
npx vitest --project=storybook
```

Observação: o addon Vitest do Storybook, por padrão, executa stories marcadas com a tag test.

## Observações de domínio e dados

- totalBalance em utils/data.ts é o saldo inicial exibido ao carregar a aplicação.
- Os valores de transação são armazenados como string e normalizados para o formato 0.00 nos cálculos internos.
- A formatação de exibição usa convenções monetárias pt-BR por meio de utils/money.ts.

## Limitações atuais

- Ainda não há persistência em backend (o estado reinicia ao atualizar a página)
- Alguns links de navegação podem ser placeholders, dependendo das rotas implementadas
- Algumas páginas/componentes são scoped da feature e pensadas para uso local no dashboard

## Próximos passos (sugestão)

- Persistir transações e saldo em API/banco de dados
- Adicionar testes unitários para money.ts e groupByDate.ts
- Adicionar testes de integração para os fluxos de adicionar/editar/excluir transações
- Continuar extraindo lógica de domínio dos componentes de UI para melhorar a separação de responsabilidades
