export declare type MediaDTO = {
    name: string;
    alternativeText: string;
    url: string;
};

export declare type TagDTO = {
    name: string;
    color: string;
};

export declare type AuthorDTO = {
    name: string;
    avatar: MediaDTO | undefined;
}

export declare type ArticleDTO = {
    id: string;
    title: string;
    slug: string;
    cover?: MediaDTO | undefined;
    body: string;
    gallery?: (MediaDTO | undefined)[];
    tags?: (TagDTO | undefined)[];
    author?: AuthorDTO | undefined;
    createdAt: string;
    updatedAt: string;
};