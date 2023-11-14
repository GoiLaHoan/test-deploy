const AdvertiseWithKitco = (): JSX.Element => {
  return (
    <section
      id="advertise-with-kitco"
      className="section section--fair section--img section--img--center d-flex align-items-center"
    >
      <div className="container">
        <div className="row align-items-center">
          <div className="col-12 text-center">
            <h2>
              <strong>ADVERTISE</strong> WITH KITCO
            </h2>
          </div>
          <div className="col-12 col-lg-6">
            <p className="align-center-xs">
              <strong>
                Let us help you run your next marketing campaign. <br />
                We have you covered with services suited for all needs.
              </strong>
            </p>
            <div className="row" style={{ justifyContent: "center" }}>
              <ul className="col-sm-5">
                <li>Banner Advertising</li>
                <li>Sponsored Content</li>
                <li>Investor Leads</li>
                <li>Kitco Market Alerts</li>
                <li>Press Releases</li>
              </ul>
              <ul className="col-sm-5">
                <li>Conferences Sponsorships</li>
                <li>Newsletter</li>
                <li>E-Mail Marketing</li>
                <li>Mobile Applications</li>
                <li>Social Media</li>
              </ul>
            </div>
          </div>
          <div className="col-lg-6" style={{ alignSelf: "start" }}>
            <div id="networks" className="overflowed-block">
              <div className="row">
                <div className="col-12 col-md-6">
                  <h3>NETWORK INCLUDES</h3>
                </div>
                <div className="col-12 col-md-6">
                  kitco.com, kitco.cn, kitcometals.com, kitcosilver.com, Mobile
                  Applications
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 text-center" />
          <a
            href="#contact"
            className="button"
            style={{ margin: "20px auto 0 auto" }}
          >
            CONTACT US
          </a>
        </div>
      </div>
      <div className="arrow-down" />
    </section>
  );
};
export default AdvertiseWithKitco;
