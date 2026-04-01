import { Avatar } from './ui/Avatar'

type HeaderProps = {
  name: string
  className: string
}

export const Header = ({ name, className }: HeaderProps) => {
  return (
    <header className={`${className} flex px-4 bg-white rounded-4xl`}>
      <div className='flex items-center gap-3'>
        <Avatar size='lg' photoToken='https://avatars.githubusercontent.com/u/56259137' title={name} />
        <div className='flex flex-col'>
          <p className='text-sm m-0'>Boas vindas de volta!</p>
          <p className='font-medium text-3xl m-0'>{name}</p>
        </div>
      </div>
    </header>
  )
}