import { env } from "~/src/env/client.mjs";

const Strategies = (): JSX.Element => {
  return (
    <div id="strategies" className="section md-padding">
      <div className="container">
        <div className="strategies-row">
          <h2>Strategies</h2>{" "}
          <img
            className="strategies-arrow"
            src={`${env.NEXT_PUBLIC_CDN_PAGE}/services/images/long-arrow-right-grey.png`}
          />
          <h2 className="strategies-point">Spot Physical</h2>
          <h2 className="strategies-point">Futures</h2>
          <h2 className="strategies-point">Forwards</h2>
          <h2 className="strategies-point">Options</h2>
        </div>
      </div>
    </div>
  );
};

export default Strategies;
