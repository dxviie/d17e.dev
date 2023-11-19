import { gql } from "graphql-request";

export const GET_FIND_ME_ON_LINK_LIST_QUERY = gql`
  query GetFindMeOnLinkList {
    findMeOnLinkList {
      data {
        attributes {
          links {
            data {
              attributes {
                title
                link
                description
                icon {
                  data {
                    attributes {
                      url
                      blurhash
                      alternativeText
                    }
                  }
                }
                tags {
                  data {
                    attributes {
                      name
                      color
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
