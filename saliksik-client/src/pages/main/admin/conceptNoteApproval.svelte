<script lang="ts">
  import { A, Accordion, AccordionItem, Alert, Avatar, Badge, Button, Checkbox, Dropdown, DropdownItem, Indicator, Modal, P, Search, TabItem, Tabs, Tooltip } from "flowbite-svelte";
  import { ArchiveOutline, CheckCircleOutline, ChevronDoubleDownOutline, ChevronDoubleUpOutline, ClockOutline, DotsHorizontalOutline, EyeOutline, FileCirclePlusOutline, FileExportOutline, FileLinesOutline, FileOutline, FilePenOutline, FilterOutline, FolderOutline, FolderPlusOutline, MessageCaptionOutline, QuestionCircleOutline, StarOutline, StarSolid, TrashBinOutline, UserAddOutline, UserOutline } from "flowbite-svelte-icons";
  import moment from "moment";
  import { onMount } from "svelte";
  import { researches, selectedResearchInfo, userList } from "../../../components/store";
  import { getResearchInfo } from "../../../components/fetch";
  import CreateNewResearchModal from "../../../modals/CreateNewResearchModal.svelte";
  import ApproveConceptNoteModal from "../../../modals/ApproveConceptNoteModal.svelte";

  //modal for create new research
  let createNewResearch = false;

  let open = false;

  let openRow: number;

  const toggleRow = (i: any) => {
    openRow = openRow === i ? null : i;
  };

  const currentURL = window.location.href.split("/");
  const researchID = currentURL[currentURL.length - 1];

  onMount(async () => {
    try {
      await getResearchInfo(researchID);
    } catch (error) {
      console.error("Network error:", error);
    }
  });

  let newUserList: any[];

  onMount(async () => {
    newUserList = $userList.map((user: any) => ({
      id: `${user._id}`,
      name: `${user.firstName} ${user.lastName}`,
      avatar: user.avatar,
    }));
  });
  //modal for concept note approval
  let approveConceptNote = false;

  //modal for concept note rejection
  let rejectConceptNote = false;
</script>

