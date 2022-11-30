'use strict';

const menus = ['reloadTab'];

async function createContextMenu() {
  const items = await chrome.storage.local.get(menus);
  menus.forEach((menu) => {
    chrome.contextMenus.create({
      id: menu,
      type: 'checkbox',
      checked: items[menu] === true,
      title: chrome.i18n.getMessage(menu),
      contexts: ['action'],
    });
  });
}

export { createContextMenu };
