<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:content="http://purl.org/rss/1.0/modules/content/">
    <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes" media-type="text/html"/>
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
                    @font-face {
                    font-family: 'Nudica Mono Bold';
                    src: url('/fonts/nudicamono-bold-webfont.woff') format('woff');
                    font-weight: bold;
                    font-style: normal;
                    }

                    @font-face {
                    font-family: 'Nudica Mono Light';
                    src: url('/fonts/nudicamono-light-webfont.woff') format('woff');
                    font-weight: normal;
                    font-style: normal;
                    }

                    @font-face {
                    font-family: 'argesta_regular';
                    src: url('/fonts/argestatext-regular-webfont.woff') format('woff');
                    font-weight: normal;
                    font-style: normal;
                    font-display: swap;
                    }

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
                    font-family: 'Nudica Mono Bold', monospace;
                    letter-spacing: -0.01em;
                    }
                    .feed-title {
                    font-family: 'Nudica Mono Bold', monospace;
                    background-color: #000;
                    color: #FFF;
                    width: fit-content;
                    padding: 0.5rem 2.5rem 0 2.5rem;
                    font-size: 4rem;
                    }
                    .feed-description {
                    color: #666;
                    margin: 0.5rem 0;
                    font-family: 'Nudica Mono Light', monospace;
                    letter-spacing: -0.01em;
                    font-size: 1.8rem;
                    }
                    .item {
                    background: white;
                    padding: 1.5rem;
                    margin-bottom: 1.5rem;
                    border-radius: 4px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    }
                    .item-title {
                    margin: 0;
                    color: #2c3e50;
                    font-family: 'Nudica Mono Bold', monospace;
                    letter-spacing: -0.01em;
                    background-color: #000;
                    color: #FFF;
                    width: fit-content;
                    padding: 0.2rem 1rem 0 1rem;
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
                    font-family: 'Nudica Mono Light', monospace;
                    letter-spacing: -0.01em;
                    }
                    .item-description {
                    margin: 1rem 0;
                    font-family: 'argesta_regular', serif;
                    letter-spacing: -0.01em;
                    line-height: 1.7rem;
                    font-size: 1.1rem;
                    }
                    .media-container {
                    position: relative;
                    width: 100%;
                    margin: 1rem 0;
                    }
                    .item-image {
                    max-width: 100%;
                    height: auto;
                    border-radius: 4px;
                    }
                    .item-video {
                    width: 100%;
                    max-width: 100%;
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

                    @media (prefers-color-scheme: dark) {
                    body {
                    background: #1a1a1a;
                    color: #e0e0e0;
                    }

                    header {
                    border-bottom-color: #333;
                    }

                    h1, .item-title {
                    color: #e0e0e0;
                    }

                    .feed-description, .item-meta {
                    color: #aaa;
                    }

                    .item {
                    background: #292929;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
                    }
                    }
                </style>
            </head>
            <body>
                <header>
                    <h1 class="feed-title">
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
                                <div class="media-container">
                                    <xsl:choose>
                                        <!-- Handle video content -->
                                        <xsl:when test="contains(enclosure/@type, 'video')">
                                            <video class="item-video" controls="controls">
                                                <source src="{enclosure/@url}" type="{enclosure/@type}"/>
                                                Your browser does not support the video tag.
                                            </video>
                                        </xsl:when>
                                        <!-- Handle image content -->
                                        <xsl:when test="contains(enclosure/@type, 'image')">
                                            <img class="item-image" src="{enclosure/@url}" alt="{title}"/>
                                        </xsl:when>
                                        <!-- Handle audio content -->
                                        <xsl:when test="contains(enclosure/@type, 'audio')">
                                            <audio controls="controls">
                                                <source src="{enclosure/@url}" type="{enclosure/@type}"/>
                                                Your browser does not support the audio tag.
                                            </audio>
                                        </xsl:when>
                                    </xsl:choose>
                                </div>
                            </xsl:if>
                            <div class="item-description">
                                <xsl:choose>
                                    <!-- If there's content:encoded, use that -->
                                    <xsl:when test="content:encoded">
                                        <!--                                        <content:encoded>-->
                                        <xsl:copy-of select="content:encoded"/>
                                        <!--                                        </content:encoded>-->
                                    </xsl:when>
                                    <!-- Otherwise fall back to description -->
                                    <xsl:otherwise>
                                        <!--                                        <content:encoded>-->
                                        <xsl:copy-of select="description"/>
                                        <!--                                        </content:encoded>-->
                                    </xsl:otherwise>
                                </xsl:choose>
                            </div>
                        </article>
                    </xsl:for-each>
                </main>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>