import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext"; // ✅ Import cart context
import './Pizza.css';

const Shake = () => {
  const [datas, setdatas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { addToCart } = useCart(); // ✅ Use cart context

  useEffect(() => {
    fetch('http://localhost:8100/shakebck', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then((response) => {
        setdatas(response.response || []);
      })
      .catch((err) => console.error("Fetch Error:", err));
  }, []);

  const filteredProducts = datas.filter((e) =>
    e.discription.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Search for a product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          id="search-bar"
        />
      </div>

      <div id="abmain">
        {filteredProducts.length === 0 ? (
          <p>No products found.</p>
        ) : (
          filteredProducts.map((e, index) => (
            <div key={index} className="ab1">
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

              <button id="ab7" onClick={() => addToCart(e)}> {/* ✅ */}
                Add to Cart
              </button>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Shake;
