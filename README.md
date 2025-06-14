# My website, d17e.dev

Find out why it's here in the [blog post I wrote about it](https://www.d17e.dev/blog/what-is-this-place)



## Running locally

```bash
npm install && npm run dev
```

or

```bash
npm install && npm run start
```

for a development or production build respectively.

## Project Structure

- **`/components`**: React components
- **`/pages`**: Next.js pages
- **`/public`**: Static assets
- **`/services`**: APIs and other services
- **`/strapi`**: CMS integration
- **`/styles`**: Global styles

## Dependencies

### Main Dependencies

- **UI Framework & Styling**: Chakra UI (`@chakra-ui/react` v2.8.2), Emotion (`@emotion/react` v11.11.1, `@emotion/styled` v11.11.0)
- **Error Tracking**: Sentry (`@sentry/nextjs` v7.80.0)
- **Image Processing**: Blurhash (v2.0.5)
- **Animation**: Framer Motion (v6.5.1)
- **Data Management**: GraphQL (v16.8.1), GraphQL Request (v6.1.0)
- **Time Formatting**: Moment.js (v2.29.4)
- **Framework**: Next.js (v14.0.2)
- **Canvas Drawing**: Paper.js (v0.12.17)
- **React Ecosystem**: React (v18.2.0), React DOM (v18.2.0), React Markdown (v8.0.7), React Slick (v0.29.0)
- **Reading Time Estimation**: Reading Time (v1.5.0)
- **Data Fetching**: SWR (v2.2.4)

### Development Dependencies

- **GraphQL Tooling**: GraphQL Code Generator (`@graphql-codegen/cli` v3.3.0, `@graphql-codegen/client-preset`
  v3.0.0, `@graphql-codegen/introspection` v3.0.1)
- **TypeScript Definitions**: Node (`@types/node` v18.11.3), React (`@types/react` v18.0.21), React DOM (`@types/react-dom` v18.0.6)
- **Linting**: ESLint (v8.26.0), ESLint Config for Next.js (v12.3.1)
- **TypeScript**: TypeScript (v4.8.4)

## Miscellaneous Notes

- Opted for GraphQL integration as I was having trouble with openapi spec & generator available at the time

