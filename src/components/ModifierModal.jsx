import { useState } from 'react';
import { menuData } from '../data/menu';

export default function ModifierModal({ item, modifierGroupId, step, totalSteps, onCancel, onSave }) {
  const [selectedModifiers, setSelectedModifiers] = useState([]);
  const [activePrefix, setActivePrefix] = useState(''); // '', 'NO ', 'EXTRA ', 'SUB ', 'SIDE '
  
  const modGroup = menuData.modifiers[modifierGroupId];

  const handlePrefixClick = (prefix) => {
    setActivePrefix(activePrefix === prefix ? '' : prefix);
  };

  const toggleModifier = (modOption) => {
    const optionNameWithPrefix = activePrefix + modOption.name;
    const optionIdWithPrefix = activePrefix + modOption.id;
    
    const existingIndex = selectedModifiers.findIndex(m => m.id === optionIdWithPrefix);
    
    if (existingIndex >= 0) {
      // Remove it
      setSelectedModifiers(selectedModifiers.filter((_, i) => i !== existingIndex));
    } else {
      // Add it
      const newMod = { ...modOption, id: optionIdWithPrefix, name: optionNameWithPrefix };
      if (modGroup.multiSelect) {
        setSelectedModifiers([...selectedModifiers, newMod]);
      } else {
        setSelectedModifiers([newMod]); // Replace
      }
    }
    // Reset prefix after selection
    setActivePrefix('');
  };

  const handleSave = () => {
    onSave(selectedModifiers);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="p-4 border-b border-color flex justify-between items-center">
          <h2 className="text-xl font-bold">{item.name}</h2>
          <span className="text-muted text-sm">Step {step} of {totalSteps}: {modGroup.name}</span>
        </div>
        
        {modGroup.allowPrefixes && (
          <div className="flex gap-2 p-4 border-b border-color" style={{ background: 'var(--bg-dark)' }}>
            {['NO ', 'EXTRA ', 'SUB ', 'SIDE '].map(prefix => (
              <button 
                key={prefix}
                className={`act-btn flex-1 ${activePrefix === prefix ? 'bg-orange text-black' : ''}`}
                style={{ padding: '0.5rem' }}
                onClick={() => handlePrefixClick(prefix)}
              >
                {prefix.trim()}
              </button>
            ))}
          </div>
        )}

        <div className="flex-1 p-4 overflow-y-auto">
          <div className="modal-grid grid">
            {modGroup.options.map(option => {
              // Highlight if ANY prefix version is selected
              const isSelected = selectedModifiers.some(m => m.id.endsWith(option.id));
              
              return (
                <button
                  key={option.id}
                  className={`mod-btn ${isSelected ? 'selected' : ''}`}
                  onClick={() => toggleModifier(option)}
                >
                  <span className="font-bold">{option.name}</span>
                  {option.price > 0 && <div className="text-sm">+${option.price.toFixed(2)}</div>}
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-4 border-t border-color flex justify-between gap-4">
          <button className="act-btn bg-red flex-1" onClick={onCancel}>Cancel</button>
          <button className="act-btn bg-green flex-1" onClick={handleSave}>
            {step < totalSteps ? 'Next Step' : 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
}
