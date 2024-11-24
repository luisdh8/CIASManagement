import { useState } from 'react';
import Login from './Login.jsx';
import UserHome from './userHome.jsx';
import './styles/App.css';

function App() {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState(""); // Guardamos el correo aquí

  const handleLogin = (success, userEmail) => {
    if (success) {
      setEmail(userEmail);  // Guardamos el email del usuario
      setStep(1); // Cambiar a la página de UserHome
    } else {
      alert('Invalid Credentials');
    }
  };

  return (
    <>
      {step === 0 && <Login onLogin={handleLogin} />} 
      {step === 1 && <UserHome email={email} />} {/* Pasamos el correo a UserHome */}
    </>
  );
}

export default App;
