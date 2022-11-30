'use strict';
import { createContextMenu } from './ui.js';

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
                //? 2. switch to new-tab
                chrome.tabs.highlight({
                  tabs: item.index,
                });
                //? 3. reload tab (optional);
                chrome.storage.local.get('reloadTab', (items) => {
                  if (!chrome.runtime.lastError && items) {
                    const { reloadTab } = items;
                    if (reloadTab) {
                      chrome.tabs.reload(item.id);
                    }
                  }
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

chrome.runtime.onInstalled.addListener((details) => {
  const { reason } = details;
  if (reason === 'install' || reason === 'update') {
    createContextMenu();
  }
});

chrome.runtime.onStartup.addListener(() => {
  createContextMenu();
});

chrome.contextMenus.onClicked.addListener((info) => {
  if (!chrome.runtime.lastError && info) {
    const { menuItemId, checked } = info;
    if (menuItemId === 'reloadTab') {
      chrome.storage.local.set({
        reloadTab: checked,
      });
    }
  }
});
