// Initialize popup functionality
document.addEventListener('DOMContentLoaded', function() {
  const saveBtn = document.getElementById('saveBtn');
  const searchBtn = document.getElementById('searchBtn');

  // Get current active tab and display title
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    const currentTab = tabs[0];
    const titleElement = document.getElementById('tab-title');
    titleElement.textContent = currentTab.title;

    // Save button click handler
    saveBtn.addEventListener('click', function() {
      const item = {
        url: currentTab.url,
        highlight: currentTab.title,  // Using title as highlight for now
        timestamp: new Date().toISOString()
      };

      // Get existing items from storage
      chrome.storage.sync.get(['savedItems'], function(result) {
        const savedItems = result.savedItems || [];
        savedItems.push(item);
        
        // Save updated items back to storage
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