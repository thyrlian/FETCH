document.addEventListener('DOMContentLoaded', function() {
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
      time.textContent = date.toLocaleString();

      meta.appendChild(url);
      meta.appendChild(time);
      
      itemDiv.appendChild(title);
      itemDiv.appendChild(meta);
      itemsList.appendChild(itemDiv);
    });
  });
}); 