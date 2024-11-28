import { useState } from 'react';
import Login from './Login.jsx';
import UserHome from './userHome.jsx';
import AdminHome from './adminHome.jsx';
import './styles/App.css';

function App() {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState(""); // Guardamos el correo aquí
  const [role, setRole] = useState(""); // Guardamos el rol aquí

  const handleLogin = (success, userEmail, userRole) => {
    if (success) {
      setEmail(userEmail);  // Guardamos el email del usuario
      setRole(userRole); // Guardamos el rol del usuario
      setStep(1); // Cambiar a la página de UserHome
    } else {
      alert('Invalid Credentials');
    }
  };

  return (
    <>
      {step === 0 && <Login onLogin={handleLogin} />} 
      {step === 1 && role === 'admin' && <AdminHome email={email} />}
      {step === 1 && role === 'user' && <UserHome email={email} />}
    </>
  );
}

export default App;
