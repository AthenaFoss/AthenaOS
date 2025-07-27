<script lang="ts">
  import { applications } from "$lib/applications.svelte";
  import AppIcon from "$lib/components/app/app-icon.svelte";
  import ToolbarButton from "$lib/components/ui/toolbar-button.svelte";
  import Toolbar from "$lib/components/ui/toolbar.svelte";
  import WindowDialog from "$lib/components/ui/window-dialog.svelte";
  import MonacoEditor from "./monaco-editor.svelte";
  import type * as Monaco from "monaco-editor/esm/vs/editor/editor.api";

  const app = $derived(applications.find((app) => app.id === "dev.kennyhui.monaco"));

  let value = $state("");
  let position: Monaco.Position | null = $state(null);

  let dialogOpen: boolean = $state(false);

  $inspect(position);
</script>

<Toolbar>
  {#snippet leading()}
    <ToolbarButton
      onclick={() => {
        dialogOpen = true;
      }}>Untitled</ToolbarButton
    >
  {/snippet}
  {#snippet trailing()}
    <p class="text-base-content/50 px-2 font-semibold">
      Ln {position?.lineNumber || 1}, Col {position?.column || 1}
    </p>
  {/snippet}
</Toolbar>
<div class="relative z-10 h-full">
  <MonacoEditor bind:value bind:position></MonacoEditor>
</div>
{#if dialogOpen}
  <WindowDialog>
    {#if app}
      <AppIcon src={app.icon.default} appId={app.id} />
    {/if}
    <p class="font-bold">Where do you want to save this file?</p>
    <p class="text-[11px]">Saving will overwrite any existing files present</p>
    <label class="grid grid-cols-[1fr_3fr] items-center gap-2">
      <span class="text-base-content/70 justify-self-end text-[11px]">Save As:</span>
      <input type="text" class="input justify-self-start" />
    </label>
    <div class="mt-3 flex w-full items-center justify-between gap-2">
      <div></div>
      <div class="flex items-center gap-2">
        <button
          class="btn w-20"
          onclick={() => {
            dialogOpen = false;
          }}>Cancel</button
        >
        <button class="btn btn-accent w-20">Save</button>
      </div>
    </div>
  </WindowDialog>
{/if}
