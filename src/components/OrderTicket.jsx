export default function OrderTicket({ serverName, tableInfo, items, activeSeat, onSetActiveSeat, onRemove }) {
  const subtotal = items.reduce((sum, item) => sum + item.price + (item.modifiers || []).reduce((mSum, m) => mSum + m.price, 0), 0);
  const tax = subtotal * 0.07; // 7% tax
  const total = subtotal + tax;

  // Group items by seat
  const maxSeat = Math.max(tableInfo.guests, ...items.map(i => i.seatNumber || 1));
  const seats = Array.from({ length: maxSeat }, (_, i) => i + 1);

  return (
    <div className="flex-1 flex flex-col h-full bg-panel">
      <div className="ticket-header p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="font-bold text-xl">Table {tableInfo.tableNumber}</span>
          <span className="text-muted">{tableInfo.guests} Guests</span>
        </div>
        <div className="flex justify-between text-muted">
          <span>Server: {serverName}</span>
          <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>

      <div className="flex p-2 gap-2 overflow-x-auto border-b border-color" style={{ background: 'var(--bg-dark)' }}>
        {seats.map(seat => (
          <button 
            key={seat}
            onClick={() => onSetActiveSeat(seat)}
            className={`px-4 py-2 rounded font-bold border border-color ${activeSeat === seat ? 'bg-accent-blue text-white' : 'bg-button text-muted'}`}
            style={{ 
              backgroundColor: activeSeat === seat ? 'var(--accent-blue)' : 'var(--bg-button)',
              color: activeSeat === seat ? 'white' : 'var(--text-muted)'
            }}
          >
            Seat {seat}
          </button>
        ))}
        <button 
          onClick={() => onSetActiveSeat(maxSeat + 1)}
          className="px-4 py-2 rounded border border-color text-muted"
          style={{ background: 'var(--bg-button)' }}
        >
          + Add
        </button>
      </div>

      <div className="ticket-items flex-1 overflow-y-auto">
        {seats.map(seat => {
          const seatItems = items.filter(i => i.seatNumber === seat);
          if (seatItems.length === 0) return null;
          
          return (
            <div key={seat} className="mb-2">
              <div className="px-2 py-1 bg-dark text-muted font-bold text-sm" style={{ background: 'var(--bg-dark)' }}>Seat {seat}</div>
              {seatItems.map((item) => (
                <div key={item.orderItemId} className="ticket-item" onClick={() => onRemove(item.orderItemId)}>
                  <div className="flex justify-between">
                    <span className="font-bold">{item.name}</span>
                    <span>${item.price.toFixed(2)}</span>
                  </div>
                  {item.modifiers && item.modifiers.map(mod => (
                    <div key={mod.id} className="text-muted text-sm ml-4 flex justify-between">
                      <span className={mod.name.startsWith('NO ') ? 'text-red-500' : ''}>- {mod.name}</span>
                      {mod.price > 0 && <span>${mod.price.toFixed(2)}</span>}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          );
        })}
        
        {items.length === 0 && (
          <div className="p-4 text-center text-muted">
            Ticket Empty
          </div>
        )}
      </div>

      <div className="ticket-totals p-4">
        <div className="flex justify-between mb-1 text-muted">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2 text-muted">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-2xl font-bold text-accent-green">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
