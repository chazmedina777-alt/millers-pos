import { useState } from 'react';
import { Users, LayoutGrid } from 'lucide-react';
import { floorPlan } from '../data/tables';

export default function TableSelection({ serverName, onSelectTable, onLogout }) {
  const [activeSection, setActiveSection] = useState(floorPlan[0].id);
  const [selectedTable, setSelectedTable] = useState(null);
  const [guests, setGuests] = useState('');

  const handleTableClick = (table) => {
    setSelectedTable(table);
    setGuests(table.guests.toString()); // default guest count
  };

  const handleGuestPress = (num) => {
    if (guests.length < 2) setGuests(prev => prev + num);
  };

  const handleClearGuests = () => {
    setGuests('');
  };

  const handleEnter = () => {
    if (selectedTable && guests.length > 0) {
      onSelectTable(selectedTable.id, parseInt(guests));
    }
  };

  const activeSectionData = floorPlan.find(s => s.id === activeSection);

  if (selectedTable) {
    // Guest Entry Mode
    return (
      <div className="flex flex-col items-center justify-center h-full w-full" style={{ background: 'var(--bg-dark)' }}>
        <div className="p-6 bg-panel border-color rounded" style={{ border: '1px solid var(--border-color)', borderRadius: '12px', width: '400px' }}>
          <h2 className="text-2xl font-bold mb-4 text-center">Table {selectedTable.label}</h2>
          
          <div className="flex justify-center mb-6 border-b border-color pb-4 text-accent-blue">
            <div className="flex flex-col items-center">
              <Users size={32} />
              <span className="mt-2 font-bold text-xl">{guests || 'Enter Guests'}</span>
            </div>
          </div>

          <div className="keypad grid gap-2" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {[7, 8, 9, 4, 5, 6, 1, 2, 3].map(num => (
              <button key={num} onClick={() => handleGuestPress(num)} className="key-btn" style={{ padding: '1.5rem', fontSize: '1.5rem', background: 'var(--bg-button)' }}>
                {num}
              </button>
            ))}
            <button onClick={handleClearGuests} className="key-btn bg-red" style={{ padding: '1.5rem', fontSize: '1.5rem', background: 'var(--accent-red)', color: 'white' }}>CLR</button>
            <button onClick={() => handleGuestPress(0)} className="key-btn" style={{ padding: '1.5rem', fontSize: '1.5rem', background: 'var(--bg-button)' }}>0</button>
            <button onClick={handleEnter} className="key-btn bg-green" style={{ padding: '1.5rem', fontSize: '1.5rem', background: 'var(--accent-green)', color: 'white' }}>ENT</button>
          </div>

          <div className="mt-6 flex justify-between gap-4">
            <button className="act-btn bg-orange flex-1 p-2 rounded" style={{ background: 'var(--accent-orange)', color: 'black' }} onClick={() => setSelectedTable(null)}>Back to Map</button>
          </div>
        </div>
      </div>
    );
  }

  // Floor Plan Mode
  return (
    <div className="flex flex-col h-full w-full" style={{ background: 'var(--bg-dark)' }}>
      {/* Header */}
      <div className="p-4 border-b flex justify-between items-center" style={{ borderColor: 'var(--border-color)', background: 'var(--bg-panel)' }}>
        <div className="flex items-center gap-2">
          <LayoutGrid className="text-accent-blue" />
          <h1 className="text-xl font-bold">Floor Plan - {serverName}</h1>
        </div>
        <button onClick={onLogout} className="act-btn bg-red px-6 py-2 rounded" style={{ background: 'var(--accent-red)', color: 'white' }}>Logout</button>
      </div>

      {/* Sections Nav */}
      <div className="flex gap-2 p-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
        {floorPlan.map(section => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`px-6 py-3 rounded font-bold text-lg border border-color ${activeSection === section.id ? 'bg-accent-blue text-white' : 'text-muted'}`}
            style={{ 
              background: activeSection === section.id ? 'var(--accent-blue)' : 'var(--bg-button)',
              borderColor: 'var(--border-color)'
            }}
          >
            {section.name}
          </button>
        ))}
      </div>

      {/* 2D Floor Plan Container */}
      <div className="flex-1 relative m-4 rounded" style={{ background: 'var(--bg-panel)', border: '1px solid var(--border-color)' }}>
        {activeSectionData.tables.map(table => (
          <button
            key={table.id}
            onClick={() => handleTableClick(table)}
            className="absolute flex flex-col items-center justify-center font-bold text-xl border shadow-lg hover-bg transition-transform"
            style={{ 
              top: table.top, 
              left: table.left, 
              width: table.width, 
              height: table.height,
              borderRadius: table.shape === 'circle' ? '50%' : '8px',
              background: 'var(--bg-button)', 
              borderColor: 'var(--border-color)',
              transform: 'translate(-50%, -50%)', // Center the element on the coordinate
            }}
          >
            <span>{table.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
