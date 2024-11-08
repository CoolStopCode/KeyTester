document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.switch-grid');
    grid.style.gridTemplateColumns = `repeat(${styles.gridColumns}, 1fr)`;
    
    Object.entries(switchData.items).forEach(([key, item]) => {
        const switchCard = createSwitchCard(key, item);
        grid.appendChild(switchCard);
    });

    let draggedElement = null;
    let mouseDown = false;
    let offsetX, offsetY;

    function handleMouseDown(e) {
        const card = e.target.closest('.switch-card');
        if (card) {
            mouseDown = true;
            
            // Calculate offset from mouse to card top-left corner
            const rect = card.getBoundingClientRect();
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;
            
            setTimeout(() => {
                if (mouseDown) {
                    startDragging(card, e);
                }
            }, 100);
        }
    }

    function startDragging(card, e) {
        draggedElement = card;
        
        // Create placeholder before changing card position
        const placeholder = document.createElement('div');
        placeholder.className = 'switch-card placeholder';
        placeholder.style.visibility = 'hidden';
        card.parentNode.insertBefore(placeholder, card);
        draggedElement.placeholder = placeholder;
        
        // Set up card for dragging
        card.classList.add('dragging');
        card.style.position = 'fixed';
        card.style.zIndex = '1000';
        
        updatePosition(e);
    }

    function handleMouseMove(e) {
        if (draggedElement) {
            e.preventDefault();
            updatePosition(e);
            
            const cards = document.elementsFromPoint(e.clientX, e.clientY)
                .filter(el => el.classList.contains('switch-card') && !el.classList.contains('dragging'));
            
            document.querySelectorAll('.switch-card').forEach(card => {
                card.classList.remove('drag-over');
            });
            
            if (cards.length > 0) {
                cards[0].classList.add('drag-over');
            }
        }
    }

    function handleMouseUp(e) {
        mouseDown = false;
        if (draggedElement) {
            const droppedOn = document.elementsFromPoint(e.clientX, e.clientY)
                .find(el => el.classList.contains('switch-card') && !el.classList.contains('dragging'));
            
            if (droppedOn) {
                droppedOn.classList.remove('drag-over');
                droppedOn.classList.add('swapping'); // Add swapping class for animation
                setTimeout(() => droppedOn.classList.remove('swapping'), 300); // Remove class after animation
                swapElements(draggedElement.placeholder, droppedOn);
            }
            
            // Reset the dragged element
            draggedElement.classList.remove('dragging');
            draggedElement.style.position = '';
            draggedElement.style.top = '';
            draggedElement.style.left = '';
            draggedElement.style.zIndex = '';
            
            // Replace placeholder with dragged element
            draggedElement.placeholder.replaceWith(draggedElement);
            draggedElement = null;
        }
    }

    function updatePosition(e) {
        const x = e.clientX - offsetX;
        const y = e.clientY - offsetY;
        draggedElement.style.left = x + 'px';
        draggedElement.style.top = y + 'px';
    }

    function swapElements(el1, el2) {
        const parent = el1.parentNode;
        const sibling = el1.nextSibling === el2 ? el1 : el1.nextSibling;
    
        // Add the swapping class to both elements
        el1.classList.add('swapping');
        el2.classList.add('swapping');
    
        // Perform the swap
        el2.parentNode.insertBefore(el1, el2.nextSibling);
        parent.insertBefore(el2, sibling);
    
        // Remove the swapping class after the transition ends
        el1.addEventListener('transitionend', () => el1.classList.remove('swapping'), { once: true });
        el2.addEventListener('transitionend', () => el2.classList.remove('swapping'), { once: true });
    }
    

    function getTextColor(bgColor) {
        const r = parseInt(bgColor.slice(1,3), 16);
        const g = parseInt(bgColor.slice(3,5), 16);
        const b = parseInt(bgColor.slice(5,7), 16);
        
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
            <h3 class="switch-title">${item.title}</h3>
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

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('selectstart', e => {
        if (draggedElement) e.preventDefault(); // Prevent text selection during dragging
    });
});
