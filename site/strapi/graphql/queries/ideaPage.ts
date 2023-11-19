import { gql } from "graphql-request";

export const GET_IDEAS_PAGE_QUERY = gql`
  query GetIdeasPage {
    ideasPage {
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
