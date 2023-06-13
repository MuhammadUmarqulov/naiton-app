// Global variables for tracking drag events
let isDragging = false, startY, startHeight, maxHeight, minHeight = 88, scrollZone;

// Sets initial drag position, sheetContent height and add dragging class to the bottom sheet
export function dragStart(e, maxH, scrollZ) {
    // user is start resizing nav bar
    isDragging = true;

    // getting user max height dynamicly 
    maxHeight = maxH;
    scrollZone = scrollZ;

    let sheetContent = document.getElementById('nav-bar');
    // calculating
    startY = e.pageY || e.touches?.[0].pageY;
    startHeight = parseInt(sheetContent.style.height);

    // style
    sheetContent.classList.add('transition-all');
    let userTabs = document.getElementById('user-nav-tabs');
    if (userTabs !== null) {
        let childNodes = userTabs.childNodes;
        for (let i = 0; i < childNodes.length; i++) {
            if (childNodes[i].nodeType === Node.ELEMENT_NODE) {
                childNodes[i].classList.add('bg-[#F2F3F4]');
            }
        }
    }

    let userCategories = document.getElementById('user-categories');

    if (userCategories !== null) {
        userCategories.classList.remove('hidden');
    }

}

// Calculates the new height for the sheet content and call the updateSheetHeight function
export function dragging(e) {
    if (!isDragging) return;

    navigationDragIconView(true);
    // resizing length calculating
    const delta = startY - (e.pageY || e.touches?.[0].pageY);

    // all resizing animations works in there
    userCategoriesAnimation();

    // resize command 
    const newHeight = startHeight + delta;
    updateSheetHeight(newHeight);
}

// Determines whether to hide or set to default 
// height based on the current height of the sheet content
export function dragStop() {
    isDragging = false;

    let sheetContent = document.getElementById('nav-bar')

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

// get closest to the max height to min height
function isCloseToB(number, a, b) {
    return Math.abs(number - a) < Math.abs(number - b);
}

// setting method for user navigations are minimazed
export function setUserNavigationsAsMin() {
    updateSheetHeight(minHeight)

    let userCategories = document.getElementById('user-categories');
    navigationDragIconView(false);
    if (userCategories !== null) {
        userCategories.classList.add('hidden');
    }
    let userTabs = document.getElementById('user-nav-tabs');

    if (userTabs !== null) {
        userTabs.style.marginTop = 0;
        let childNodes = userTabs.childNodes;

        for (let i = 0; i < childNodes.length; i++) {
            if (childNodes[i].nodeType === Node.ELEMENT_NODE) {
                childNodes[i].classList.remove('bg-[#F2F3F4]');
            }
        }
    }
}

// setting method for user navigations are maximazed
function setUserNavigationsAsMax() {
    updateSheetHeight(maxHeight)
    let userCategories = document.getElementById('user-categories');

    navigationDragIconView(true);
    if (userCategories !== null) {
        userCategories.classList.remove('hidden');
    }
    let userTabs = document.getElementById('user-nav-tabs');

    if (userTabs !== null) {
        userTabs.style.marginTop = `56px`;  
        let childNodes = userTabs.childNodes;

        for (let i = 0; i < childNodes.length; i++) {
            if (childNodes[i].nodeType === Node.ELEMENT_NODE) {
                childNodes[i].classList.add('bg-[#F2F3F4]');
            }
        }
    }
}

// while user resizing navigation animation work on there
function userCategoriesAnimation() {
    let userCategories = document.getElementById('user-categories');
    let sheetContent = document.getElementById('nav-bar');
    let userTabs = document.getElementById('user-nav-tabs');

    if (userCategories !== null) {
        userCategories.style.opacity = OpacityReletedMaxAndMinHEight(parseInt(sheetContent.style.height));
        if (userTabs !== null) { 
            userTabs.style.marginTop = `${MarginReletedMaxAndMinHEight(parseInt(sheetContent.style.height))}px`;
        }
    }
}

// calculating user resignizing component view has changed
function OpacityReletedMaxAndMinHEight(height) {
    var opacity = 1; // Default opacity value

    if (height < maxHeight) {
        opacity = height / maxHeight - 0.1;
    }

    if (height === minHeight) {
        opacity = 0;
    }

    return opacity;
}

// calculating user resignizing component view has changed
function MarginReletedMaxAndMinHEight(height) {
    if (height <= minHeight) {
        return 0;
    } else if (height >= maxHeight) {
        return 56;
    }
    let persentDecrease = calculateDecreasePercentage(maxHeight, height);
        
    return decreaseByPercentage(56, persentDecrease);
}

function navigationDragIconView(hasArrow) {

    let dragIcon = document.getElementById('chevron');

    if (dragIcon !== null) {
        if (hasArrow == true) {
            dragIcon.classList.remove('nav-drag-line');
            dragIcon.classList.add('nav-drag-arrow');
        }
        else {
            dragIcon.classList.add('nav-drag-line');
            dragIcon.classList.remove('nav-drag-arrow');
        }
    }
}

function calculateDecreasePercentage(initialNumber, decreasedNumber) {
    const decreaseAmount = initialNumber - decreasedNumber;
    return (decreaseAmount / initialNumber) * 100;
}

function decreaseByPercentage(number, percentage) {
    return number - (number * percentage / 100);
}