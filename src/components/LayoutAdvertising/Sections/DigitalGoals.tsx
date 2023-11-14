const DigitalGoals = (): JSX.Element => {
  return (
    <section
      id="digital-goals"
      className="section section--dark section--img section--img--center d-flex align-items-center"
    >
      <div className="container">
        <div className="row align-items-center">
          <div className="col-12 col-lg-7">
            <h2 className="align-center-xs">
              LET US HELP YOU REACH <strong>YOUR DIGITAL GOALS</strong>
            </h2>
          </div>
          <div className="col-12 col-lg-5 text-center">
            <img
              src="/reach/images/logo-kitco-reach-l.png"
              alt="Kitco Reach logo"
              width={340}
              height={62}
              className="img-responsive"
            />
          </div>
          <div id="why-kitco-location" />
        </div>
      </div>
    </section>
  );
};
export default DigitalGoals;
