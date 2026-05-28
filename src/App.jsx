import { useState } from 'react'
import './App.css'
import LoginPad from './components/LoginPad'
import TableSelection from './components/TableSelection'
import POSSystem from './components/POSSystem'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [serverName, setServerName] = useState('')
  const [tableInfo, setTableInfo] = useState(null) // { tableNumber, guests }

  const handleLogin = (pin) => {
    if (pin === '1234') {
      setServerName('Chaz')
      setIsLoggedIn(true)
    } else {
      alert('Invalid PIN. Try 1234')
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setServerName('')
    setTableInfo(null)
  }

  const handleTableSelect = (tableNumber, guests) => {
    setTableInfo({ tableNumber, guests })
  }

  const handleCloseTable = () => {
    setTableInfo(null)
  }

  return (
    <div className="h-full w-full">
      {!isLoggedIn ? (
        <LoginPad onLogin={handleLogin} />
      ) : !tableInfo ? (
        <TableSelection serverName={serverName} onSelectTable={handleTableSelect} onLogout={handleLogout} />
      ) : (
        <POSSystem serverName={serverName} tableInfo={tableInfo} onCloseTable={handleCloseTable} />
      )}
      <div style={{ position: 'fixed', bottom: '4px', right: '8px', color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.75rem', zIndex: 9999, pointerEvents: 'none' }}>
        Built by GetsAttention.com &copy; 2026
      </div>
    </div>
  )
}

export default App
