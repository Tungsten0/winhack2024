import Header from '../components/Header';
import Footer from '../components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { BsWallet } from "react-icons/bs";
import Button from 'react-bootstrap/Button';

export default function Wallet() {
  const balance = "$12.27";
  return (
  <>
  <Header />

  <section className="gradient-custom">
  <div className="container my-5 py-5">
  
    <div className="row d-flex justify-content-center py-5">
    <div className="col-md-7 col-lg-5 col-xl-4">
        <div className="card" style={{borderRadius: '15px'}}>
          <div className="card-body p-4">
            <h2>Wallet</h2>
          <Link to="/wallet" className="wallet-icon nav-link">
                <div className="wallet-container">
                <span className="wallet-balance">Available Funds  </span>
                <BsWallet />
                  <span className="wallet-balance">  {balance}</span>
                </div>
              </Link>
          </div>
        </div>
      </div>
      <div className="col-md-7 col-lg-5 col-xl-4">
        <div className="card" style={{borderRadius: '15px'}}>
          <div className="card-body p-4">
          <h2>Add Funds?</h2>
            <form>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="form-outline">
                  <input type="text" id="typeText" className="form-control form-control-lg" size="17"
                    placeholder="1234 5678 9012 3457" minLength="19" maxLength="19" />
                  <label className="form-label" htmlFor="typeText">Card Number</label>
                </div>
                <img src="https://img.icons8.com/color/48/000000/visa.png" alt="visa" width="64px" />
              </div>

              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="form-outline">
                  <input type="text" id="typeName" className="form-control form-control-lg" size="17"
                    placeholder="Cardholder's Name" />
                  <label className="form-label" htmlFor="typeName">Cardholder's Name</label>
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center pb-2">
                <div className="form-outline">
                  <input type="text" id="typeExp" className="form-control form-control-lg" placeholder="MM/YYYY"
                    size="7" minLength="7" maxLength="7" />
                  <label className="form-label" htmlFor="typeExp">Expiration</label>
                </div>
                <div className="form-outline">
                  <input type="password" id="typeText2" className="form-control form-control-lg"
                    placeholder="&#9679;&#9679;&#9679;" size="1" minLength="3" maxLength="3" />
                  <label className="form-label" htmlFor="typeText2">Cvv</label>
                </div>
              </div>
              <Button>
                  Add
                </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

  <Footer />
  </>
  )
}