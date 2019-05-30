import findup from './findup.js';

export default function focusItem(item) {
  if (item) {
    const tree = findup(item, `[role="tree"]`);
    const previousFocused = tree.querySelector(`[tabindex="0"]`);

    let nextFocused;

    if (item.hasAttribute("tabindex")) {
      nextFocused = item;
    } else {
      nextFocused = item.querySelector("[tabindex]");
    }

    previousFocused.setAttribute("tabindex", -1);
    nextFocused.setAttribute("tabindex", 0);
    nextFocused.focus({ preventScroll: true });
    nextFocused.scrollIntoView({
      block: 'center',
      behavior: 'smooth'
    });
  }
}
