import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import "./Cartitem.css";

const CartItem = ({ item, index, increaseQty, decreaseQty, removeItem }) => {
  return (
    <div className="cart-item">
      <img src={item.Image} alt={item.discription} className="item-img" />

      <div className="item-details">
        <p className="item-name">{item.discription}</p>
        <p className="item-price">₹{item.price}</p>
      </div>

      <div className="item-qty">
        <button onClick={() => decreaseQty(index)}>-</button>
        <span>{item.qty}</span>
        <button onClick={() => increaseQty(index)}>+</button>
      </div>

      <div className="item-total">₹{item.price * item.qty}</div>

      {/* ❌ Remove Button */}
      <button className="delete-btn" onClick={() => removeItem(index)}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
};

export default CartItem;
