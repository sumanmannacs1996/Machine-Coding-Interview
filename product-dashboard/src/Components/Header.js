import React from "react";
import CartIcon from "../assets/cart-icon.svg";
import { Link } from "react-router-dom";
import "../App.css";

function Header({ search, setSearch, setSkip }) {
  return (
    <header>
      <div className="header-container">
        <h1>
          <Link to="/">Shopping</Link>
        </h1>
        <input
          type="text"
          placeholder="Searc Product...."
          className="product-search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setSkip(0);
          }}
        />
        <Link className="cart-icon" to="/cart">
          <div className="cart-item-count">0</div>
          <img src={CartIcon} alt="cart icon" />
        </Link>
      </div>
      <hr />
    </header>
  );
}

export default Header;
