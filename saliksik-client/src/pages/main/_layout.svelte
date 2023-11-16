<script lang="ts">
  import UNCLogo from '/login.png';
  import { Sidebar, SidebarBrand, SidebarItem, SidebarWrapper, SidebarGroup, SidebarDropdownWrapper, SidebarDropdownItem } from 'flowbite-svelte';
  import Menu from '../../assets/menu.svelte';
  import { goto } from '@roxi/routify';
  import { onMount } from 'svelte';
  import { userData, isAuthenticated, updateUser } from '../../components/store';

  var researches: any;
  let loading = true;
  let error: string | null = null; 

  let currentUser: any;

  async function fetchUser() {
  try {
    const response = await fetch('/api/checkUser');
    const user = await response.json();
    updateUser({
      _id: user.user._id,
      userType: user.user.userType,
      firstName: user.user.firstName,
      lastName: user.user.lastName,
      avatar: user.user.firstName.charAt(0) + user.user.lastName.charAt(0),
      researches: user.user.researches
    });
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
                error = 'Failed to fetch researches';
            }
        } catch (err) {
            console.error('Error fetching researches:', err);
            error = 'Error fetching researches';
        } finally {
            loading = false;
        }
    }


    onMount(async () => {
        if (!$isAuthenticated) {
          $goto('/login');
        } else if ($isAuthenticated) {
          await fetchUser().then (async () => {
            currentUser = $userData;
          });
          if (currentUser) {
            fetchResearches(currentUser._id);
          } else {
            console.error('Network error:', error);
          }
        }
    });



  let site = {
    name: 'Saliksik',
    href: '/',
    img: UNCLogo,
  };
  let spanClass = 'flex-1 ml-3 whitespace-nowrap';
</script>



<div class="sidebar h-full">
  <button data-drawer-target="separator-sidebar" data-drawer-toggle="separator-sidebar" aria-controls="separator-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover-bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover-bg-gray-700 dark:focus:ring-gray-600">
    <span class="sr-only">Open sidebar</span>
    <Menu />
  </button>

  <Sidebar id="separator-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
    <SidebarWrapper>
      <SidebarBrand {site} />
      <SidebarGroup>
          {#if currentUser}
          <SidebarItem label={`Hello, ${currentUser.firstName}`} {spanClass}>
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
        {#if currentUser}
          <SidebarItem href={`/main/profile/${currentUser._id}`} label="My Profile" {spanClass}>
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

<div class="pl-72 pr-10 pt-12">
  {#if currentUser}
    <slot scoped={{ userID: currentUser._id }}></slot>
  {:else}
    <slot></slot>
  {/if}
</div>