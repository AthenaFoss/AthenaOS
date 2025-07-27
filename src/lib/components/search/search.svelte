<script lang="ts">
  import { App } from "$lib/core";
  import { controlKey, search } from "$lib/meta.svelte";
  import Fuse from "fuse.js";
  import { tick } from "svelte";
  import AppIcon from "../app/app-icon.svelte";
  import CommandModal from "./command-modal.svelte";
  import { applications } from "$lib/applications.svelte";

  const sorted = applications
    .slice(0)
    .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

  const fuse = new Fuse(sorted, {
    shouldSort: true,
    keys: ["name", "description"],
  });

  let modal: CommandModal | undefined = $state();
  let input: HTMLInputElement | undefined = $state();

  let query: string = $state("");
  let selected: number = $state(0);
  let results: App[] = $state(sorted);

  let open: boolean = $state(false);

  const clamp = (n: number, min: number, max: number): number => {
    return Math.min(Math.max(n, min), max);
  };

  $effect(() => {
    search.open = open;
  });

  $effect(() => {
    const filtered = fuse.search(query).map((res) => res.item);
    results = filtered.length === 0 ? sorted : filtered;
    selected = 0;
  });

  export const show = async () => {
    modal?.show();
    await tick();
    input?.focus();
  };

  export const close = () => {
    modal?.close();
  };

  export const toggle = () => {
    if (open) {
      close();
    } else {
      show();
    }
  };
</script>

<svelte:window
  onkeydown={(e) => {
    if (open) {
      if (e.key === "Escape") {
        if (query.trim() !== "") {
          query = "";
        } else {
          close();
        }
      }
      if (e.key === "Tab") {
        e.preventDefault();
      }
      if (e.key === "ArrowDown" || (controlKey(e) && e.key === "j")) {
        selected++;
      } else if (e.key === "ArrowUp" || (controlKey(e) && e.key === "k")) {
        selected--;
      }
      selected = clamp(selected, 0, results.length - 1);
      input?.focus();

      if (e.key === "Enter") {
        results[selected].open();
        close();
      }
    }
  }}
/>

<CommandModal bind:this={modal} bind:open title="Launchpad">
  <div class="flex flex-col">
    <input
      bind:this={input}
      bind:value={query}
      type="text"
      class="input input-lg input-ghost h-14 w-full rounded-xl px-4 focus-within:bg-transparent focus:bg-transparent focus:outline-none"
      placeholder="Search for apps"
    />
    <ul class="border-base-content/8 border-t p-2">
      {#each results as app, i}
        <li>
          <button
            class={{
              "rounded-field hover:bg-base-content/5 grid w-full grid-cols-[auto_auto_1fr] items-center gap-3 p-2 text-start text-sm whitespace-nowrap": true,
              "bg-base-content/10": i === selected,
            }}
            onclick={() => {
              app.open();
              close();
            }}
          >
            <AppIcon src={app.icon.default} alt="{app.name} icon" size="xs" appId={app.id} />
            <span>{app.name}</span>
            <span class="text-base-content/50 overflow-hidden text-ellipsis whitespace-nowrap">
            </span>
          </button>
        </li>
      {/each}
    </ul>
  </div>
</CommandModal>
