import {getCollection} from 'astro:content';
import {marked} from 'marked';

// Configure marked renderer the same way as in Markdown.astro
const configureMarked = () => {
    const renderer = new marked.Renderer();

    // Keep the default HTML renderer which simply passes through HTML
    const originalHtml = renderer.html.bind(renderer);
    const originalText = renderer.text.bind(renderer);

    // Process HTML specifically
    renderer.html = (html) => {
        // Wrap iframes in container
        if (html.raw.trim().startsWith('<iframe')) {
            const openProcessing = html.raw.indexOf('openprocessing.org') > -1 ? 'open-processing' : '';
            return `<div class="iframe-container ${openProcessing}">${html.raw}</div>`;
        }
        return originalHtml(html);
    };

    // Process text to style hashtags and make them clickable links
    renderer.text = (text) => {
        let rawText = text.raw || text.text;
        const chunks = rawText.split(/(\s+)/);
        let processedText = '';
        for (let i = 0; i < chunks.length; i++) {
            const chunk = chunks[i];
            if (chunk.match(/^#[a-zA-Z0-9._&+\-@#]+$/)) {
                // This is a hashtag - now supports special characters
                const tagName = chunk.substring(1); // Remove the # symbol
                processedText += `<a href="https://d17e.dev/tags/${tagName.toLowerCase()}" class="hashtag">${chunk}</a>`;
            } else if (chunk.match(/^#[a-zA-Z0-9._&+\-@#]+[.,;:!?]$/)) {
                // Hashtag with special chars and trailing punctuation
                const hashtag = chunk.slice(0, -1);
                const tagName = hashtag.substring(1); // Remove the # symbol
                const punctuation = chunk.slice(-1);
                processedText += `<a href="https://d17e.dev/tags/${tagName.toLowerCase()}" class="hashtag">${hashtag}</a>${punctuation}`;
            } else {
                // Regular text
                processedText += chunk;
            }
        }
        return processedText;
    };

    marked.setOptions({
        renderer: renderer,
        breaks: false,
        pedantic: false,
        gfm: true
    });

    return marked;
};

// Initialize marked with our configuration
const markedInstance = configureMarked();

const getRssEntries = async () => {
    const posts = await getCollection('posts');
    const articles = await getCollection('articles');
    const allItems = [
        ...posts.map(post => ({
            ...post.data,
            type: 'posts',
            description: post.data.description || '',
            content: post.data.body ? markedInstance.parse(post.data.body) : (post.data.description || ''),
            title: post.data.title,
            pubDate: post.data.publishDate,
            author: 'David Vandenbogaerde'
        })),
        ...articles.map(article => ({
            ...article.data,
            type: 'blog',
            description: article.data.description || '',
            content: article.data.body ? markedInstance.parse(article.data.body) : (article.data.description || ''),
            title: article.data.title,
            pubDate: article.data.publishDate,
            author: 'David Vandenbogaerde'
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
    return new Date(date).toLocaleDateString();
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
    <title>D17E.DEV</title>
    <description>I code. I art. Ideas.</description>
    <link>${site}</link>
    <atom:link href="${site}/rss.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>https://d17e.dev/favicon-32x32.png</url>
      <title>D17E.DEV</title>
      <link>https://d17e.dev</link>
      <width>32</width>
      <height>32</height>
    </image>
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
            // Wrap the content in a div to ensure it's valid XML
            xml += `      <content:encoded><![CDATA[<div>${entry.content}</div>]]></content:encoded>\n`;
        }

        // Add author information
        if (entry.author) {
            xml += `      <dc:creator><![CDATA[${entry.author}]]></dc:creator>\n`;
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
