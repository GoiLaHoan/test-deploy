import { gql } from "graphql-request";

export const categoryFragment = gql`
  fragment CategoryFragment on Category {
    id
    name
    urlAlias
  }
`;

export const sourceFragment = gql`
  fragment SourceFragment on Source {
    description
    id
    name
    subtitle
  }
`;

export const imageFragment = gql`
  fragment ImageFragment on Image {
    detail {
      default {
        srcset
      }
      sources {
        teaser_small {
          srcset
          media
        }
        teaser_medium {
          srcset
          media
        }
        desktop {
          media
          srcset
        }
        mobile {
          media
          srcset
        }
        tablet {
          media
          srcset
        }
      }
    }
  }
`;

export const articleTeaserFragment = gql`
  fragment ArticleTeaserFragment on NewsArticle {
    id
    __typename
    category {
      id
      name
      urlAlias
    }
    teaserSnippet
    title
    teaserHeadline
    urlAlias
    source {
      name
      subtitle
      description
    }
    audioTts {
      isPublished
      snippetUuid
    }
    createdAt
    updatedAt
    # label {
    #   name
    #   imageUrl
    #   type
    #   backgroundColor
    #   textColor
    # }
    image {
      ...ImageFragment
    }
    legacyThumbnailImageUrl
  }
`;
export const offTheWireFragment = gql`
  fragment OffTheWireFragment on OffTheWire {
    id
    __typename
    body
    category {
      id
      name
      urlAlias
    }
    title
    teaserHeadline
    urlAlias
    source {
      name
      subtitle
      description
    }
    createdAt
    updatedAt
    imageUrl
    featured
    legacyThumbnailImageUrl
  }
`;
export const videoSnippetFragment = gql`
  fragment VideoSnippetFragment on VideoSnippet {
    id
    __typename
    category {
      id
      name
      urlAlias
    }
    guests {
      id
      name
    }
    createdAt
    description
    endTime
    frontendPath
    headline
    source
    startTime
    status
    tags {
      id
      name
    }
    thumbnailUuid
    updatedAt
    uuid
    video {
      id
      uuid
    }
  }
`;
export const commentaryTeaserFragment = gql`
  fragment CommentaryTeaserFragment on Commentary {
    __typename
    id
    teaserSnippet
    title
    teaserHeadline
    urlAlias
    createdAt
    updatedAt
    author {
      ...AuthorFragment
    }
    tags {
      id
      name
      urlAlias
    }
    image {
      ...ImageFragment
    }
    legacyThumbnailImageUrl
  }
`;

export const authorFragment = gql`
  fragment AuthorFragment on Author {
    authorWebsite
    body
    email
    facebookId
    name
    imageUrl
    linkedInId
    title
    twitterId
    authorType
    urlAlias
    roles
  }
`;
