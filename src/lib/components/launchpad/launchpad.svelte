<script lang="ts">
  import { applications } from "$lib/applications.svelte";
  import { launchpad } from "$lib/meta.svelte";
  import AppIcon from "../app/app-icon.svelte";
  import FullscreenModal from "./fullscreen-modal.svelte";

  let modal: FullscreenModal | undefined = $state();

  let open: boolean = $state(false);

  $effect(() => {
    launchpad.open = open;
  });

  // Check for pending show requests when component becomes available
  $effect(() => {
    if (modal && launchpad.pendingShow) {
      launchpad.pendingShow = false;
      show();
    }
  });

  export const show = () => {
    try {
      modal?.show();
      open = true;
    } catch (error) {
      console.error('Error showing launchpad:', error);
    }
  };

  export const close = () => {
    try {
      modal?.close();
    } catch (error) {
      console.error('Error closing launchpad:', error);
    }
  };

  export const toggle = () => {
    if (open) {
      close();
    } else {
      show();
    }
  };
</script>

<FullscreenModal bind:this={modal} bind:open title="Launchpad">
  <div class="self-center p-8 pb-0"></div>
  <div
    class="mx-auto grid w-full grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-x-8 gap-y-16 p-8 pb-16 sm:max-w-4/5 sm:gap-x-16"
    role="presentation"
    onclick={(e) => {
      if (e.currentTarget !== e.target) return;
      close();
    }}
  >
    {#each applications.filter((app) => app.showInLaunchpad && app.icon?.default) as app}
      <button
        aria-label={app.name}
        onclick={() => {
          close();
          app.open();
        }}
        class="group relative mx-auto flex w-fit cursor-default flex-col items-center gap-2 rounded-sm focus:outline-none"
      >
        <div class="group-active:brightness-50">
          {#if app.icon?.default}
            <AppIcon src={app.icon.default} alt="{app.name} icon" size="lg" appId={app.id} />
          {:else}
            <div class="h-20 w-20 rounded-lg bg-gray-200 flex items-center justify-center">
              <span class="text-gray-500 text-sm font-medium">{app.name.charAt(0)}</span>
            </div>
          {/if}
        </div>
        <p
          class="text-shadow pointer-events-none absolute top-full left-1/2 mt-2.5 w-32 -translate-x-1/2 text-center text-[13px]"
        >
          {app.name}
        </p>
      </button>
    {/each}
  </div>
</FullscreenModal>
