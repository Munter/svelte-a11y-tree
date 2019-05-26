export default function findup(node, selector) {
  let currentNode = node;

  do {
    if (currentNode.matches(selector)) {
      return currentNode;
    }
    if (currentNode.matches("[role='tree']")) {
      return;
    }
  } while (currentNode = currentNode.parentNode);
}
