/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query GetArtPage {\n    artPage {\n      data {\n        attributes {\n          title\n          description\n          author {\n            data {\n              attributes {\n                name\n                avatar {\n                  data {\n                    attributes {\n                      url\n                      blurhash\n                      alternativeText\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.GetArtPageDocument,
    "\n  query GetFindMeOnLinkList {\n    findMeOnLinkList {\n      data {\n        attributes {\n          links {\n            data {\n              attributes {\n                title\n                link\n                description\n                icon {\n                  data {\n                    attributes {\n                      url\n                      blurhash\n                      alternativeText\n                    }\n                  }\n                }\n                tags {\n                  data {\n                    attributes {\n                      name\n                      color\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.GetFindMeOnLinkListDocument,
    "\n  query GetIdeasPage {\n    ideasPage {\n      data {\n        attributes {\n          title\n          description\n          author {\n            data {\n              attributes {\n                name\n                avatar {\n                  data {\n                    attributes {\n                      url\n                      blurhash\n                      alternativeText\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.GetIdeasPageDocument,
    "\n  query GetLandingPage {\n    landingPage {\n      data {\n        attributes {\n          codeDescription\n          artDescription\n          ideasDescription\n          contactDescription\n          featuredArtPosts {\n            data {\n              attributes {\n                slug\n              }\n            }\n          }\n          featuredIdeaArticles {\n            data {\n              attributes {\n                slug\n              }\n            }\n          }\n          author {\n            data {\n              attributes {\n                name\n                avatar {\n                  data {\n                    attributes {\n                      url\n                      blurhash\n                      alternativeText\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.GetLandingPageDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetArtPage {\n    artPage {\n      data {\n        attributes {\n          title\n          description\n          author {\n            data {\n              attributes {\n                name\n                avatar {\n                  data {\n                    attributes {\n                      url\n                      blurhash\n                      alternativeText\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetArtPage {\n    artPage {\n      data {\n        attributes {\n          title\n          description\n          author {\n            data {\n              attributes {\n                name\n                avatar {\n                  data {\n                    attributes {\n                      url\n                      blurhash\n                      alternativeText\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetFindMeOnLinkList {\n    findMeOnLinkList {\n      data {\n        attributes {\n          links {\n            data {\n              attributes {\n                title\n                link\n                description\n                icon {\n                  data {\n                    attributes {\n                      url\n                      blurhash\n                      alternativeText\n                    }\n                  }\n                }\n                tags {\n                  data {\n                    attributes {\n                      name\n                      color\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetFindMeOnLinkList {\n    findMeOnLinkList {\n      data {\n        attributes {\n          links {\n            data {\n              attributes {\n                title\n                link\n                description\n                icon {\n                  data {\n                    attributes {\n                      url\n                      blurhash\n                      alternativeText\n                    }\n                  }\n                }\n                tags {\n                  data {\n                    attributes {\n                      name\n                      color\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetIdeasPage {\n    ideasPage {\n      data {\n        attributes {\n          title\n          description\n          author {\n            data {\n              attributes {\n                name\n                avatar {\n                  data {\n                    attributes {\n                      url\n                      blurhash\n                      alternativeText\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetIdeasPage {\n    ideasPage {\n      data {\n        attributes {\n          title\n          description\n          author {\n            data {\n              attributes {\n                name\n                avatar {\n                  data {\n                    attributes {\n                      url\n                      blurhash\n                      alternativeText\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetLandingPage {\n    landingPage {\n      data {\n        attributes {\n          codeDescription\n          artDescription\n          ideasDescription\n          contactDescription\n          featuredArtPosts {\n            data {\n              attributes {\n                slug\n              }\n            }\n          }\n          featuredIdeaArticles {\n            data {\n              attributes {\n                slug\n              }\n            }\n          }\n          author {\n            data {\n              attributes {\n                name\n                avatar {\n                  data {\n                    attributes {\n                      url\n                      blurhash\n                      alternativeText\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetLandingPage {\n    landingPage {\n      data {\n        attributes {\n          codeDescription\n          artDescription\n          ideasDescription\n          contactDescription\n          featuredArtPosts {\n            data {\n              attributes {\n                slug\n              }\n            }\n          }\n          featuredIdeaArticles {\n            data {\n              attributes {\n                slug\n              }\n            }\n          }\n          author {\n            data {\n              attributes {\n                name\n                avatar {\n                  data {\n                    attributes {\n                      url\n                      blurhash\n                      alternativeText\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;