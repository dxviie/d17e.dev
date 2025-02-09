import rss from '@astrojs/rss';
import {getCollection} from 'astro:content';

const getRssEntries = async () => {
    const posts = await getCollection('posts');
    const articles = await getCollection('articles');
    const allItems = [
        ...posts.map(post => ({
            ...post.data,
            type: 'posts',
            description: sanitizeXML(post.data.body),
            title: sanitizeXML(post.data.title)
        })),
        ...articles.map(article => ({
            ...article.data,
            type: 'blog',
            description: sanitizeXML(article.data.description),
            title: sanitizeXML(article.data.title)
        }))
    ];
    // Sort by publish date, newest first
    allItems.sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));
    console.warn('allItems======================', allItems.filter((item) => !item.description || !item.title));
    return allItems;
}

function sanitizeXML(string) {
    if (string === undefined) return '';
    if (!string) return '';
    return string
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

export async function GET(context) {
    const siteUrl = 'https://www.d17e.dev';
    const entries = await getRssEntries();

    // return rss({
    //     title: "d17e.dev",
    //     description: "David 'd17e' Vandenbogaerde's company website",
    //     site: siteUrl,
    //     items: entries.map((post) => ({
    //         title: 'TITLE',
    //         description: 'no description',
    //         // link: `${siteUrl}/${post.type}/${post.slug}`,
    //         // pubDate: new Date(post.publishedDate),
    //         // customData: post.cover ? `
    //         //         <enclosure
    //         //             url="${getSecret('DIRECTUS_URL')}/assets/${post.cover.id}"
    //         //             length="${post.cover.filesize}"
    //         //             type="${post.cover.type}"
    //         //         />
    //         //     ` : ''
    //     })),
    //     xmlns: {
    //         atom: "http://www.w3.org/2005/Atom"
    //     },
    //     customData: `
    //             <language>en</language>
    //             <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    //             <?xml-stylesheet href="/rss.xsl" type="text/xsl"?>
    //         `
    // });

    return rss({
        title: 'd17e.dev',
        description: 'code. art. ideas.',
        site: context.site,
        items: entries.map((post) => ({
            ...post,
            link: `/${post.type}/${post.slug}/`,
            pubDate: post.publishedDate,
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
    // return rss({
    //     title: "d17e.dev",
    //     description: "David 'd17e' Vandenbogaerde's company website",
    //     site: context.site,
    //     items: entries.map((post) => ({
    //         // Required: at least one of these is needed
    //         title: post.title,
    //         description: post.description || post.title,
    //
    //         // // Optional: must be properly formatted if included
    //         // link: `/${post.type}/${post.slug}`,
    //         // pubDate: new Date(post.publishedDate), // Must be a Date object
    //
    //         // Optional: custom XML data
    //         customData: post.cover ? `
    //                 <enclosure
    //                     url="${getSecret('DIRECTUS_URL')}/assets/${post.cover.id}"
    //                     length="${post.cover.filesize}"
    //                     type="${post.cover.type}"
    //                 />
    //             ` : undefined
    //     })),
    //     customData: `
    //             <language>en</language>
    //             <atom:link href="${context.site}rss.xml" rel="self" type="application/rss+xml"/>
    //         `,
    //     xmlns: {
    //         atom: "http://www.w3.org/2005/Atom"
    //     }
    // });
}
