<script lang="ts">
  import UNCLogo from "/login.png";
  import { Section, TableHeader } from "flowbite-svelte-blocks";
  import { Sidebar, SidebarBrand, SidebarItem, SidebarWrapper, SidebarGroup, SidebarDropdownWrapper, SidebarDropdownItem, Drawer, CloseButton, Button, NavHamburger, Navbar, NavBrand, NavUl, NavLi, DarkMode, Badge, Indicator, Input, Avatar, Tooltip, Dropdown, DropdownItem, Search, DropdownDivider, Checkbox, Table, TableBodyCell, TableHead, Heading, TableHeadCell, TableBody, TableBodyRow, TableSearch, P, Modal, Label, MultiSelect, Textarea, Group, GroupItem, Timeline, TimelineItem } from "flowbite-svelte";
  import Menu from "../../assets/menu.svelte";
  import { goto } from "@roxi/routify";
  import { onMount } from "svelte";
  import { userData, isAuthenticated, updateUser } from "../../components/store";
  import { BookOutline, CogOutline, UserOutline, CirclePlusOutline, InfoCircleSolid, ArrowRightOutline, FolderOutline, StarOutline, LinkOutline, ArchiveOutline, TrashBinOutline, StarSolid, CheckOutline, CloseOutline, DotsHorizontalOutline, ClockOutline, ChevronDownOutline, DotsVerticalOutline, EyeOutline, EditOutline, ClipboardOutline, FilterOutline, SortOutline, ChevronLeftOutline, SearchOutline, BookmarkOutline, BellOutline, LandmarkOutline, ArrowRightFromBracketSolid, MessagesSolid, EnvelopeOpenOutline, CalendarWeekSolid } from "flowbite-svelte-icons";
  import { sineIn } from "svelte/easing";

  var researches: any;
  let loading = true;
  let error: string | null = null;

  let currentUser: any;

  async function fetchUser() {
    try {
      const response = await fetch("/api/checkUser");
      const user = await response.json();
      updateUser({
        _id: user.user._id,
        userType: user.user.userType,
        firstName: user.user.firstName,
        lastName: user.user.lastName,
        avatar: user.user.firstName.charAt(0) + user.user.lastName.charAt(0),
        researches: user.user.researches,
      });
    } catch (e) {
      $goto("/");
    }
  }

  async function fetchResearches(userID: string) {
    try {
      const response = await fetch(`/api/research/getUserResearches?userID=${userID}`);

      if (response.ok) {
        researches = await response.json();
      } else {
        console.error("Failed to fetch researches");
        error = "Failed to fetch researches";
      }
    } catch (err) {
      console.error("Error fetching researches:", err);
      error = "Error fetching researches";
    } finally {
      loading = false;
    }
  }

  onMount(async () => {
    if (!$isAuthenticated) {
      $goto("/login");
    } else if ($isAuthenticated) {
      await fetchUser().then(async () => {
        currentUser = $userData;
      });
      if (currentUser) {
        fetchResearches(currentUser._id);
      } else {
        console.error("Network error:", error);
      }
    }
  });


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
  let transitionParams = {
    x: -320,
    duration: 200,
    easing: sineIn,
  };

  

  //modal for create new research
  let formModal = false;
</script>

<!--navbar-->
<nav class="bg-white flex justify-between z-50 gap-2 ml-64 pl-4 pt-2 pr-4 pb-2 border-b">
  <form class="flex items-center w-full gap-2">
    <FolderOutline />
    <Input class="w-5/6 truncate ..." type="text" id="researchProjectTitle" placeholder="Streamlining Outcome-Based Education and Continuous Quality Improvement of University of Nueva Caceres through Technology: A Information Management System for Improving Inclusiveness Streamlining Outcome-Based Education and Continuous Quality Improvement of University of Nueva Caceres through Technology: A Information Management System for Improving Inclusiveness"></Input>
    <StarOutline />
    <Tooltip>Not Starred</Tooltip>
    <Badge class="pt-2 pr-4 pb-2 " rounded><Indicator color="orange" size="md" class="me-1.5" />No Status</Badge>
  </form>

  <div class="flex items-center gap-4">
    <ClockOutline />
    <Tooltip>Last edit was 00 hours ago</Tooltip>
    <div>
      <DotsHorizontalOutline />
      <Dropdown class="">
        <DropdownItem class="flex items-center gap-2"><LinkOutline />Copy research link</DropdownItem>

        <DropdownItem class="flex items-center gap-2"><ArchiveOutline />Archive research</DropdownItem>
        <DropdownItem class="flex items-center gap-2"><TrashBinOutline />Delete research</DropdownItem>
      </Dropdown>
    </div>
    <Tooltip>More</Tooltip>
  </div>
