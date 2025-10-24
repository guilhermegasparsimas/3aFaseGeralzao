import React from 'react'
import PatientsCounter from '../../components/counters/PatientsCounter'
import ExamsCounter from '../../components/counters/ExamsCounter'
import ConsultsCounter from '../../components/counters/ConsultsCounter'

const Dashboard = () => {
  return (
    <>
      <h2 className='text-xl font-semibold mb-4'>Estatísticas do sistema </h2>
      <div className='flex gap-6'>
        <PatientsCounter />
        <ExamsCounter />
        <ConsultsCounter />
      </div>
      
    </>
  )
}

export default Dashboard