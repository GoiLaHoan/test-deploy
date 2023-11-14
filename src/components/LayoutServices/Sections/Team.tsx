import { env } from "~/src/env/client.mjs";

const Team = (): JSX.Element => {
  return (
    <div id="team" className="section md-padding">
      <div className="container">
        <div className="row">
          <div className="col-md-5 image-sec">
            <h2>The Staff Behind The Trade signals </h2>
            <p className="big theme-color">
              Trade signals released by CPM Group are the result of the
              collective efforts of CPM’s entire staff and reflect the
              collective view of market conditions and trends as established and
              maintained on an on-going basis by the entire group.{" "}
            </p>
            <div className="image-building" />
          </div>
          <div className="col-md-1" />
          <div className="col-md-6">
            <div className="team">
              <div className="row team-row">
                <div className="col-md-4">
                  <div className="team-img">
                    <img
                      className="img-responsive"
                      src={`${env.NEXT_PUBLIC_CDN_PAGE}/services/images/staff-carlos.png`}
                      alt="staff-carlos"
                    />
                  </div>
                </div>
                <div className="col-md-8 team-content">
                  <h2>Carlos A. Sanchez</h2>{" "}
                  <span>
                    Director for Asset Management and Commodities Management
                  </span>
                </div>
              </div>
              <p>
                He has been with CPM Group since 1999, starting as a Research
                Analyst. He has developed an extraordinary capacity for
                developing, pricing, and managing commodities positions for both
                investing and hedging purposes. He continues to contribute
                importantly to CPM’s research efforts and is responsible for
                major client consulting programs related to metals and
                commodities management.{" "}
              </p>
            </div>
            <div className="team">
              <div className="row team-row">
                <div className="col-md-4">
                  <div className="team-img">
                    <img
                      className="img-responsive"
                      src={`${env.NEXT_PUBLIC_CDN_PAGE}/services/images/staff-rohit.png`}
                      alt="staff-rohit"
                    />
                  </div>
                </div>
                <div className="col-md-8 team-content">
                  <h2>Rohit Savant</h2> <span>Research Director</span>
                </div>
              </div>
              <p>
                With more than 13 years of active involvement in researching and
                analyzing commodities markets, especially precious metals, and
                developing price projections and views ranging from five days to
                33 years. CPM’s is Applied Research, and Rohit and the research
                team are actively involved in formulating price and trade
                recommendations.
              </p>
            </div>
            <div className="team">
              <div className="row team-row">
                <div className="col-md-4">
                  <div className="team-img">
                    <img
                      className="img-responsive"
                      src={`${env.NEXT_PUBLIC_CDN_PAGE}/services/images/staff-jeffrey.png`}
                      alt="staff-jeffrey"
                    />
                  </div>
                </div>
                <div className="col-md-8 team-content">
                  <h2>Jeffrey M. Christian</h2> <span>FOUNDER</span>
                </div>
              </div>
              <p>
                He has managed the operations. He is highly respected as a
                precious metals and commodities analyst around the world.{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
