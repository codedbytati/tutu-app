import { FinanceModel } from "./types";

export const data: FinanceModel = {
  id: 1,
  name: "Ana Marcela",
  totalBalance: "2500",
  extract: [
    {
      id: 1,
      category: "Alimentação",
      type: "EXPENSE",
      description: "Mercado",
      amount: "36.50",
      date: "14/04/2026",
    },
    {
      id: 2,
      category: "Salário",
      description: "Salário de abril",
      type: "INCOME",
      amount: "120",
      date: "01/04/2026",
    },
    {
      id: 3,
      category: "Casa",
      description: "Aluguel",
      type: "EXPENSE",
      amount: "1000",
      date: "10/04/2026",
    },
    {
      id: 4,
      category: "Casa",
      description: "Conta de luz",
      type: "EXPENSE",
      amount: "200",
      date: "10/04/2026",
    },
  ],
};
