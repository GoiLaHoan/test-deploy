const WhyKitco = (): JSX.Element => {
  return (
    <section
      id="why-kitco"
      className="section section--dark section--img section--img--center d-flex align-items-center"
    >
      <div id="kitco-media-block" className="container row">
        <div className="col-12 col-lg-5">
          <div className="text-center">
            <h3>
              <strong>WHY</strong> KITCO
            </h3>
          </div>
        </div>
        <div className="col-12 col-lg-7">
          <div id="kitco-media-block" className="text-center">
            <div className="row">
              <div className="col-3">
                <img
                  src="/reach/images/icon-kmedia-target.png"
                  className="img-responsive"
                  alt="Kitco Media - Audience"
                />
                AUDIENCE
              </div>
              <div className="col-3">
                <img
                  src="/reach/images/icon-kmedia-creditbility.png"
                  className="img-responsive"
                  alt="Kitco Media - Credibility"
                />
                CREDIBILITY
              </div>
              <div className="col-3">
                <img
                  src="/reach/images/icon-kmedia-results.png"
                  className="img-responsive"
                  alt="Kitco Media - Results"
                />
                RESULTS
              </div>
              <div className="col-3">
                <img
                  src="/reach/images/icon-kmedia-world.png"
                  className="img-responsive"
                  alt="Kitco Media - Global Reach"
                />
                GLOBAL REACH
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default WhyKitco;
