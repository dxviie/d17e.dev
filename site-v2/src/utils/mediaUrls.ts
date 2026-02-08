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
 * A variant is only available when the original is strictly larger than the variant width
 */
export type ImageVariant = '400w' | '800w' | '1200w' | '1920w' | 'original';

/**
 * Video variant resolutions available on the CDN
 * Variants larger than the original resolution are skipped during upload
 */
export type VideoVariant = '480p' | '720p' | '1080p' | 'original';

/**
 * Extract file extension from a filename
 * @param filename - The filename (e.g., "image.jpg" or "video.mp4")
 * @returns The file extension without the dot (e.g., "jpg", "mp4")
 */
export function getFileExtension(filename?: string | null): string {
  if (!filename) return '';
  const parts = filename.split('.');
  return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : '';
}

/**
 * Extract file extension from a MIME type
 * @param mimeType - The MIME type (e.g., "image/png", "video/mp4")
 * @returns The file extension (e.g., "png", "mp4", "jpg" for image/jpeg)
 */
export function getExtensionFromMimeType(mimeType?: string | null): string {
  if (!mimeType) return '';
  
  // Map of MIME types to extensions
  const mimeToExt: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
    'image/webp': 'webp',
    'image/svg+xml': 'svg',
    'image/bmp': 'bmp',
    'image/tiff': 'tiff',
    'video/mp4': 'mp4',
    'video/webm': 'webm',
    'video/quicktime': 'mov',
    'video/x-msvideo': 'avi',
    'video/x-matroska': 'mkv',
  };
  
  const ext = mimeToExt[mimeType.toLowerCase()];
  if (ext) return ext;
  
  // Fallback: extract from mime type (e.g., "image/png" -> "png")
  const parts = mimeType.split('/');
  return parts.length > 1 ? parts[1].toLowerCase() : '';
}

/**
 * Get the original file extension from filename or MIME type
 * @param filenameDownload - The original filename (e.g., "photo.png")
 * @param mimeType - The MIME type (e.g., "image/png")
 * @returns The file extension (e.g., "png")
 */
export function getOriginalExtension(filenameDownload?: string | null, mimeType?: string | null): string {
  // Try filename first
  const fromFilename = getFileExtension(filenameDownload);
  if (fromFilename) return fromFilename;
  
  // Fall back to MIME type
  const fromMime = getExtensionFromMimeType(mimeType);
  if (fromMime) return fromMime;
  
  // Last resort default
  return 'jpg';
}

/**
 * Get the URL for an image variant
 * @param id - The Directus file ID
 * @param variant - The image variant (400w, 800w, 1200w, 1920w, or original)
 * @param originalExt - Original file extension (only needed for 'original' variant)
 * @returns The full CDN URL for the image
 */
export function getImageUrl(id: string, variant: ImageVariant = '800w', originalExt?: string): string {
  if (variant === 'original') {
    // For original, we need the actual file extension
    const ext = originalExt || 'jpg'; // Default to jpg if not provided
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
 * Available video variant heights in pixels
 * A variant is only available when the original is strictly larger than the variant height
 */
export const VIDEO_VARIANT_HEIGHTS = [1080, 720, 480] as const;

/**
 * Get available video variants based on original video height
 * Only returns variants when the original is strictly larger than the variant height
 * @param originalHeight - The original video height in pixels
 * @returns Array of available variant strings (e.g. ['720p', '480p'])
 */
export function getAvailableVideoVariants(originalHeight?: number | null): VideoVariant[] {
  if (!originalHeight || originalHeight <= 0) {
    return [];
  }
  return VIDEO_VARIANT_HEIGHTS
    .filter((h) => h < originalHeight)
    .map((h) => `${h}p` as VideoVariant);
}

/** 
 * Available image variant widths in pixels
 */
export const IMAGE_VARIANT_WIDTHS = [400, 800, 1200, 1920] as const;

/**
 * Get available image variants based on original image width
 * Only returns variants when the original is strictly larger than the variant width
 * @param originalWidth - The original image width in pixels
 * @returns Array of available variant strings (e.g., ['400w', '800w'])
 */
export function getAvailableImageVariants(originalWidth?: number | null): ImageVariant[] {
  if (!originalWidth || originalWidth <= 0) {
    return [];
  }
  
  return IMAGE_VARIANT_WIDTHS
    .filter((width) => width < originalWidth)
    .map((width) => `${width}w` as ImageVariant);
}

/**
 * Get the best image variant for a given target width
 * Returns the smallest variant that is >= target, or the largest available, or 'original' if none exist
 * @param originalWidth - The original image width in pixels
 * @param targetWidth - The desired display width
 * @returns The best variant to use
 */
export function getBestImageVariant(originalWidth?: number | null, targetWidth: number = 800): ImageVariant {
  const available = getAvailableImageVariants(originalWidth);
  if (available.length === 0) return 'original';

  // Find the smallest variant >= targetWidth
  for (const variant of available) {
    const variantWidth = parseInt(variant);
    if (variantWidth >= targetWidth) {
      return variant;
    }
  }

  // Return the largest available if none are big enough
  return available[available.length - 1];
}

/**
 * Generate srcset string for responsive images
 * Only includes variants that exist (original strictly larger than variant width)
 * @param id - The Directus file ID
 * @param originalWidth - The original image width in pixels (from Directus)
 * @param originalExt - Original file extension (for fallback when no variants exist)
 * @returns srcset string for use in img tags
 */
export function getImageSrcset(id: string, originalWidth?: number | null, originalExt?: string): string {
  const variants = getAvailableImageVariants(originalWidth);

  if (variants.length === 0) {
    const w = originalWidth && originalWidth > 0 ? originalWidth : 400;
    return `${getImageUrl(id, 'original', originalExt)} ${w}w`;
  }

  return variants
    .map((variant) => {
      const width = parseInt(variant);
      return `${getImageUrl(id, variant)} ${width}w`;
    })
    .join(', ');
}

/**
 * Get the URL for an OG (Open Graph) image
 * Uses the 1200w variant if available, otherwise the best available size or original
 * @param id - The Directus file ID
 * @param originalWidth - The original image width in pixels (from Directus)
 * @param originalExt - Original file extension (when variant is 'original')
 * @returns The full CDN URL for the OG image
 */
export function getOgImageUrl(id: string, originalWidth?: number | null, originalExt?: string): string {
  const variant = getBestImageVariant(originalWidth, 1200);
  return getImageUrl(id, variant, variant === 'original' ? originalExt : undefined);
}

/**
 * Get the thumbnail URL for a media item (image or video)
 * @param cover - The cover object with id, type, and optional width/filenameDownload for images
 * @returns The full CDN URL for the thumbnail
 */
export function getThumbnailUrl(cover: {
  id: string;
  type?: string;
  width?: number | null;
  filenameDownload?: string | null;
}): string {
  if (!cover || !cover.id) return '';

  const isVideo = cover.type?.startsWith('video/');

  if (isVideo) {
    return getVideoPosterUrl(cover.id);
  }
  const variant = getBestImageVariant(cover.width, 400);
  const ext = getOriginalExtension(cover.filenameDownload, cover.type);
  return getImageUrl(cover.id, variant, variant === 'original' ? ext : undefined);
}
