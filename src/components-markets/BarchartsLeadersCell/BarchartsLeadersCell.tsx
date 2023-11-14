import { FC } from "react";

import QuotesTable from "~/src/components/QuotesTable/QuotesTable";
import { useQuery } from "react-query";
import { markets } from "~/src/lib/markets-factory.lib";

export type LeaderTypes = "active" | "gainers" | "losers";

const BarchartsLeadersCell: FC<{
  leaderType?: LeaderTypes;
  limit?: number;
  showMore?: boolean;
}> = ({ leaderType = "active", limit = 5, showMore = false }) => {
  const { data } = useQuery(
    markets.barchartsLeaders({
      variables: {
        leaderType: leaderType || "active",
        limit: !limit ? 5 : limit,
      },
    }),
  );

  function switchTitle(): string {
    switch (leaderType) {
      case "active":
        return "Most Active Stocks";
      case "gainers":
        return "Top Gainers";
      case "losers":
        return "Top Losers";
      default:
        return "";
    }
  }

  return (
    <QuotesTable
      title={switchTitle()}
      section={"stocks"}
      data={data?.leaders?.results}
      showMore={showMore}
    />
  );
};

export default BarchartsLeadersCell;
