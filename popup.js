// Initialize popup functionality
document.addEventListener('DOMContentLoaded', function() {
  // Get current active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    const currentTabTitle = tabs[0].title;
    const titleElement = document.getElementById('tab-title');
    titleElement.textContent = currentTabTitle;
  });
});