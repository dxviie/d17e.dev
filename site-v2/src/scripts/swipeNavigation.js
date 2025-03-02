// swipeNavigation.js
export function initSwipeNavigation(options) {
    const {
        prevUrl,
        nextUrl,
        onSwipeStart,
        onSwipeMove,
        onSwipeEnd,
        onSwipeCancel
    } = options;

    if (!prevUrl && !nextUrl) return;

    let startX = 0;
    let currentX = 0;
    let isSwiping = false;

    // Threshold for considering a swipe
    const swipeThreshold = 100;

    // Find all media assets that should support swipe navigation
    const swipeElements = document.querySelectorAll('.media-asset.swipeable');
    
    // Attach touch event listeners to each media asset instead of the body
    swipeElements.forEach(element => {
        element.addEventListener('touchstart', handleTouchStart, {passive: true});
        element.addEventListener('touchmove', handleTouchMove, {passive: false});
        element.addEventListener('touchend', handleTouchEnd, {passive: true});
        
        // Add a visual indicator or class
        element.classList.add('swipe-enabled');
    });

    let startY = 0;
    let currentY = 0;
    let isHorizontalSwipe = false;

    function handleTouchStart(e) {
        // Store the initial touch position
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        currentX = startX;
        currentY = startY;
        isSwiping = true;
        isHorizontalSwipe = false;

        // Call the swipe start callback
        if (typeof onSwipeStart === 'function') {
            onSwipeStart();
        }
    }

    function handleTouchMove(e) {
        if (!isSwiping) return;

        // Update the current position
        currentX = e.touches[0].clientX;
        currentY = e.touches[0].clientY;
        const deltaX = currentX - startX;
        const deltaY = currentY - startY;

        // Determine if this is primarily a horizontal swipe
        // Only set this once per swipe gesture
        if (!isHorizontalSwipe && Math.abs(deltaX) > 10) {
            // If horizontal movement is greater than vertical and exceeds threshold
            isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY) * 1.5;
        }

        // Only prevent default for intentional horizontal swipes
        // and only if we have a page to navigate to in that direction
        if (isHorizontalSwipe && ((deltaX > 10 && prevUrl) || (deltaX < -10 && nextUrl))) {
            e.preventDefault();

            // Call the swipe move callback with the delta values
            if (typeof onSwipeMove === 'function') {
                // Pass the delta for this move and the total delta from start
                onSwipeMove(e.touches[0].clientX - currentX, deltaX);
            }
        }
    }

    function handleTouchEnd() {
        if (!isSwiping) return;

        // Calculate the distance swiped
        const deltaX = currentX - startX;
        const deltaY = currentY - startY;

        // Only trigger navigation for intentional horizontal swipes
        if (isHorizontalSwipe && Math.abs(deltaX) > swipeThreshold) {
            if (deltaX > 0 && prevUrl) {
                // Swiped right, go to previous post
                if (typeof onSwipeEnd === 'function') {
                    onSwipeEnd('right');
                }

                // Navigate after a short delay to allow for animation
                setTimeout(() => {
                    window.location.href = prevUrl;
                }, 100);
            } else if (deltaX < 0 && nextUrl) {
                // Swiped left, go to next post
                if (typeof onSwipeEnd === 'function') {
                    onSwipeEnd('left');
                }

                // Navigate after a short delay to allow for animation
                setTimeout(() => {
                    window.location.href = nextUrl;
                }, 100);
            } else {
                // Call cancel if we can't navigate
                if (typeof onSwipeCancel === 'function') {
                    onSwipeCancel();
                }
            }
        } else {
            // Swipe wasn't significant enough or wasn't primarily horizontal
            if (typeof onSwipeCancel === 'function') {
                onSwipeCancel();
            }
        }

        // Reset state
        isSwiping = false;
        isHorizontalSwipe = false;
    }

    // Clean up event listeners when the page is unloaded
    window.addEventListener('unload', () => {
        // Remove event listeners from all swipe-enabled elements
        document.querySelectorAll('.swipe-enabled').forEach(element => {
            element.removeEventListener('touchstart', handleTouchStart);
            element.removeEventListener('touchmove', handleTouchMove);
            element.removeEventListener('touchend', handleTouchEnd);
        });
    });
}