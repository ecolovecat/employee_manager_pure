const tableActions = document.querySelectorAll('.table-function');
const contextMenus = document.querySelectorAll('.context-menu');
let deletedBtn = document.querySelector('#deleteBtn')


// Show context menu when table row is clicked
tableActions.forEach(action => {
  action.addEventListener('click', (event) => {
    const x = event.clientX;
    const y = event.clientY;
    
    const contextMenu = action.querySelector('.context-menu');
    contextMenu.classList.add('visible');
    
    contextMenu.style.top = `${y}px`;
    contextMenu.style.left = `${x}px`;
    
    // Hide other visible context menus
    contextMenus.forEach(menu => {
      if (menu !== contextMenu) {
        menu.classList.remove('visible');
      }
    });
    deletedBtn.addEventListener('click', function() {
      let parent = action.parentNode
      parent.remove()
      openModal(toast)
      setTimeout(() => {
        closeModal(toast)
      }, 5000);
    })
  });
});

// Hide all context menus when clicking outside
document.addEventListener('click', event => {
  const isInsideContextMenu = 
    Array.from(contextMenus).some(menu => menu.contains(event.target)) || 
    Array.from(tableActions).some(action => action.contains(event.target));
  if (!isInsideContextMenu) {
    contextMenus.forEach(menu => menu.classList.remove('visible'));
  }
});