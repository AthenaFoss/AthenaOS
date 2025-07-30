<script lang="ts">
  import WindowContent from "$lib/components/window/window-content.svelte";
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  interface Note {
    id: string;
    title: string;
    content: string;
    folder: string;
    date: string;
  }

  interface Folder {
    name: string;
    count: number;
    icon: string;
  }

  // Default data
  const defaultFolders: Folder[] = [
    { name: 'Notes', count: 3, icon: '📝' }
  ];

  const defaultNotes: Note[] = [
    {
      id: '1',
      title: 'Welcome to AthenaFOSS',
      content: `Welcome to AthenaFOSS!

AthenaFOSS is not just a developer community — it's a movement.
A collective of elite builders, open-source warriors, and curious minds who believe in shipping fast, learning endlessly, and building with purpose.

Slogan: BUILD. BUILD. BUILD.

Inside AthenaFOSS:
- You don't just code — you innovate.
- You don't just join — you belong.
- Projects move fast. Ideas move faster.
- Knowledge flows freely. So does caffeine ☕.

Whether you're crafting the next-gen dev tools or rewriting what open-source can be, AthenaFOSS is where you thrive.

Let's build something legendary.`,
      folder: 'Notes',
      date: 'Jul 28, 2025, 11:08 PM'
    },
    {
      id: '2',
      title: 'Projects',
      content: 'Someone pls add/replace the content',
      folder: 'Notes',
      date: 'Jul 28, 2025, 11:10 PM'
    },
    {
      id: '3',
      title: 'Events/Workshops',
      content: 'Someone pls add/replace the content',
      folder: 'Notes',
      date: 'Jul 28, 2025, 11:12 PM'
    }
  ];

  // Load from localStorage or use defaults
  let folders: Folder[] = defaultFolders;
  let notes: Note[] = defaultNotes;

  let selectedFolder = 'Notes';
  let selectedNote: Note | null = notes[0];
  let searchQuery = '';
  let editableContent = selectedNote?.content || '';
  let textareaEl: HTMLTextAreaElement;

  $: filteredNotes = notes.filter(note => 
    note.folder === selectedFolder && 
    (note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     note.content.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Update folder counts reactively
  $: {
    folders = folders.map(folder => ({
      ...folder,
      count: notes.filter(note => note.folder === folder.name).length
    }));
  }

  // LocalStorage functions
  function saveNotesToStorage() {
    if (browser) {
      localStorage.setItem('athena-notes', JSON.stringify(notes));
      localStorage.setItem('athena-folders', JSON.stringify(folders));
    }
  }

  function loadNotesFromStorage() {
    if (browser) {
      const savedNotes = localStorage.getItem('athena-notes');
      const savedFolders = localStorage.getItem('athena-folders');
      
      if (savedNotes) {
        try {
          notes = JSON.parse(savedNotes);
        } catch (e) {
          console.warn('Failed to parse saved notes, using defaults');
          notes = defaultNotes;
        }
      }
      
      if (savedFolders) {
        try {
          folders = JSON.parse(savedFolders);
        } catch (e) {
          console.warn('Failed to parse saved folders, using defaults');
          folders = defaultFolders;
        }
      }
      
      // Set initial selected note
      if (notes.length > 0) {
        selectedNote = notes[0];
        editableContent = selectedNote.content;
      }
    }
  }

  function selectFolder(folderName: string) {
    selectedFolder = folderName;
    const folderNotes = notes.filter(note => note.folder === folderName);
    selectedNote = folderNotes.length > 0 ? folderNotes[0] : null;
    editableContent = selectedNote?.content || '';
  }

  function selectNote(note: Note) {
    selectedNote = note;
    editableContent = note.content;
  }

  function updateNoteContent() {
    if (selectedNote) {
      selectedNote.content = editableContent;
      
      // Auto-update title based on first line of content
      const firstLine = editableContent.split('\n')[0].trim();
      if (firstLine && firstLine !== selectedNote.title) {
        selectedNote.title = firstLine.substring(0, 50) + (firstLine.length > 50 ? '...' : '');
      } else if (!firstLine && selectedNote.title !== 'New Note') {
        selectedNote.title = 'New Note';
      }
      
      // Save to localStorage
      saveNotesToStorage();
    }
  }

  function createNewNote() {
    const newId = (Math.max(...notes.map(n => parseInt(n.id))) + 1).toString();
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric'
    }) + ', ' + now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    const newNote: Note = {
      id: newId,
      title: 'New Note',
      content: '',
      folder: selectedFolder,
      date: dateStr
    };

    notes = [...notes, newNote];
    selectedNote = newNote;
    editableContent = '';
    
    // Save to localStorage
    saveNotesToStorage();
    
    // Focus on textarea after creating new note
    setTimeout(() => {
      if (textareaEl) {
        textareaEl.focus();
      }
    }, 100);
  }

  // Load notes on mount
  onMount(() => {
    loadNotesFromStorage();
  });
</script>

