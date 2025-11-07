import React from 'react'
import PatientsCounter from '../../components/counters/PatientsCounter'
import ConsultsCounter from '../../components/counters/ConsultsCounter'
import ExamsCounter from '../../components/counters/ExamsCounter'
import PatientsList from '../../components/PatientsList/PatientsList'

const Dashboard = () => {
    return (
        <>
            <h2 className='text-xl font-semibold mb-4'>Estatísticas do Sistema</h2>
            <div className='flex gap-6'>
                <PatientsCounter />
                <ConsultsCounter />
                <ExamsCounter />
            </div>

            <div>
                <PatientsList />
            </div>
        </>
    )
}

export default Dashboard