import { h } from './element';
import { bindClickoutside, unbindClickoutside } from './event';
import { cssPrefix } from '../config';
import { tf } from '../locale/locale';

const menuItems = [
  // { key: 'copy', title: tf('contextmenu.copy'), label: 'Ctrl+C' },
  { key: 'cut', title: tf('contextmenu.cut'), label: 'Ctrl+X' },
  { key: 'paste', title: tf('contextmenu.paste'), label: 'Ctrl+V' },
  { key: 'paste-value', title: tf('contextmenu.pasteValue'), label: 'Ctrl+Shift+V' },
  { key: 'paste-format', title: tf('contextmenu.pasteFormat'), label: 'Ctrl+Alt+V' },
  { key: 'divider' },
  // { key: 'insert-row', title: tf('contextmenu.insertRow') },
  { key: 'insert-column', title: tf('contextmenu.insertColumn') },
  { key: 'divider' },
  // { key: 'delete-row', title: tf('contextmenu.deleteRow') },
  { key: 'delete-column', title: tf('contextmenu.deleteColumn') },
  { key: 'delete-cell-text', title: tf('contextmenu.deleteCellText') },
  // { key: 'divider' },
  // { key: 'validation', title: tf('contextmenu.validation') },
];

function buildMenuItem(item) {
  if (item.key === 'divider') {
    return h('div', `${cssPrefix}-item divider`);
  }
  return h('div', `${cssPrefix}-item`)
    .on('click', () => {
      this.itemClick(item.key);
      this.hide();
    })
    .children(
      item.title(),
      h('div', 'label').child(item.label || ''),
    );
}

function buildMenu() {
  // 简单表格不要delete-cell-text(删除数据)
  // if (this.tableType === 'easy-table') {
  //   return menuItems.filter(item => item.key !== 'delete-cell-text').map(it => buildMenuItem.call(this, it));
  // } else {
  //   return menuItems.map(it => buildMenuItem.call(this, it));
  // }

  return menuItems.map(it => buildMenuItem.call(this, it));
}

export default class ContextMenu {
  constructor(viewFn, isHide = false, tableType) {
    this.tableType = tableType
    if (this.tableType !== 'easy-table') {
      this.el = h('div', `${cssPrefix}-contextmenu`)
        .children(...buildMenu.call(this))
        .hide();
    } else {
      this.el = h('div')
    }
    // this.el = h('div', `${cssPrefix}-contextmenu`)
    //   .children(...buildMenu.call(this))
    //   .hide();
    this.viewFn = viewFn;
    this.itemClick = () => {};
    this.isHide = isHide;
  }

  hide() {
    const { el } = this;
    el.hide();
    unbindClickoutside(el);
  }

  setPosition(x, y) {
    if (this.isHide) return;
    const { el } = this;
    const { height, width } = el.show().offset();
    const view = this.viewFn();
    let top = y;
    let left = x;
    if (view.height - y <= height) {
      top -= height;
    }
    if (view.width - x <= width) {
      left -= width;
    }
    el.offset({ left, top });
    bindClickoutside(el);
  }
}
