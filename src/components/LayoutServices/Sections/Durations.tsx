const Durations = (): JSX.Element => {
  return (
    <div id="durations" className="section md-padding">
      <div className="container">
        <div className="row">
          <div className="col-md-5">
            <h2>Trade signals Durations</h2>
            <p className="big theme-color">
              Spot trades are focused on one or two-week time horizons.{" "}
            </p>
          </div>
          <div className="col-md-1" />
          <div className="col-md-6">
            <p>
              The average period held from August to November 2018 was 4.5 days.
              Options positions are designed typically with a one to a
              five-month horizon. Often, they are closed out early if profit
              objectives are hit.{" "}
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4" />
          <div className="col-md-4">
            <button
              id="signupnow"
              className="main-btn"
              onClick={() => {
                const element = document.getElementById("contact");
                element.scrollIntoView({ behavior: "smooth" });
              }}
            >
              SIGN UP NOW
            </button>
          </div>
          <div className="col-md-4" />
        </div>
      </div>
    </div>
  );
};

export default Durations;
