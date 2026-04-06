import { data } from '@/utils/data';
import { Extract } from './extract/page';

export default function DashboardPage() {
  return (
    <Extract
      className='sm:col-span-3 sm:col-start-2 sm:row-start-3 row-span-5 lg:col-span-3 lg:col-start-2 lg:row-span-6 lg:row-start-2'
      data={data.extract}
    />
  );
}