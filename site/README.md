# d17e.dev website

generate open-api client code from pom.xml
```
mvn clean generate-sources
```
/api/spec/full_documentation.json is read by openapi-generator-maven-plugin to generate typescript fetch api & model implementations in the /api/client folder
