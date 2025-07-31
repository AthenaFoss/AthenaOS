<script lang="ts">
  import { commandKey } from "$lib/meta.svelte";
  import { themeName } from "$lib/theme";
  import { type Snippet } from "svelte";
  import { quintOut } from "svelte/easing";
  import { fade, scale } from "svelte/transition";
  import HeroiconsXMark from "~icons/heroicons/x-mark";

  const DURATION = 500;

  let {
    open = $bindable(false),
    title,
    onshow,
    onclose,
    children,
  }: {
    open?: boolean;
    title?: string;
    onshow?: Function;
    onclose?: Function;
    children?: Snippet;
  } = $props();

  let modal: HTMLDialogElement | undefined = $state();
  let timeout: NodeJS.Timeout;

  export function show() {
    clearTimeout(timeout);
    try {
      modal?.showModal();
    } catch (error) {
      console.warn('showModal not supported, using fallback');
    }
    open = true;
    onshow?.();
  }

  export function close() {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      try {
        modal?.close();
      } catch (error) {
        console.warn('close not supported, using fallback');
      }
    }, DURATION);
    open = false;
    onclose?.();
  }

  function blur(_node: HTMLElement) {
    return {
      duration: DURATION,
      easing: quintOut,
      css: (t: number) => `backdrop-filter: blur(${t * 16}px)`,
    };
  }

  $effect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.removeProperty("overflow");
    }
  });
</script>

<svelte:document
  onkeydown={(e) => {
    if (open && e.key === "Escape" && !commandKey(e)) {
      e.preventDefault();
      close();
    }
  }}
/>

<dialog
  aria-label={title}
  bind:this={modal}
  onclose={(e) => {
    e.preventDefault();
    close();
  }}
  class="relative"
  data-theme={themeName["dark"]}
>
  {#if open}
    <div
      in:blur
      out:blur
      class={{
        "absolute inset-0 grid overflow-hidden backdrop-blur-[16px]": true,
      }}
    >
      <button
        in:fade
        out:fade
        class="fixed top-0 right-0 z-50 p-6 transition-transform hover:scale-95 sm:hidden"
        aria-label="close"
        onclick={close}
      >
        <HeroiconsXMark />
      </button>
      <div
        in:scale={{ duration: DURATION, start: 1.1, opacity: 0 }}
        out:scale={{ duration: DURATION, start: 1.1, opacity: 0 }}
        role="presentation"
        onclick={(e) => {
          if (e.currentTarget !== e.target) return;
          close();
        }}
        class="col-start-1 row-start-1 flex flex-col overflow-y-auto"
      >
        {@render children?.()}
      </div>
    </div>
  {/if}
</dialog>

<style>
  dialog {
    pointer-events: none;
    visibility: hidden;
    position: fixed;
    inset: 0;
    margin: 0;
    background-color: transparent;
    max-width: none;
    max-height: none;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  dialog::backdrop {
    background-color: transparent;
  }

  dialog[open] {
    visibility: visible;
    pointer-events: auto;
    overflow-y: auto;
  }
</style>
