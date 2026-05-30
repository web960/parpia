import gql from "graphql-tag";

export const ContentMetaQuery = gql`
  query ContentMetaQuery(
    $slug: ID!
    $idType: ContentNodeIdTypeEnum
    $preview: Boolean = false
  ) {
    contentNode(id: $slug, idType: $idType, asPreview: $preview) {
      ... on Page {
        title
      }
      ... on Post {
        title
      }
    }
  }
`;
