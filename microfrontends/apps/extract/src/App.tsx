import ExtractList from './features/extract/ExtractList';
import type { ExtractItem } from './features/extract/types';

const mockExtracts: ExtractItem[] = [
  {
    id: 1,
    category: 'Salário',
    type: 'INCOME',
    description: 'Entrada de salário',
    amount: '8000.00',
    date: '06/07/2026',
  },
  {
    id: 2,
    category: 'Alimentação',
    type: 'EXPENSE',
    description: 'Almoço com a equipe',
    amount: '58.40',
    date: '06/07/2026',
  },
] as const;

export default function App() {
  return (
    <main className="appShell">
      <div className="appFrame">
      <ExtractList
        extracts={mockExtracts}
        onOpenEdit={() => undefined}
        onOpenDelete={() => undefined}
      />
      </div>
    </main>
  );
}