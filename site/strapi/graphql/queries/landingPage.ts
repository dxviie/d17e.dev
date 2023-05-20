import { gql } from "graphql-request";

export const GET_LANDING_PAGE_QUERY = gql`
  query GetLandingPage {
    landingPage {
      data {
        attributes {
          codeDescription
          artDescription
          ideasDescription
          featuredArtPosts {
            data {
              attributes {
                slug
              }
            }
          }
          featuredIdeaArticles {
            data {
              attributes {
                slug
              }
            }
          }
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