<main class="p-4">
  <div class="flex justify-center gap-2 bg-gray-50">
    <div class="grid grid-flow-row items-center gap-2 w-3/4 sm:w-full md:w-full lg:w-11/12 xl:w-3/4 2xl:w-3/4">
      <!--helper card
        <Alert dismissable color="blue" class="border-l-8">
          <div class="flex items-center gap-2">
            <QuestionCircleOutline slot="icon" size="sm" />
            <span class="text-lg font-medium">Concept Note Approval</span>
          </div>
          <p class="mt-2 text-sm">Insert Helper text</p>
          <p class="mt-2 text-sm"></p>
        </Alert>
        -->
      <div class="flex flex-wrap justify-start items-center gap-0 w-full">
        <div class="flex justify-between items-center gap-2 w-full">
          <div class="flex items-center gap-2">
            <FileLinesOutline size="md" class="text-blue-700" />
            <P size="xl" weight="bold" class="text-gray-900">00 <span class="text-gray-500">Concept Note For Approval</span></P>
          </div>
          <!--
            <div class="flex items-center gap-2">
              <Button on:click={() => (createNewResearch = true)} type="submit" color="blue" size="sm" class="flex items-center gap-2 rounded-md"><FolderPlusOutline size="sm" /> Create New Research</Button>
            </div>
            -->
          <div class="flex justify-start items-center gap-4">
            <div class="flex items-center gap-2">
              <CheckCircleOutline size="md" class="text-blue-700" />
              <P size="xl" weight="bold" class="text-gray-900">00 <span class="text-gray-500">Approved</span></P>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="#1d4ed8" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m13 7-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <P size="xl" weight="bold" class="text-gray-900">00 <span class="text-gray-500">Rejected</span></P>
            </div>
          </div>
        </div>

        <P size="sm" weight="normal" class="text-gray-500">Approve or reject submitted concept note.</P>
      </div>

      <!--card researches inactive
        <div class="grid grid-flow-row justify-center w-full shadow-lg border rounded-md gap-2 p-3 mb-4 bg-white">
          <P size="sm" weight="normal" class="text-gray-500">No existing researches...<span></span></P>
        </div>
        -->
      <!--card researches active-->
      <div class="grid grid-flow-row w-full shadow-lg border rounded-lg bg-white">
        <div class="flex justify-between items-center gap-2 px-4 py-3 border-b w-full">
          <Search color="blue" size="sm" placeholder="Search by title or status..." class="border rounded-md"></Search>
          <!--filter
          <div class="flex items-center gap-2">
            <Button color="blue" size="sm" class="flex items-center gap-2 w-full rounded-md whitespace-nowrap"><CheckCircleOutline size="sm" /> Waiting for Approval</Button>
            <Button color="blue" size="sm" class="flex items-center gap-2 w-full rounded-md"><CheckCircleOutline size="sm" /> Approved</Button>
            <Button outline color="blue" size="sm" class="flex items-center gap-2 w-full rounded-md">
              <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m13 7-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg> Rejected
            </Button>
          </div>
          -->
        </div>

        <!--card research-->
        <Accordion flush>
          {#if $researches}
            {#each $researches as research, i}
              <AccordionItem paddingFlush="">
                <div slot="header" class="flex flex-wrap gap-2 px-4 py-3 w-full hover:bg-blue-50">
                  <div class="flex justify-between items-center gap-2 w-full">
                    <div class="flex justify-start items-center gap-2">
                      <div class="flex items-center gap-0">
                        {#each research.researchLeaders as member}
                          {#if newUserList}
                            {#each newUserList as user}
                              {#if user.id === member}
                                <div class="flex items-center gap-0">
                                  <Avatar border size="xs" class="text-xs font-medium ring-blue-700">{user.avatar}</Avatar>
                                  <Tooltip arrow={false}>{user.name}</Tooltip>
                                </div>
                              {/if}
                            {/each}
                          {/if}
                        {/each}
                      </div>
                      <P weight="semibold" size="sm" class="line-clamp-2">{research.researchTitle}</P>
                    </div>
                    <div class="flex justify-end items-center gap-1">
                      <div class="flex justify-start items-center gap-2">
                        <Badge border large class="flex items-center gap-2">
                          <Indicator color="orange" size="md" class="" />Approved
                        </Badge>
                        <Tooltip arrow={false} class="border rounded-md shadow-lg  bg-white">
                          <P weight="normal" size="sm" class=" text-gray-500">Approved in <span class="font-medium text-gray-500">January 21, 2023</span></P>
                        </Tooltip>
                        <Badge border large color="blue" class="flex items-center gap-2">
                          <Indicator color="blue" size="md" class="" />Rejected
                        </Badge>
                      </div>
                      <div class="flex justify-start items-center gap-2">
                        <P size="base" weight="bold" class="text-gray-500">·</P>
                        <P weight="normal" size="sm" class="whitespace-nowrap text-gray-500">Submitted in <span class="font-medium text-gray-500">{moment(research.updatedAt).format("lll")}</span></P>
                      </div>

                      <!--view research
                        <Button outline color="blue" size="sm" class="flex items-center rounded-full border-none gap-2 p-1"><EyeOutline size="sm" /></Button>
                        <Tooltip arrow={false} class="border rounded-md shadow-lg  bg-white">
                          <P weight="normal" size="sm" class="font-medium text-gray-500">Full View</P>
                        </Tooltip>
  -->
                      <Button outline color="blue" size="sm" class="flex items-center rounded-full border-none gap-2 p-1"><DotsHorizontalOutline size="sm" /></Button>
                      <Dropdown>
                        <DropdownItem class="flex justify-start items-center gap-2 rounded-md font-medium text-sm w-full text-gray-500  hover:bg-blue-50">
                          <EyeOutline size="sm" class="text-blue-700" />View Research
                        </DropdownItem>
                        <DropdownItem class="flex justify-start items-center gap-2 rounded-md font-medium text-sm w-full text-gray-500  hover:bg-blue-50">
                          <ArchiveOutline size="sm" class="text-blue-700" />Archive Research
                        </DropdownItem>
                        <DropdownItem class="flex justify-start items-center gap-2 rounded-md font-medium text-sm w-full text-gray-500  hover:bg-blue-50">
                          <TrashBinOutline size="sm" class="text-blue-700" />Delete Research
                        </DropdownItem>
                      </Dropdown>
                    </div>
                  </div>
                </div>

                <div slot="arrowup"></div>
                <span slot="arrowdown"> </span>

                <div class="flex flex-wrap justify-start items-center gap-2 p-3 w-full h-96 overflow-auto">
                  <!--concept note overview card-->
                  <div class="grid grid-flow-row w-full shadow-lg border rounded-lg gap-2 p-3 bg-white">
                    <div class="flex items-start gap-2">
                      <div class="grid grid-flow-row items-start gap-2">
                        <div class="flex flex-wrap justify-start items-start gap-2">
                          <P size="sm" weight="medium">Implementing Agency/Department:</P>
                          <P size="sm" weight="normal" class="text-gray-500">{research.conceptNote.implementingDept}</P>
                          <!--badge

                          
                          <Badge border large color="dark" class="flex items-center gap-2 font-normal text-sm border-none text-gray-500">{research.conceptNote.implementingDept}</Badge>
                       -->
                        </div>
                        <div class="flex flex-wrap justify-start items-start gap-2">
                          <P size="sm" weight="medium">Cooperating Agency:</P>
                          <P size="sm" weight="normal" class="text-gray-500">{research.conceptNote.coopAgency}</P>
                        </div>
                        <div class="flex flex-wrap justify-start items-start gap-2">
                          <P size="sm" weight="medium">Site/s of Implementation:</P>
                          <P size="sm" weight="normal" class="text-gray-500">{research.conceptNote.siteImplementation}</P>
                        </div>
                        <div class="flex flex-wrap justify-start items-start gap-2">
                          <P size="sm" weight="medium">Project Duration:</P>
                          <P size="sm" weight="normal" class="text-gray-500">{moment(research.conceptNote.projectDuration).format("LL")}</P>
                        </div>
                        <div class="flex flex-wrap justify-start items-start gap-2">
                          <P size="sm" weight="medium">Total Project Cost:</P>
                          <P size="sm" weight="normal" class="text-gray-500">{research.conceptNote.totalCost}</P>
                        </div>
                        <div class="flex flex-wrap justify-start items-start gap-2">
                          <P size="sm" weight="medium">Funding Source:</P>
                          <P size="sm" weight="normal" class="text-gray-500">{research.conceptNote.fundingSource}</P>
                        </div>
                      </div>
                    </div>
                  </div>

                  <P size="lg" weight="medium">Project Description</P>
                  <div class="grid grid-flow-row w-full shadow-lg border rounded-lg gap-2 p-3 mb-4 bg-white">
                    {#each research.conceptNote.description.split("\n") as paragraph}
                      <P size="sm" weight="normal" class="text-gray-500">{paragraph}</P>
                    {/each}
                  </div>
                  <P size="lg" weight="medium">Significance</P>
                  <div class="grid grid-flow-row w-full shadow-lg border rounded-lg gap-2 p-3 mb-4 bg-white">
                    {#each research.conceptNote.significance.split("\n") as paragraph}
                      <P size="sm" weight="normal" class="text-gray-500">{paragraph}</P>
                    {/each}
                  </div>
                  <P size="lg" weight="medium">Objectives</P>
                  <div class="grid grid-flow-row w-full shadow-lg border rounded-lg gap-2 p-3 mb-4 bg-white">
                    {#each research.conceptNote.objectives.split("\n") as paragraph}
                      <P size="sm" weight="normal" class="text-gray-500">{paragraph}</P>
                    {/each}
                  </div>
                  <P size="lg" weight="medium">Methodology</P>
                  <div class="grid grid-flow-row w-full shadow-lg border rounded-lg gap-2 p-3 mb-4 bg-white">
                    {#each research.conceptNote.methodology.split("\n") as paragraph}
                      <P size="sm" weight="normal" class="text-gray-500">{paragraph}</P>
                    {/each}
                  </div>
                  <P size="lg" weight="medium">Technology Roadmap</P>
                  <div class="grid grid-flow-row w-full shadow-lg border rounded-lg gap-2 p-3 mb-4 bg-white">
                    {#each research.conceptNote.technologyRoadmap.split("\n") as paragraph}
                      <P size="sm" weight="normal" class="text-gray-500">{paragraph}</P>
                    {/each}
                  </div>
                  <P size="lg" weight="medium">Expected Outputs (6Ps)</P>
                  <div class="grid grid-flow-row w-full shadow-lg border rounded-lg gap-2 p-3 mb-4 bg-white">
                    {#each research.conceptNote.expectedOutput.split("\n") as paragraph}
                      <P size="sm" weight="normal" class="text-gray-500">{paragraph}</P>
                    {/each}
                  </div>
                  <P size="lg" weight="medium">Work Plan</P>
                  <div class="grid grid-flow-row w-full shadow-lg border rounded-lg gap-2 p-3 mb-2 bg-white">
                    {#each research.conceptNote.workPlan.split("\n") as paragraph}
                      <P size="sm" weight="normal" class="text-gray-500">{paragraph}</P>
                    {/each}
                  </div>
                  <div class="flex justify-between items-center gap-2 w-full">
                    <Button on:click={() => (approveConceptNote = true)} color="blue" size="sm" class="flex items-center gap-2 w-full rounded-md"><CheckCircleOutline size="sm" /> Approve</Button>
                    <Button on:click={() => (rejectConceptNote = true)} outline color="blue" size="sm" class="flex items-center gap-2 w-full rounded-md"
                      ><svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m13 7-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg> Reject</Button>
                  </div>
                </div>
              </AccordionItem>
            {/each}
          {/if}
        </Accordion>
      </div>
    </div>
  </div>

  <!-- modal for accept concept note-->
  <Modal title="Approve Concept Note" bind:open={approveConceptNote} size="xs" autoclose={false} outsideclose class="w-full">
    <ApproveConceptNoteModal />
  </Modal>

  <!-- modal for reject concept note-->
  <Modal title="Reject Concept Note" bind:open={rejectConceptNote} size="xs" autoclose={false} outsideclose class="w-full">
    <CreateNewResearchModal />
  </Modal>
  <div class="h-96"></div>
  <div class="h-96"></div>
</main>
