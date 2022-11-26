'use strict';

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'loading') {
    const url = changeInfo.url || tab.pendingUrl || tab.url;
    if (url === 'chrome://newtab/') {
      chrome.tabs.query(
        {
          currentWindow: true,
          url: 'chrome://newtab/',
        },
        (result) => {
          if (!chrome.runtime.lastError && result.length > 0) {
            for (const item of result) {
              if (item.id && item.id !== tabId) {
                //? 1. close current tab
                chrome.tabs.remove(tabId);
                chrome.tabs.highlight({
                  tabs: item.index,
                });
                break;
              }
            }
          }
        }
      );
    }
  }
});
