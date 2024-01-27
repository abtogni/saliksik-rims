<script lang="ts">
  import { Button, Tooltip, Dropdown, DropdownItem, P, Avatar } from "flowbite-svelte";
  import { onMount } from "svelte";
  import { selectedResearchInfo } from "../../../components/store";
  import { UserOutline, FolderOutline, StarOutline, ArchiveOutline, TrashBinOutline, DotsHorizontalOutline, ClockOutline } from "flowbite-svelte-icons";
  import moment from "moment";
  import ConceptNote from "../../../assets/status/conceptNoteWaitingForApproval.svelte";
  import NoStatus from "../../../assets/status/noStatus.svelte";
</script>

<nav class="flex justify-between z-50 gap-2 pl-4 pt-2 pr-4 pb-2 border-b bg-white">
  <div class="flex justify-start whitespace-nowrap items-center gap-2">
    <FolderOutline color="blue" class="" />
    {#if $selectedResearchInfo}
      <P weight="semibold" class="line-clamp-1" size="base">{$selectedResearchInfo.researchTitle}</P>
    {/if}

    {#if $selectedResearchInfo.researchStatus === "No Status"}
      <NoStatus />
    {:else if $selectedResearchInfo.researchStatus === "Concept Note Approval"}
      <ConceptNote />
    {/if}
  </div>

  <div class="flex items-center gap-2">
    <div class="flex items-center gap-0">
      <Avatar border size="xs" class="text-xs font-medium ring-blue-700">AR</Avatar>
      <Tooltip arrow={false}>Agnes Reyes</Tooltip>
      <Avatar border size="xs" class="text-xs font-medium ring-blue-700">JA</Avatar>
      <Tooltip arrow={false}>June Arreb Danila</Tooltip>
      <Avatar border size="xs" class="text-xs font-medium ring-blue-700">DC</Avatar>
      <Tooltip arrow={false}>Danny Casimero</Tooltip>
      <Avatar border size="xs" class="text-xs font-medium ring-blue-700">DI</Avatar>
      <Tooltip arrow={false}>Dennis Ignacio</Tooltip>
    </div>
    <div class="flex items-center gap-0">
      <Button pill outline color="blue" size="sm" class="items-center border-none gap-2 p-2"><ClockOutline size="sm" /></Button>
      <Tooltip arrow={false}>Last edit was 00 hours ago</Tooltip>
      <Button pill outline color="blue" size="sm" class="items-center border-none gap-2 p-2"><DotsHorizontalOutline size="sm" /></Button>
      <Dropdown class="">
        <DropdownItem class="flex justify-start items-center gap-2"><UserOutline size="sm" class="text-blue-700" />Change Collaborators</DropdownItem>
        <DropdownItem class="flex justify-start items-center gap-2"><ArchiveOutline size="sm" class="text-blue-700" />Archive Research</DropdownItem>
        <DropdownItem class="flex justify-start items-center gap-2"><TrashBinOutline size="sm" class="text-blue-700" />Delete Research</DropdownItem>
      </Dropdown>
    </div>
  </div>
</nav>

<slot><!-- optional fallback --></slot>
