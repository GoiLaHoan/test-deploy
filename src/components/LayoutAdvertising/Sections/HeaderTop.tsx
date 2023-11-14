const HeaderTop = (): JSX.Element => {
  return (
    <header
      id="top"
      className="hero d-md-flex align-items-center justify-content-center"
    >
      <div className="hero__contact">
        <a href="tel:18555854826">1 855 585-4826</a>
        <ul className="social-links social-links--small mb-0 mt-2">
          <li className="social-links__item">
            <a
              href="https://www.facebook.com/KitcoNews"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-facebook-f" />
              <span className="sr-only">Facebook</span>&nbsp;
            </a>
          </li>
          <li className="social-links__item">
            <a
              href="https://www.instagram.com/kitconews/"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-instagram" />
              <span className="sr-only">Instagram</span>&nbsp;
            </a>
          </li>
          <li className="social-links__item">
            <a
              href="https://twitter.com/kitconewsnow"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-twitter" />
              <span className="sr-only">Twitter</span>&nbsp;
            </a>
          </li>
          <li className="social-links__item">
            <a
              href="https://www.linkedin.com/company/kitconews"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-linkedin" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </li>
        </ul>
      </div>
      <div className="container">
        <div className="row">
          <div className="col text-center">
            <h1 className="h1 site-title">
              REACH YOUR <span style={{ fontWeight: 300 }}>DIGITAL GOALS</span>
            </h1>
            <a
              href="#advertise-with-kitco"
              target="_blank"
              className="button button--light site-cta"
            >
              ADVERTISE WITH KITCO
            </a>
          </div>
        </div>
      </div>
      <a href="#content" className="scroll-down anim--scroll">
        <span className="sr-only">Scroll down</span>
      </a>
    </header>
  );
};

export default HeaderTop;
