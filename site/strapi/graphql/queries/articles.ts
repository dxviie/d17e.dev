// noinspection GraphQLUnresolvedReference

import { gql } from "graphql-request";

export const GET_ARTICLES_QUERY = gql`
  query GetArticles {
    articles {
      data {
        id
        attributes {
          title
          slug
          cover {
            data {
              attributes {
                name
                alternativeText
                url
                blurhash
              }
            }
          }
          description
          body
          gallery {
            data {
              attributes {
                name
                alternativeText
                url
                blurhash
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
          author {
            data {
              attributes {
                name
                avatar {
                  data {
                    attributes {
                      url
                      blurhash
                    }
                  }
                }
              }
            }
          }
          createdAt
          updatedAt
          publishDtm
        }
      }
    }
  }
`;

export const GET_ARTICLE_BY_ID = gql`
  query GetArticleById($id: ID!) {
    article(id: $id) {
      data {
        id
        attributes {
          title
          slug
          cover {
            data {
              attributes {
                name
                alternativeText
                url
                blurhash
              }
            }
          }
          description
          body
          gallery {
            data {
              attributes {
                name
                alternativeText
                url
                blurhash
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
          author {
            data {
              attributes {
                name
                avatar {
                  data {
                    attributes {
                      url
                      blurhash
                    }
                  }
                }
              }
            }
          }
          createdAt
          updatedAt
          publishDtm
        }
      }
    }
  }
`;

export const GET_ARTICLE_BY_SLUG = gql`
  query GetArticleBySlug($slug: String!) {
    articles(filters: { slug: { eq: $slug } }) {
      data {
        id
        attributes {
          title
          slug
          cover {
            data {
              attributes {
                name
                alternativeText
                url
                blurhash
              }
            }
          }
          description
          body
          gallery {
            data {
              attributes {
                name
                alternativeText
                url
                blurhash
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
          author {
            data {
              attributes {
                name
                avatar {
                  data {
                    attributes {
                      url
                      blurhash
                    }
                  }
                }
              }
            }
          }
          createdAt
          updatedAt
          publishDtm
        }
      }
    }
  }
`;
