import LatestNewsCell from "~/src/components-news/LatestNewsCell/LatestNewsCell";
import Layout from "~/src/components/Layout/Layout";
import PageLayoutTwoColumns from "~/src/components/PageLayoutTwoColumns/PageLayoutTwoColumns";
import TabLinks from "~/src/components/TabLinks/TabLinks";
import futuresTabsLinks from "~/src/lib/futuresTabsLinks";
import React, { FC } from "react";
import { FuturesCategory } from "~/src/types";

interface Props {
  children: JSX.Element;
  category: FuturesCategory | "All";
}

const FuturesCategoryPageWrapper: FC<Props> = ({ children, category }) => (
  <Layout title={`${category} Futures`}>
    <PageLayoutTwoColumns>
      <div>
        <div className="mb-8">
          <TabLinks items={futuresTabsLinks} />
        </div>
        {children}
      </div>
      <div>
        <LatestNewsCell />
      </div>
    </PageLayoutTwoColumns>
  </Layout>
);

export default FuturesCategoryPageWrapper;
