<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    children,
  }: {
    children?: Snippet;
  } = $props();
</script>

<div data-nodrag class="window-content">
  {@render children?.()}
</div>
