// Initialize popup functionality
document.addEventListener('DOMContentLoaded', function() {
  const saveBtn = document.getElementById('saveBtn');
  const listBtn = document.getElementById('listBtn');
  const savedItems = document.getElementById('saved-items');
  const itemsList = document.getElementById('items-list');

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
          showNotification('Page saved successfully!');
        });
      });
    });
  });

  // List button click handler
  listBtn.addEventListener('click', function() {
    // Toggle saved items visibility
    const isHidden = savedItems.style.display === 'none';
    savedItems.style.display = isHidden ? 'block' : 'none';
    
    if (isHidden) {
      // Get and display saved items
      chrome.storage.sync.get(['savedItems'], function(result) {
        const items = result.savedItems || [];
        itemsList.innerHTML = ''; // Clear existing items
        
        items.forEach(function(item) {
          const li = document.createElement('li');
          const a = document.createElement('a');
          a.href = item.url;
          a.textContent = item.highlight;
          a.target = '_blank';
          li.appendChild(a);
          itemsList.appendChild(li);
        });
      });
    }
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