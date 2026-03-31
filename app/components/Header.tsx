import { Avatar } from './ui/Avatar'

export const Header = () => {
  return (
    <header className='flex justify-end py-4 px-60 h-24 bg-teal-900'>
    <div className='flex items-center gap-4'>
      <p className='text-white'>Tati Alves</p>
      <Avatar photoToken='https://avatars.githubusercontent.com/u/56259137' title='John Doe' />
    </div>
    </header>
  )
}