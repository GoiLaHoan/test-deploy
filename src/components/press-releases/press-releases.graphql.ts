import { gql } from "graphql-request";

gql`
  query QueuePressReleases($limit: Int, $offset: Int) {
    pressReleases: nodeListQueue(
      limit: $limit
      offset: $offset
      bundles: [PressRelease]
      queueId: "press_releases"
    ) {
      total
      items {
        ... on PressRelease {
          id
          title
          createdAt
          updatedAt
          url
        }
      }
    }

    ids: nodeIdsInQueue(queueId: "press_releases")
  }
`;
