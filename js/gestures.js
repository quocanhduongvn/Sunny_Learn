/**
 * SUNNY PANDA - Touch & Swipe Gesture Controller for Kids
 * Designed for 4-5 year olds: intuitive swipe left/right to change cards,
 * swipe up/down to flip card, with elastic visual feedback and haptics.
 */

function makeSwipeable(element, options = {}) {
    if (!element) return;

    const {
        onSwipeLeft,
        onSwipeRight,
        onSwipeUp,
        onSwipeDown,
        threshold = 38,
        dragResistance = 0.5
    } = options;

    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let currentY = 0;
    let isDragging = false;
    let startTime = 0;

    const triggerHaptic = () => {
        if (navigator.vibrate) {
            try { navigator.vibrate(20); } catch (e) {}
        }
    };

    const onStart = (e) => {
        // Don't intercept button or explicit control clicks
        if (e.target.closest('button') || e.target.closest('.card-audio-bar') || e.target.closest('.convo-audio-controls')) {
            return;
        }

        const point = e.touches ? e.touches[0] : e;
        startX = point.clientX;
        startY = point.clientY;
        currentX = startX;
        currentY = startY;
        isDragging = true;
        startTime = Date.now();

        element.style.transition = 'none';
    };

    const onMove = (e) => {
        if (!isDragging) return;
        const point = e.touches ? e.touches[0] : e;
        currentX = point.clientX;
        currentY = point.clientY;

        const deltaX = currentX - startX;
        const deltaY = currentY - startY;

        // If horizontal drag is dominant, prevent native page scrolling
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
            if (e.cancelable) e.preventDefault();
            const rotate = deltaX * 0.035;
            const transX = deltaX * dragResistance;
            element.style.transform = `translateX(${transX}px) rotate(${rotate}deg)`;
        } else if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 10) {
            const transY = deltaY * (dragResistance * 0.5);
            element.style.transform = `translateY(${transY}px)`;
        }
    };

    const onEnd = () => {
        if (!isDragging) return;
        isDragging = false;

        const deltaX = currentX - startX;
        const deltaY = currentY - startY;
        const absX = Math.abs(deltaX);
        const absY = Math.abs(deltaY);

        // Smooth spring back to rest position
        element.style.transition = 'transform 0.32s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        element.style.transform = '';

        if (absX > threshold && absX > absY) {
            triggerHaptic();
            if (deltaX < 0) {
                // Swiped Left -> Next Card
                if (onSwipeLeft) onSwipeLeft();
            } else {
                // Swiped Right -> Previous Card
                if (onSwipeRight) onSwipeRight();
            }
        } else if (absY > threshold && absY > absX) {
            triggerHaptic();
            if (deltaY < 0) {
                // Swiped Up
                if (onSwipeUp) onSwipeUp();
            } else {
                // Swiped Down
                if (onSwipeDown) onSwipeDown();
            }
        }
    };

    // Prevent native browser image dragging
    element.addEventListener('dragstart', (e) => e.preventDefault());

    // Touch events
    element.addEventListener('touchstart', onStart, { passive: true });
    element.addEventListener('touchmove', onMove, { passive: false });
    element.addEventListener('touchend', onEnd, { passive: true });
    element.addEventListener('touchcancel', onEnd, { passive: true });

    // Mouse drag events for testing on desktop
    const onMouseDown = (e) => {
        if (e.button !== 0) return; // Only left click
        onStart(e);
        const onMouseMove = (ev) => onMove(ev);
        const onMouseUp = (ev) => {
            onEnd(ev);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    };
    element.addEventListener('mousedown', onMouseDown);
}

// Global attachment
if (typeof window !== 'undefined') {
    window.makeSwipeable = makeSwipeable;
}
