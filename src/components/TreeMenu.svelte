<script>
  import TreeGroup from "./TreeGroup.svelte";
  import TreeItem from "./TreeItem.svelte";
  import findup from "../lib/findup.js";
  import focusItem from "../lib/focusItem.js";

  export let structure;
  export const level = 1;

  let tree;

  function handleKeyDown(e) {
    const { key, target } = e;

    const item = findup(target, "[role='treeitem']");
    const items = Array.from(tree.querySelectorAll("[role='treeitem']"));
    const itemIdx = items.indexOf(item);

    let propagate = false;

    switch (key) {
      case "ArrowUp":
        focusItem(items[itemIdx - 1]);
        break;
      case "ArrowDown":
        focusItem(items[itemIdx + 1]);
        break;
      case "Home":
        focusItem(items[0]);
        break;
      case "End":
        focusItem(items[items.length - 1]);
        break;
      case "ArrowLeft":
        const parentItem = findup(item.parentNode, "[role='treeitem']");
        focusItem(parentItem);
        break;
      case "*":
        const parentGroup = findup(item, "[role='group'],[role='tree']");

        const closedGroups = Array.from(parentGroup.children).filter(
          node => node.getAttribute("aria-expanded") === "false"
        );

        for (const group of closedGroups) {
          group.querySelector("[tabindex]").click();
        }
        break;
      default:
        propagate = true;
    }

    if (!propagate) {
      e.preventDefault();
      e.stopPropagation();
    }
  }
</script>

<style>
  ul {
    padding: 0;
  }
</style>

<ul role="tree" on:keydown={handleKeyDown} bind:this={tree}>
  {#each structure as item, i}
    <svelte:component
      this={item.type === 'group' ? TreeGroup : TreeItem}
      {item}
      tabIndex={i === 0 ? 0 : -1}
      {level}
      setSize={structure.length}
      posInset={i + 1} />
  {/each}
</ul>
