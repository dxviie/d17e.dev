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
    avatar: MediaDTO;
}

export declare type ArticleDTO = {
    id: string;
    slug: string;
    title: string;
    description: string;
    body: string;
    cover: MediaDTO;
    gallery: (MediaDTO)[];
    tags: (TagDTO)[];
    author: AuthorDTO;
    createdAt: string;
    updatedAt: string;
    publishDtm: string;
};