import { App, MenuBarItem, MenuItem, Shortcut } from "./core";
import About from "./apps/about/about.svelte";
import Browser from "./apps/browser/browser.svelte";
// import Debug from "./apps/debug/debug.svelte";
// import Iframe from "./apps/iframe/iframe.svelte";
// import Resume from "./apps/resume/resume.svelte";
import Settings from "./apps/settings/settings.svelte";
import VSCode from "./apps/vscode/vscode.svelte";
import Photos from "./apps/photos/photos.svelte";
import { query } from "./images";
import { launchpad } from "./meta.svelte";
import HackerHouse from "./apps/hackerhouse/hackerhouse.svelte";

import Terminal from "./apps/terminal/terminal.svelte";

import Folder from "./apps/files/finder.svelte"
import Notepad from "./apps/Notepad/notepad.svelte"


export const applications: App[] = $state([
  // new App("dev.kennyhui.resume", "Resume", query("icons/file.png"))
  //   .setBody(Resume)
  //   .setDefaultSize({ x: 400, y: 450 }),
  new App("dev.kennyhui.launchpad", "Launchpad", query("icons/launchpad.png"))
    .setCallback(() => {
      if (launchpad.current) {
        launchpad.current.show();
      } else {
        launchpad.pendingShow = true;
      }
    })
    .hideFromLaunchpad(),
  new App("dev.kennyhui.about", "About", query("icons/about.png"))
    .setBody(About)
    .disableTitlebar()
    .setDefaultSize({ x: 280, y: 500 })
    .setMinSize({ x: 280, y: 500 }),
  new App("dev.kennyhui.settings", "System Settings", query("icons/settings.png"))
    .setBody(Settings)
    .disableTitlebar()
    .setDefaultSize({
      x: 600,
      y: 500,
    })
    .setControlsSize("standard"),
  new App("dev.kennyhui.browser", "Browser", query("icons/chromium.png"))
    .setBody(Browser)
    .setDefaultSize({
      x: 600,
      y: 500,
    })
    .setMinSize({
      x: 300,
      y: 52,
    })
    .disableTitlebar()
    .setControlsSize("standard")
    .allowMultipleWindows(),
  // new App("dev.kennyhui.debug", "Debug", query("icons/debug.png"))
  //   .setBody(Debug)
  //   .disableTitlebar()
  //   .setDefaultSize({ x: 280, y: 400 })
  //   .setMinSize({ x: 280, y: 400 })
  //   .setDefaultPosition({ x: 40, y: 40 })
  //   .hideFromDock(),
  // new App("dev.kennyhui.flaggle", "Flaggle", query("icons/flaggle.png"))
  //   .setBody(Iframe)
  //   .setProps({ src: "https://flaggle.kennyhui.dev/", title: "Flaggle" })
  //   .setDefaultSize({
  //     x: 600,
  //     y: 500,
  //   })
  //   .setMinSize({
  //     x: 300,
  //     y: 58,
  //   })
  //   .hideFromDock(),
  // new App("dev.kennyhui.videopoker", "Video Poker", query("icons/video-poker.png"))
  //   .setBody(Iframe)
  //   .setProps({ src: "https://poker.kennyhui.dev/", title: "Video Poker" })
  //   .setDefaultSize({
  //     x: 600,
  //     y: 500,
  //   })
  //   .setMinSize({
  //     x: 300,
  //     y: 58,
  //   })
  //   .hideFromDock(),
  new App("dev.kennyhui.hackerhouse", "Hacker House", query("icons/file.png"))
    .setBody(HackerHouse)
    .setDefaultSize({
      x: 700,
      y: 500,
    }),

  new App("dev.kennyhui.terminal", "Terminal", query("icons/terminal.png"))
    .setBody(Terminal)
    .setDefaultSize({ x: 600, y: 400 })
    .setMinSize({ x: 300, y: 200 }),
  new App("dev.kennyhui.vscode", "VS Code", query("icons/vscode.png"))
    .setBody(VSCode)
    .setDefaultSize({ x: 900, y: 600 })
    .setMinSize({ x: 600, y: 400 })
    .disableTitlebar()
    .setControlsSize("standard"),
  new App("dev.kennyhui.photos", "Photos", query("icons/photos.png"))
    .setBody(Photos)
    .setDefaultSize({ x: 1200, y: 800 })
    .setMinSize({ x: 400, y: 300 }),
  new App("github.link", "GitHub", query("icons/github.png"))
    .setBody(() => {
      window.open("https://github.com/AthenaFoss", "_blank");
      return {
        // Return a dummy element since we’re just opening a link
        $destroy() { },
        $set() { },
      };
    }),

  new App("dev.kennyhui.finder", "Finder", query("icons/finder.png"))
    .setBody(Folder)
    .setDefaultSize({
      x: 1400,
      y: 700,
    })
    .setMinSize({
      x: 700,
      y: 500,
    })
    .disableTitlebar()
    .setControlsSize("standard"),

  new App("dev.kennyhui.notes", "Notes", query("icons/Notepad.png"))
    .setBody(Notepad)
    .setDefaultSize({
      x: 1200,
      y: 800
    })
    .setMinSize({
      x: 900,
      y: 600
    })
    .disableTitlebar()
    .setControlsSize("standard")
]);
