export default function ItemGrid({ items, categoryId, onItemClick }) {
  return (
    <div className="item-grid grid flex-1 p-2">
      {items.map(item => (
        <button
          key={item.id}
          className={`item-btn cat-${categoryId}`}
          onClick={() => onItemClick(item)}
        >
          <span className="font-bold text-center mb-1">{item.name}</span>
          <span className="text-muted text-sm">${item.price.toFixed(2)}</span>
        </button>
      ))}
    </div>
  );
}
