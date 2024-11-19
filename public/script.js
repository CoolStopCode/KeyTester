document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.switch-grid');
    
    // Responsive grid columns based on screen width
    function updateGridColumns() {
        const width = window.innerWidth;
        let columns;
        if (width < 480) columns = 2;        // Mobile phones
        else if (width < 768) columns = 3;   // Large phones/small tablets
        else if (width < 1024) columns = 4;  // Tablets
        else columns = 6;                    // Desktop
        
        grid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    }
    
    // Initial setup and window resize handling
    updateGridColumns();
    window.addEventListener('resize', updateGridColumns);

    Object.entries(switchData.items).forEach(([key, item]) => {
        const switchCard = createSwitchCard(key, item);
        grid.appendChild(switchCard);
    });

    let draggedElement = null;
    let isDragging = false;
    let startX, startY, offsetX, offsetY, originalWidth;

    function handleStart(e) {
        const touch = e.touches ? e.touches[0] : e;
        const card = touch.target.closest('.switch-card');
        
        if (card) {
            e.preventDefault(); // Prevent scrolling while dragging
            isDragging = true;

            // Store the original width of the card
            const rect = card.getBoundingClientRect();
            originalWidth = rect.width;

            // Calculate offset from touch/mouse to card top-left corner
            offsetX = touch.clientX - rect.left;
            offsetY = touch.clientY - rect.top;
            startX = touch.clientX;
            startY = touch.clientY;

            setTimeout(() => {
                if (isDragging) {
                    startDragging(card, touch);
                }
            }, 100);
        }
    }

    function startDragging(card, touch) {
        draggedElement = card;

        // Create placeholder
        const placeholder = document.createElement('div');
        placeholder.className = 'switch-card placeholder';
        placeholder.style.visibility = 'hidden';
        card.parentNode.insertBefore(placeholder, card);
        draggedElement.placeholder = placeholder;

        // Set up card for dragging
        card.classList.add('dragging');
        card.style.position = 'fixed';
        card.style.width = `${originalWidth}px`;
        card.style.height = `${originalWidth}px`; // Maintain square aspect ratio
        card.style.zIndex = '1000';

        updatePosition(touch);
    }

    function handleMove(e) {
        if (!draggedElement) return;
        
        e.preventDefault();
        const touch = e.touches ? e.touches[0] : e;
        updatePosition(touch);

        const cards = document.elementsFromPoint(touch.clientX, touch.clientY)
            .filter(el => el.classList.contains('switch-card') && !el.classList.contains('dragging'));

        document.querySelectorAll('.switch-card').forEach(card => {
            card.classList.remove('drag-over');
        });

        if (cards.length > 0) {
            cards[0].classList.add('drag-over');
        }
    }

    function handleEnd(e) {
        isDragging = false;
        if (draggedElement) {
            const touch = e.changedTouches ? e.changedTouches[0] : e;
            const droppedOn = document.elementsFromPoint(touch.clientX, touch.clientY)
                .find(el => el.classList.contains('switch-card') && !el.classList.contains('dragging'));

            if (droppedOn) {
                droppedOn.classList.remove('drag-over');
                swapElements(draggedElement.placeholder, droppedOn);
            }

            resetDraggedElement();
        }
    }

    function updatePosition(touch) {
        const x = touch.clientX - offsetX;
        const y = touch.clientY - offsetY;
        draggedElement.style.left = `${x}px`;
        draggedElement.style.top = `${y}px`;
    }

    function swapElements(el1, el2) {
        const parent = el1.parentNode;
        const sibling = el1.nextSibling === el2 ? el1 : el1.nextSibling;
        el2.parentNode.insertBefore(el1, el2.nextSibling);
        parent.insertBefore(el2, sibling);
    }

    function resetDraggedElement() {
        draggedElement.classList.remove('dragging');
        draggedElement.style.position = '';
        draggedElement.style.top = '';
        draggedElement.style.left = '';
        draggedElement.style.width = '';
        draggedElement.style.height = '';
        draggedElement.style.zIndex = '';
        draggedElement.placeholder.replaceWith(draggedElement);
        draggedElement = null;
    }

    function getTextColor(bgColor) {
        const r = parseInt(bgColor.slice(1, 3), 16);
        const g = parseInt(bgColor.slice(3, 5), 16);
        const b = parseInt(bgColor.slice(5, 7), 16);

        const brightness = (r * 299 + g * 587 + b * 114) / 1000;

        if (brightness > 155) {
            return `rgb(${r * 0.4}, ${g * 0.4}, ${b * 0.4})`;
        } else {
            return `rgb(${Math.min(255, r + (255 - r) * 0.6)}, 
                      ${Math.min(255, g + (255 - g) * 0.6)}, 
                      ${Math.min(255, b + (255 - b) * 0.6)})`;
        }
    }

    function createSwitchCard(key, item) {
        const card = document.createElement('div');
        card.className = 'switch-card';
        card.style.backgroundColor = item.color;
        card.style.outline = `${styles.outlineWidth} solid ${styles.darkenColor(item.color)}`;
        card.style.padding = styles.itemPadding;
        card.style.borderRadius = styles.itemBorderRadius;
        card.style.color = getTextColor(item.color);
    
        card.innerHTML = `
            <h2 class="switch-title">${item.title}</h2>
            <h3 class="switch-type">${item.type}</h3>
            <div class="switch-specs">
                <div class="spec-item">
                    <span class="spec-label">Start</span>
                    <span class="spec-value">${item["start-pressure"]}</span>
                </div>
                <div class="spec-item">
                    <span class="spec-label">End</span>
                    <span class="spec-value">${item["end-pressure"]}</span>
                </div>
                <div class="spec-item">
                    <span class="spec-label">Actuation</span>
                    <span class="spec-value">${item["actuation-distance"]}</span>
                </div>
                <div class="spec-item">
                    <span class="spec-label">Bottom</span>
                    <span class="spec-value">${item["bottom-out"]}</span>
                </div>
            </div>
        `;
    
        return card;
    }

    // Add both mouse and touch event listeners
    document.addEventListener('mousedown', handleStart);
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleEnd);
    
    document.addEventListener('touchstart', handleStart, { passive: false });
    document.addEventListener('touchmove', handleMove, { passive: false });
    document.addEventListener('touchend', handleEnd);
    
    // Prevent text selection during dragging
    document.addEventListener('selectstart', e => {
        if (draggedElement) e.preventDefault();
    });
});