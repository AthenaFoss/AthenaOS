<script lang="ts">
  import { App } from "$lib/core";
  import { quadInOut } from "svelte/easing";
  import TablerCircleFilled from "~icons/tabler/circle-filled";
  import AppIcon from "../app/app-icon.svelte";

  let { app, scale = 1 }: { app: App; scale?: number } = $props();

  let open: boolean = $derived(app.instances() > 0);
  let previousOpen: boolean = $state(false);

  let timeout: NodeJS.Timeout;
  let bounce: boolean = $state(false);

  function onclick() {
    app.open();
  }

  app.subscribe((e) => {
    if (app.id === "dev.kennyhui.launchpad") return;
    if (app.instances() === 0 && e.action === "open") {
      previousOpen = true;
      bounce = true;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        bounce = false;
      }, 800);
    } else if (e.action === "close") {
      previousOpen = false;
    }
  });

  let width: number = $state(0);

  const DURATION = 500;

  function shrink(_node: HTMLElement) {
    return {
      duration: DURATION,
      easing: quadInOut,
      css: (t: number) => {
        const eased = t;
        return `width: ${width * t}px; scale: ${eased}; opacity: ${eased};`;
      },
    };
  }
</script>

<button
  class="group relative shrink-0 overflow-visible"
  {onclick}
  bind:clientWidth={width}
  in:shrink
  out:shrink
>
  <div
    class="pointer-events-none absolute left-1/2 -translate-x-1/2 pb-4 opacity-0 group-hover:bottom-full group-hover:opacity-100"
  >
    <div
      class="bg-glass rounded-selector text-base-content/90 px-3 py-0.75 text-[13px] text-nowrap shadow-md"
    >
      <p>{app.name}</p>
    </div>
  </div>
  <div class="relative flex px-1.5">
    <div class="relative h-12 w-10">
      <div class="absolute top-1/2 left-1/2 w-10 -translate-1/2" class:bounce>
        {#if app.icon?.default}
          <AppIcon src={app.icon.default} size="sm" appId={app.id} />
        {:else}
          <div class="h-10 w-10 rounded-lg bg-gray-200 flex items-center justify-center">
            <span class="text-gray-500 text-xs font-medium">{app.name.charAt(0)}</span>
          </div>
        {/if}
      </div>
    </div>
    <span
      class={{
        "text-base-content/50 absolute top-full left-1/2 mt-1 -translate-x-1/2 text-[4px]": true,
        "opacity-100": open,
        "opacity-0": !open,
      }}
    >
      <TablerCircleFilled />
    </span>
  </div>
</button>

<style>
  .bounce {
    animation: bounce 800ms ease-in-out forwards;
  }

  @keyframes bounce {
    0% {
      transform: translateY(0px);
    }

    50% {
      transform: translateY(-10px);
    }

    100% {
      transform: translateY(0px);
    }
  }
</style>
