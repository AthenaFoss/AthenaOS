<script lang="ts">
  import type { Picture } from "vite-imagetools";

  let {
    src,
    alt,
    size = "md",
    appId,
  }: {
    src: string | Picture;
    alt?: string;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    appId?: string;
  } = $props();
  const isSpecialApp = appId === "dev.kennyhui.finder" || appId === "dev.kennyhui.vscode";
</script>

<div class="drop-shadow-sm">
  <enhanced:img
    loading="lazy"
    {src}
    {alt}
    class={{
      "object-cover": true,
      "h-5 w-5": size === "xs",
      "h-10 w-10": size === "sm",
      "h-14 w-14": size === "md",
      "h-20 w-20": size === "lg",
      "h-30 w-30": size === "xl",
      "scale-125 rounded-2xl": isSpecialApp, // Increase size by 25% and add more rounded corners
    }}
  />
</div>
