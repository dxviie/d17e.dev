import { gql } from "graphql-request";

export const GET_ART_PAGE_QUERY = gql`
  query GetArtPage {
    artPage {
      data {
        attributes {
          title
          description
          author {
            data {
              attributes {
                name
                avatar {
                  data {
                    attributes {
                      url
                      blurhash
                      alternativeText
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
