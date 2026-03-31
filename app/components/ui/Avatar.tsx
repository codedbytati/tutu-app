import Image from 'next/image';

type AvatarProps = {
  photoToken: string;
  title: string;
}

export const Avatar = ({
  photoToken,
  title
}: AvatarProps) => {
  return (
    <div className='border-2 border-red-600 rounded-full overflow-hidden size-20 flex items-center justify-center'>
      <Image src={photoToken} alt={title} width={500} height={500} className='object-fit' />
    </div>
  )
}