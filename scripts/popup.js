// Initialize popup functionality
document.addEventListener('DOMContentLoaded', function() {
  // Set constants
  const appName = chrome.i18n.getMessage("appName");
  document.getElementById('app-head-title').textContent = appName;
  document.getElementById('app-body-title').textContent = appName;

  const saveBtn = document.getElementById('saveBtn');
  saveBtn.insertAdjacentText('beforeend', chrome.i18n.getMessage("funcSave"));
  
  const searchBtn = document.getElementById('searchBtn');
  searchBtn.insertAdjacentText('beforeend', chrome.i18n.getMessage("funcSearch"));

  // Get current active tab info
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    const currentTab = tabs[0];
    const titleElement = document.getElementById('tab-title');
    titleElement.textContent = currentTab.title;

    // Save button click handler
    saveBtn.addEventListener('click', function() {
      const item = {
        url: currentTab.url,
        highlight: currentTab.title,
        timestamp: new Date().toISOString()
      };

      // Check whether item already exists, if not, save it
      chrome.storage.sync.get(['savedItems'], function(result) {
        const savedItems = result.savedItems || [];
        
        if (isUrlExists(item.url, savedItems)) {
          showNotification('Already exists!');
          return;
        }
        
        savedItems.push(item);
        chrome.storage.sync.set({ savedItems: savedItems }, function() {
          showNotification('Saved!');
        });
      });
    });
  });

  // Search button click handler
  searchBtn.addEventListener('click', function() {
    chrome.tabs.create({ url: 'search.html' });
  });
});

// Check if URL already exists in saved items
function isUrlExists(url, savedItems) {
  return savedItems.some(item => item.url === url);
}

// Add this new function for showing notifications
function showNotification(message) {
  const notification = document.getElementById('notification');
  notification.textContent = message;
  notification.classList.add('show');
  
  // Hide notification after 2 seconds
  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
}