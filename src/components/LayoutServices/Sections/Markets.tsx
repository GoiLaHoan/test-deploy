import { env } from "~/src/env/client.mjs";

const Markets = (): JSX.Element => {
  return (
    <div id="markets" className="section md-padding container">
      <div className="markets-inner">
        <div className="text-center">
          <h2>Markets covered</h2>
        </div>
        <div className="row">
          <div className="col-xs-4">
            <div className="img-container">
              <img
                className="center-block img-responsive"
                src={`${env.NEXT_PUBLIC_CDN_PAGE}/services/images/metals/gold.jpg`}
                alt=""
              />
              <div className="img-container--text-wrapper">
                <p>GOLD</p>
              </div>
            </div>
          </div>
          <div className="col-xs-4">
            <div className="img-container">
              <img
                className="center-block img-responsive"
                src={`${env.NEXT_PUBLIC_CDN_PAGE}/services/images/metals/silver.jpg`}
                alt=""
              />
              <div className="img-container--text-wrapper">
                <p>SILVER</p>
              </div>
            </div>
          </div>
          <div className="col-xs-4">
            <div className="img-container">
              <img
                className="center-block img-responsive"
                src={`${env.NEXT_PUBLIC_CDN_PAGE}/services/images/metals/copper.jpg`}
                alt=""
              />
              <div className="img-container--text-wrapper">
                <p>COPPER</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-4">
            <div className="img-container">
              <img
                className="center-block img-responsive"
                src={`${env.NEXT_PUBLIC_CDN_PAGE}/services/images/metals/platinium.jpg`}
                alt=""
              />
              <div className="img-container--text-wrapper">
                <p>PLATINUM</p>
              </div>
            </div>
          </div>
          <div className="col-xs-4">
            <div className="img-container">
              <img
                className="center-block img-responsive"
                src={`${env.NEXT_PUBLIC_CDN_PAGE}/services/images/metals/petroleum.jpg`}
                alt=""
              />
              <div className="img-container--text-wrapper">
                <p>PETROLEUM</p>
              </div>
            </div>
          </div>
          <div className="col-xs-4">
            <div className="img-container">
              <img
                className="center-block img-responsive"
                src={`${env.NEXT_PUBLIC_CDN_PAGE}/services/images/metals/palladium_2.jpg`}
                alt=""
              />
              <div className="img-container--text-wrapper">
                <p>PALLADIUM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Markets;
