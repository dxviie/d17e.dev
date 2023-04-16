// noinspection GraphQLUnresolvedReference

import { gql } from 'graphql-request';

export const GET_ARTICLES_QUERY = gql`
    query GetArticles {
        articles{
            data {
                attributes {
                    title,
                    slug,
                    cover { data { attributes {
                        name, alternativeText, url
                    }}},
                    body,
                    gallery { data { attributes {
                        name, alternativeText, url
                    }}},
                    tags { data { attributes {
                        name, color
                    }}},
                    author { data { attributes {
                        name,
                        avatar { data { attributes {
                            url
                        }}}}}},
                    createdAt,
                    updatedAt
                }
            }
        }
    }
`;