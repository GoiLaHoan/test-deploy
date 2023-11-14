import { env } from "~/src/env/client.mjs";

const Header = (): JSX.Element => {
  return (
    <header id="home">
      <div className="bg-img">
        <div className="overlay" />
      </div>
      <nav id="nav" className="navbar nav-transparent">
        <div className="container">
          <div className="navbar-header">
            <div className="navbar-brand">
              <a>
                {" "}
                <img
                  className="logo"
                  src={`${env.NEXT_PUBLIC_CDN_PAGE}/services/images/logo.png`}
                  alt="Kitco logo"
                />{" "}
              </a>
            </div>
            <div className="nav-collapse">
              {" "}
              <span />{" "}
            </div>
          </div>
          <ul className="main-nav nav navbar-nav navbar-right">
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#markets">Markets</a>
            </li>
            <li>
              <a href="#strategies">Strategies</a>
            </li>
            <li>
              <a href="#durations">Durations</a>
            </li>
            <li>
              <a href="#samples">Samples</a>
            </li>
            <li>
              <a href="#team">Team</a>
            </li>
            <li>
              <a href="#order">Yearbooks</a>
            </li>
            <li>
              <a href="/">
                <img
                  src={`${env.NEXT_PUBLIC_CDN_PAGE}/services/images/back.png`}
                  alt="Back to kitco.com"
                />
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <div className="home-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-lg-4">
              <div className="home-content">
                <h1 className="white-text">Get CPM Group Trade Signals</h1>
                <p className="white-text">
                  Sign up today and get our trade signals delivered straight to
                  your inbox
                </p>
              </div>
            </div>
            <div className="col-lg-3" />
            <div className="col-sm-6 col-lg-5">
              <form className="contact-form">
                <h2>Sign Up Here</h2>
                <input
                  required
                  type="text"
                  name="name"
                  className="input"
                  placeholder="Full Name"
                />
                <input
                  required
                  type="email"
                  name="email"
                  className="input"
                  placeholder="Email"
                />
                <button className="main-btn">SUBMIT</button>
              </form>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-4" />
            <div className="col-xs-4 arrow-1--content">
              <a href="#contact">
                <i className="fa fa-angle-down arrow-1" aria-hidden="true" />
              </a>
            </div>
            <div className="col-xs-4" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
