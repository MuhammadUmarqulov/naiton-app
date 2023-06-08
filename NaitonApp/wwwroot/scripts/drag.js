// Global variables for tracking drag events
let isDragging = false, startY, startHeight;

// Sets initial drag position, sheetContent height and add dragging class to the bottom sheet
export function dragStart(e) {
    isDragging = true;
    startY = e.pageY || e.touches?.[0].pageY;
    let sheetContent = document.getElementById('nav-bar');
    startHeight = parseInt(sheetContent.style.height);
    sheetContent.classList.add("dragging");
}

// Calculates the new height for the sheet content and call the updateSheetHeight function
export function dragging(e) {
    if (!isDragging) return;
    const delta = startY - (e.pageY || e.touches?.[0].pageY);
    console.log('DELTA: ' + delta)
    const newHeight = startHeight + delta / window.innerHeight * 100;
    console.log('newHeight: ' + newHeight)
    updateSheetHeight(newHeight);
}

// Determines whether to hide, set to fullscreen, or set to default 
// height based on the current height of the sheet content
export function dragStop() {
    isDragging = false;
    let sheetContent = document.getElementById('nav-bar')
    sheetContent.classList.remove("dragging");
    const sheetHeight = parseInt(sheetContent.style.height);
    sheetHeight < 25 ? hideBottomSheet() : sheetHeight > 75 ? updateSheetHeight(100) : updateSheetHeight(50);
}

const updateSheetHeight = (height) => {
    console.log('height: ' + height)
    let sheetContent = document.getElementById('nav-bar')
    sheetContent.style.height = `${height}px`; //updates the height of the sheet content
    // Toggles the fullscreen class to bottomSheet if the height is equal to 100
    //bottomSheet.classList.toggle("fullscreen", height === 100);
}