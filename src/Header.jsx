import './Header.css';
import pic1 from './download.png';
import { Link } from 'react-router-dom';
import { useCart } from './context/CartContext'; // ✅

const Header = () => {
  const { cartItems } = useCart(); // ✅

  return (
    <header className="domino-header">
      <img src={pic1} alt="logo" id="image" />

      <div className="cart-button-container">
        <Link to="/cart">
          <button className="cart-button">
            🛒 View Cart ({cartItems.length}) {/* ✅ Count shown */}
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
