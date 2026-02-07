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
                    a {
                    color: darkorange;
                    font-family: 'Nudica Mono Light', monospace;
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
                    .item-content {
                    margin: 1rem 0;
                    }
                    .item-content script.html-content {
                    display: none;
                    }
                    .item-description {
                    font-family: 'argesta_regular', serif;
                    letter-spacing: -0.01em;
                    line-height: 1.7rem;
                    font-size: 1.1rem;
                    }
                    .item-description p {
                    margin: 1rem 0;
                    }
                    .item-description a {
                    color: darkorange;
                    }
                    .item-description img {
                    max-width: 100%;
                    height: auto;
                    border-radius: 4px;
                    margin: 1rem 0;
                    }
                    .item-description .hashtag {
                    display: inline-block;
                    color: darkorange;
                    background-color: rgba(255, 140, 0, 0.1);
                    padding: 0.1rem 0.4rem;
                    border-radius: 4px;
                    font-size: 0.9em;
                    text-decoration: none;
                    font-family: 'Nudica Mono Light', monospace;
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
                    figure img {
                    max-width: 100%;
                    height: auto;
                    border-radius: 4px;
                    }
                    figure video {
                    max-width: 100%;
                    height: auto;
                    border-radius: 4px;
                    }
                    figcaption {
                    text-align: center;
                    font-size: smaller;
                    font-style: italic;
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

                    .item-description .hashtag {
                    background-color: rgba(255, 140, 0, 0.2);
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
                                <xsl:if test="creator">
                                    by
                                    <xsl:value-of select="creator"/>
                                </xsl:if>
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
                            <div class="item-content">
                                <xsl:choose>
                                    <xsl:when test="content:encoded">
                                        <script type="text/html" class="html-content">
                                            <xsl:value-of select="content:encoded"/>
                                        </script>
                                    </xsl:when>
                                    <xsl:otherwise>
                                        <script type="text/html" class="html-content">
                                            <xsl:value-of select="description"/>
                                        </script>
                                    </xsl:otherwise>
                                </xsl:choose>
                                <div class="item-description"></div>
                            </div>
                        </article>
                    </xsl:for-each>
                </main>
                <script>
                    // Render HTML content - disable-output-escaping is not supported
                    // in client-side XSLT by modern browsers, so we use this workaround
                    document.querySelectorAll('.item-content').forEach(function(container) {
                        var scriptTag = container.querySelector('script.html-content');
                        var targetDiv = container.querySelector('.item-description');
                        if (scriptTag &amp;&amp; targetDiv) {
                            targetDiv.innerHTML = scriptTag.textContent || scriptTag.innerText || '';
                        }
                    });
                </script>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>