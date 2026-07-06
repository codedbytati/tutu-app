declare module '*.css';

declare module 'extract/MeuComponente' {
	export type MeuComponenteProps = {
		titulo: string;
		mensagem: string;
	};

	export default function MeuComponente(
		props: MeuComponenteProps,
	): JSX.Element;
}

declare module 'extract/ExtractList' {
	export type ExtractItem = {
		id: number;
		category:
			| 'Salário'
			| 'Investimento'
			| 'Casa'
			| 'Alimentação'
			| 'Transporte'
			| 'Lazer'
			| 'Presente'
			| 'Outros';
		type: 'EXPENSE' | 'INCOME';
		description: string;
		amount: string;
		date: string;
	};

	export type ExtractListProps = {
		extracts: ExtractItem[];
		onOpenEdit: (item: ExtractItem) => void;
		onOpenDelete: (id: number) => void;
		className?: string;
	};

	export default function ExtractList(
		props: ExtractListProps,
	): JSX.Element;
}