<WindowContent>
  <div class="flex flex-col h-full w-full bg-[#1c1c1e] text-white font-sf-pro overflow-hidden">
    <!-- Title Bar -->
    <div class="flex items-center justify-center h-12 bg-[#1c1c1e] border-b border-[#38383a] shrink-0">
      <h1 class="text-sm font-medium text-white">Notes</h1>
    </div>
    
    <!-- Main Content -->
    <div class="flex flex-1 min-h-0">
      <!-- Left Sidebar - Folders -->
      <div class="w-64 bg-[#1c1c1e] border-r border-[#38383a] flex flex-col">

      <!-- Folders Section -->
      <div class="flex-1 p-4">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-xs font-semibold text-[#8e8e93] uppercase tracking-wider">FOLDERS</h3>
          <button class="text-[#007aff] text-lg">+</button>
        </div>
        
        <div class="space-y-1">
          {#each folders as folder}
            <button
              class="w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors
                     {selectedFolder === folder.name ? 'bg-[#007aff] text-white' : 'hover:bg-[#2c2c2e]'}"
              on:click={() => selectFolder(folder.name)}
            >
              <div class="flex items-center space-x-3">
                <span class="text-base">{folder.icon}</span>
                <span class="text-sm font-medium">{folder.name}</span>
              </div>
              <span class="text-xs text-[#8e8e93]">{folder.count}</span>
            </button>
          {/each}
        </div>

        <div class="mt-8">
          <h3 class="text-xs font-semibold text-[#8e8e93] uppercase tracking-wider mb-3">SMART FOLDERS</h3>
          <div class="space-y-1">
            <button class="w-full flex items-center space-x-3 p-2 rounded-lg text-left hover:bg-[#2c2c2e] transition-colors">
              <span class="text-base">⏰</span>
              <span class="text-sm">Recently Deleted</span>
            </button>
            <button class="w-full flex items-center space-x-3 p-2 rounded-lg text-left hover:bg-[#2c2c2e] transition-colors">
              <span class="text-base">🔒</span>
              <span class="text-sm">Locked Notes</span>
            </button>
            <button class="w-full flex items-center space-x-3 p-2 rounded-lg text-left hover:bg-[#2c2c2e] transition-colors">
              <span class="text-base">⭐</span>
              <span class="text-sm">Favorites</span>
            </button>
            <button class="w-full flex items-center space-x-3 p-2 rounded-lg text-left hover:bg-[#2c2c2e] transition-colors">
              <span class="text-base">🏷️</span>
              <span class="text-sm">Tags</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="p-4 border-t border-[#38383a] text-xs text-[#8e8e93]">
        {notes.length} notes
      </div>
    </div>

    <!-- Middle Panel - Notes List -->
    <div class="w-80 bg-[#1c1c1e] border-r border-[#38383a] flex flex-col">
      <!-- Search and New Note -->
      <div class="p-4 border-b border-[#38383a] space-y-3">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-white">{selectedFolder}</h2>
          <button
            on:click={createNewNote}
            class="p-2 bg-[#007aff] hover:bg-[#0056d3] rounded-lg transition-colors"
            title="Create new note"
          >
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
        <div class="relative">
          <input
            type="text"
            placeholder="Search"
            bind:value={searchQuery}
            class="w-full bg-[#2c2c2e] border border-[#38383a] rounded-lg px-4 py-2 text-sm
                   text-white placeholder-[#8e8e93] focus:outline-none focus:border-[#007aff]
                   focus:ring-1 focus:ring-[#007aff]"
          />
          <svg class="absolute right-3 top-2.5 w-4 h-4 text-[#8e8e93]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <!-- Notes List -->
      <div class="flex-1 overflow-y-auto">
        {#if filteredNotes.length === 0}
          <div class="flex flex-col items-center justify-center h-64 text-[#8e8e93]">
            <p class="text-sm">No notes found</p>
          </div>
        {:else}
          {#each filteredNotes as note}
            <button
              class="w-full p-4 text-left border-b border-[#38383a] hover:bg-[#2c2c2e] transition-colors
                     {selectedNote?.id === note.id ? 'bg-[#2c2c2e]' : ''}"
              on:click={() => selectNote(note)}
            >
              <h4 class="font-semibold text-white text-sm mb-1 truncate">{note.title}</h4>
              <p class="text-xs text-[#8e8e93] mb-2">{note.date}</p>
              <p class="text-xs text-[#8e8e93] line-clamp-2 leading-relaxed">
                {note.content.substring(0, 100)}...
              </p>
            </button>
          {/each}
        {/if}
      </div>
    </div>

    <!-- Right Panel - Note Content -->
    <div class="flex-1 bg-[#1c1c1e] flex flex-col">
      {#if selectedNote}
        <!-- Note Header -->
        <div class="p-6 border-b border-[#38383a]">
          <h1 class="text-2xl font-bold text-white mb-2">{selectedNote.title}</h1>
          <p class="text-sm text-[#8e8e93]">{selectedNote.date}</p>
        </div>

        <!-- Note Content -->
        <div class="flex-1 p-6">
          <textarea
            bind:this={textareaEl}
            bind:value={editableContent}
            on:input={updateNoteContent}
            class="w-full h-full bg-transparent text-white text-base leading-relaxed
                   resize-none focus:outline-none font-sf-pro"
            placeholder="Start writing..."
            spellcheck="false"
          ></textarea>
        </div>
      {:else}
        <div class="flex-1 flex items-center justify-center text-[#8e8e93]">
          <div class="text-center">
            <h2 class="text-xl font-semibold mb-2">Select a note</h2>
            <p class="text-sm">Choose a note from the list to view its contents</p>
          </div>
        </div>
      {/if}
      </div>
    </div>
  </div>
</WindowContent>

<style>
  /* Custom scrollbar */
  :global(.overflow-y-auto::-webkit-scrollbar) {
    width: 6px;
  }
  
  :global(.overflow-y-auto::-webkit-scrollbar-track) {
    background: transparent;
  }
  
  :global(.overflow-y-auto::-webkit-scrollbar-thumb) {
    background-color: #48484a;
    border-radius: 3px;
  }
  
  :global(.overflow-y-auto::-webkit-scrollbar-thumb:hover) {
    background-color: #5a5a5c;
  }

  /* Line clamp utility */
  .line-clamp-2 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  /* San Francisco Pro font approximation */
  .font-sf-pro {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  }
</style>