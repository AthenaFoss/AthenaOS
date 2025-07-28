<script lang="ts">
  import Sidebar from '$lib/components/ui/sidebar-finder.svelte';
  import FinderHeader from '$lib/components/ui/header-finder.svelte';
  import FileGrid from './file-grid.svelte';
  import FileList from './files-list.svelte';
  import FinderFooter from './finder-footer.svelte';
  import { Icons } from './icons'; 

  import MemberDetails from '$lib/components/ui/MemberDetails.svelte'
  import WindowContent from '$lib/components/window/window-content.svelte';
  

  
  type FileItem = {
    id: string;
    name: string;
    type: 'folder' | 'file';
    icon: string;
    color?: string;
    children?: FileItem[];
    description?: string,
    github?: string,
    levelInCommunity?: string,
    linkedIn?: string,
    twitter? : string,
    baseapp?: string,
    discord?: string,
  };


  let files: FileItem[] = [
   {
  id: 'doc-1',
  name: 'Documents',
  type: 'folder',
  icon: '📁',
  children: [
    {
      id: "1",
      name: 'Member 1',
      type: 'file',
      icon: Icons.User || '👤',
      github: 'member1-git',
      linkedIn: 'https://linkedin.com/in/member1',
      twitter: 'https://twitter.com/member1',
      baseapp: 'https://baseapp.com/member1',
      discord: 'member1#1234',
      levelInCommunity: 'Junior - AthenaFOSS',
      description: 'An enthusiastic beginner contributing to documentation and onboarding flows.'
    },
    {
      id: "2",
      name: 'Member 2',
      type: 'file',
      icon: Icons.User || '👤',
      github: 'member2-git',
      linkedIn: 'https://linkedin.com/in/member2',
      twitter: 'https://twitter.com/member2',
      baseapp: 'https://baseapp.com/member2',
      discord: 'member2#5678',
      levelInCommunity: 'Mid - AthenaFOSS',
      description: 'Focused on frontend and design systems. Leads sprint presentations and UI reviews.'
    },
    {
      id: "3",
      name: 'Member 3',
      type: 'file',
      icon: Icons.User || '👤',
      github: 'member3-git',
      linkedIn: 'https://linkedin.com/in/member3',
      twitter: 'https://twitter.com/member3',
      baseapp: 'https://baseapp.com/member3',
      discord: 'member3#1357',
      levelInCommunity: 'Senior - AthenaFOSS',
      description: 'Drives system architecture decisions and mentors junior contributors.'
    },
    {
      id: "4",
      name: 'Member 4',
      type: 'file',
      icon: Icons.User || '👤',
      github: 'member4-git',
      linkedIn: 'https://linkedin.com/in/member4',
      twitter: 'https://twitter.com/member4',
      baseapp: 'https://baseapp.com/member4',
      discord: 'member4#2468',
      levelInCommunity: 'Junior - AthenaFOSS',
      description: 'Helps with community finances, analytics and report automation.'
    },
    {
      id: "5",
      name: 'Member 5',
      type: 'file',
      icon: Icons.User || '👤',
      github: 'member5-git',
      linkedIn: 'https://linkedin.com/in/member5',
      twitter: 'https://twitter.com/member5',
      baseapp: 'https://baseapp.com/member5',
      discord: 'member5#1122',
      levelInCommunity: 'Mid - AthenaFOSS',
      description: 'Works on proposals, roadmap planning, and contributes to the backend services.'
    },
    {
      id: "6",
      name: 'Member 6',
      type: 'file',
      icon: Icons.User || '👤',
      github: 'member6-git',
      linkedIn: 'https://linkedin.com/in/member6',
      twitter: 'https://twitter.com/member6',
      baseapp: 'https://baseapp.com/member6',
      discord: 'member6#3344',
      levelInCommunity: 'Junior - AthenaFOSS',
      description: 'Active in client presentations and deployment demos, learning cloud fundamentals.'
    },
    {
      id: "7",
      name: 'Member 7',
      type: 'file',
      icon: Icons.User || '👤',
      github: 'member7-git',
      linkedIn: 'https://linkedin.com/in/member7',
      twitter: 'https://twitter.com/member7',
      baseapp: 'https://baseapp.com/member7',
      discord: 'member7#7788',
      levelInCommunity: 'Senior - AthenaFOSS',
      description: 'Maintains design and branding assets. Coordinates with HR and outreach teams.'
    },
    {
      id: "8",
      name: 'Member 8',
      type: 'file',
      icon: Icons.User || '👤',
      github: 'member8-git',
      linkedIn: 'https://linkedin.com/in/member8',
      twitter: 'https://twitter.com/member8',
      baseapp: 'https://baseapp.com/member8',
      discord: 'member8#9900',
      levelInCommunity: 'Mid - AthenaFOSS',
      description: 'Maintains team notes and meeting transcripts. Supports event organization.'
    }
  ]
},

    { id: 'folder-4', name: 'Downloads', type: 'folder', icon: Icons.Download, children: [] },
    { id: 'folder-5', name: 'Applications', type: 'folder', icon: Icons.SquareStack, children: [] },
    { id: 'folder-6', name: 'Recents', type: 'folder', icon: Icons.Clock, children: [] },
    { id: 'folder-7', name: 'Desktop', type: 'folder', icon: Icons.Desktop, children: [] },
  ];

  let currentFolderName = 'Documents';
  let currentFiles: FileItem[] = files.find(f => f.id === 'doc-1')?.children || []; 
  let selectedFileId: string | null = null; 
  let searchQuery = '';
  let currentView: 'grid' | 'table' = "grid";

  
  let showMemberDetails: boolean = false;
  let activeMember: FileItem | null = null; 

  
  let favorites = [
    { name: 'Recents', icon: Icons.Clock, color: 'text-yellow-400' },
    { name: 'AirDrop', icon: Icons.Airplay, color: 'text-green-400' },
    { name: 'Applications', icon: Icons.SquareStack, color: 'text-red-400' },
    { name: 'Desktop', icon: Icons.Desktop, color: 'text-blue-400' },
    { name: 'Documents', icon: Icons.Document, color: 'text-blue-400', active: true },
    { name: 'Downloads', icon: Icons.Download, color: 'text-purple-400' },
  ];

  let locations = [
    { name: 'MacBook Pro', icon: Icons.Laptop, color: 'text-indigo-400' },
    { name: 'iCloud Drive', icon: Icons.Cloud, color: 'text-gray-400' },
    { name: 'Network', icon: Icons.Network, color: 'text-green-400' },
  ];

  let tags = [
    { name: 'Red', color: 'bg-red-500' },
    { name: 'Orange', color: 'bg-orange-500' },
    { name: 'Yellow', color: 'bg-yellow-500' },
    { name: 'Green', color: 'bg-green-500' },
    { name: 'Blue', color: 'bg-blue-500' },
  ];

  /**
   * @param {FileItem} file - Pass the entire file object
   */
  function selectFile(file: FileItem) {
    selectedFileId = file.id;
    activeMember = file; 
    showMemberDetails = true; 
  }

  function closeMemberDetails() {
    showMemberDetails = false;
    activeMember = null;
    selectedFileId = null; 
  }

  /**
   * @param {ColorKey} color
   * @param {boolean} isSelected
   */
  type ColorKey = 'red' | 'blue' | 'purple' | 'green' | 'orange' | 'gray';
  function getFileColorClasses(color: ColorKey | string, isSelected: boolean) {
    const baseClasses = 'text-xl mb-2 p-2 rounded-lg border-1';
    const selectedBg = isSelected ? '' : 'bg-gray-900';
    
    const colorMap: Record<ColorKey, string> = {
      red: 'border-red-500 text-red-400',
      blue: 'border-blue-500 text-blue-400',
      purple: 'border-purple-500 text-purple-400',
      green: 'border-green-500 text-green-400',
      orange: 'border-orange-500 text-orange-400',
      gray: 'border-gray-500 text-gray-400'
    };

    return `${baseClasses} ${colorMap[(color as ColorKey)] || 'border-gray-500 text-gray-400'} ${selectedBg}`;
  }
