// noinspection GraphQLUnresolvedReference

import {gql} from "graphql-request";
import {PublicationState} from "../codegen/graphql";

const publicationState = process.env.NODE_ENV === "development" ? PublicationState.Preview : PublicationState.Live;

export const GET_POSTS_QUERY = gql`
    query GetPosts {
        posts (publicationState: ${publicationState}) {
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
                    richMessage
                    linkDescription
                }
            }
        }
    }
`;

export const GET_POST_BY_SLUG = gql`
    query GetPostBySlug($slug: String!) {
        posts(filters: { slug: { eq: $slug } }, publicationState: ${publicationState}) {
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
                    richMessage
                    linkDescription
                }
            }
        }
    }
`;
