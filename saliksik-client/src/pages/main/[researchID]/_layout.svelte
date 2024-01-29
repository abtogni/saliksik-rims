<script lang="ts">
  import { Button, Tooltip, Dropdown, DropdownItem, P, Avatar } from "flowbite-svelte";
  import { onMount } from "svelte";
  import { researches, selectedResearchInfo, userList } from "../../../components/store";
  import { UserOutline, FolderOutline, StarOutline, ArchiveOutline, TrashBinOutline, DotsHorizontalOutline, ClockOutline } from "flowbite-svelte-icons";
  import moment from "moment";
  import NoStatus from "../../../assets/status/noStatus.svelte";
  import ConceptNoteWaitingForApproval from "../../../assets/status/conceptNoteWaitingForApproval.svelte";
  import ConceptNoteApproved from "../../../assets/status/conceptNoteApproved.svelte";
  import ConceptNoteRejected from "../../../assets/status/conceptNoteRejected.svelte";
  import InitialPresentationWaitingForResponse from "../../../assets/status/initialPresentationWaitingForResponse.svelte";
  import InitialPresentationGoing from "../../../assets/status/initialPresentationGoing.svelte";
  import InitialPresentationNotGoing from "../../../assets/status/initialPresentationNotGoing.svelte";
  import FinalPresentationWaitingForResponse from "../../../assets/status/finalPresentationWaitingForResponse.svelte";
  import FinalPresentationGoing from "../../../assets/status/finalPresentationGoing.svelte";
  import FinalPresentationNotGoing from "../../../assets/status/finalPresentationNotGoing.svelte";
  import IncentiveProcessing from "../../../assets/status/incentiveProcessing.svelte";
  import IncentiveReleased from "../../../assets/status/incentiveReleased.svelte";
  import Published from "../../../assets/status/published.svelte";

  let newUserList: any[];

  onMount(async () => {
    newUserList = $userList.map((user: any) => ({
      id: `${user._id}`,
      name: `${user.firstName} ${user.lastName}`,
      avatar: user.avatar,
    }));
  });
</script>

<nav class="flex justify-between z-50 gap-2 pl-4 pt-2 pr-4 pb-2 border-b bg-white">
  <div class="flex justify-start whitespace-nowrap items-center gap-2">
    <FolderOutline color="blue" class="" />
    {#if $selectedResearchInfo}
      <P weight="semibold" class="line-clamp-1" size="base">{$selectedResearchInfo.researchTitle}</P>
    {/if}
  </div>

  <div class="flex items-center gap-2">
    {#if $selectedResearchInfo.researchStatus === "No Status"}
      <NoStatus />
    {:else if $selectedResearchInfo.researchStatus === "Concept Note (waiting For Approval)"}
      <ConceptNoteWaitingForApproval />
    {:else if $selectedResearchInfo.researchStatus === "Concept Note (Approved)"}
      <ConceptNoteApproved />
    {:else if $selectedResearchInfo.researchStatus === "Concept Note (Rejected)"}
      <ConceptNoteRejected />
    {:else if $selectedResearchInfo.researchStatus === "Initial Presentation (Waiting For Response)"}
      <InitialPresentationWaitingForResponse />
    {:else if $selectedResearchInfo.researchStatus === "Initial Presentation (Going)"}
      <InitialPresentationGoing />
    {:else if $selectedResearchInfo.researchStatus === "Initial Presentation (Not Going)"}
      <InitialPresentationNotGoing />
    {:else if $selectedResearchInfo.researchStatus === "Final Presentation (Waiting For Response)"}
      <FinalPresentationWaitingForResponse />
    {:else if $selectedResearchInfo.researchStatus === "Final Presentation (Going)"}
      <FinalPresentationGoing />
    {:else if $selectedResearchInfo.researchStatus === "Final Presentation (Not Going)"}
      <FinalPresentationNotGoing />
    {:else if $selectedResearchInfo.researchStatus === "Incentive (Processing)"}
      <IncentiveProcessing />
    {:else if $selectedResearchInfo.researchStatus === "Incentive (Released)"}
      <IncentiveReleased />
    {:else if $selectedResearchInfo.researchStatus === "Published"}
      <Published />
    {/if}

    {#if $selectedResearchInfo}
      <div class="flex items-center gap-0">
        {#each $selectedResearchInfo.researchLeaders as member}
          {#if $userList}
            {#each $userList as user}
              {#if user._id === member}
                <div class="flex items-center gap-0">
                  <Avatar border size="xs" class="text-xs font-medium ring-blue-700">{user.avatar}</Avatar>
                  <Tooltip arrow={false}>{`${user.firstName} ${user.lastName}`}</Tooltip>
                </div>
              {/if}
            {/each}
          {/if}
        {/each}
      </div>
    {/if}
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
