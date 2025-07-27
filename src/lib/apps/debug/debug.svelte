<script lang="ts">
  import { applications } from "$lib/applications.svelte";
  import AppIcon from "$lib/components/app/app-icon.svelte";
  import { hide, stackOrder, windows } from "$lib/components/window/windows.svelte";

  function closeAll() {
    let i = 0;
    while (i < windows.length) {
      if (!windows[i].id.startsWith("dev.kennyhui.debug")) {
        hide(windows[i].id);
        windows.splice(i, 1);
      } else {
        i++;
      }
    }
  }
</script>

<div data-nodrag class="mt-[28px] flex flex-col gap-2.5 overflow-auto p-2.5 pt-0">
  <div class="bg-base-100/50 rounded-field shrink-0 overflow-hidden border">
    <p class="border-b px-2 py-1 font-semibold">{applications.length} apps loaded</p>
    <ul class="flex flex-col max-h-64 overflow-auto">
      {#each applications as app}
        <li class="even:bg-base-content/5 grid grid-cols-[auto_1fr] gap-2 px-2 py-1">
          <div class="flex items-center">
            <AppIcon src={app.icon.default} size="xs" appId={app.id} />
          </div>
          <div>
            <p>{app.name}</p>
            <p class="text-base-content/50">{app.id}</p>
          </div>
        </li>
      {/each}
    </ul>
  </div>
  <div class="bg-base-100/50 rounded-field shrink-0 overflow-hidden border">
    <p class="border-b px-2 py-1 font-semibold">{windows.length} currently open</p>
    <ul class="flex flex-col">
      {#each windows as window}
        <li class="even:bg-base-content/5 px-2 py-1">
          {window.id}{stackOrder.includes(window.id) ? "" : " (hidden)"}
        </li>
      {/each}
    </ul>
  </div>
  <div class="bg-base-100/50 rounded-field shrink-0 overflow-hidden border">
    <p class="border-b px-2 py-1 font-semibold">Stack order</p>
    <ul class="flex flex-col">
      {#each stackOrder as id, i}
        <li class="even:bg-base-content/5 px-2 py-1">
          <span class="text-base-content/50">[{i}]</span>
          {id}
        </li>
      {/each}
    </ul>
  </div>
  <div class="flex flex-wrap items-center">
    <button class="btn" onclick={closeAll}>Close all</button>
  </div>
</div>
