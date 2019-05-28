<script>
  import TreeItem from "./TreeItem.svelte";
  import focusItem from "../lib/focusItem.js";

  export let item;
  export let level = 1;
  export let setSize = -1;
  export let posInset;
  export let isExpanded = false;
  export let tabIndex = -1;

  let containerEl;
  let groupEl;

  function toggle() {
    isExpanded = !isExpanded;
  }

  function handleItemKeyDown(e) {
    const { key, target } = e;

    switch (key) {
      case "Enter":
      case " ":
        toggle();
        e.preventDefault();
        e.stopPropagation();
        break;
      case "ArrowLeft":
        if (isExpanded) {
          isExpanded = false;
          e.preventDefault();
          e.stopPropagation();
        }
        break;
      case "ArrowRight":
        if (isExpanded) {
          focusItem(groupEl.querySelector("[role='treeitem']"));
        } else {
          isExpanded = true;
        }
        e.preventDefault();
        e.stopPropagation();
        break;
    }
  }
</script>

<style>
  ul {
    padding: 0;
    padding-left: 20px;
  }

  li {
    list-style-type: none;
  }

  [aria-expanded]:before {
    content: "▶ ";
  }

  [aria-expanded="true"]:before {
    content: "▼ ";
  }
</style>

<li
  role="treeitem"
  aria-level={level}
  aria-setsize={setSize}
  aria-posinset={posInset}
  aria-expanded={isExpanded}
  bind:this={containerEl}>
  <span tabindex={tabIndex} on:click={toggle} on:keydown={handleItemKeyDown}>
     {item.label}
  </span>
  {#if isExpanded}
    <ul role="group" bind:this={groupEl}>
      {#each item.children as child, i}
        <!-- <svelte:component
          this={child.type === 'group' ? self : TreeItem}
          item={child}
          level={level + 1}
          setSize={item.children.length}
          posInset={i + 1} /> -->
        {#if child.type === 'group'}
          <svelte:self
            item={child}
            level={level + 1}
            setSize={item.children.length}
            posInset={i + 1} />
        {:else}
          <TreeItem
            item={child}
            level={level + 1}
            setSize={item.children.length}
            posInset={i + 1} />
        {/if}
      {/each}
    </ul>
  {/if}
</li>
