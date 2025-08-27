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

  // Apps that appear smaller and need scaling
  const smallerApps = [
    "dev.kennyhui.vscode",
    "dev.kennyhui.photos", 
    "dev.kennyhui.finder",
    "dev.kennyhui.github",
    "dev.kennyhui.notepad",
    "dev.kennyhui.x"
  ];
  
  const needsScaling = appId && smallerApps.includes(appId);
</script>

<div class="drop-shadow-sm">
  <enhanced:img
    loading="lazy"
    {src}
    {alt}
    class={{
      "object-fill": true,
      "h-5 w-5": size === "xs",
      "h-10 w-10": size === "sm",
      "h-14 w-14": size === "md",
      "h-20 w-20": size === "lg",
      "h-30 w-30": size === "xl",
    }}
    style={needsScaling ? "transform: scale(1.3); transform-origin: center;" : ""}
  />
</div>