import {useState, useEffect} from 'react';
import axios from 'axios';
import { TfiAgenda } from "react-icons/tfi";

const ConsultsCounter = () => {
    const [consultCount, setConsultCount] = useState(0)

    useEffect(() => {
        const fetchConsult = async() => {
            try {
                const response = await axios.get("http://localhost:3000/exams");
                setConsultCount(response.data.length)
            } catch (error) {
                console.error("Erro ao obter os dados das consultas", error)
            }
        }
        fetchConsult()
    },[])
  return (
    <div className='bg-white shadow rounded-lg p-6 flex flex-col items-center w-60'>
    <h2 className='text-xl font-bold flex items-center gap-2'>
        <TfiAgenda className='text-blue-600'/>{consultCount}
    </h2>
    <p className='text-gray-600 mt-2'> Consultas </p>
</div>
  )
}

export default ConsultsCounter