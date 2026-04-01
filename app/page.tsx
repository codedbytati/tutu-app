import { Extract } from './components/Extract';
import { Header } from './components/Header'
import { Menu } from './components/Menu';
import { CurrentBalance } from './components/CurrentBalance';

type dataProps = {
  id: number,
  name: string,
  balance: string,
  extract: {
    id: number,
    description: string,
    type: 'EXPENSE' | 'INCOME',
    amount: string,
    date: string
  }[]
}

const data: dataProps = {
  id: 1,
  name: 'Ana Marcela',
  balance: '2500',
  extract: [
    {
      id: 1,
      description: 'Mercado',
      type: 'EXPENSE',
      amount: '36.50',
      date: '04/09/2025'
    },
    {
      id: 2,
      description: 'Salário do mês de setembro do segundo trabalho',
      type: 'INCOME',
      amount: '120',
      date: '04/10/2025'
    }
  ]
}

export default function Home() {
  return (
    <div className="h-full grid grid-cols-5 grid-rows-7 bg-gray-100 gap-4 p-10">
      <Menu className='col-span-1 row-span-7' />
      <Header className='col-span-4 col-start-2 row-start-1 h-20' name={data.name} />
      <Extract className='col-span-3 col-start-2 row-span-6 row-start-2' data={data.extract} />
      <CurrentBalance className='col-span-1 col-start-5 row-span-6 row-start-2' data={data} />
    </div>
  );
}
