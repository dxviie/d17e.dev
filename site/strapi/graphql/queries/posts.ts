// noinspection GraphQLUnresolvedReference

import { gql } from "graphql-request";

export const GET_POSTS_QUERY = gql`
  query GetPosts {
    posts {
      data {
        id
        attributes {
          author {
            data {
              attributes {
                avatar {
                  data {
                    attributes {
                      url
                      blurhash
                      alternativeText
                    }
                  }
                }
                name
              }
            }
          }
          link
          message
          slug
          title
          content {
            data {
              attributes {
                url
                blurhash
                alternativeText
              }
            }
          }
          createdAt
          publishDtm
          publishedAt
        }
      }
    }
  }
`;

export const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: String!) {
    posts(filters: { slug: { eq: $slug } }) {
      data {
        id
        attributes {
          author {
            data {
              attributes {
                avatar {
                  data {
                    attributes {
                      url
                      blurhash
                      alternativeText
                    }
                  }
                }
                name
              }
            }
          }
          link
          message
          slug
          title
          content {
            data {
              attributes {
                url
                blurhash
                alternativeText
              }
            }
          }
          createdAt
          publishDtm
          publishedAt
        }
      }
    }
  }
`;
