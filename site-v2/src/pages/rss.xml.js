import {getCollection} from 'astro:content';

const getRssEntries = async () => {
    const posts = await getCollection('posts');
    const articles = await getCollection('articles');
    const allItems = [
        ...posts.map(post => ({
            ...post.data,
            type: 'posts',
            description: post.data.body || post.data.description || '',
            content: post.data.body || post.data.description || '',
            title: post.data.title,
            pubDate: post.data.publishDate
        })),
        ...articles.map(article => ({
            ...article.data,
            type: 'blog',
            description: article.data.description || '',
            content: article.data.description || '',
            title: article.data.title,
            pubDate: article.data.publishDate
        }))
    ];
    // Sort by publish date, newest first
    allItems.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
    return allItems;
}

function getMediaUrl(cover) {
    if (!cover || !cover.id) return '';
    
    if (cover.type && cover.type.startsWith('video')) {
        return `https://d17e.dev/assets/${cover.id}.mp4`;
    }
    return `https://d17e.dev/assets/${cover.id}.webp`;
}

function getMediaType(cover) {
    if (!cover) return '';
    
    if (cover.type) return cover.type;
    
    // Infer type if not provided
    if (cover.id && cover.id.endsWith('.mp4')) {
        return 'video/mp4';
    } else if (cover.id && cover.id.endsWith('.webp')) {
        return 'image/webp';
    } else {
        return 'image/webp'; // Default
    }
}

function formatRFC822Date(date) {
    return new Date(date).toUTCString();
}

export async function GET(context) {
    const entries = await getRssEntries();
    const site = 'https://d17e.dev';
    
    // Manual XML generation with proper stylesheet processing instruction
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet href="/rss.xsl" type="text/xsl"?>
<rss version="2.0"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>d17e.dev</title>
    <description>code. art. ideas.</description>
    <link>${site}</link>
    <atom:link href="${site}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>en</language>
    <lastBuildDate>${formatRFC822Date(new Date())}</lastBuildDate>
`;

    // Add each item
    for (const entry of entries) {
        const pubDate = formatRFC822Date(entry.pubDate);
        const link = `${site}/${entry.type}/${entry.slug}/`;
        
        xml += `    <item>
      <title>${escapeXml(entry.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${entry.description || ''}]]></description>
`;

        // Add content:encoded if available
        if (entry.content) {
            xml += `      <content:encoded><![CDATA[${entry.content}]]></content:encoded>\n`;
        }
        
        // Add media enclosure if available
        if (entry.cover && getMediaUrl(entry.cover)) {
            xml += `      <enclosure url="${getMediaUrl(entry.cover)}" length="${entry.cover.filesize || 0}" type="${getMediaType(entry.cover)}"/>\n`;
        }
        
        xml += `    </item>\n`;
    }
    
    // Close the XML
    xml += `  </channel>
</rss>`;
    
    // Return as Response with proper Content-Type
    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml; charset=utf-8'
        }
    });
}

// Helper function to escape XML special characters
function escapeXml(unsafe) {
    if (typeof unsafe !== 'string') return '';
    return unsafe
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}
