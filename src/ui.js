'use strict';

const menus = ['reloadTab'];

function createContextMenu() {
  chrome.storage.local.get(menus, (items) => {
    menus.forEach((menu) => {
      chrome.contextMenus.create({
        id: menu,
        type: 'checkbox',
        checked: items[menu] === true,
        title: chrome.i18n.getMessage(menu),
        contexts: ['action'],
      });
    });
  });
}

export { createContextMenu };
