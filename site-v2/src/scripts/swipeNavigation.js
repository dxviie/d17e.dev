/**
 * Adds swipe gesture support for navigation between posts/articles
 * @param {Object} options - Configuration options
 * @param {string} options.prevUrl - URL to navigate to on swipe right (previous)
 * @param {string} options.nextUrl - URL to navigate to on swipe left (next)
 */
export function initSwipeNavigation(options) {
  const { prevUrl, nextUrl } = options;
  
  // Skip if we're not in a browser environment or if neither prev nor next URL is available
  if (typeof window === 'undefined' || (!prevUrl && !nextUrl)) {
    return;
  }

  let touchStartX = 0;
  let touchEndX = 0;
  const minSwipeDistance = 80; // Minimum distance to recognize a swipe (in pixels)
  
  // Handle touch start
  function handleTouchStart(event) {
    touchStartX = event.changedTouches[0].screenX;
  }
  
  // Handle touch end
  function handleTouchEnd(event) {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
  }
  
  // Calculate and handle swipe direction
  function handleSwipe() {
    const swipeDistance = touchEndX - touchStartX;
    
    // If swipe distance is less than minimum, ignore as it might be accidental
    if (Math.abs(swipeDistance) < minSwipeDistance) {
      return;
    }
    
    // Swipe right (to previous)
    if (swipeDistance > 0 && prevUrl) {
      window.location.href = prevUrl;
    }
    // Swipe left (to next)
    else if (swipeDistance < 0 && nextUrl) {
      window.location.href = nextUrl;
    }
  }
  
  // Add event listeners
  document.addEventListener('touchstart', handleTouchStart, { passive: true });
  document.addEventListener('touchend', handleTouchEnd, { passive: true });
}