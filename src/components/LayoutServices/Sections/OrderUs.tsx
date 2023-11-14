import { env } from "~/src/env/client.mjs";

const OrderUs = (): JSX.Element => {
  return (
    <div id="order" className="section md-padding bg-theme">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h2 className="white-text">
              THE 2019 CPM GROUP GOLD, SILVER AND PGM YEARBOOKS ARE NOW
              AVAILABLE
            </h2>{" "}
            <img
              className="stamp"
              src={`${env.NEXT_PUBLIC_CDN_PAGE}/services/images/10-stamp.png`}
            />{" "}
            <img
              className="book img-responsive"
              src={`${env.NEXT_PUBLIC_CDN_PAGE}/services/images/book-gif.gif`}
            />
          </div>
          <div className="col-md-6">
            <p>
              CPM Group Yearbooks each contain definitive and detailed
              statistics and analysis on the international precious metal
              markets including:
            </p>
            <ul className="order-points">
              <li>Analysis of supply and demand trends</li>
              <li>Bullion and futures market activity</li>
              <li>Projections for the current year</li>
              <li>Detailed information on mine production</li>
              <li>Secondary recovery</li>
              <li>Fabrication demand</li>
              <li>Investment demand</li>
              <li>Historical price information</li>
              <li>
                Details and analysis on many other aspects of the global gold
                market
              </li>
            </ul>
            <button
              onClick={() =>
                (window.location.href = "//www.cpmgroup.com/store/")
              }
              className="order-btn"
            >
              ORDER NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderUs;
