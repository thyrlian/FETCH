// Handle extension installation
chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});

// Background service worker initialization
console.log('Background service worker initialized'); 