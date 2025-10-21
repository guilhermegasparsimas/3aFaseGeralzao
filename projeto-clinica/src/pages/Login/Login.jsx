import Logo from '../../assets/Logo.png';
import LoginForm from '../../components/LoginForm/LoginForm';

export default function Login() {
    return (
        <>
            <div className='flex min-h-screen bg-gray-100'>
                <div className='hidden md:flex w-1/2 bg-gray-200 flew-col items-center justify-center p-8'>
                    <img src={Logo} alt="Clinica Médica" className='mb-6' />
                </div>
                <div className='flex w-full md:-1/2 items-center justify-center p-8'>
                    <LoginForm />
                </div>
            </div>
        </>
    )
}