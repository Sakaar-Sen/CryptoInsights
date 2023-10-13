import Image from 'next/image'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export default function Explpore() {
  return (
    <div>
      <Navbar />
    </div>
   
  )
}
