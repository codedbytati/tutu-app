import { tv } from 'tailwind-variants'
import { BanknoteArrowDown, BanknoteArrowUp, PencilIcon, Trash2Icon } from 'lucide-react'

const styled = tv({
  base: 'flex items-center gap-2 rounded-2xl p-4',
  variants: {
    type: {
      TRANSFER: 'bg-red-200',
      DEPOSIT: 'bg-green-200'
    }
  }
})

type ExtractProps = {
  data: {
    id: number
    month: string
    type: 'TRANSFER' | 'DEPOSIT'
    amount: string
    date: string
  }[],
  className: string
}

export const Extract = ({ data, className }: ExtractProps) => {
  return (
    <div className={`${className} flex flex-col gap-3 p-4 bg-white rounded-4xl`}>
      <div className='flex justify-between items-center'>
        <p className='text-lg m-0'>Extrato</p>
        <div className='flex gap-1'>
          <button type='button' className='bg-black rounded-circle p-2'>
            <PencilIcon size={15} className='text-white' />
          </button>
          <button type='button' className='bg-black rounded-circle p-2'>
            <Trash2Icon size={15} className='text-white' />
          </button>
        </div>
      </div>
      {
        data.map((item) => (
          <div key={item.id} className={styled({ type: item.type })}>
            {item.type === 'TRANSFER' ? (
              <BanknoteArrowUp size={30} className='bg-red-600 rounded-circle p-1' />
            ) : (
              <BanknoteArrowDown size={30} className='bg-green-600 rounded-circle p-1' />
            )}
            <div className='w-full flex flex-col gap-2'>
              <p className='m-0 font-semibold'>{item.type === 'TRANSFER' ? 'Transferência' : 'Depósito'}</p>
              <div className='flex items-center justify-between'>
                <p className='m-0 text-gray-600'>{item.type === 'TRANSFER' && '-'}{`R$${item.amount}`}</p>
                <p className='m-0 text-gray-600'>{item.date}</p>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
}