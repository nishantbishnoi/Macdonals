import React, { useEffect, useState } from "react";
import './Pizza.css';
import { useCart } from "../context/CartContext"; // ✅ Import cart context

const Icecream = () => {
  const [datas, setdatas] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // For search query

  const { addToCart } = useCart(); // ✅ Access cart functions

  useEffect(() => {
    fetch('http://macback.onrender.com/Icecreambck', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then((response) => {
        setdatas(response.response);
      })
      .catch((err) => console.error("Error fetching:", err));
  }, []);

  // Filter products based on the search term
  const filteredProducts = datas.filter((e) =>
    e.discription.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* 🔍 Search Bar */}
      <div>
        <input
          type="text"
          placeholder="Search for a product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          id="search-bar"
        />
      </div>

      {/* 🍦 Ice Cream Product List */}
      <div id="abmain">
        {filteredProducts.length === 0 ? (
          <p>No products found.</p>
        ) : (
          filteredProducts.map((e) => (
            <div key={e.id} className="ab1">
              <img
                src={e.Image}
                width={300}
                height={200}
                id="ab2"
                alt={e.discription}
              />
              <br />
              <h5 id="ab3">{e.discription}</h5>
              <h3 id="ab3">₹{e.price}</h3>

              {/* ✅ Add to Cart Button Only */}
              <button
                id="ab7"
                onClick={() => addToCart(e)}
              >
                Add to Cart
              </button>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Icecream;
