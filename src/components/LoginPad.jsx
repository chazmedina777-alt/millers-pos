import { useState } from 'react';
import { Lock } from 'lucide-react';
import './LoginPad.css';

export default function LoginPad({ onLogin }) {
  const [pin, setPin] = useState('');

  const handlePress = (num) => {
    if (pin.length < 4) setPin(prev => prev + num);
  };

  const handleClear = () => setPin('');
  const handleEnter = () => {
    onLogin(pin);
    setPin('');
  };

  return (
    <div className="login-container flex flex-col items-center justify-center h-full w-full">
      <div className="login-box p-4 flex flex-col items-center">
        <Lock size={48} className="lock-icon mb-4" />
        <h1 className="text-2xl font-bold mb-6">Miller's Ale House POS</h1>
        
        <div className="pin-display mb-6 flex items-center justify-center">
          {pin.padEnd(4, '•').split('').map((char, i) => (
            <span key={i} className="pin-dot">{char}</span>
          ))}
        </div>

        <div className="keypad grid gap-2">
          {[7, 8, 9, 4, 5, 6, 1, 2, 3].map(num => (
            <button key={num} onClick={() => handlePress(num)} className="key-btn">
              {num}
            </button>
          ))}
          <button onClick={handleClear} className="key-btn action-btn bg-red">CLR</button>
          <button onClick={() => handlePress(0)} className="key-btn">0</button>
          <button onClick={handleEnter} className="key-btn action-btn bg-green">ENT</button>
        </div>
        
        <p className="mt-4 text-muted">Hint: PIN is 1234</p>
      </div>
    </div>
  );
}
