// Global variables for tracking drag events
let isDragging = false, startY, startHeight, maxHeight, minHeight = 88;

// Sets initial drag position, sheetContent height and add dragging class to the bottom sheet
export function dragStart(e, maxH) {
    isDragging = true;
    maxHeight = maxH
    startY = e.pageY || e.touches?.[0].pageY;
    let sheetContent = document.getElementById('nav-bar');
    sheetContent.classList.add('transition-all');
    let userCategories = document.getElementById('user-categories');
    if (userCategories !== null) {
        userCategories.classList.remove('hidden');
    }
    console.log('maxHeight: ' + maxHeight + '   ' + maxH);
    startHeight = parseInt(sheetContent.style.height);
    console.log('startHeight: ' + startHeight)
    sheetContent.classList.add("dragging");
    setUserNavigationsAsMax();

    let userTabs = document.getElementById('user-nav-tabs');
    let childNodes = userTabs.childNodes;

    for (let i = 0; i < childNodes.length; i++) {
        if (childNodes[i].nodeType === Node.ELEMENT_NODE) {
            childNodes[i].classList.remove('bg-[#F2F3F4]');
        }

        if (i > 3) {
            childNodes[i].classList.remove('hidden');
        }
    }
}

// Calculates the new height for the sheet content and call the updateSheetHeight function
export function dragging(e) {
    if (!isDragging) return;
    const delta = startY - (e.pageY || e.touches?.[0].pageY);
    userCategoriesAnimation();
    const newHeight = startHeight + delta;
    updateSheetHeight(newHeight);
}

// Determines whether to hide, set to fullscreen, or set to default 
// height based on the current height of the sheet content
export function dragStop() {
    isDragging = false;
    let sheetContent = document.getElementById('nav-bar')
    sheetContent.classList.remove("dragging");

    const sheetHeight = parseInt(sheetContent.style.height);
    updateSheetHeight(100);

    if (isCloseToB(sheetHeight, maxHeight, minHeight)) {
        setUserNavigationsAsMax();
    } else {
        setUserNavigationsAsMin();
    }

}

function updateSheetHeight(height) {
    console.log('height: ' + height)
    let sheetContent = document.getElementById('nav-bar')
    sheetContent.style.height = `${height}px`; 
}

function isCloseToB(number, a, b) {
    return Math.abs(number - a) < Math.abs(number - b);
}

export function setUserNavigationsAsMin() {
    updateSheetHeight(minHeight)
    let userCategories = document.getElementById('user-categories');
    if (userCategories !== null) {
        userCategories.classList.add('hidden');
    }
    let userTabs = document.getElementById('user-nav-tabs');
    let childNodes = userTabs.childNodes;

    for (let i = 0; i < childNodes.length; i++) {
        if (childNodes[i].nodeType === Node.ELEMENT_NODE) {
            childNodes[i].classList.remove('bg-[#F2F3F4]');
        }

        if (i > 3) {
            childNodes[i].classList.add('hidden');
        }
    }

}

function setUserNavigationsAsMax() {
    updateSheetHeight(maxHeight)
    let userCategories = document.getElementById('user-categories');
    if (userCategories !== null) {
        userCategories.classList.remove('hidden');
    }
    let userTabs = document.getElementById('user-nav-tabs');
    let childNodes = userTabs.childNodes;

    for (let i = 0; i < childNodes.length; i++) {
        if (childNodes[i].nodeType === Node.ELEMENT_NODE) {
            childNodes[i].classList.add('bg-[#F2F3F4]');
        }
    }
}

function userCategoriesAnimation() {
    let userCategories = document.getElementById('user-categories');
    let sheetContent = document.getElementById('nav-bar');
    if (userCategories !== null) {
        userCategories.style.opacity = OpacityReletedMaxAndMinHEight(parseInt(sheetContent.style.height));
    }
}

function OpacityReletedMaxAndMinHEight(height) {
    var opacity = 1; // Default opacity value

    if (height < maxHeight) {
        opacity = height / maxHeight;
    }

    if (height === minHeight) {
        opacity = 0;
    }

    return opacity;
}