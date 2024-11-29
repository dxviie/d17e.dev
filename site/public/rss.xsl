<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
>
    <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
    <xsl:template match="/">
        <html xmlns="http://www.w3.org/1999/xhtml">
            <head>
                <title>
                    <xsl:value-of select="/rss/channel/title"/>
                    - RSS Feed
                </title>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <style>
                    body {
                    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                    line-height: 1.6;
                    max-width: 900px;
                    margin: 0 auto;
                    padding: 2rem;
                    background: #f5f5f5;
                    color: #333;
                    }
                    header {
                    margin-bottom: 2rem;
                    padding-bottom: 1rem;
                    border-bottom: 2px solid #eaeaea;
                    }
                    h1 {
                    margin: 0;
                    color: #2c3e50;
                    }
                    .feed-description {
                    color: #666;
                    margin: 0.5rem 0;
                    }
                    .item {
                    background: white;
                    padding: 1.5rem;
                    margin-bottom: 1.5rem;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    }
                    .item-title {
                    margin: 0;
                    color: #2c3e50;
                    }
                    .item-title a {
                    text-decoration: none;
                    color: inherit;
                    }
                    .item-title a:hover {
                    text-decoration: underline;
                    }
                    .item-meta {
                    font-size: 0.9rem;
                    color: #666;
                    margin: 0.5rem 0;
                    }
                    .item-description {
                    margin: 1rem 0;
                    }
                    .item-image {
                    max-width: 100%;
                    height: auto;
                    margin: 1rem 0;
                    border-radius: 4px;
                    }
                    @media (max-width: 600px) {
                    body {
                    padding: 1rem;
                    }
                    .item {
                    padding: 1rem;
                    }
                    }
                </style>
            </head>
            <body>
                <header>
                    <h1>
                        <xsl:value-of select="/rss/channel/title"/>
                    </h1>
                    <p class="feed-description">
                        <xsl:value-of select="/rss/channel/description"/>
                    </p>
                    <p class="feed-meta">
                        Last updated:
                        <xsl:value-of select="/rss/channel/lastBuildDate"/>
                    </p>
                </header>

                <main>
                    <xsl:for-each select="/rss/channel/item">
                        <article class="item">
                            <h2 class="item-title">
                                <a href="{link}">
                                    <xsl:value-of select="title"/>
                                </a>
                            </h2>
                            <div class="item-meta">
                                Published:
                                <xsl:value-of select="pubDate"/>
                            </div>
                            <xsl:if test="enclosure">
                                <img class="item-image" src="{enclosure/@url}" alt="{title}"/>
                            </xsl:if>
                            <div class="item-description">
                                <xsl:value-of select="description"/>
                            </div>
                        </article>
                    </xsl:for-each>
                </main>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>