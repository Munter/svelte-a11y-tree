<script>
  import TreeItem from "./TreeItem.svelte";
  import focusItem from "../lib/focusitem.js";

  export let item;
  export let level = 1;
  export let setSize = -1;
  export let posInset;
  export let isExpanded = false;
  export let tabIndex = -1;

  let treeItem;
  let treeGroup;

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
          focusItem(treeGroup.querySelector("[role='treeitem']"));
        } else {
          isExpanded = true;
        }
        e.preventDefault();
        e.stopPropagation();
        break;
    }
  }

  // function handleGroupKeyDown(e) {
  //   const { key, target } = e;

  //   const item = findup(target, "[role='treeitem']");
  //   const setSize = Number(item.getAttribute("aria-setsize"));
  //   const posInset = Number(item.getAttribute("aria-posinset"));

  //   let propagate = false;

  //   switch (key) {
  //     case "ArrowUp":
  //       _focusIndex(treeGroup, posInset - 1);
  //       break;
  //     case "ArrowDown":
  //       _focusIndex(treeGroup, posInset + 1);
  //       break;
  //     case "Home":
  //       _focusIndex(treeGroup, 1);
  //       break;
  //     case "End":
  //       _focusIndex(treeGroup, setSize);
  //       break;
  //     case "ArrowLeft":
  //       const parentItem = findup(
  //         target,
  //         "[role='treeitem'][aria-expanded='true']"
  //       );
  //       const focusRecipient = parentItem.querySelector("[tabindex]");

  //       focusRecipient.focus();
  //       break;
  //     case "*":
  //       break;
  //     default:
  //       propagate = true;
  //   }

  //   if (!propagate) {
  //     e.preventDefault();
  //     e.stopPropagation();
  //   }
  // }
</script>

<style>
  ul {
    padding: 0;
    padding-left: 20px;
  }

  button {
    -webkit-appearance: none;
    appearance: none;
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
  bind:this={treeItem}>
  <span tabindex={tabIndex} on:click={toggle} on:keydown={handleItemKeyDown}>
     {item.label}
  </span>
  {#if isExpanded}
    <ul role="group" bind:this={treeGroup}>
      {#each item.children as child, i}
        <!-- <svelte:component
          this={child.type === 'group' ? TreeGroup : TreeItem}
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
