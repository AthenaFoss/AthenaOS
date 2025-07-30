<script lang="ts">
  import { page } from "$app/state";
  import { applications } from "$lib/applications.svelte";
  import { settings } from "$lib/apps/settings/settings";
  import Dock from "$lib/components/dock/dock.svelte";
  import Gradient from "$lib/components/gradient/gradient.svelte";
  import Launchpad from "$lib/components/launchpad/launchpad.svelte";
  import MenuBar from "$lib/components/menu/menu-bar.svelte";
  import Search from "$lib/components/search/search.svelte";
  import WindowManager from "$lib/components/window/window-manager.svelte";
  import { commandKey, launchpad, search } from "$lib/meta.svelte";
  import { onMount } from "svelte";
  import { MetaTags, deepMerge } from "svelte-meta-tags";
  import "../app.css";

  let { data, children } = $props();

  let metaTags = $derived(deepMerge(data.baseMetaTags, page.data.pageMetaTags));

  // TODO: Add a way to open the about window - uncomment this to show the about window
  // onMount(() => {
  //   applications.find((app) => app.id === "dev.kennyhui.about")?.open();
  // });
</script>

<svelte:window
  onkeydown={(e) => {
    if (commandKey(e)) {
      if (e.key === "l") {
        e.preventDefault();
        if (launchpad.current) {
          launchpad.current.toggle();
        } else {
          launchpad.pendingShow = true;
        }
        search.current?.close();
      }
      if (e.key === "k") {
        if (launchpad.open) return;
        e.preventDefault();
        search.current?.toggle();
      }
    }
  }}
/>

<MetaTags {...metaTags} />

<div class="relative flex h-full w-full flex-col overflow-hidden">
  <div class="absolute inset-0">
    <Gradient />
  </div>
  {@render children()}
  <main class="fixed top-8 right-0 bottom-18 left-0 overflow-hidden">
    <WindowManager /> 
  </main>
  <MenuBar />
  <Dock />
  <Launchpad bind:this={launchpad.current} />
  <Search bind:this={search.current} />
</div>
{#if $settings.roundedCorners}
  <div class="pointer-events-none fixed inset-0 rounded-[10px] shadow-[0_0_0_10px_black]"></div>
{/if}
