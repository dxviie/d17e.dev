import rss from '@astrojs/rss';
import {getCollection} from 'astro:content';
import {getSecret} from "astro:env/server";

const getRssEntries = async () => {
    const posts = await getCollection('posts');
    const articles = await getCollection('articles');
    const allItems = [
        ...posts.map(post => ({
            ...post.data,
            type: 'posts',
            description: post.data.body,
            title: post.data.title,
            pubDate: post.data.publishDate
        })),
        ...articles.map(article => ({
            ...article.data,
            type: 'blog',
            description: article.data.description,
            title: article.data.title,
            pubDate: article.data.publishDate
        }))
    ];
    // Sort by publish date, newest first
    allItems.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
    return allItems;
}

export async function GET(context) {
    const entries = await getRssEntries();
    return rss({
        title: 'd17e.dev',
        description: 'code. art. ideas.',
        site: context.site,
        items: entries.map((entry) => ({
            ...entry,
            link: `/${entry.type}/${entry.slug}/`,
            pubDate: entry.pubDate,
            customData: entry.cover ?
                `<enclosure
                        url="${getSecret('DIRECTUS_URL')}/assets/${entry.cover.id}"
                        length="${entry.cover.filesize}"
                        type="${entry.cover.type}"
                    />
                ` : undefined
        })),
        stylesheet: '/rss.xsl',
        customData: `
                    <language>en</language>
                    <atom:link href="${context.site}rss.xml" rel="self" type="application/rss+xml"/>
                `,
        xmlns: {
            atom: "http://www.w3.org/2005/Atom"
        }
    });
}
