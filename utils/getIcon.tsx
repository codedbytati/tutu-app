import { PencilIcon, PlusIcon, Trash2Icon } from 'lucide-react'

export type IconType = 'add' | 'edit' | 'delete'

export const getIcon = (icon?: IconType) => {
  const iconOptions: { [key in IconType]: React.ReactNode } = {
    add: <PlusIcon />,
    edit: <PencilIcon />,
    delete: <Trash2Icon />
  }

  return icon ? iconOptions[icon] : null
}