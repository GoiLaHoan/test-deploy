const Contact = (): JSX.Element => {
  return (
    <div id="contact" className="section md-padding">
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <form className="contact-form">
              <h2>Sign Up Here</h2>
              <p>
                Sign up today and get our trade signals delivered straight to
                your inbox.
              </p>
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
            <a href="#" style={{ color: "#424242" }}>
              <i className="fa fa-angle-up" aria-hidden="true" />
            </a>
          </div>
        </div>
        <p className="disclaimer-text">
          Disclaimer – Past performance is no indication or guarantee of
          anticipated future profits, and neither Kitco nor CPM can accept any
          liability or responsibility for any loss suffered as a result of gold
          price fluctuations. Gold as a commodity is not a specified investment
          for the purpose of giving advice under the Financial Services and
          Markets Act 2000. Therefore this trade recommendation does not give
          rise to rights to claim compensation under the Financial Services
          Compensation Scheme. CPM is a registered CTA with the U.S. NFA and
          CFTC. At times the principals and associates of CPM may have positions
          in the precious metals, commodity, and equities markets. CPM also
          manages investment and industrial positions in markets for its
          clients.
        </p>
      </div>
    </div>
  );
};

export default Contact;
