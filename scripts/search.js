document.addEventListener('DOMContentLoaded', function() {
  // Set constants
  const appName = chrome.i18n.getMessage("appName");
  const funcSearch = chrome.i18n.getMessage("funcSearch");
  document.getElementById('app-head-title').textContent = appName + " - " + funcSearch;
  document.getElementById('app-body-title').textContent = appName + " - " + funcSearch;
  const itemsListTitle = chrome.i18n.getMessage("textItemsListTitle");
  document.getElementById('items-list-title').textContent = itemsListTitle;
  
  const itemsList = document.getElementById('items-list');
  
  // Load saved items
  chrome.storage.sync.get(['savedItems'], function(result) {
    const items = result.savedItems || [];
    
    if (items.length === 0) {
      itemsList.innerHTML = '<div class="empty-state">No saved items yet</div>';
      return;
    }

    items.forEach(function(item) {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'item-entry';

      const title = document.createElement('a');
      title.href = item.url;
      title.textContent = item.highlight;
      title.target = '_blank';
      title.className = 'item-title';

      const meta = document.createElement('div');
      meta.className = 'item-meta';
      
      const url = document.createElement('div');
      url.className = 'item-url';
      url.textContent = item.url;

      const time = document.createElement('div');
      time.className = 'item-time';
      const date = new Date(item.timestamp);
      time.textContent = formatDate(date);

      meta.appendChild(url);
      meta.appendChild(time);
      
      itemDiv.appendChild(title);
      itemDiv.appendChild(meta);
      itemsList.appendChild(itemDiv);
    });
  });
});

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  return `${year}-${month}-${day} · ${hours}:${minutes}`;
} 