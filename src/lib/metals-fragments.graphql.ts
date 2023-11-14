import { gql } from "graphql-request";

export const forexFragment = gql`
  fragment ForexFragment on ForexQuote {
    timestamp
    ask
    mid
    bid
    change
    changePercentage
    ctousd
    usdtoc
  }
`;

export const metalFragment = gql`
  fragment MetalFragment on Metal {
    ID
    symbol
    currency
    name
    results {
      ...MetalQuoteFragment
    }
  }
`;

// ideally this will only ever be consumed in QuotesMetal
export const metalQuoteFragment = gql`
  fragment MetalQuoteFragment on Quote {
    ID
    timestamp
    high
    low
    open
    close
    ask
    bid
    mid
    originalTime
    change
    changePercentage
    unit
  }
`;

export const barchartFragment = gql`
  fragment BarchartFragment on BarchartQuote {
    symbol
    name
    lastPrice
    netChange
    percentChange
    open
    high
    low
    close
  }
`;

export const londonQuoteFragment = gql`
  fragment LondonQuoteFragment on LondonQuote {
    ID
    goldAM
    goldPM
    timestamp
    silver
    platinumAM
    platinumPM
    palladiumAM
    palladiumPM
  }
`;
