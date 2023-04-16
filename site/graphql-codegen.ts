
import type { CodegenConfig } from '@graphql-codegen/cli';

// const config: CodegenConfig = {
//   overwrite: true,
//   schema: "http://127.0.0.1:1337/graphql/schema.graphql",
//   documents: "src/**/*.tsx",
//   generates: {
//     "src/api/graphql/types": {
//       preset: "client",
//       plugins: []
//     },
//     "./graphql.schema.json": {
//       plugins: ["introspection"]
//     }
//   }
// };

const config: CodegenConfig = {
  overwrite: true,
  generates: {
    'strapi/graphql/codegen/': {
      plugins: [],
      preset: 'client',
      config: {
        skipTypename: true,
        withHooks: true,
        withHOC: false,
        withComponent: false,
      },
    },
  },
  schema: 'https://strapi.d17e.dev/graphql/schema.graphql',
  documents: './strapi/graphql/queries/**/*.ts',
};

export default config;
