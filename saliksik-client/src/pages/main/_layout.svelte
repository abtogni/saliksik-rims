<script lang="ts">
    import Menu from '/menu.svg';
    import { goto } from '@roxi/routify';
    import { onMount } from 'svelte';
  
    async function checkAuthentication() {
      try {
        const response = await fetch('/api/checkAuth');
        const data = await response.json();
  
        if (data.message === 'error') {
          $goto('/'); 
        } else {
          return true;
        }
      } catch (e) {
        $goto('/');
      }
    }
  
    onMount(() => {
      checkAuthentication();
    });

    const menus = [
        {title: "Home", href: '/'},
        {title: "Researches"},
        {title: "Concept Notes"},
        {title: "Presentations",},
        {title: "My Profile"},
    ];
  </script>




<button data-drawer-target="separator-sidebar" data-drawer-toggle="separator-sidebar" aria-controls="separator-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
    <span class="sr-only">Open sidebar</span>
    <img src={Menu} alt='menu'>
 </button>

 <aside id="separator-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
    <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <a href="https://flowbite.com/" class="flex items-center pl-2.5 mb-5">
            <img src="https://flowbite.com/docs/images/logo.svg" class="h-6 mr-3 sm:h-7" alt="Flowbite Logo" />
            <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
         </a>
        <ul class="space-y-2 font-medium">
            {#each menus as menu}
                 <li>
                    <a href={menu.href} class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">{menu.title}</a>
                 </li>
            {/each}
        </ul>
        
    </div>
</aside>

<slot><!-- optional fallback --></slot>