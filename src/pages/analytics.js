import Image from 'next/image'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'
import FilterableTable from './components/FilterableTable'
import Chatbot from './components/ChatBot'

const inter = Inter({ subsets: ['latin'] })

export default function Analytics() {
  return (
    <div className='min-h-[100vh] grid place-items-center'
      style={{
        backgroundImage: "url(./../../q0.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}>
      <Navbar />
      <div className="p-12">
        <div className="flex justify-center items-center">
          <h1 className="text-5xl text-gray-100 text-center font-bold mt-12 mb-4 tracking-wide" style={{
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
          }}>
            Analytics
          </h1>
        </div>
        <div className="flex justify-center items-center">
          <p className="text-gray-300 text-center text-l md:text-xl" style={{
            textShadow: "2px 2px 4px rgba(0,0,0,0.3)"
          }}>
            Gain actionable insights from real-time data!
          </p>
        </div>
      </div>

      <div className='container m-5 text-[#f8fafc] mb-24'>
        <FilterableTable />
      </div>
      <Chatbot />
    </div>

  )
}
