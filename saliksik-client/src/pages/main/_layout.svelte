<script lang="ts">
  import CreateNewResearchModal from "../../modals/CreateNewResearchModal.svelte";
  import UNCLogo from "/login.png";
  import { Sidebar, SidebarBrand, SidebarItem, SidebarWrapper, SidebarGroup, SidebarDropdownWrapper, SidebarDropdownItem, Modal } from "flowbite-svelte";
  import Menu from "../../assets/menu.svelte";
  import { goto } from "@roxi/routify";
  import { onMount } from "svelte";
  import { userData, researches, isAuthenticated } from "../../components/store";
  import { UserOutline, CirclePlusOutline, FolderOutline, StarSolid, SearchOutline, BookmarkOutline, BellOutline, LandmarkOutline, ArrowRightFromBracketSolid, UserSettingsOutline, FolderPlusOutline } from "flowbite-svelte-icons";
  import moment from "moment";
  import { fetchResearches, fetchUser } from "../../components/fetch";

  onMount(async () => {
    if (!$isAuthenticated) {
      $goto("/login");
    } else if ($isAuthenticated) {
      await fetchUser();
      if ($userData) {
        fetchResearches($userData._id);
      }
    }
  });

  function dynamicReload(path: string, event?: MouseEvent): any{
    if (event) {
        event.preventDefault();
    }
    window.location.href = path;
}
  

  //notification this month
  //sidebar
  let site = {
    name: "Saliksik",
    href: "/",
    img: UNCLogo,
  };
  let spanClass = "flex-1 ml-3 whitespace-nowrap";

  //drawer for notification
  let notification = true;
  //drawer for all researches
  let allResearches = true;

  //modal for create new research
  let createNewResearch = false;


   
</script>

