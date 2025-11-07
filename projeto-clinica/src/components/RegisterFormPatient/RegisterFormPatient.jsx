import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { IMaskInput } from "react-imask";

const RegisterFormPatient = () => {
  const [formData, setFormData] = useState({ // estado criado para armazenar os dados de formulários de pacientes
    fullName: "",
    gender: "",
    birthdate: "",
    cpf: "",
    rg: "",
    maritalStatus: "",
    phone: "",
    email: "",
    birthplace: "",
    emergencyContact: "",
    allergies: "",
    specialCare: "",
    healthInsurance: "",
    insuranceNumber: "",
    insuranceValidity: "",
    address: {
      cep: "",
      city: "",
      state: "",
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      reference: "",
    },
  });

  const [isSaving, setIsSaving] = useState(false); // estado criado para controlar o botão de envio

  // --- HANDLERS ---
  const handleInputChange = (e) => {
    const { name, value } = e.target; // desestrutura os dados e tras o nome, e o value como um novo valor digitado
    setFormData((prev) => ({ ...prev, [name]: value })); // garante que apenas o nome seja atualizado para um novo valor digitado no campo pelo usuário
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target; //  desestrutura os dados e tras o nome, e o value como um novo valor digitado
    setFormData((prev) => ({ // atualiza o estado de formData passando prev
      ...prev, // copia todas as propriedades do estado anterior para o novo estado
      address: { ...prev.address, [name]: value }, // usa a chave calculada para modificar apenas o campo alterado
    }));
  };

  const fetchAddressData = async (cep) => {
    try {
      const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`); // desestrutura a resposta de axios, extraindo apenas data, e armaneza em data
      setFormData((prev) => ({  // atualiza o estado de formData passando prev
        ...prev, // copia todas as propriedades do estado anterior para o novo estado
        address: {
          ...prev.address, // copia todas as propriedades do address anterior, para garantir que campos não preenchidos pela API não sejam perdidos
          cep: data.cep || "",
          city: data.localidade || "",
          state: data.uf || "",
          street: data.logradouro || "",
          complement: data.complemento || "",
          neighborhood: data.bairro || "", // aqui ele atualiza todos estes campos de endereço com os valores retornados pela API (data)
        },
      }));
    } catch (error) {
      console.error("Erro ao buscar endereço:", error); // mensagem de erro na busca por endereço
    }
  };

  const handleCepBlur = (e) => {
    const cep = e.target.value.replace(/\D/g, ""); // garante que a busca pelo cep seja feita utilizando apenas os 8 números, mesmo que o usuário digite outros caracteres como . ou -
    if (cep.length === 8) fetchAddressData(cep); // se o tamanho do cep for igual a 8, fetchAddressData faz a busca por cep, e passa o cep limpo como valor
  };

  // --- SUBMIT ---
  const handleSubmit = async (e) => {
    e.preventDefault(); // impede de recarregar a página
    setIsSaving(true); // define o estado de IsSaving como "true"

    try {
      await axios.post("http://localhost:3000/patients", formData); // faz uma requisição axios.get na rota espeficada

      toast.success("Paciente cadastrado com sucesso!", {
        position: "top-right",
        autoClose: 2000, // a mensagem some após 2 segundos
        hideProgressBar: true, 
      }); // se o cadastro for feito com sucesso ele retorna uma mensagem de sucesso

      setFormData({
        fullName: "",
        gender: "",
        birthdate: "",
        cpf: "",
        rg: "",
        maritalStatus: "",
        phone: "",
        email: "",
        birthplace: "",
        emergencyContact: "",
        allergies: "",
        specialCare: "",
        healthInsurance: "",
        insuranceNumber: "",
        insuranceValidity: "",
        address: {
          cep: "",
          city: "",
          state: "",
          street: "",
          number: "",
          complement: "",
          neighborhood: "",
          reference: "",
        },
      }); // esvazia todos os campos do formulário
    } catch (error) {
      toast.error("Erro ao salvar os dados!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
      }); // mensagem de erro para cadastros não realizados com sucesso
    } finally { // define um bloco de código que sempre será executado independente se o try for bem sucessido ou cair no catch
      setIsSaving(false); // define on estado de IsSaving para "false"
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 text-gray-800"
      autoComplete="off"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Nome Completo */}
        <div>
          <label className="block text-sm font-medium mb-1">Nome Completo</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            required
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-cyan-600 outline-none"
          />
        </div>

        {/* Gênero */}
        <div>
          <label className="block text-sm font-medium mb-1">Gênero</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            required
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-cyan-600 outline-none"
          >
            <option value="">Selecione</option>
            <option value="masculino">Masculino</option>
            <option value="feminino">Feminino</option>
            <option value="outro">Outro</option>
          </select>
        </div>

        {/* Data de Nascimento */}
        <div>
          <label className="block text-sm font-medium mb-1">Data de Nascimento</label>
          <input
            type="date"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleInputChange}
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-cyan-600 outline-none"
          />
        </div>

        {/* CPF */}
        <div>
          <label className="block text-sm font-medium mb-1">CPF</label>
          <IMaskInput
            mask="000.000.000-00"
            name="cpf"
            value={formData.cpf}
            onAccept={(value) => setFormData((prev) => ({ ...prev, cpf: value }))}
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-cyan-600 outline-none"
            required
          />
        </div>

        {/* RG */}
        <div>
          <label className="block text-sm font-medium mb-1">RG</label>
          <input
            type="text"
            name="rg"
            value={formData.rg}
            onChange={handleInputChange}
            className="w-full border p-2 rounded-lg"
            required
          />
        </div>

        {/* Estado Civil */}
        <div>
          <label className="block text-sm font-medium mb-1">Estado Civil</label>
          <select
            name="maritalStatus"
            value={formData.maritalStatus}
            onChange={handleInputChange}
            className="w-full border p-2 rounded-lg"
            required
          >
            <option value="">Selecione</option>
            <option value="solteiro(a)">Solteiro(a)</option>
            <option value="casado(a)">Casado(a)</option>
            <option value="divorciado(a)">Divorciado(a)</option>
            <option value="viuvo(a)">Viúvo(a)</option>
          </select>
        </div>

        {/* Telefone */}
        <div>
          <label className="block text-sm font-medium mb-1">Telefone</label>
          <IMaskInput
            mask="(00) 00000-0000"
            name="phone"
            value={formData.phone}
            onAccept={(value) => setFormData((prev) => ({ ...prev, phone: value }))}
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-cyan-600 outline-none"
          />
        </div>

        {/* Contato de Emergência */}
        <div>
          <label className="block text-sm font-medium mb-1">Contato de Emergência</label>
          <IMaskInput
            mask="(00) 00000-0000"
            name="emergencyContact"
            value={formData.emergencyContact}
            onAccept={(value) =>
              setFormData((prev) => ({ ...prev, emergencyContact: value }))
            }
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-cyan-600 outline-none"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">E-mail</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full border p-2 rounded-lg"
          />
        </div>

        {/* Naturalidade */}
        <div>
          <label className="block text-sm font-medium mb-1">Naturalidade</label>
          <input
            type="text"
            name="birthplace"
            value={formData.birthplace}
            onChange={handleInputChange}
            className="w-full border p-2 rounded-lg"
          />
        </div>

        {/* Alergias */}
        <div>
          <label className="block text-sm font-medium mb-1">Alergias</label>
          <input
            type="text"
            name="allergies"
            value={formData.allergies}
            onChange={handleInputChange}
            className="w-full border p-2 rounded-lg"
          />
        </div>

        {/* Cuidados Especiais */}
        <div>
          <label className="block text-sm font-medium mb-1">Cuidados Especiais</label>
          <input
            type="text"
            name="specialCare"
            value={formData.specialCare}
            onChange={handleInputChange}
            className="w-full border p-2 rounded-lg"
          />
        </div>

        {/* Convênio */}
        <div>
          <label className="block text-sm font-medium mb-1">Convênio</label>
          <input
            type="text"
            name="healthInsurance"
            value={formData.healthInsurance}
            onChange={handleInputChange}
            className="w-full border p-2 rounded-lg"
          />
        </div>

        {/* Número do Convênio */}
        <div>
          <label className="block text-sm font-medium mb-1">Número do Convênio</label>
          <input
            type="text"
            name="insuranceNumber"
            value={formData.insuranceNumber}
            onChange={handleInputChange}
            className="w-full border p-2 rounded-lg"
          />
        </div>

        {/* Validade do Convênio */}
        <div>
          <label className="block text-sm font-medium mb-1">Validade do Convênio</label>
          <input
            type="date"
            name="insuranceValidity"
            value={formData.insuranceValidity}
            onChange={handleInputChange}
            className="w-full border p-2 rounded-lg"
          />
        </div>

        {/* CEP */}
        <div>
          <label className="block text-sm font-medium mb-1">CEP</label>
          <IMaskInput
            mask="00000-000"
            name="cep"
            value={formData.address.cep}
            onAccept={(value) => handleAddressChange({ target: { name: "cep", value } })}
            onBlur={handleCepBlur}
            className="w-full border p-2 rounded-lg"
          />
        </div>

        {/* Rua */}
        <div>
          <label className="block text-sm font-medium mb-1">Rua</label>
          <input
            type="text"
            name="street"
            value={formData.address.street}
            onChange={handleAddressChange}
            className="w-full border p-2 rounded-lg"
          />
        </div>

        {/* Número */}
        <div>
          <label className="block text-sm font-medium mb-1">Número</label>
          <input
            type="text"
            name="number"
            value={formData.address.number}
            onChange={handleAddressChange}
            className="w-full border p-2 rounded-lg"
          />
        </div>

        {/* Referência */}
        <div>
          <label className="block text-sm font-medium mb-1">Referência</label>
          <input
            type="text"
            name="reference"
            value={formData.address.reference}
            onChange={handleAddressChange}
            className="w-full border p-2 rounded-lg"
          />
        </div>

        {/* Complemento */}
        <div>
          <label className="block text-sm font-medium mb-1">Complemento</label>
          <input
            type="text"
            name="complement"
            value={formData.address.complement}
            onChange={handleAddressChange}
            className="w-full border p-2 rounded-lg"
          />
        </div>

        {/* Bairro */}
        <div>
          <label className="block text-sm font-medium mb-1">Bairro</label>
          <input
            type="text"
            name="neighborhood"
            value={formData.address.neighborhood}
            onChange={handleAddressChange}
            className="w-full border p-2 rounded-lg"
          />
        </div>

        {/* Cidade */}
        <div>
          <label className="block text-sm font-medium mb-1">Cidade</label>
          <input
            type="text"
            name="city"
            value={formData.address.city}
            onChange={handleAddressChange}
            className="w-full border p-2 rounded-lg"
          />
        </div>

        {/* Estado */}
        <div>
          <label className="block text-sm font-medium mb-1">Estado</label>
          <input
            type="text"
            name="state"
            value={formData.address.state}
            onChange={handleAddressChange}
            className="w-full border p-2 rounded-lg"
          />
        </div>

        
      </div>

      {/* Botão de envio */}
      <div className="flex justify-end gap-3 pt-4">
        <button
          type="submit"
          disabled={isSaving}
          className="px-4 py-2 bg-cyan-700 text-white rounded-lg hover:bg-cyan-600 disabled:opacity-50"
        >
          {isSaving ? "Salvando..." : "Salvar"}
        </button>
      </div>

      <ToastContainer />
    </form>
  );
};

export default RegisterFormPatient;
