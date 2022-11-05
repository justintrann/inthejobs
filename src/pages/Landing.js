import React from "react";
import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components/index";
import { Link } from "react-router-dom";
const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        {/* info */}
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            ultricies, arcu et vestibulum dictum, eros urna facilisis risus, ut
            elementum turpis turpis vitae mauris. Nullam tortor lacus, tincidunt
            in elementum vitae, mattis vel mauris. Quisque nec erat in dui
            consequat rhoncus ac eget lorem. Suspendisse a malesuada augue.
            Curabitur sagittis enim sit amet condimentum placerat. Nunc et
            mauris sed est suscipit volutpat
          </p>
          <Link to="/register" className="btn btn-hero">
            Login/Register
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
