<script>
  export let item;
  export let level = 1;
  export let setSize = -1;
  export let posInset;
</script>

<style>
  li {
    list-style-type: none;
  }
</style>

<li role="none">
  <a
    role="treeitem"
    aria-level={level}
    aria-setsize={setSize}
    aria-posinset={posInset}
    tabindex="-1"
    href={item.href}>
     {item.label}
  </a>
</li>
