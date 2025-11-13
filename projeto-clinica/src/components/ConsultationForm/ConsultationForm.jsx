import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Modal from "../Modal/Modal";


const ConsultationForm = () => {
    // Variáveis e estados, useState gerenciando os valores dos estados
    const [searchTerm, setSearchTerm] = useState('')
    const [patients, setPatients] = useState([])
    const [selectedPatient, setSelectedPatient] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    const [formData, setFormData] = useState({
        reason: "",
        date: "",
        time: "",
        description: "",
        medication: "",
        dosagePrecaution: "",
    });

    
    // Bbusca por pacientes

    const fetchPatients = async () => {
        try {
            const response = await axios .get("http://localhost:3000/patients")
            setPatients(response.data)
        } catch (error) {
            console.error("Erro ao obter dados", error)
        }
    }

    useEffect(() => {
        fetchPatients()
    },[])

    // funções auxiliares - Helpers
    const handleSearchChange = (e) => setSearchTerm(e.target.value)

    // filtro de pacientes por nome ou id
    const filteredPatients = patients.filter(
        (patient) => 
            patient.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.id.toString().includes(searchTerm)
    )

    const handleSelectPatient = (patient) => {
        setSelectedPatient(patient)
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setSelectedPatient(null)
    }
    const handleInputChange = (e) => {
        const {name, value} = e.target
        setFormData((prev) => ({...prev, [name]: value }))
    }

    const resetForm = () => {
        setFormData({
        reason: "",
        date: "",
        time: "",
        description: "",
        medication: "",
        dosagePrecaution: "",         
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!selectedPatient) return;
        
        try {
            setIsSaving(true)

            const dataToSave = {
                patientId: selectedPatient.id,
                ...formData
            }

            await axios.post("http://localhost:3000/consults", dataToSave)
            toast.success("Consulta Cadastrada com sucesso!", {
                autoClose: 3000,
                hideProgressBar: true,
                pauseOnHover: false
            })

            resetForm()
            handleCloseModal()
        } catch (error) {
            toast.error("Erro ao cadastrar consulta!", {
                autoClose: 3000,
                hideProgressBar: true
            })
        } finally {
            setIsSaving(false)
        }
    }
    return (
        <section className="p-6 text-gray-800">
            {/* Campo de busca */}
            <div className="mb-6">
            <label htmlFor="name" className="block text-sm font-semibold mb-2">
                Buscar paciente para cadastrar consulta
            </label>
            <input type="text"
            id='name'
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Digite o nome ou registro do paciente"
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-cyan-600 outline-none"
             />

            </div>

            {/* Lista de pacientes */}
            <ul className="space-y-3">

                {filteredPatients.map((patient) => (
                    <li
                    key={patient.id}
                    className="p-4 border rounded-lg shadow-sm flex justify-between items-center hover:bg-gray-50 transition"
                    >
                        <div>
                            <p className="text-sm">
                                <strong>Registro:</strong>{patient.id}
                            </p>
                            <p className="text-sm">
                                <strong>Nome:</strong>{patient.fullName}
                            </p>
                            <p className="text-sm">
                                <strong>Convênio:</strong>{patient.healthInsurance}
                            </p>
                        </div>
                        <button
                        onClick={() => handleSelectPatient(patient)}
                        className="bg-cyan-700 text-white px-3 py-2 rounded-lg hover:bg-cyan-600 transition cursor-pointer"
                        >
                            Selecionar </button>
                    </li>
                ))}
            </ul>
            {/* Modal de cadastro de consulta */}

            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                {selectedPatient && (
                    <>
                    <h2 className="text-lg font-bold mb-4 text-cyan-400">
                        Cadastrar nova consulta para {patients.fullName}
                    </h2>

                    {/* Dados básicos */}
                    <div className="mb-4 text-sm text-gray-700">
                        <p>
                            <strong>Email:</strong>{selectedPatient.email}
                        </p>
                        <p>
                            <strong>Telefone:</strong>{selectedPatient.phone}
                        </p>
                       
                    </div>
                    </>
                )}
            </Modal>

        </section>
    )
}

export default ConsultationForm