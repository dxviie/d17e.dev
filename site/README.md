# d17e.dev website

generate open-api client code from pom.xml

```
mvn clean generate-sources
```

/api/spec/full_documentation.json is read by openapi-generator-maven-plugin to generate typescript fetch api & model implementations in the
/api/client folder

the openapi spec that's generated gives errors when generating code and couldn't get this to work properly so opted to install the graphql
support and use the @graphql-codegen plugin.
Extra benefit of this is that my server is now re-generating the schema on every change and this can be consumed by the plugin.

We could give the openapi route another go using the orval.dev code generator.
Cfr: https://forum.strapi.io/t/sharing-strapi-schema-with-other-projects-e-g-front-ends/25547/5

