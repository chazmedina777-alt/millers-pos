export default function ActionButtons({ onPay, onVoid, onLogout }) {
  return (
    <div className="action-buttons grid">
      <button className="act-btn bg-red" onClick={onVoid}>Void</button>
      <button className="act-btn bg-orange" onClick={onLogout}>Logout</button>
      <button className="act-btn bg-green" style={{ gridColumn: 'span 2' }} onClick={onPay}>
        Send & Pay
      </button>
    </div>
  );
}
