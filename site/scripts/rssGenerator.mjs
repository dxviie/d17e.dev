import path from 'path';
import fs from 'fs';
import {Directus} from "@directus/sdk";
import * as dotenv from "dotenv";
import {fileURLToPath} from "node:url";


// Load environment variables
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({path: path.join(__dirname, '../.env')});

const DIRECTUS_URL = "https://directus.d17e.dev";

const createDirectusClient = async () => {
    const client = new Directus(DIRECTUS_URL);
    // Authenticate
    await client.auth.login({
        email: process.env.DIRECTUS_EMAIL,
        password: process.env.DIRECTUS_PASS
    });
    return client;
}

const getRssEntries = async () => {
    const client = await createDirectusClient();
    let filter = {
        status: {
            _eq: 'published'
        }
    };
    const posts = await client.items('Posts').readByQuery({
        fields: ['*', 'cover.*'],
        filter: filter,
        limit: -1
    });
    const articles = await client.items('Articles').readByQuery({
        fields: ['*', 'cover.*'],
        filter: filter,
        limit: -1
    });
    const allItems = [
        ...posts.data.map(post => ({
            ...post,
            type: 'posts',
            description: sanitizeXML(post.body),
            title: sanitizeXML(post.title)
        })),
        ...articles.data.map(article => ({
            ...article,
            type: 'blog',
            description: sanitizeXML(article.description),
            title: sanitizeXML(article.title)
        }))
    ];
    // Sort by publish date, newest first
    allItems.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
    return allItems;
}

function sanitizeXML(string) {
    if (!string) return '';
    return string
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

// Import your ContentApi using dynamic import
const generateRSS = async () => {
    try {


        const entries = await getRssEntries();
        console.log('Entries', entries.length);
        // return;

        const siteUrl = 'https://d17e.dev';
        const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
        <?xml-stylesheet href="/rss.xsl" type="text/xsl"?>
      <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
        <channel>
          <title>d17e.dev</title>
          <link>${siteUrl}</link>
          <description>David 'd17e' Vandenbogaerde's company website</description>
          <language>en</language>
          <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
          <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
          ${entries
            .map(post => `
              <item>
                <title>${post.title}</title>
                <link>${siteUrl}/${post.type}/${post.slug}</link>
                <guid isPermaLink="true">${siteUrl}/${post.slug}</guid>
                <description>${post.description || ''}</description>
                <pubDate>${new Date(post.publishDate).toUTCString()}</pubDate>
                <enclosure url="${DIRECTUS_URL}/assets/${post.cover.id}" length="${post.cover.filesize}" type="${post.cover.type}" />
              </item>
            `)
            .join('')}
        </channel>
      </rss>`;

        const publicDir = path.join(process.cwd(), 'public');
        if (!fs.existsSync(publicDir)) {
            fs.mkdirSync(publicDir);
        }

        fs.writeFileSync(path.join(process.cwd(), 'public/rss.xml'), rssXml);
        console.log('RSS feed generated successfully');
    } catch (error) {
        console.error('Error generating RSS feed:', error);
    }
};

generateRSS();