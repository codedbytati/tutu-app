export type TransactionType = "EXPENSE" | "INCOME";

export type TransactionCategory =
  | "Salário"
  | "Investimento"
  | "Casa"
  | "Alimentação"
  | "Transporte"
  | "Lazer"
  | "Presente"
  | "Outros";

export type ExtractItem = {
  id: number;
  category: TransactionCategory;
  type: TransactionType;
  description: string;
  amount: string;
  date: string;
};

export type FinanceModel = {
  id: number;
  name: string;
  totalBalance: string;
  extract: ExtractItem[];
};
