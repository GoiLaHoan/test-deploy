const AudienceProfile = (): JSX.Element => {
  return (
    <section
      id="audience-profile"
      className="section section--dark section--img section--img--center d-flex align-items-center"
    >
      <div className="container">
        <div
          className="row align-items-center"
          style={{ justifyContent: "space-between" }}
        >
          <div className="col-12 text-center">
            <h2>
              <strong>AUDIENCE</strong> PROFILE
            </h2>
          </div>
          <div className="col-12 col-lg-6">
            <div className="overflowed-block">
              <h3>GEOGRAPHY</h3>
              <img
                src="/reach/images/geography-pie-chart.jpg"
                className="img-responsive"
                alt="Geography Chart - 64% North America, 20% Asia, 12% Europe, 4% Other"
              />
            </div>
          </div>
          <div id="age-gender-block" className="col-12 col-lg-5 text-center">
            <h3>AGE</h3>
            <div className="row">
              <div className="col-6" style={{ background: "#387fc1" }}>
                <span
                  style={{ color: "#bcddf0", marginTop: 15, display: "block" }}
                >
                  59%
                </span>
              </div>
              <div
                className="col-6"
                style={{ background: "#76bae6", color: "#000" }}
              >
                35-64
                <br />
                <span style={{ fontSize: "0.4em", color: "#000" }}>
                  YEARS OF AGE
                </span>
              </div>
            </div>
            <h3>GENDER</h3>
            <div className="row">
              <div className="col-6 male">
                <span style={{ color: "#76bae6" }}>92%</span>
                <br />
                <span className="sub-text" style={{ color: "#000" }}>
                  MALE
                </span>
              </div>
              <div className="col-6 female">
                <span style={{ color: "#000" }}>8%</span>
                <br />
                <span className="sub-text" style={{ color: "#bcddf0" }}>
                  FEMALE
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="row" id="portfolio-block">
          <div id="decisions-makers" className="col-12 col-lg-4">
            <h3>DECISION-MAKERS</h3>
            <div className="row">
              <div className="col-5">
                <img
                  src="/reach/images/icon-audience-profile-decision-maker.png"
                  alt="Decisions Makers"
                  width={136}
                  height={96}
                  className="img-responsive"
                />
              </div>
              <div className="col-7">
                <span className="emp">68% authorized</span>
                <br />
                to make business purchase decisions
              </div>
            </div>
          </div>
          <div id="investments-portfolio" className="col-12 col-lg-4">
            <h3>INVESTMENTS PORTFOLIO</h3>
            <div className="row">
              <div className="col-5">
                <img
                  src="/reach/images/icon-audience-profile-investment-profile.png"
                  alt="INVESTMENTS PORTFOLIO"
                  width={92}
                  height={96}
                />
              </div>
              <div className="col-7">
                <p>
                  <span className="emp">40%</span> have portfolios
                  <br />
                  of over <span className="emp">$250,000</span>
                </p>
              </div>
            </div>
          </div>
          <div id="household-income" className="col-12 col-lg-4">
            <h3>HOUSEHOLD INCOME</h3>
            <div className="row">
              <div className="col-5">
                <img
                  src="/reach/images/icon-audience-profile-household-income.png"
                  alt="HOUSEHOLD INCOME"
                  width={100}
                  height={96}
                />
              </div>
              <div className="col-7">
                <p>
                  <span className="emp">OVER 39%</span>
                  <br />
                  Earn $100k or more
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AudienceProfile;
