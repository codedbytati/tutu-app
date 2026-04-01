import { ArrowLeftRightIcon, ChartSplineIcon, HomeIcon, SettingsIcon } from 'lucide-react'

type MenuProps = {
  className: string
}

export const Menu = ({className}: MenuProps) => {
  return (
    <div className={`${className} flex flex-col gap-3 p-4 bg-white rounded-4xl`}>
      <div className='flex items-center gap-2 bg-yellow-100 rounded-lg p-3'>
        <HomeIcon size={20} />
        <p className='text-black font-semibold m-0'>Início</p>
      </div>
      <div className='flex items-center gap-2 rounded-lg p-3'>
        <ArrowLeftRightIcon size={20} />
        <p className='text-black font-semibold m-0'>Transferência</p>
      </div>
      <div className='flex items-center gap-2 rounded-lg p-3'>
        <ChartSplineIcon size={20} />
        <p className='text-black font-semibold m-0'>Investimento</p>
      </div>
      <div className='flex items-center gap-2 rounded-lg px-2 py-3'>
        <SettingsIcon size={20} />
        <p className='text-black font-semibold m-0'>Outros serviços</p>
      </div>
    </div>
  )
}