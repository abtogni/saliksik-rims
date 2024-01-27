<script lang="ts">
  import { A, Alert, Avatar, Badge, Button, Checkbox, Dropdown, DropdownItem, Indicator, Input, Modal, P, Search, Select, Tooltip } from "flowbite-svelte";
  import { ArchiveOutline, BellActiveAltOutline, DotsHorizontalOutline, EyeOutline, FolderPlusOutline, MessageCaptionOutline, MessageDotsOutline, MessagesOutline, QuestionCircleOutline, StarOutline, StarSolid, TrashBinOutline, UserAddOutline, UserOutline } from "flowbite-svelte-icons";
  import { getPanelists, getUserList } from "../../../components/fetch";
  import { panelist } from "../../../components/store";
  import { onMount } from "svelte";
  import moment from "moment";
  import CreateNewPanelistModal from "../../../modals/CreateNewPanelistModal.svelte";

  onMount(async () => {
    try {
      await getPanelists();
    } catch (error) {
      console.error("Network error:", error);
    }
  });

  //modal for create personnel account
  let createPanelist = false;
</script>

<main class="p-4">
  <div class="flex justify-center gap-2 bg-gray-50">
    <div class="grid grid-flow-row items-center gap-2 w-1/2 sm:w-full md:w-full lg:w-11/12 xl:w-8/12 2xl:w-1/2">
      <Alert dismissable color="blue" class="border-l-8 mb-2">
        <div class="flex items-center gap-2">
          <QuestionCircleOutline slot="icon" size="sm" />
          <span class="text-lg font-medium">Panelist</span>
        </div>
        <p class="mt-2 text-sm">Insert helper text</p>
      </Alert>

      <!---->
      <div class="flex flex-wrap justify-start items-center gap-0 w-full">
        <div class="flex justify-between items-center gap-2 w-full">
          <div class="flex items-center gap-2">
            <MessageCaptionOutline size="md" class="text-blue-700" />
            <P size="xl" weight="bold" class="text-gray-900">{$panelist.length} <span class="text-gray-500">Panelist</span></P>
          </div>

          <div class="flex items-center gap-2">
            <Button on:click={() => (createPanelist = true)} color="blue" size="sm" class="flex items-center gap-2 rounded-md"><MessagesOutline size="sm" />Create Panelist</Button>
          </div>
        </div>
        <P size="sm" weight="normal" class="text-gray-500">Create and organize panelist.</P>
      </div>
      <!--
      <div class="grid grid-flow-row justify-center w-full shadow-lg border rounded-lg gap-2 p-3 mb-4 bg-white">
        <P size="sm" weight="normal" class="text-gray-500">No existing panelist...<span></span></P>
      </div>
      -->

      <!--list of panelist-->
      <div class="grid grid-flow-row w-full shadow-lg border rounded-lg bg-white">
        <div class="grid grid-flow-row items-center gap-0">
          {#each $panelist as p}
          <div class="flex justify-between items-center gap-2 px-4 py-3 border-b hover:bg-blue-50">
            <div class="flex justify-start items-center gap-2">
              <MessagesOutline size="sm" class="text-blue-700" />
              <P size="base" weight="semibold" class="whitespace-nowrap">{`${p.firstName} ${p.lastName}`}</P>
              <P size="base" weight="bold" class="text-gray-500">·</P>
              <P weight="normal" size="sm" class="line-clamp-1 text-gray-500 w-96">Created in <span class="font-medium text-gray-500">{moment(p.createdAt).format('LL')}</span></P>
            </div>
            <div class="flex justify-start items-center gap-0">
              <Button outline color="blue" size="sm" class="flex items-center rounded-full border-none gap-2 p-1"><DotsHorizontalOutline size="sm" /></Button>
              <Dropdown>
                <DropdownItem>
                  <div class="flex justify-start items-center gap-2">
                    <TrashBinOutline size="sm" class="text-blue-700" />Delete Panelist
                  </div>
                </DropdownItem>
              </Dropdown>
            </div>
          </div>
          {/each}
            
        </div>
      </div>

      <!--modal for create personnel account-->
      <Modal title="Create Panelist" bind:open={createPanelist} size="xs" autoclose={false} outsideclose class="rounded-md w-full">
        <CreateNewPanelistModal/>
      </Modal>
    </div>
  </div>
  <div class="h-96"></div>
  <div class="h-96"></div>
</main>
