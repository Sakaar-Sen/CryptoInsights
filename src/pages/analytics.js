import Image from 'next/image'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'
import FilterableTable from './components/FilterableTable'

const inter = Inter({ subsets: ['latin'] })

export default function Analytics() {
  return (
    <div className='h-max grid place-items-center'>
      <Navbar />
      <div className='container m-5 text-[#f8fafc]'>
      <FilterableTable />
      </div>
    </div>
   
  )
}
