<script lang="ts">
  import WindowContent from "$lib/components/window/window-content.svelte";
import { onMount } from 'svelte';

  
 let content = `Welcome to AthenaFOSS!

AthenaFOSS is not just a developer community — it's a movement.
A collective of elite builders, open-source warriors, and curious minds who believe in shipping fast, learning endlessly, and building with purpose.

Slogan: BUILD. BUILD. BUILD.

Inside AthenaFOSS:
- You don’t just code — you innovate.
- You don’t just join — you belong.
- Projects move fast. Ideas move faster.
- Knowledge flows freely. So does caffeine ☕.

Whether you're crafting the next-gen dev tools or rewriting what open-source can be, AthenaFOSS is where you thrive.

Let’s build something legendary.`;
  

  
  let line = 1;
  
  let col = 1;
  
  let textareaEl: HTMLTextAreaElement;

  
  function updateCursorPosition() {
   
    if (textareaEl) {
      
      const pos = textareaEl.selectionStart;
      
      const textUptoCursor = content.slice(0, pos);
      
      const lines = textUptoCursor.split('\n');
      
      line = lines.length;
      
      col = lines[lines.length - 1].length + 1;
    }
  }

  
  onMount(() => {
    updateCursorPosition();
  });
</script>

<WindowContent>

<div class="flex flex-col h-screen w-full mx-auto rounded-xl shadow-lg border border-gray-700 bg-[#1e1e1e] overflow-hidden font-inter">
  
  <div class="flex items-center justify-between bg-[#2c2c2c] text-gray-300 px-4 py-2 text-sm font-semibold rounded-t-xl">
    
    <span class="w-full text-center">Notepad.txt</span>
    
    <span class="opacity-50 ml-2">●</span>
  </div>

  
  <textarea
    bind:this={textareaEl}    
    bind:value={content}      
    on:click={updateCursorPosition} 
    on:keyup={updateCursorPosition} 
    on:input={updateCursorPosition} 
    class="flex-1 p-4 font-mono text-sm text-gray-100 bg-[#1e1e1e] resize-none focus:outline-none leading-relaxed
           scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 rounded-b-xl"
    spellcheck="false"        
  ></textarea>

  
  <div class="flex items-center justify-between px-3 py-1 bg-[#2c2c2c] text-gray-400 text-xs border-t border-gray-700 rounded-b-xl">
    <span>Line: {line}, Col: {col}</span>
   
    <span>UTF-8 | Plain Text</span>
  </div>
</div>
</WindowContent>


<style>
  
  textarea::-webkit-scrollbar {
    width: 8px;
  }
  textarea::-webkit-scrollbar-thumb {
    background-color: #555;
    border-radius: 4px;
  }
  textarea::-webkit-scrollbar-track {
    background-color: #2c2c2c;
  }
</style>