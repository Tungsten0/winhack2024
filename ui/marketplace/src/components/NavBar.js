import { BsFillBagCheckFill, BsWallet } from "react-icons/bs";
import { Link } from 'react-router-dom';
import "./NavBar.css";
import Button from 'react-bootstrap/Button';

export default function Navbar() {
  // Mock balance value, you should replace it with the actual balance
  const balance = "$12.27";

  return (
    <nav className="navbar navbar-light bg-light justify-content-between">
      <div className="d-flex align-items-center">
        <Link to="/home" className="navbar-brand">
          <h2>Win-Market</h2>
        </Link>
        <Link to="/about" className="navbar-brand">
          <h2>About</h2>
        </Link>
      </div>
      <form className="form-inline d-flex align-items-center">
        <div className="d-flex align-items-center ml-3">
          <Link to="/wallet" className="wallet-icon nav-link">
          <div className="wallet-container">
          <BsWallet />
            <span className="wallet-balance">{balance}</span>
          </div>
          </Link>
          <Link to="/cart" className="cart-icon">
            <BsFillBagCheckFill />
          </Link>
        </div>
      </form>
    </nav>
  );
}
