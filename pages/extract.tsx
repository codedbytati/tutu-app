import { useRouter } from 'next/router'

export const getServerSideProps = async () => {
  return {
    props: {},
  }
}

export default function ExtractPage() {
  const router = useRouter()
  const queryString = router.asPath.startsWith('/extract') ? router.asPath.slice('/extract'.length) : ''

  return (
    <div className='flex flex-col gap-4'>
      <iframe
        title='Extract microfrontend'
        src={`http://localhost:5001${queryString}`}
        className='h-225 w-full border-0'
      />
    </div>
  )
}