<div class="bg-gray-50 flex h-full">
  <div class="sidebar h-full">
    <button data-drawer-target="separator-sidebar" data-drawer-toggle="separator-sidebar" aria-controls="separator-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover-bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover-bg-gray-700 dark:focus:ring-gray-600">
      <span class="sr-only">Open sidebar</span>
      <Menu />
    </button>
    <Sidebar class="text-clip fixed top-0 left-0 z-40 w-64 shadow-lg border bg-white h-screen transition-transform -translate-x-full sm:translate-x-0 flex items-stretch min-h-screen">
      <SidebarWrapper class="rounded-none w-64 ">
        <SidebarBrand {site} />
        <!---->
        <SidebarGroup class="">
          {#if $userData}
            <SidebarItem label={`Hello, ${$userData.firstName}`} {spanClass}></SidebarItem>
          {:else}
            <div></div>
          {/if}
          <SidebarItem class="text-center font-medium text-base rounded-md bg-blue-700 hover:bg-blue-800 text-white" label="Create New Research" on:click={() => (createNewResearch = true)}>
            <svelte:fragment slot="icon"><FolderPlusOutline color="white"size="sm" /></svelte:fragment>
          </SidebarItem>
          <SidebarItem label="All Researches" href="/main" class="font-normal text-base rounded-md hover:bg-blue-100">
            <svelte:fragment slot="icon"><FolderOutline color="blue"size="sm" /></svelte:fragment>
          </SidebarItem>
          <!--
<SidebarItem label="Browse Researches" href="/main/personnel/browseResearches" class="font-normal text-base rounded-md hover:bg-blue-100">
            <svelte:fragment slot="icon"><SearchOutline color="blue"size="sm" /></svelte:fragment>
          </SidebarItem>
          <SidebarItem label="Bookmarks" href="/main/personnel/bookmarks" class="font-normal text-base rounded-md hover:bg-blue-100">
            <svelte:fragment slot="icon"><BookmarkOutline color="blue"size="sm" /></svelte:fragment>
          </SidebarItem>
<SidebarItem label="Library" href="" class="font-normal text-base rounded-md hover:bg-blue-100">
            <svelte:fragment slot="icon"><LandmarkOutline color="blue" size="sm" /></svelte:fragment>
          </SidebarItem>
          -->
          
          <SidebarItem label="Notifications" on:click={$goto('/main/personnel/notifications')} class="font-normal text-base rounded-md hover:bg-blue-100">
            <svelte:fragment slot="icon"><BellOutline color="blue" size="sm" /></svelte:fragment>
          </SidebarItem>
          
          <SidebarDropdownWrapper label="Admin Tools" isOpen class="font-normal text-base rounded-md hover:bg-blue-100">
            <svelte:fragment slot="icon"><UserSettingsOutline color="blue" /></svelte:fragment>
            <SidebarDropdownItem label="Admin Dashboard" on:click={$goto('/main/admin/checkProposals')} class="font-normal text-base rounded-md hover:bg-blue-100"/>
            <SidebarDropdownItem label="Concept Note Approval" on:click={$goto('/main/admin/conceptNoteApproval')}  class="font-normal text-base rounded-md hover:bg-blue-100"/>
            <SidebarDropdownItem label="User Accounts" on:click={$goto('/main/admin/createAccount')} class="font-normal text-base rounded-md hover:bg-blue-100"/>
            <SidebarDropdownItem label="List Of Panelist" on:click={$goto('/main/admin/listOfPanelist')} class="font-normal text-base rounded-md hover:bg-blue-100"/>
          </SidebarDropdownWrapper>
        </SidebarGroup>
        <!--starred researches
        <SidebarGroup border class="truncate ...">
          {#if $researches}
            <SidebarDropdownWrapper label="Starred" isOpen class="font-normal text-base rounded-md hover:bg-blue-100">
              <svelte:fragment slot="icon"><StarSolid color="blue" size="sm"/></svelte:fragment>
              {#each $researches as r}
                <SidebarDropdownItem label={r.researchTitle} on:click={dynamicReload(`/main/${r._id}`)} class="font-normal text-base rounded-md hover:bg-blue-100"></SidebarDropdownItem>
              {/each}
            </SidebarDropdownWrapper>
          {:else}
            <SidebarItem href="/main/createResearch" label="Create Research" class="font-normal text-base rounded-md hover:bg-blue-100"></SidebarItem>
          {/if}
        </SidebarGroup>
        -->
        <SidebarGroup border>
          {#if $userData}
            <SidebarItem href={`/main/profile/myProfile`} label="My Profile" {spanClass} class="font-normal text-base rounded-md hover:bg-blue-100">
              <svelte:fragment slot="icon">
                <UserOutline color="blue" size="sm"/>
              </svelte:fragment>
            </SidebarItem>
            <SidebarItem href="/logout" label="Logout" {spanClass} class="font-normal text-base rounded-md hover:bg-blue-100">
              <svelte:fragment slot="icon"><ArrowRightFromBracketSolid color="blue" size="sm"/></svelte:fragment>
            </SidebarItem>
          {:else}
            <div></div>
          {/if}
        </SidebarGroup>
      </SidebarWrapper>
    </Sidebar>
  </div>

  <div class="ml-64 grid grid-flow-row w-full items-start">
      {#if $userData}
        <slot scoped={{ userID: $userData._id }} />
      {:else}
        <slot />
      {/if}
  </div>
</div>

<!-- modal for create new research -->
<Modal title="Create New Research" bind:open={createNewResearch} size="xs" autoclose={false} outsideclose class="w-full">
  <CreateNewResearchModal />
</Modal>

<!--
<!--sidebar--
<div class="sidebar h-full">
  <button data-drawer-target="separator-sidebar" data-drawer-toggle="separator-sidebar" aria-controls="separator-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover-bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover-bg-gray-700 dark:focus:ring-gray-600">
    <span class="sr-only">Open sidebar</span>
    <Menu />
  </button>
  <Sidebar id="separator-sidebar" class="text-clip fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 flex items-stretch min-h-screen" aria-label="Sidebar">
    <SidebarWrapper class="rounded-none w-64">
      <SidebarBrand {site} />
      <!----
      <SidebarGroup class="">
        {#if $userData}
          <SidebarItem label={`Hello, ${$userData.firstName}`} {spanClass}></SidebarItem>
        {:else}
          <div></div>
        {/if}
        <SidebarItem class="text-center align-middle font-medium bg-blue-600 hover:bg-orange-600 text-white" label="Create New Research" on:click={() => (createNewResearch = true)}><svelte:fragment slot="icon"><CirclePlusOutline /></svelte:fragment></SidebarItem>
        <SidebarItem label="All Researches" on:click={() => (allResearches = false)} class=""><svelte:fragment slot="icon"><FolderOutline /></svelte:fragment></SidebarItem>
        <SidebarItem label="Browse Researches" href="/main/personnel/browseResearches"><svelte:fragment slot="icon"><SearchOutline /></svelte:fragment></SidebarItem>
        <SidebarItem label="Bookmarks" href="/main/personnel/bookmarks" class=""><svelte:fragment slot="icon"><BookmarkOutline /></svelte:fragment></SidebarItem>
        <SidebarItem label="Notifications" on:click={() => (notification = false)} href=""><svelte:fragment slot="icon"><BellOutline /></svelte:fragment></SidebarItem>
        <SidebarItem label="Library" href=""><svelte:fragment slot="icon"><LandmarkOutline /></svelte:fragment></SidebarItem>
        <SidebarDropdownWrapper label="Admin Tools" isOpen>
          <svelte:fragment slot="icon"><UserSettingsOutline color="black" /></svelte:fragment>
        <SidebarDropdownItem label="Admin Dashboard" href="/main/admin/checkProposals" />
        <SidebarDropdownItem label="Create User Accounts" href="/main/admin/createAccount" />
        <SidebarDropdownItem label="Create Concept Note" href="/main/personnel/createConceptNote" />
        </SidebarDropdownWrapper>
        
      </SidebarGroup>
      <!----
      <SidebarGroup border class="truncate ...">
        {#if loading}
          <SidebarItem label="Loading..."></SidebarItem>
        {:else if researches}
          <SidebarDropdownWrapper label="Starred" isOpen>
            <svelte:fragment slot="icon"><StarSolid color="orange" /></svelte:fragment>
            {#each researches as r}
              <SidebarDropdownItem class="" label={r.researchTitle} href={`/main/${r._id}`}></SidebarDropdownItem>
            {/each}
          </SidebarDropdownWrapper>
        {:else}
          <SidebarItem href="/main/createResearch" label="Create Research"></SidebarItem>
        {/if}
      </SidebarGroup>
      <SidebarGroup border>
        {#if $userData}
          <SidebarItem href={`/main/profile/myProfile`} label="My Profile" {spanClass}>
            <svelte:fragment slot="icon">
              <UserOutline />
            </svelte:fragment>
          </SidebarItem>
          <SidebarItem href="/logout" label="Logout" {spanClass}><svelte:fragment slot="icon"><ArrowRightFromBracketSolid color="" /></svelte:fragment></SidebarItem>
        {:else}
          <div></div>
        {/if}
      </SidebarGroup>
    </SidebarWrapper>
  </Sidebar>
</div>

<!--drawer for notification--
<Drawer transitionType="fly" {transitionParams} bind:hidden={notification} id="sidebar1" class="flex flex-col w-1/2 p-4 gap-2">
  <div class="flex justify-between items-center gap-2">
    <div class="flex items-center gap-2">
      <ChevronLeftOutline on:click={() => (notification = true)} size="md" class="" />
      <div class="flex items-center gap-1"><BellOutline size="md" /><P weight="semibold" size="2xl" class="">Notifications</P></div>
    </div>
    <Button size="md" outline class=""><EnvelopeOpenOutline class="w-4 h-4 me-2" />Mark All As Read</Button>
  </div>

  <Alert dismissable color="blue" class="border-l-8 w-full mb-2">
    <div class="flex items-center gap-2">
      <QuestionCircleOutline slot="icon" size="sm" />
      <span class="text-lg font-medium">Notification</span>
    </div>
    <p class="mt-2 text-sm">Insert helper text</p>
  </Alert>

  <Timeline order="vertical" icon={false}>
    <TimelineItem title="Notice To Proceed" date="Today">
      <svelte:fragment slot="icon">
        <span class="flex absolute -start-3 justify-center items-center w-6 h-6 bg-primary-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-primary-900">
          <CalendarWeekSolid class="w-3 h-3 text-primary-600 dark:text-primary-400" />
        </span>
      </svelte:fragment>

      <P weight="normal" size="base">The Concept Note titled <span class="font-medium text-base">Streamlining Outcome-Based Education and Continuous Quality Improvement of University of Nueva Caceres through Technology: A Information Management System for Improving Inclusiveness Streamlining Outcome-Based Education and Continuous Quality Improvement of University of Nueva Caceres through Technology: A Information Management System for Improving Inclusiveness </span>has been approved. You may now set a schedule for the <span class="font-medium text-base">Initial Presentation.</span></P>
      <Button color="alternative" class="mt-2">I Have Recieved The Notice<CheckOutline class="ms-2 w-3 h-3" /></Button>
    </TimelineItem>
  </Timeline>
</Drawer>



<!--content--
<div class="ml-64 pl-4 pt-4 pr-4 pb-4 grid items-start bg-white">
  {#if $userData}
    <slot scoped={{ userID: $userData._id }} />
  {:else}
    <slot />
  {/if}
  <div class="h-96"></div>
  <div class="h-96"></div>
</div>

-->

<!--old layout
<div class="sidebar h-full">
  <button data-drawer-target="separator-sidebar" data-drawer-toggle="separator-sidebar" aria-controls="separator-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover-bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover-bg-gray-700 dark:focus:ring-gray-600">
    <span class="sr-only">Open sidebar</span>
    <Menu />
  </button>
  <Sidebar id="separator-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 flex items-stretch min-h-screen" aria-label="Sidebar">
    <SidebarWrapper class="rounded-none w-full">
      <SidebarBrand {site} />
      <SidebarGroup>
        {#if $userData}
          <SidebarItem label={`Hello, ${$userData.firstName}`} {spanClass}></SidebarItem>
        {:else}
          <div></div>
        {/if}
        <SidebarItem class="text-center align-middle font-medium bg-blue-600 hover:bg-orange-600 text-white" label="Create new research" on:click={() => (hidden1 = false)}>
          <svelte:fragment slot="icon">
            <CirclePlusOutline />
          </svelte:fragment>
        </SidebarItem>
        <SidebarDropdownWrapper label="Admin" isOpen>
          <svelte:fragment slot="icon">
            <CogOutline />
          </svelte:fragment>

          <SidebarDropdownItem label="Check Presentations" href="/main/admin/checkPresentations" />
          <SidebarDropdownItem label="Check Proposals" href="/main/admin/checkProposals" />
          <SidebarDropdownItem label="Create User Accounts" href="/main/admin/createAccount" />
          <SidebarDropdownItem label="Personnel Dashboard" href="/main/personnel/personnelDashboard" />
          <SidebarDropdownItem label="Personnel Home" href="/main/personnel/personnelHome" />
        </SidebarDropdownWrapper>
        {#if loading}
          <SidebarItem label="Loading..."></SidebarItem>
        {:else if researches}
          <SidebarDropdownWrapper label="Dashboard" isOpen>
            <svelte:fragment slot="icon">
              <BookOutline />
            </svelte:fragment>

            <SidebarDropdownItem href="/main/createResearch" label="Create Research"></SidebarDropdownItem>
            {#each researches as r}
              <SidebarDropdownItem class="truncate" label={r.researchTitle} href={`/main/${r._id}`}></SidebarDropdownItem>
            {/each}
          </SidebarDropdownWrapper>
        {:else}
          <SidebarItem href="/main/createResearch" label="Create Research"></SidebarItem>
        {/if}
      </SidebarGroup>
      <SidebarGroup border>
        {#if $userData}
          <SidebarItem href={`/main/profile/myProfile`} label="My Profile" {spanClass}>
            <svelte:fragment slot="icon">
              <UserOutline />
            </svelte:fragment>
          </SidebarItem>
          <SidebarItem href="/logout" label="Logout" {spanClass}></SidebarItem>
        {:else}
          <div></div>
        {/if}
      </SidebarGroup>
    </SidebarWrapper>
  </Sidebar>
</div>

<Drawer transitionType="fly" {transitionParams} bind:hidden={hidden1} id="sidebar1">
  <div class="flex items-center">
    <h5 id="drawer-label" class="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400">
      <InfoCircleSolid class="w-4 h-4 me-2.5" />Info
    </h5>
    <CloseButton on:click={() => (hidden1 = true)} class="mb-4 dark:text-white" />
  </div>
  <p class="mb-6 text-sm text-gray-500 dark:text-gray-400">
    Supercharge your hiring by taking advantage of our <a href="/" class="text-primary-600 underline dark:text-primary-500 hover:no-underline"> limited-time sale </a>
    for Flowbite Docs + Job Board. Unlimited access to over 190K top-ranked candidates and the #1 design job board.
  </p>
  <div class="grid grid-cols-2 gap-4">
    <Button color="light" href="/">Learn more</Button>
    <Button href="/" class="px-4">Get access <ArrowRightOutline class="w-3.5 h-3.5 ms-2" /></Button>
  </div>
</Drawer>

<div class="ml-64 pl-4 pt-4 pr-4 pb-4 grid justify-items-center bg-white">
  {#if $userData}
    <slot scoped={{ userID: $userData._id }} />
  {:else}
    <slot />
  {/if}
</div>

-->
