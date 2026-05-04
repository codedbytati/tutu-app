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
- Agrupamento de transações por rótulos de data
- Padronização de parsing/formatação de valores monetários por helpers utilitários
- Biblioteca de componentes de UI com stories no Storybook

## Stack tecnológica

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Headless UI
- Lucide React
- Storybook 10 (@storybook/nextjs-vite)
- Vitest 4 (testes e integração com Storybook)

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
	components/ui/             # Reusable UI primitives
		Avatar/                   # Avatar component with stories
		Button/                   # Button component with stories
		Dropdown/                 # Dropdown component with stories
		Form/                     # Form-related components
			Select/                 # Select component with stories
			TextField/              # TextField component with stories
		IconButton/               # IconButton component with stories
		Modal/                    # Modal component with stories
		Text/                     # Text component with stories
		index.ts                  # Component exports
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

O projeto utiliza Storybook com integração Vite (@storybook/nextjs-vite) para documentação e testes de componentes. As stories são descobertas a partir de:

- `../stories/**/*.mdx`
- `../app/**/*.stories.@(js|jsx|mjs|ts|tsx)`

### Executar Storybook

```bash
npm run storybook
```

Abre a interface do Storybook na porta 6006.

### Testes de stories com Vitest

O projeto usa Vitest com o addon @storybook/addon-vitest para executar testes de stories:

```bash
npx vitest --project=storybook
```

**Nota**: O addon Vitest do Storybook executa por padrão stories marcadas com a tag `test`. Use `npx vitest run --project=storybook` para rodar uma única vez sem modo watch.
