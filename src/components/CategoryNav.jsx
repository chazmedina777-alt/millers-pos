export default function CategoryNav({ categories, subcategories, activeCategory, activeSubcategory, onCategoryClick, onSubcategoryClick }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="category-nav grid">
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`cat-btn ${activeCategory === cat.id ? 'active' : ''} cat-${cat.id}`}
            onClick={() => onCategoryClick(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>
      
      {subcategories && (
        <div className="subcategory-nav flex gap-2 overflow-x-auto pb-2">
          {subcategories.map(sub => (
            <button
              key={sub.id}
              className={`cat-btn flex-1 min-w-[120px] ${activeSubcategory === sub.id ? 'active' : ''}`}
              style={{ padding: '0.5rem', fontSize: '1rem', borderBottom: '2px solid var(--accent-blue)' }}
              onClick={() => onSubcategoryClick(sub.id)}
            >
              {sub.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
