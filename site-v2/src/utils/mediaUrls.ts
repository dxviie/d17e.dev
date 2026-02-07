/**
 * Media URL utilities for the Bunny CDN
 * 
 * All media assets are served from media.d17e.dev which redirects to our Bunny CDN storage.
 * Environment variable: BUNNY_CDN_URL (defaults to https://media.d17e.dev)
 */

// CDN base URL - can be configured via environment variable
export const MEDIA_CDN_URL = import.meta.env.BUNNY_CDN_URL || 'https://media.d17e.dev';

/**
 * Image variant sizes available on the CDN
 * Variants larger than the original width are skipped during upload
 */
export type ImageVariant = '400w' | '800w' | '1200w' | '1920w' | 'original';

/**
 * Video variant resolutions available on the CDN
 * Variants larger than the original resolution are skipped during upload
 */
export type VideoVariant = '480p' | '720p' | '1080p' | 'original';

/**
 * Get the URL for an image variant
 * @param id - The Directus file ID
 * @param variant - The image variant (400w, 800w, 1200w, 1920w, or original)
 * @param originalExt - Original file extension (only needed for 'original' variant)
 * @returns The full CDN URL for the image
 */
export function getImageUrl(id: string, variant: ImageVariant = '800w', originalExt?: string): string {
  if (variant === 'original') {
    const ext = originalExt || 'webp';
    return `${MEDIA_CDN_URL}/images/${id}/original.${ext}`;
  }
  return `${MEDIA_CDN_URL}/images/${id}/${variant}.webp`;
}

/**
 * Get the URL for a video variant
 * @param id - The Directus file ID
 * @param variant - The video variant (480p, 720p, 1080p, or original)
 * @param originalExt - Original file extension (only needed for 'original' variant)
 * @returns The full CDN URL for the video
 */
export function getVideoUrl(id: string, variant: VideoVariant = '720p', originalExt?: string): string {
  if (variant === 'original') {
    const ext = originalExt || 'mp4';
    return `${MEDIA_CDN_URL}/videos/${id}/original.${ext}`;
  }
  return `${MEDIA_CDN_URL}/videos/${id}/${variant}.mp4`;
}

/**
 * Get the URL for a video poster/thumbnail image
 * @param id - The Directus file ID
 * @returns The full CDN URL for the video poster
 */
export function getVideoPosterUrl(id: string): string {
  return `${MEDIA_CDN_URL}/videos/${id}/poster.webp`;
}

/**
 * Get the appropriate media URL based on the cover type
 * @param cover - The cover object with id and type
 * @param imageVariant - The image variant to use (default: 800w)
 * @param videoVariant - The video variant to use (default: 720p)
 * @returns The full CDN URL for the media
 */
export function getMediaUrl(
  cover: { id: string; type?: string },
  imageVariant: ImageVariant = '800w',
  videoVariant: VideoVariant = '720p'
): string {
  if (!cover || !cover.id) return '';
  
  const isVideo = cover.type?.startsWith('video/');
  
  if (isVideo) {
    return getVideoUrl(cover.id, videoVariant);
  }
  return getImageUrl(cover.id, imageVariant);
}

/**
 * Generate srcset string for responsive images
 * @param id - The Directus file ID
 * @param variants - Array of variants to include (default: all sizes)
 * @returns srcset string for use in img tags
 */
export function getImageSrcset(id: string, variants: ImageVariant[] = ['400w', '800w', '1200w', '1920w']): string {
  return variants
    .filter(v => v !== 'original')
    .map(variant => {
      const width = parseInt(variant);
      return `${getImageUrl(id, variant)} ${width}w`;
    })
    .join(', ');
}

/**
 * Get the URL for an OG (Open Graph) image
 * Uses the 1200w variant which is optimal for social sharing
 * @param id - The Directus file ID
 * @returns The full CDN URL for the OG image
 */
export function getOgImageUrl(id: string): string {
  return getImageUrl(id, '1200w');
}

/**
 * Get the thumbnail URL for a media item (image or video)
 * @param cover - The cover object with id and type
 * @returns The full CDN URL for the thumbnail
 */
export function getThumbnailUrl(cover: { id: string; type?: string }): string {
  if (!cover || !cover.id) return '';
  
  const isVideo = cover.type?.startsWith('video/');
  
  if (isVideo) {
    return getVideoPosterUrl(cover.id);
  }
  return getImageUrl(cover.id, '400w');
}
