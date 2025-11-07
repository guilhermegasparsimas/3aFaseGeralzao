import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router";

const PatientsList = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [ages, setAges] = useState({});

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get("http://localhost:3000/patients");
        const patientsData = response.data;

        // Calcula a idade de cada paciente e armazena no estado
        const calculatedAges = {};
        patientsData.forEach((patient) => {
          calculatedAges[patient.id] = calculateAge(patient.birthdate);
        });

        setAges(calculatedAges);
        setPatients(patientsData);
      } catch (error) {
        console.error("Erro ao obter dados dos pacientes:", error);
      }
    };

    fetchPatients();
  }, []);

  const calculateAge = (birthdate) => {
    if (!birthdate) return "-"; // verifica se o campo birthdate foi preenchido, caso não retorna um "-"
    const today = new Date(); // armazena a data atual em today
    const birthdateDate = new Date(birthdate); // converte a string para um objeto date
    let age = today.getFullYear() - birthdateDate.getFullYear(); // calcula a data de hoje menos a data de nasciemnto do usuário
    const monthDiff = today.getMonth() - birthdateDate.getMonth(); // calcula a diferença entre o mes atual e o mes de nascimento
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdateDate.getDate())) { // verifica se os meses são iguais para saber se o aniversário ja ocorreu neste ano
      age--; // caso não tenha acontecido o aniversário ainda, subtrai 1 da idade 
    } 
    return age;
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); // atualiza o estado com um novo valor fornecido pelo usuário
  };

  const filteredPatients = patients.filter((patient) => // cria uma nova lista contendo apenas os pacientes que correspondem ao texto digitado no campo de busca
    [patient.fullName, patient.email, patient.phone] // cria um array temporário apenas com os campos que devem fazer parte da pesquisa
      .join(" ") // converte todo o array em uma única string, contendo todos os dados relevantes para a busca
      .toLowerCase() // // converte tudo para letra minuscula, para que não haja confiltos ou erros por serem distintos
      .includes(searchTerm.toLowerCase()) //  verifica se a string ja em minuscula possui o mesmo valor que o usuário digitou
  );

  return (
    <div className="bg-white shadow rounded-2xl p-6 mt-8">
      <h2 className="text-xl font-semibold text-cyan-800 mb-4">
        Informações Rápidas de Pacientes
      </h2>

      {/* Campo de busca */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
        <label htmlFor="search" className="text-gray-700 font-medium">
          Buscar Paciente:
        </label>
        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Digite o nome, email ou telefone"
          className="border rounded-lg px-3 py-2 w-full sm:w-80 focus:ring-2 focus:ring-cyan-600 outline-none"
        />
      </div>

      {/* Lista de pacientes */}
      {filteredPatients.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {filteredPatients.map((patient) => (
            <li
              key={patient.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between py-4"
            >
              <div className="flex items-center gap-4">
                <div className="bg-cyan-100 text-cyan-700 p-3 rounded-full">
                  <FaUserAlt size={20} />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{patient.fullName}</p>
                  <p className="text-sm text-gray-600">{patient.email}</p>
                  <p className="text-sm text-gray-600">{patient.phone}</p>
                </div>
              </div>

              <div className="text-sm text-gray-600 mt-2 sm:mt-0 text-right">
                <p>
                  <strong>Idade:</strong> {ages[patient.id] || "-"} anos
                </p>
                <p>
                  <strong>Plano:</strong> {patient.healthInsurance || "—"}
                </p>
                <Link
                  to={`/paciente/${patient.id}`}
                  className="text-cyan-700 font-semibold hover:underline"
                >
                  Ver detalhes →
                </Link>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center py-6">
          Nenhum paciente encontrado.
        </p>
      )}
    </div>
  );
};

export default PatientsList;
