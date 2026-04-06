
import { Header } from './components/Header'
import { Menu } from './components/Menu';
import { CurrentBalance } from './components/CurrentBalance';
import { data } from '@/utils/data';

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:grid sm:grid-cols-4 grid-rows-7 sm:gap-4 sm:p-6 lg:grid-cols-5 lg:p-10">
      <Menu className='hidden sm:col-span-1 row-span-7 sm:flex' />
      <Header
        className='lg:mb-4 sm:mb-0 sm:col-span-3 sm:col-start-2 row-start-1 lg:col-span-4 lg:col-start-2'
        name={data.name}
      />
      <CurrentBalance
        className='mb-4 sm:mb-0 sm:col-span-3 sm:col-start-2 row-start-2 lg:col-span-1 lg:col-start-5 lg:row-span-6 lg:row-start-2'
        data={data}
      />
      {children}
    </div>
  );
}
