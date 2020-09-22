import React from "react";
import { Link } from "react-router-dom";

const home = () => {
  return (
    <section className="hero-section">
      <div className="hero-slider owl-carousel">
        <div className="hs-item set-bg" data-setbg="#">
          <div className="hs-text">
            <div className="index-container">
              <div className="index-text">
                <h2>Memories that last forever</h2>
                <p className="home-paragraph">
                  Tag a place <br />
                  Upload photos
                  <br />
                  Create a description so the world knows what happened
                </p>
                <Link to="/signup" className="site-btn">
                  Signup
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default home;
