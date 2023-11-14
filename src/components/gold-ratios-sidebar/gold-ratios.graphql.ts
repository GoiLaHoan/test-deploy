import { gql } from "graphql-request";

gql`
  query MktQuotesGoldRatiosSidebar($timestamp: Int!) {
    GetBarchartQuotes(
      symbols: "^XAUUSD,^XAGUSD,^XPTUSD,$XAU"
      timestamp: $timestamp
    ) {
      results {
        ...BarchartFragment
      }
    }
  }
`;
