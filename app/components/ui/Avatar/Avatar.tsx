import Image from 'next/image';
import { tv } from 'tailwind-variants';

type AvatarProps = {
  photoToken: string;
  title: string;
  size: 'sm' | 'md' | 'lg' | 'xl'
}

const styled = tv({
  base: 'border-2 rounded-full overflow-hidden flex items-center justify-center',
  variants: {
    size: {
      sm: 'size-8',
      md: 'size-10',
      lg: 'size-12',
      xl: 'size-16'
    }
  }
});

export const Avatar = ({
  photoToken,
  title,
  size
}: AvatarProps) => {
  return (
    <div className={styled({ size })}>
      <Image src={photoToken} alt={title} width={500} height={500} className='object-fit' />
    </div>
  )
}