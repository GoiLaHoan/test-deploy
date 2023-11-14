const FooterAdvertising = (): JSX.Element => {
  return (
    <footer
      id="footer"
      className="section section--footer section--dark text-center"
    >
      <div className="container">
        <div className="row">
          <div className="col">
            <ul className="social-links">
              <li className="social-links__item">
                <a
                  href="https://www.facebook.com/KitcoNews"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fab fa-facebook-f"></i>
                  <span className="sr-only">Facebook</span>
                </a>
              </li>
              <li className="social-links__item">
                <a
                  href="https://www.instagram.com/kitconews/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fab fa-instagram"></i>
                  <span className="sr-only">Instagram</span>
                </a>
              </li>
              <li className="social-links__item">
                <a
                  href="https://twitter.com/kitconewsnow"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fab fa-twitter"></i>
                  <span className="sr-only">Twitter</span>
                </a>
              </li>
              <li className="social-links__item">
                <a
                  href="https://www.linkedin.com/company/kitconews"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fab fa-linkedin"></i>
                  <span className="sr-only">LinedIn</span>
                </a>
              </li>
            </ul>
            <p className="copy">
              Kitco Metals Inc. <span className="copy-year">2023</span>. All
              rights reserved.
            </p>
          </div>
        </div>
      </div>
      <a href="#top" className="scroll-up anim--scroll">
        <span className="sr-only">backToTop</span>
      </a>
    </footer>
  );
};

export default FooterAdvertising;
