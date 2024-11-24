import { useState } from 'react';
import Login from './Login.jsx';
import UserHome from './userHome.jsx';
import './styles/App.css';

function App() {
  const [step, setStep] = useState(0);

  const handleLogin = (success) => {
    if (success) {
      setStep(1); // Cambiar a la página de UserHome
    } else {
      alert('Invalid Credentials');
    }
  };

  return (
    <>
      {step === 0 && <Login onLogin={handleLogin} />}
      {step === 1 && <UserHome />}
    </>
  );
}

export default App;