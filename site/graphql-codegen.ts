
import type { CodegenConfig } from '@graphql-codegen/cli';

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
  // schema: './strapi/graphql/schema.graphql',
  schema: 'https://strapi.d17e.dev/graphql/schema.graphql',
  documents: './strapi/graphql/queries/**/*.ts',
};

export default config;
