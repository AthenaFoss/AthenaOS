<script lang="ts">
  import { onMount, tick, type Snippet } from "svelte";
  import TablerLayoutSidebar from "~icons/tabler/layout-sidebar";
  import Toolbar from "./toolbar.svelte";
  import ToolbarButton from "./toolbar-button.svelte";

  let {
    title,
    transparent,
    leading: leadingSnippet,
    trailing: trailingSnippet,
    sidebar,
    children,
  }: {
    title: string;
    transparent?: boolean;
    leading?: Snippet;
    trailing?: Snippet;
    sidebar?: Snippet;
    children?: Snippet;
  } = $props();

  let open: boolean = $state(false);
  let ready: boolean = $state(false);

  onMount(async () => {
    await tick();
    ready = true;
  });
</script>

<div class="relative flex h-full overflow-x-hidden">
  <div
    class={{
      "flex shrink-0 overflow-hidden @md:w-[200px]": true,
      "w-0": !open,
      "w-[200px]": open,
      "transition-[width]": ready,
    }}
  >
    <ul
      class="mt-13 w-[200px] flex-1 shrink-0 flex-col overflow-x-hidden overflow-y-auto p-2.5 pt-0"
      data-nodrag
    >
      {@render sidebar?.()}
    </ul>
  </div>
  <div
    class={{
      "bg-base-100 relative flex h-full w-full shrink-0 flex-col @md:flex-1": true,
      "border-l border-black/18 dark:border-black": true,
      "@max-md:border-none": !open,
    }}
  >
    <Toolbar {transparent} {title} controls={open ? "never" : "auto"}>
      {#snippet leading()}
        {@render leadingSnippet?.()}
        <div class="@md:hidden">
          <ToolbarButton
            onclick={() => {
              open = !open;
            }}
          >
            <TablerLayoutSidebar />
          </ToolbarButton>
        </div>
        <div class="@max-md:hidden">
          <ToolbarButton disabled>
            <TablerLayoutSidebar />
          </ToolbarButton>
        </div>
      {/snippet}
      {#snippet trailing()}
        {@render trailingSnippet?.()}
      {/snippet}
    </Toolbar>
    <div data-nodrag class="flex-1 overflow-auto">
      {@render children?.()}
    </div>
  </div>
</div>
