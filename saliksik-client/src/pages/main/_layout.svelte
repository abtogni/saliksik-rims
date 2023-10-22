<script lang="ts">
  import { writable } from 'svelte/store';
  import UNCLogo from '/login.png';
  import Menu from '../../assets/menu.svelte';
  import { goto } from '@roxi/routify';
  import { onMount } from 'svelte';

  // Create a writable store to hold user data
  var userData: any;

  async function fetchUser() {
    try {
      const response = await fetch('/api/checkUser');
      userData = await response.json();
      

    } catch (e) {
      $goto('/');
    }
  }

  onMount(() => {
    fetchUser();
  });

 

  const menus = [
    { title: "Home", href: '/' },
    { title: "Researches" },
    { title: "Concept Notes" },
    { title: "Presentations" },
  ];


</script>







<button data-drawer-target="separator-sidebar" data-drawer-toggle="separator-sidebar" aria-controls="separator-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
    <span class="sr-only">Open sidebar</span>
    <Menu />
 </button>

 <aside id="separator-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
    <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <a href="/" class="flex items-center pl-2.5 mb-5">
            <img src={UNCLogo} class="h-6 mr-3 sm:h-7" alt="UNC Logo" />
            <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Saliksik</span>
         </a>

         <button class="bg-button hover:bg-button-hover text-white font-bold py-2 mb-4 px-4 rounded">
          <a href="/main/createResearch"> Create Research </a>
        </button>
        <ul class="space-y-2 font-medium">
          {#if userData}
          
          <div class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover-bg-gray-700 group">
            Hello, {userData.user.firstName}
          </div>
        {:else}
          <div></div>
          {/if}
            {#each menus as menu}
                 <li>
                    <a href={menu.href} class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">{menu.title}</a>
                 </li>
            {/each}
            <hr>
            {#if userData}
            <li>
              <a href={`/profile/${userData.user._id}`} class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">My Profile</a>
            </li>
            <li>
              <a href='/logout' class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">Logout</a>
            </li>
            {:else}
            <div></div>
            {/if}
        </ul>
        
    </div>
</aside>

<slot><!-- optional fallback --></slot>