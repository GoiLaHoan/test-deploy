const NavAdvertising = (): JSX.Element => {
  return (
    <nav className="navbar d-flex justify-content-between">
      <div className="navbar__brand">
        <a href="/" target="_blank">
          <img
            src="/reach/images/logo-kitco-reach.png"
            alt="Kitco Reach logo"
          />
        </a>
      </div>
      <div className="navbar__menu">
        <ul className="main-menu">
          <li className="menu__item">
            <a href="#about-kitco">About Kitco&nbsp;</a>
          </li>
          <li className="menu__item">
            <a href="#advertise-with-kitco">ADVERTISE WITH KITCO&nbsp;</a>
          </li>
          <li className="menu__item">
            <a href="#kitco-reach-position">KITCO REACH&nbsp;</a>
          </li>
          <li className="menu__item">
            <a href="#contact">Contact&nbsp;</a>
          </li>
          <li className="menu__item">
            <a href="/">
              &lt;&nbsp;&nbsp;&nbsp;back to <strong>kitco.com</strong>
            </a>
          </li>
        </ul>
      </div>
      <button type="button" id="mobile-menu-button">
        <span className="sr-only">Menu</span>
      </button>
    </nav>
  );
};

export default NavAdvertising;
