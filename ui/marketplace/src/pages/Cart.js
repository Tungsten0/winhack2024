import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

export default function Cart() {
  return (
    <>
      <Header />
      <section class="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col">
              <div class="card">
                <div class="card-body p-4">
                  <div class="row">
                    <div class="col-lg-7">
                      <h5 class="mb-3">
                        <a href="#!" class="text-body">
                          <i class="fas fa-long-arrow-alt-left me-2"></i>{" "}
                          <Link to="/home" className="navbar-brand">
                            <h2>Continue shopping</h2>{" "}
                          </Link>
                        </a>
                      </h5>
                      <hr />
                      <div class="card mb-3">
                        <div class="card-body">
                          <div class="d-flex justify-content-between">
                            <div class="d-flex flex-row align-items-center">
                              <div class="ms-3">
                                <h5>Iphone 11 pro</h5>
                                <p class="small mb-0">256GB, Navy Blue</p>
                              </div>
                            </div>
                            <div class="d-flex flex-row align-items-center">
                              <div style={{ width: 65 }}>
                                <h5 class="fw-normal mb-0">2</h5>
                              </div>
                              <div style={{ width: 80 }}>
                                <h5 class="mb-0">$90</h5>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