</nav>

<!--sidebar-->
<div class="sidebar h-full">
  <button data-drawer-target="separator-sidebar" data-drawer-toggle="separator-sidebar" aria-controls="separator-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover-bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover-bg-gray-700 dark:focus:ring-gray-600">
    <span class="sr-only">Open sidebar</span>
    <Menu />
  </button>
  <Sidebar id="separator-sidebar" class="text-clip fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 flex items-stretch min-h-screen" aria-label="Sidebar">
    <SidebarWrapper class="rounded-none ">
      <SidebarBrand {site} />
      <!---->
      <SidebarGroup class="">
        {#if currentUser}
          <SidebarItem label={`Hello, ${currentUser.firstName}`} {spanClass}></SidebarItem>
        {:else}
          <div></div>
        {/if}
        <SidebarItem class="text-center align-middle font-medium bg-blue-600 hover:bg-orange-600 text-white" label="Create new research" on:click={() => (formModal = true)}><svelte:fragment slot="icon"><CirclePlusOutline /></svelte:fragment></SidebarItem>
        <SidebarItem label="All researches" on:click={() => (allResearches = false)} class="" ><svelte:fragment slot="icon"><FolderOutline /></svelte:fragment></SidebarItem>
        <SidebarItem label="Browse researches" href="/main/personnel/browseResearches"><svelte:fragment slot="icon"><SearchOutline /></svelte:fragment></SidebarItem>
        <SidebarItem label="Bookmark researches" href="" class=""><svelte:fragment slot="icon"><BookmarkOutline /></svelte:fragment></SidebarItem>
        <SidebarItem label="Notifications" on:click={() => (notification = false)} href=""><svelte:fragment slot="icon"><BellOutline /></svelte:fragment></SidebarItem>
        <SidebarItem label="Library" href=""><svelte:fragment slot="icon"><LandmarkOutline /></svelte:fragment></SidebarItem>
        <SidebarItem label="Check Presentations" href="/main/admin/checkPresentations" />
        <SidebarItem label="Check Proposals" href="/main/admin/checkProposals" />
        <SidebarItem label="Create User Accounts" href="/main/admin/createAccount" />
        <SidebarItem label="Personnel Dashboard" href="/main/personnel/personnelDashboard" />
        <SidebarItem label="Create concept note" href="/main/personnel/createConceptNote" />
        <SidebarItem label="Research Dashboard" href="/main/personnel/researchDashboard" />
      </SidebarGroup>
      <!---->
      <SidebarGroup border class="truncate ...">
        {#if loading}
          <SidebarItem label="Loading..."></SidebarItem>
        {:else if researches}
          <SidebarDropdownWrapper label="Starred" isOpen><svelte:fragment slot="icon"><StarSolid color="orange" /></svelte:fragment>
            {#each researches as r}
              <SidebarDropdownItem class="" label={r.researchTitle} href={`/main/${r._id}`}></SidebarDropdownItem>
            {/each}
          </SidebarDropdownWrapper>
        {:else}
          <SidebarItem href="/main/createResearch" label="Create Research"></SidebarItem>
        {/if}
      </SidebarGroup>
      <SidebarGroup border>
        {#if currentUser}
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

<!--drawer for creating new research-->
<Drawer transitionType="fly" {transitionParams} bind:hidden={allResearches} id="sidebar1" class="flex flex-col w-1/2 p-4 gap-2">
  <div class="flex justify-between items-center gap-2">
    <ChevronLeftOutline on:click={() => (allResearches = true)} class="w-4 h-4 mr-4 mb-2 dark:text-white" />
    <Heading tag="h6" class="flex gap-2"><FolderOutline />All researches</Heading>
    <Button on:click={() => (formModal = true)} size="md" outline class="w-60 sm:w-72"><CirclePlusOutline class="w-4 h-4 me-2" />Create new research</Button>
  </div>

  <div class="flex items-center gap-2">
    <Search></Search>
    <Button size="md" class="w-40 md:w-52"><FilterOutline class="w-4 h-4 me-2" />Filter by</Button>
    <Dropdown>
      <DropdownItem>Title</DropdownItem>
      <DropdownItem>Status</DropdownItem>
    </Dropdown>
  </div>

  <Table hoverable={true} class="table-fixed">
    <TableHead class="">
      <TableHeadCell class="w-3/5"><div class="flex items-center gap-2"><SortOutline class="w-4 h-4 me-2" />Title</div></TableHeadCell>
      <TableHeadCell><div class="flex items-center gap-2"><SortOutline class="w-4 h-4 me-2" />Status</div></TableHeadCell>
      <TableHeadCell><div class="flex items-center gap-2"><SortOutline class="w-4 h-4 me-2" />Recent</div></TableHeadCell>
    </TableHead>
    <TableBody>
      <TableBodyRow>
        <TableBodyCell class="">
          <div class="flex items-center gap-2 p-0">
            <StarOutline class="w-4 h-4 p-0" size="sm" />
            <P size="sm" weight="medium" class="line-clamp-1">Streamlining Outcome-Based Education and Continuous Quality Improvement of University of Nueva Caceres through Technology: A Information Management System for Improving Inclusiveness Streamlining Outcome-Based Education and Continuous Quality Improvement of University of Nueva Caceres through Technology: A Information Management System for Improving Inclusiveness</P>
          </div>
          <Tooltip>Insert full title</Tooltip>
        </TableBodyCell>

        <TableBodyCell class="">No status</TableBodyCell>
        <TableBodyCell class="">
          <div class="flex items-center gap-2">
            <P size="sm" weight="medium" class="line-clamp-1">01/01/2023</P>
            <DotsHorizontalOutline />
          </div>
        </TableBodyCell>
      </TableBodyRow>
    </TableBody>
  </Table>
</Drawer>

<!--drawer for notification-->
<Drawer transitionType="fly" {transitionParams} bind:hidden={notification} id="sidebar1" class="flex flex-col w-1/2 p-4 gap-2">
  <div class="flex justify-between items-center gap-2">
    <div class="flex items-center gap-2">
      <ChevronLeftOutline on:click={() => (notification = true)} size="md" class="" />
        <div class="flex items-center gap-1"><BellOutline size="md" /><P weight="semibold" size="2xl" class="">Notifications</P></div>
    </div>
    
    <Button size="md" outline class=""><EnvelopeOpenOutline class="w-4 h-4 me-2" />Mark All As Read</Button>
  </div>

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

<!--modal for create new research-->

<Modal bind:open={formModal} size="xs" autoclose={false} outsideclose class="w-full">
  <form class="flex flex-col space-y-6" action="#">
    <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Create new research</h3>
    <Label class="space-y-2">
      <span>Research title</span>
      <Textarea rows="5" id="researchTitle" required />
    </Label>
    <Label class="space-y-2">
      <span>Project leader</span>
      <!--
<MultiSelect size="lg" items={userList} bind:value={researchLeaders} required />
      -->
      <label class="block font-bold mb-2" for="researchLeaders"> Research Leader </label>
    </Label>
    <Button on:click={() => alert('Handle "success"')} type="submit" class="w-full1">Create new research</Button>
  </form>
</Modal>

<!--content-->
<div class="ml-64 pl-2 pt-4 pr-2 pb-4 grid items-center bg-white">
  {#if currentUser}
    <slot scoped={{ userID: currentUser._id }} />
  {:else}
    <slot />
  {/if}
</div>

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
        {#if currentUser}
          <SidebarItem label={`Hello, ${currentUser.firstName}`} {spanClass}></SidebarItem>
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
        {#if currentUser}
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
  {#if currentUser}
    <slot scoped={{ userID: currentUser._id }} />
  {:else}
    <slot />
  {/if}
</div>

-->