</script>

<div class="flex h-full w-full text-gray-100 font-inter rounded-lg overflow-hidden shadow-2xl mx-auto">
  <Sidebar bind:searchQuery={searchQuery} {favorites} {locations} {tags} />

  <div class="flex-1 flex flex-col overflow-hidden">
   <div class="py-[10px] w-full flex justify-center text-[15px] items-center bg-transparent text-gray-800 dark:text-gray-300">
    Finder
   </div>

    <FinderHeader bind:currentView={currentView} {currentFolderName} />

    <div class="flex grow  overflow-hidden"> {#if currentView === "grid"}
          <FileGrid files={currentFiles} {selectedFileId} {selectFile} {getFileColorClasses} />
        {/if}

        {#if currentView === "table"}
          <FileList files={currentFiles} {selectedFileId} {selectFile} {getFileColorClasses} />
        {/if}

        {#if showMemberDetails && activeMember}
          <MemberDetails member={activeMember} on:close={closeMemberDetails} />
        {/if}
    </div>

    <FinderFooter fileCount={currentFiles.length} availableSpace="256.8 GB" />
  </div>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
  
  :global(body) {
    margin: 0;
    font-family: 'Inter', sans-serif;
    background-color: #1f2937;
    
    box-sizing: border-box;
  }

  /* Custom scrollbar */
  :global(*::-webkit-scrollbar) {
    width: 8px;
    height: 8px;
  }

  :global(*::-webkit-scrollbar-track) {
    background: #374151;
    border-radius: 4px;
  }

  :global(*::-webkit-scrollbar-thumb) {
    background: #6b7280;
    border-radius: 4px;
  }

  :global(*::-webkit-scrollbar-thumb:hover) {
    background: #9ca3af;
  }

  .font-inter {
    font-family: 'Inter', sans-serif;
  }

  


</style>