import { DocumentNode } from "graphql";
import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient("https://kitco.graphcdn.app");

export const gateway = (query: string | DocumentNode, variables?: object) =>
  client.request(query, variables);

export const barcharts = (url: string) => fetch(url).then((r) => r.json());

export const kdbrest = (url: string) =>
  fetch("https://kdb-api.dev.kitco.com/api/v1" + url).then((r) => r.json());

export const drupal = (url?: string) =>
  fetch("https://cms-drupal.dev.kitco.com" + url).then((r) => r.json());

const fetchers = {
  barcharts,
  drupal,
  gateway,
  kdbrest,
};

export default fetchers;
