<script lang="ts">
  import UNCLogo from '/login.png';
  import { Sidebar, SidebarBrand, SidebarItem, SidebarWrapper, SidebarGroup, SidebarDropdownWrapper, SidebarDropdownItem } from 'flowbite-svelte';
  import Menu from '../../assets/menu.svelte';
  import { goto } from '@roxi/routify';
  import { onMount } from 'svelte';
  var researches: any;
  let loading = true;
  let error: string | null = null; 


  type UserData = {
    user: {
      firstName: string;
      _id: string;
    };
  };

  let userData: UserData | undefined;

  async function fetchUser() {
    try {
      const response = await fetch('/api/checkUser');
      userData = await response.json();
    } catch (e) {
      $goto('/');
    }
  }
  async function fetchResearches(userID: string) {
        try {
            const response = await fetch(`/api/research/getUserResearches?userID=${userID}`);

            if (response.ok) {
                researches = await response.json();
            } else {
                console.error('Failed to fetch researches');
                // Set the error message when fetching fails
                error = 'Failed to fetch researches';
            }
        } catch (err) {
            console.error('Error fetching researches:', err);
            // Set the error message in case of an error
            error = 'Error fetching researches';
        } finally {
            // Set loading to false once the operation is completed
            loading = false;
        }
    }

    onMount(async () => {
  try {
    const response = await fetch('/api/checkAuth');
    if (response.status === 401) {
      $goto('/login');
    } else if (response.status === 200) {
      await fetchUser();
      if (userData && userData.user) {
        fetchResearches(userData.user._id);
      } else {
        console.error('Network error:', error);
      }
    }
  } catch (error) {
    console.error('Network error:', error);
  }
});



  let site = {
    name: 'Saliksik',
    href: '/',
    img: UNCLogo,
  };
  let spanClass = 'flex-1 ml-3 whitespace-nowrap';
</script>

<div class="sidebar">
  <button data-drawer-target="separator-sidebar" data-drawer-toggle="separator-sidebar" aria-controls="separator-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover-bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover-bg-gray-700 dark:focus:ring-gray-600">
    <span class="sr-only">Open sidebar</span>
    <Menu />
  </button>

  <Sidebar id="separator-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
    <SidebarWrapper>
      <SidebarBrand {site} />
      <SidebarGroup>
          {#if userData}
          <SidebarItem label={`Hello, ${userData.user.firstName}`} {spanClass}>
          </SidebarItem>
        {:else}
          <div></div>
        {/if}
        <SidebarDropdownWrapper label="Admin">
          <SidebarDropdownItem label="Check Presentations" href='/main/admin/checkPresentations' />
          <SidebarDropdownItem label="Check Proposals" href='/main/admin/checkProposals'/>
          <SidebarDropdownItem label="Create User Accounts" href='/main/admin/createAccount' />
        </SidebarDropdownWrapper>
        {#if loading}
        <SidebarItem label="Loading..."></SidebarItem>
        {:else if researches}
        <SidebarDropdownWrapper label="Researches">
            <SidebarDropdownItem href="/main/createResearch" label="Create Research"></SidebarDropdownItem>
        {#each researches as r}
            <SidebarDropdownItem label={r.researchTitle} href={`/main/${r._id}`}></SidebarDropdownItem>
        {/each}
        </SidebarDropdownWrapper>
        {:else}
        <SidebarItem href="/main/createResearch" label="Create Research"></SidebarItem>
        {/if}

      </SidebarGroup>
      <SidebarGroup border>
        {#if userData}
          <SidebarItem href={`/main/profile/${userData.user._id}`} label="My Profile" {spanClass}>
          </SidebarItem>
          <SidebarItem href="/logout" label="Logout" {spanClass}>
          </SidebarItem>
        {:else}
          <div></div>
        {/if}
      </SidebarGroup>
    </SidebarWrapper>
  </Sidebar>
</div>

<div class="pl-72 pr-12">
  {#if userData}
    <slot scoped={{ userID: userData.user._id }}></slot>
  {:else}
    <slot></slot>
  {/if}
</div>