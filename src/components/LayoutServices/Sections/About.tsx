const About = (): JSX.Element => {
  return (
    <div id="about" className="section md-padding">
      <div className="container">
        <div className="row">
          <div className="col-md-5">
            <h2>What CPM Group Trade Signals Are </h2>
            <p className="big theme-color">
              CPM Group has advised clients about short and long-term price
              expectations since 1986.{" "}
            </p>
          </div>
          <div className="col-md-1" />
          <div className="col-md-6">
            <p>
              They cater mostly to large institutional investors, high net worth
              individual investors, producers, consumers, governments, central
              banks, and other entities with large financial exposure to
              commodities. Mostly through consulting programs, they have
              published medium and short-term price projections in reports since
              1986. CPM now is making its trade signals available to the general
              public.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
