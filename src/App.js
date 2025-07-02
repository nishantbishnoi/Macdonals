import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';
import Header from './Header';
import Pizza from './category/Pizza';
import Shake from './category/Shake';
import Icecream from './category/Icecream';
import Sandwich from './category/Sandwich';
import CategoryPage from './CategoryPage';
import Success from "./Success";
import OrderSuccess from './OrderSuccess';
import CartPage from './Pages/CartPage';
import Burger from './category/Burger';
function App() {
  return (
    <>
    <Router>
      <Header />
      <div style={{ display: 'flex' }}>
        <Navbar />
        <main style={{ padding: '20px', flex: 1 }}>
          <Routes>
            <Route path="/pizza" element={<Pizza />} />
            <Route path="/shake" element={<Shake />} />
            <Route path="/icecream" element={<Icecream />} /> 
            <Route path="/sandwich" element={<Sandwich />} />
            <Route path="/success" element={<Success />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/burger" element={<Burger />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
           {/* ✅ Toast container */}
      <ToastContainer position="top-right" autoClose={2000} />
        </main>
      </div>
    </Router>
    
    </>
  );
}

export default App;
