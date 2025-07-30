import type ControlCenter from "./components/control-center/control-center.svelte";
import type Launchpad from "./components/launchpad/launchpad.svelte";
import type Search from "./components/search/search.svelte";

export const launchpad: {
  current: Launchpad | undefined;
  open: boolean;
  pendingShow: boolean;
} = $state({
  current: undefined,
  open: false,
  pendingShow: false
});

export const search: {
  current: Search | undefined;
  open: boolean;
} = $state({
  current: undefined,
  open: false,
});

export const controlCenter: {
  current: ControlCenter | undefined;
  open: boolean;
} = $state({
  current: undefined,
  open: false,
});

export const menuBar: {
  active: boolean;
  activeId: string;
} = $state({
  active: false,
  activeId: "",
});

export function isMac(): boolean {
  try {
    return navigator.userAgent.indexOf("Mac OS X") != -1;
  } catch {
    return false;
  }
}

export const controlKey = (e: KeyboardEvent) => (isMac() ? e.ctrlKey : e.metaKey);
export const commandKey = (e: KeyboardEvent) => (isMac() ? e.metaKey : e.ctrlKey);

export const modifiers = isMac()
  ? {
      control: "⌃",
      option: "⌥",
      shift: "⇧",
      command: "⌘",
    }
  : {
      control: "Super",
      option: "Alt",
      shift: "Shift",
      command: "Ctrl",
    };

export const enterKey = "↵";
export const backspaceKey = "⌫";

export const version: string = import.meta.env.PACKAGE_VERSION;

export function getScreenSizeEstimate(): number {
  const w = window.screen.width;
  const h = window.screen.height;
  const diagonal = Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2));

  return Math.floor(diagonal / 94);
}
