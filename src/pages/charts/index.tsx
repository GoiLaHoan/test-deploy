import Layout from "~/src/components/Layout/Layout";

import LatestNewsCell from "~/src/components-news/LatestNewsCell/LatestNewsCell";
import { MetalChartCard } from "~/src/components/metal-chart-card/metal-chart-card.component";

const ChartsLanding = () => {
  return (
    <Layout title="Charts &amp; Data">
      <div className="grid gap-8 px-4 lg:grid-cols-layout-2 lg:px-0 sm:grid-cols-1 sm:px-4">
        <div>
          <h1 className="mb-4 text-3xl font-bold">Kitco Precious Metals</h1>
          <div className="grid gap-6 md:grid-cols-2 md:gap-8 sm:grid-cols-1 sm:gap-x-4">
            <MetalChartCard name="Gold" symbol="AU" href="/charts/gold" />
            <MetalChartCard name="Silver" symbol="AG" href="/charts/silver" />
            <MetalChartCard
              name="Platinum"
              symbol="PT"
              href="/charts/platinum"
            />
            <MetalChartCard
              name="Palladium"
              symbol="PD"
              href="/charts/palladium"
            />
          </div>
        </div>
        <div>
          <LatestNewsCell />
        </div>
      </div>
    </Layout>
  );
};

export default ChartsLanding;
