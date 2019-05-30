<script>
  import TreeGroup from "./TreeGroup.svelte";
  import TreeItem from "./TreeItem.svelte";
  import findup from "../lib/findup.js";
  import focusItem from "../lib/focusItem.js";

  export let structure;
  export const level = 1;

  let tree;

  function getItemtext(item) {
    if (item.hasAttribute("aria-expanded")) {
      return item.firstChild.textContent;
    } else {
      return item.textContent;
    }
  }

  function handleKeyDown(e) {
    const { key, target } = e;

    const focusedItem = findup(target, "[role='treeitem']");
    const items = Array.from(tree.querySelectorAll("[role='treeitem']"));
    const focusedIdx = items.indexOf(focusedItem);

    let propagate = false;

    switch (key) {
      case "ArrowUp":
        focusItem(items[focusedIdx - 1]);
        break;
      case "ArrowDown":
        focusItem(items[focusedIdx + 1]);
        break;
      case "Home":
        focusItem(items[0]);
        break;
      case "End":
        focusItem(items[items.length - 1]);
        break;
      case "ArrowLeft":
        const focusedParent = findup(
          focusedItem.parentNode,
          "[role='treeitem']"
        );
        focusItem(focusedParent);
        break;
      case "*":
        const parentGroup = findup(focusedItem, "[role='group'],[role='tree']");

        const closedGroups = Array.from(parentGroup.children).filter(
          node => node.getAttribute("aria-expanded") === "false"
        );

        for (const group of closedGroups) {
          group.querySelector("[tabindex]").click();
        }
        break;
      default:
        propagate = true;

        if (key.length === 1) {
          const searchLetter = key.toLowerCase();

          for (let i = 0; i < items.length; i += 1) {
            const idx = (focusedIdx + 1 + i) % items.length;
            const firstLetter = getItemtext(items[idx])
              .toLowerCase()
              .slice(0, 1);

            if (firstLetter === searchLetter) {
              propagate = false;
              focusItem(items[idx]);
              break;
            }
          }
        }
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
