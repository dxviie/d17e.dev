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

    // Attach touch event listeners to the body
    document.body.addEventListener('touchstart', handleTouchStart, {passive: true});
    document.body.addEventListener('touchmove', handleTouchMove, {passive: false});
    document.body.addEventListener('touchend', handleTouchEnd, {passive: true});

    function handleTouchStart(e) {
        // Store the initial touch position
        startX = e.touches[0].clientX;
        currentX = startX;
        isSwiping = true;

        // Call the swipe start callback
        if (typeof onSwipeStart === 'function') {
            onSwipeStart();
        }
    }

    function handleTouchMove(e) {
        if (!isSwiping) return;

        // Update the current position
        currentX = e.touches[0].clientX;
        const deltaX = currentX - startX;

        // Determine if we should prevent default scrolling
        // Only prevent default if we have a page to navigate to in that direction
        if ((deltaX > 0 && prevUrl) || (deltaX < 0 && nextUrl)) {
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

        // Determine if the swipe was significant enough
        if (Math.abs(deltaX) > swipeThreshold) {
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
            // Swipe wasn't significant enough
            if (typeof onSwipeCancel === 'function') {
                onSwipeCancel();
            }
        }

        // Reset state
        isSwiping = false;
    }

    // Clean up event listeners when the page is unloaded
    window.addEventListener('unload', () => {
        document.body.removeEventListener('touchstart', handleTouchStart);
        document.body.removeEventListener('touchmove', handleTouchMove);
        document.body.removeEventListener('touchend', handleTouchEnd);
    });
}