
# Write your query or mutation here

```
query {
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
```

```typescript
type GalleryItem = {
  name: string;
  alternativeText: string | null;
  url: string;
};

type Tag = {
  name: string;
  color: string | null;
};

type Article = {
  title: string;
  slug: string;
  cover: GalleryItem;
  body: string;
  gallery: GalleryItem[];
  tags: Tag[];
  author: {
    name: string;
    avatar: GalleryItem;
  };
  createdAt: string;
  updatedAt: string;
};
```