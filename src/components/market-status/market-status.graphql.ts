import { gql } from "graphql-request";

gql`
  query GetMarketStatus {
    GetMarketStatus {
      next
      status
    }
  }
`;
