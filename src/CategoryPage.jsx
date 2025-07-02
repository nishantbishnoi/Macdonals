import { useEffect, useState } from 'react';
import './CategoryPage.css';
import { useNavigate } from 'react-router-dom';

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8100/catego', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({})
    })
      .then(res => res.json())
      .then(data => {
        setCategories(data.response || []);
      })
      .catch(err => console.log('❌ Error:', err));
  }, []);

 const handleClick = (categoryName) => {
  const cleanedCategory = categoryName.toLowerCase().replace(/\s+/g, '');
  navigate(`/${cleanedCategory}`);
};

  return (
    <div className="category-container">
      <div className="category-grid">
        {categories.map((cat, index) => (
          <div className="category-card" key={index} onClick={() => handleClick(cat.discription)}>
            <img src={cat.Image} alt={cat.discription} className="category-image" />
            <h4 className="category-name">{cat.discription}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;