import Landing from '@/screens/Landing';
import Cookies from 'js-cookie';

export default function Home() {

  const token = Cookies.get('token')

  if(token) return (
    <>
      <div className='text-xl'>Logged In</div>
    </>
  )

  else return(
    <Landing/>
  )
}
