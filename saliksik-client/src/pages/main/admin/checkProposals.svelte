<script lang="ts">
  import { goto } from "@roxi/routify";
  import { DateInput } from "date-picker-svelte";
  import { Heading, TabItem, TableBody, TableBodyCell, TableBodyRow, Table, TableHead, TableHeadCell, Tabs, TableSearch, Avatar, Popover, Card, Button, Modal, Accordion, AccordionItem, Listgroup, ListgroupItem, ImagePlaceholder, P, Search, Dropdown, DropdownItem, Tooltip, Indicator, Badge, Hr, FloatingLabelInput, Alert, Checkbox } from "flowbite-svelte";
  import { CalendarEditOutline, CalendarMonthOutline, CalendarPlusSolid, ClipboardOutline, ClockOutline, CloseOutline, DotsHorizontalOutline, EditOutline, FileCirclePlusOutline, FileLinesOutline, FileOutline, FilterOutline, GridOutline, InfoCircleOutline, MapLocationOutline, MessageCaptionOutline, MessageCaptionSolid, QuestionCircleOutline, SortOutline, StarOutline, TrashBinOutline, UserAddOutline, UsersGroupOutline } from "flowbite-svelte-icons";
  import moment from "moment";
  import { onMount } from "svelte";
  import { slide } from "svelte/transition";

  let proposals: any[],
    researches: any[] = [],
    loading = true,
    error: any = null;

  async function getProposalList() {
    try {
      const response = await fetch("/api/research/getProposals");
      const responseData = await response.json();
      proposals = responseData.data;
    } catch (e) {
      $goto("/404");
    }
  }

  async function fetchResearch(researchID: any) {
    try {
      const response = await fetch(`/api/research/getResearch?researchID=${researchID}`);

      if (response.ok) {
        const data = await response.json();
        researches.push(data);
      } else {
        // Handle non-OK responses here
        if (response.status === 404) {
          error = "Research not found";
        } else {
          error = "Failed to fetch research";
        }
      }
    } catch (error) {
      console.error("Error fetching research:", error);
      error = "Error fetching research";
    } finally {
      loading = false;
    }
  }

  onMount(async () => {
    try {
      await getProposalList();
      const researchPromises = proposals.map((p) => fetchResearch(p.researchID));
      await Promise.all(researchPromises);
      researches = researches;
    } catch (error) {
      console.error("Network error:", error);
    } finally {
      loading = false;
    }

    console.log(proposals);
  });

  loading = false;

  //For search bar
  let searchTerm = "";

  //for pop-up admin-buttons
  let approve = false;
  let reject = false;

  //table-modal
  let openRow: number;

  const toggleRow = (i: any) => {
    openRow = openRow === i ? null : i;
  };

  //modal for concept note approval
  let approveConceptNote = false;

  //modal for concept note rejection
  let rejectConceptNote = false;

  //modal for add schedule
  let addSchedule = false;

  //modal for send notice to present
  let sendNoticeToPresent = false;

  //modal for changing incentive status to processing
  let changeIncentiveStatusToProcessing = false;

  //modal for changing incentive status to released
  let changeIncentiveStatusToReleased = false;
</script>

<main>
  <Alert dismissable color="blue" class="border-l-8 w-full mb-2">
    <div class="flex items-center gap-2">
      <QuestionCircleOutline slot="icon" size="sm" />
      <span class="text-lg font-medium">Admin Dashboard</span>
    </div>
    <p class="mt-2 text-sm">Insert helper text</p>
  </Alert>
  <div class="flex items-center gap-2"><P weight="semibold" size="2xl" class="">Admin Dashboard</P></div>

  <!--all researches-->
  <Tabs style="none" activeClasses="p-2 text-blue-700 border-b-2 border-b-blue-700 rounded-t-lg" inactiveClasses="p-2 text-gray-500 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300" contentClass="bg-white p-0 mt-2 rounded-md border-0 shadow-none" class="">
    <TabItem>
      <div slot="title" class="flex items-center gap-2"><Indicator color="blue"></Indicator>All Researches</div>
      <div class="flex items-center gap-2 mb-2">
        <Search></Search>
        <div class="flex items-center gap-2">
          <Button class="gap-2"><FilterOutline size="sm" />Status</Button>
          <Dropdown>
            <DropdownItem>Concept Note Approval</DropdownItem>
            <DropdownItem>Initial Presentation Approval</DropdownItem>
            <DropdownItem>Final Presentation Approval</DropdownItem>
            <DropdownItem>Incentive Approval</DropdownItem>
            <DropdownItem>Published</DropdownItem>
            <DropdownItem>Rejected</DropdownItem>
          </Dropdown>
        </div>
      </div>

      <Table hoverable={true} noborder={false} shadow={true} class="">
        <TableHead class="bg-blue-200">
          <TableHeadCell>
            <div class="flex items-center gap-2">
              <Indicator color="dark"></Indicator>
            </div>
            <Tooltip arrow={false} class="capitalize">Status</Tooltip>
          </TableHeadCell>
          <TableHeadCell class="p-0 w-3/4"><div class="flex items-center gap-2"><SortOutline size="sm" class="" />Title</div></TableHeadCell>
          <TableHeadCell class=""><div class="flex items-center gap-2"><SortOutline size="sm" class="" />Leaders</div></TableHeadCell>
          <TableHeadCell class=""><div class="flex items-center gap-2"><SortOutline size="sm" class="" />Agency/Department</div></TableHeadCell>
          <TableHeadCell class=""><div class="flex items-center gap-2"><SortOutline size="sm" class="" />Date Submitted</div></TableHeadCell>
        </TableHead>
        <TableBody>
          {#if proposals}
            {#if researches}
              {#each proposals as p, i}
                {#if researches.find((x) => x._id === p.researchID)}
                  {#each researches.filter((x) => x._id === p.researchID) as research}
                    <TableBodyRow on:click={() => toggleRow(i)}>
                      <TableBodyCell class="">
                        <div class="flex justify-start items-center gap-2 p-0">
                          <Indicator color="orange"></Indicator>
                          <Tooltip arrow={false}>For Concept Note Approval</Tooltip>
                        </div>
                      </TableBodyCell>
                      <TableBodyCell class="p-0">
                        <div class="flex justify-start items-center gap-2">
                          <P size="sm" weight="normal" class="line-clamp-1 text-black">{research.researchTitle}</P>
                        </div>
                      </TableBodyCell>
                      <TableBodyCell class="">
                        <div class="flex items-center gap-0">
                          <Avatar border size="xs" class="text-xs font-medium ring-orange-400">AR</Avatar>
                          <Tooltip arrow={false}>Agnes Reyes</Tooltip>
                          <Avatar border size="xs" class="text-xs font-medium ring-orange-400">JA</Avatar>
                          <Tooltip arrow={false}>June Arreb Danila</Tooltip>
                          <Avatar border size="xs" class="text-xs font-medium ring-orange-400">DC</Avatar>
                          <Tooltip arrow={false}>Danny Casimero</Tooltip>
                          <Avatar border size="xs" class="text-xs font-medium ring-orange-400">DI</Avatar>
                          <Tooltip arrow={false}>Dennis Ignacio</Tooltip>
                        </div>
                      </TableBodyCell>
                      <TableBodyCell class="">
                        <div class="flex justify-start items-start gap-2">
                          <Badge border large color="none" class="flex items-center gap-2 border-none font-normal text-black bg-transparent">College of Computer Studies</Badge>
                        </div>
                      </TableBodyCell>
                      <TableBodyCell class="">
                        <div class="flex justify-start items-start gap-2">
                          <Badge border large color="none" class="flex items-center gap-2 border-none font-normal text-black bg-transparent">{moment(p.createdAt).format("lll")}</Badge>
                        </div>
                      </TableBodyCell>
                    </TableBodyRow>
                    {#if openRow === i}
                      <TableBodyRow on:dblclick={() => p} class="">
                        <TableBodyCell colspan="5" class="">
                          <div class="flex flex-wrap justify-center gap-2">
                            <Card size="xl" padding="none" class="gap-2 w-full border-none shadow-none">
                              <div class="flex justify-between items-start gap-2">
                                <P weight="semibold" size="xl" class="">Concept Note Overview</P>
                                <div class="flex items-center gap-2">
                                  <Button on:click={() => (approveConceptNote = true)} class="gap-2"><EditOutline size="sm" />Approve</Button>
                                  <Button on:click={() => (rejectConceptNote = true)} class="gap-2"><ClipboardOutline size="sm" />Reject</Button>
                                </div>
                              </div>
                            </Card>
                            <Card size="xl" class="gap-2 w-full">
                              <P weight="semibold" size="xl">{research.researchTitle}</P>

                              <div class="flex items-center gap-2 pt-2">
                                <Avatar border size="xs" class="text-xs font-medium ring-orange-400">AR</Avatar><P weight="normal" size="base">Agnes Reyes</P>
                                <Avatar border size="xs" class="text-xs font-medium ring-orange-400">JA</Avatar><P weight="normal" size="base">June Arreb Danila</P>
                                <Avatar border size="xs" class="text-xs font-medium ring-orange-400">DC</Avatar><P weight="normal" size="base">Danny Casimero</P>
                                <Avatar border size="xs" class="text-xs font-medium ring-orange-400">DI</Avatar><P weight="normal" size="base">Dennis Ignacio</P>
                              </div>
                              <div class="flex justify-start gap-2 pt-2">
                                <div class="w-1/2 gap-2">
                                  <div class="flex items-center gap-2">
                                    <P weight="medium" size="base">Implementing Agency/Department:</P>
                                    <P></P>
                                  </div>
                                  <div class="flex items-center gap-2">
                                    <P weight="medium" size="base">Cooperating Agency:</P>
                                    <P>College of Computer Studies</P>
                                  </div>
                                  <div class="flex items-center gap-2">
                                    <P weight="medium" size="base">Site/s of Implementation:</P>
                                    <P>College of Computer Studies</P>
                                  </div>
                                </div>
                                <div class="w-1/2 gap-2">
                                  <div class="flex items-center gap-2">
                                    <P weight="medium" size="base">Project Duration:</P>
                                    <P>College of Computer Studies</P>
                                  </div>
                                  <div class="flex items-center gap-2">
                                    <P weight="medium" size="base">Total Project Cost:</P>
                                    <P>College of Computer Studies</P>
                                  </div>
                                  <div class="flex items-center gap-2">
                                    <P weight="medium" size="base">Funding Source:</P>
                                    <P>College of Computer Studies</P>
                                  </div>
                                </div>
                              </div>
                            </Card>
                            <Card size="xl" class="gap-2 w-full">
                              <P weight="semibold" size="lg">Project Description</P>
                              <Hr classHr="my-1" />
                              <P weight="normal">{p.description}</P>
                            </Card>
                            <Card size="xl" class="gap-2 w-full">
                              <P weight="semibold" size="xl">Significance</P>
                              <Hr classHr="my-1" />
                              <P weight="normal">{p.significance}</P>
                            </Card>
                            <Card size="xl" class="gap-2 w-full">
                              <P weight="semibold" size="lg">Objectives</P>
                              <Hr classHr="my-1" />
                              <P weight="normal">{p.objectives}</P>
                            </Card>
                            <Card size="xl" class="gap-2 w-full">
                              <P weight="semibold" size="lg">Methodology</P>
                              <Hr classHr="my-1" />
                              <P weight="normal">{p.methodolog}</P>
                            </Card>
                            <Card size="xl" class="gap-2 w-full">
                              <P weight="semibold" size="lg">Technology Roadmap</P>
                              <Hr classHr="my-1" />
                              <P weight="normal"></P>
                            </Card>
                            <Card size="xl" class="gap-2 w-full">
                              <P weight="semibold" size="lg">Expected Outputs (6Ps)</P>
                              <Hr classHr="my-1" />
                              <P weight="normal"></P>
                            </Card>
                            <Card size="xl" class="gap-2 w-full">
                              <P weight="semibold" size="lg">Work Plan</P>
                              <Hr classHr="my-1" />
                              <P weight="normal"></P>
                            </Card>
                          </div>
                        </TableBodyCell>
                      </TableBodyRow>
                    {/if}
                  {/each}
                {/if}
              {/each}
            {:else}
              No researches found.
            {/if}
          {:else}
            No proposals found.
          {/if}
        </TableBody>
      </Table>
    </TabItem>

    <!--concept note approval-->
    <TabItem>
      <div slot="title" class="flex items-center gap-2"><Indicator color="orange"></Indicator>Concept Note Approval</div>
      <div class="flex items-center gap-2 mb-2">
        <Search></Search>
        <div class="flex items-center gap-2">
          <Button class="gap-2"><FilterOutline size="sm" />Agency/Department</Button>
          <Dropdown>
            <DropdownItem>College of Computer Studies</DropdownItem>
          </Dropdown>
        </div>
      </div>

      <Table hoverable={true} noborder={false} shadow={true} class="">
        <TableHead theadClass="text-xs uppercase" class="bg-blue-200">
          <TableHeadCell>
            <div class="flex items-center gap-2">
              <Indicator color="dark"></Indicator>
            </div>
            <Tooltip arrow={false}>Status</Tooltip>
          </TableHeadCell>
          <TableHeadCell class="p-0 w-3/4"><div class="flex items-center gap-2"><SortOutline size="sm" class="" />Title</div></TableHeadCell>
          <TableHeadCell class=""><div class="flex items-center gap-2"><SortOutline size="sm" class="" />Leaders</div></TableHeadCell>
          <TableHeadCell class=""><div class="flex items-center gap-2"><SortOutline size="sm" class="" />Agency/Department</div></TableHeadCell>
          <TableHeadCell class=""><div class="flex items-center gap-2"><SortOutline size="sm" class="" />Date Submitted</div></TableHeadCell>
        </TableHead>
        <TableBody>
          {#if proposals}
            {#if researches}
              {#each proposals as p, i}
                {#if researches.find((x) => x._id === p.researchID)}
                  {#each researches.filter((x) => x._id === p.researchID) as research}
                    <TableBodyRow on:click={() => toggleRow(i)}>
                      <TableBodyCell class="">
                        <div class="flex justify-start items-center gap-2 p-0">
                          <Indicator color="orange"></Indicator>
                          <Tooltip arrow={false}>For Concept Note Approval</Tooltip>
                        </div>
                      </TableBodyCell>
                      <TableBodyCell class="p-0">
                        <div class="flex justify-start items-center gap-2">
                          <P size="sm" weight="normal" class="line-clamp-1 text-black">{research.researchTitle}</P>
                        </div>
                      </TableBodyCell>
                      <TableBodyCell class="">
                        <div class="flex items-center gap-1.5">
                          <Avatar border size="xs" class="text-xs font-medium ring-orange-400">AR</Avatar>
                          <Tooltip arrow={false}>Agnes Reyes</Tooltip>
                          <Avatar border size="xs" class="text-xs font-medium ring-orange-400">JA</Avatar>
                          <Tooltip arrow={false}>June Arreb Danila</Tooltip>
                          <Avatar border size="xs" class="text-xs font-medium ring-orange-400">DC</Avatar>
                          <Tooltip arrow={false}>Danny Casimero</Tooltip>
                          <Avatar border size="xs" class="text-xs font-medium ring-orange-400">DI</Avatar>
                          <Tooltip arrow={false}>Dennis Ignacio</Tooltip>
                        </div>
                      </TableBodyCell>
                      <TableBodyCell class="">
                        <div class="flex justify-start items-start gap-2">
                          <Badge border large color="none" class="flex items-center gap-2 border-none font-normal text-black">College of Computer Studies</Badge>
                        </div>
                      </TableBodyCell>
                      <TableBodyCell class="">
                        <div class="flex justify-start items-start gap-2">
                          <Badge border large color="none" class="flex items-center gap-2 border-none font-normal text-black">{moment(p.createdAt).format("lll")}</Badge>
                        </div>
                      </TableBodyCell>
                    </TableBodyRow>
                    {#if openRow === i}
                      <TableBodyRow on:dblclick={() => p} class="">
                        <TableBodyCell colspan="5" class="">
                          <div class="flex flex-wrap justify-center gap-2">
                            <Card size="xl" padding="none" class="gap-2 w-full border-none shadow-none">
                              <div class="flex justify-between items-start gap-2">
                                <P weight="semibold" size="xl" class="">Concept Note Overview</P>
                                <div class="flex items-center gap-2">
                                  <Button on:click={() => (approveConceptNote = true)} class="gap-2"><EditOutline size="sm" />Approve</Button>
                                  <Button on:click={() => (rejectConceptNote = true)} class="gap-2"><ClipboardOutline size="sm" />Reject</Button>
                                </div>
                              </div>
                            </Card>
                            <Card size="xl" class="gap-2 w-full">
                              <P weight="semibold" size="xl">{research.researchTitle}</P>

                              <div class="flex items-center gap-2 pt-2">
                                <Avatar border size="xs" class="text-xs font-medium ring-orange-400">AR</Avatar><P weight="normal" size="base">Agnes Reyes</P>
                                <Avatar border size="xs" class="text-xs font-medium ring-orange-400">JA</Avatar><P weight="normal" size="base">June Arreb Danila</P>
                                <Avatar border size="xs" class="text-xs font-medium ring-orange-400">DC</Avatar><P weight="normal" size="base">Danny Casimero</P>
                                <Avatar border size="xs" class="text-xs font-medium ring-orange-400">DI</Avatar><P weight="normal" size="base">Dennis Ignacio</P>
                              </div>
                              <div class="flex justify-start gap-2 pt-2">
                                <div class="w-1/2 gap-2">
                                  <div class="flex items-center gap-2">
                                    <P weight="medium" size="base">Implementing Agency/Department:</P>
                                    <P></P>
                                  </div>
                                  <div class="flex items-center gap-2">
                                    <P weight="medium" size="base">Cooperating Agency:</P>
                                    <P>College of Computer Studies</P>
                                  </div>
                                  <div class="flex items-center gap-2">
                                    <P weight="medium" size="base">Site/s of Implementation:</P>
                                    <P>College of Computer Studies</P>
                                  </div>
                                </div>
                                <div class="w-1/2 gap-2">
                                  <div class="flex items-center gap-2">
                                    <P weight="medium" size="base">Project Duration:</P>
                                    <P>College of Computer Studies</P>
                                  </div>
                                  <div class="flex items-center gap-2">
                                    <P weight="medium" size="base">Total Project Cost:</P>
                                    <P>College of Computer Studies</P>
                                  </div>
                                  <div class="flex items-center gap-2">
                                    <P weight="medium" size="base">Funding Source:</P>
                                    <P>College of Computer Studies</P>
                                  </div>
                                </div>
                              </div>
                            </Card>
                            <Card size="xl" class="gap-2 w-full">
                              <P weight="semibold" size="lg">Project Description</P>
                              <Hr classHr="my-1" />
                              <P weight="normal">{p.description}</P>
                            </Card>
                            <Card size="xl" class="gap-2 w-full">
                              <P weight="semibold" size="xl">Significance</P>
                              <Hr classHr="my-1" />
                              <P weight="normal">{p.significance}</P>
                            </Card>
                            <Card size="xl" class="gap-2 w-full">
                              <P weight="semibold" size="lg">Objectives</P>
                              <Hr classHr="my-1" />
                              <P weight="normal">{p.objectives}</P>
                            </Card>
                            <Card size="xl" class="gap-2 w-full">
                              <P weight="semibold" size="lg">Methodology</P>
                              <Hr classHr="my-1" />
                              <P weight="normal">{p.methodolog}</P>
                            </Card>
                            <Card size="xl" class="gap-2 w-full">
                              <P weight="semibold" size="lg">Technology Roadmap</P>
                              <Hr classHr="my-1" />
                              <P weight="normal"></P>
                            </Card>
                            <Card size="xl" class="gap-2 w-full">
                              <P weight="semibold" size="lg">Expected Outputs (6Ps)</P>
                              <Hr classHr="my-1" />
                              <P weight="normal"></P>
                            </Card>
                            <Card size="xl" class="gap-2 w-full">
                              <P weight="semibold" size="lg">Work Plan</P>
                              <Hr classHr="my-1" />
                              <P weight="normal"></P>
                            </Card>
                          </div>
                        </TableBodyCell>
                      </TableBodyRow>
                    {/if}
                  {/each}
                {/if}
              {/each}
            {:else}
              No researches found.
            {/if}
          {:else}
            No proposals found.
          {/if}
        </TableBody>
      </Table>
    </TabItem>

    <!--initial presentation-->
    <TabItem>
      <div slot="title" class="flex items-center gap-2"><Indicator color="blue"></Indicator>Initial Presentation</div>
      <div class="flex justify-center gap-2 bg-gray-50">
        <div class="grid grid-flow-row col-start-2 col-span-3 items-center gap-2 w-1/2 sm:w-full md:w-full lg:w-11/12 xl:w-8/12 2xl:w-1/2">
          <Alert dismissable color="blue" class="border-l-8 w-full  mb-2">
            <div class="flex items-center gap-2">
              <QuestionCircleOutline slot="icon" size="sm" />
              <span class="text-lg font-medium">Initial Presentation</span>
            </div>
            <p class="mt-2 text-sm">Insert helper text</p>
          </Alert>

          <!---->
          <div class="flex justify-between items-center w-full">
            <div class="flex items-center gap-2">
              <FileLinesOutline size="md" class="text-blue-700" />
              <P weight="bold" size="xl" class="text-gray-900">00 <span class="text-gray-500">Researches Viable for Initial Presentation</span></P>
            </div>

            <div class="flex items-center gap-2">
              <Button on:click={() => (addSchedule = true)} color="blue" size="sm" class="flex items-center gap-2 rounded-md"><CalendarPlusSolid size="sm" />Create Schedule</Button>
            </div>
          </div>

          <!--modal for create schedule-->
          <Modal title="Create Schedule" bind:open={addSchedule} size="md" autoclose={false} outsideclose class="rounded-md w-full">
            <form class="grid grid-flow-row gap-6">
              <!--modal date and time-->
              <div class="grid grid-flow-row gap-2">
                <div class="flex justify-start items-center gap-2">
                  <CalendarPlusSolid size="sm" class="text-blue-700" />
                  <P for="researchLeaders" weight="bold" size="base" class="text-gray-700">Date and Time</P>
                </div>
                <div class="flex justify-start items-center gap-2 px-2 py-0">
                  <CalendarMonthOutline size="sm" class="text-blue-700" />
                  <DateInput format="yyyy-MM-dd" placeholder="yyyy-MM-dd" required --date-picker-highlight-border="#b43403" --date-picker-highlight-shadow="none" --date-input-width="100%" class="w-full rounded-md text-gray-500  " />
                </div>
              </div>

              <!--modal add presenter-->
              <div class="grid grid-flow-row gap-2">
                <div class="flex justify-between items-center gap-2">
                  <div class="flex justify-start items-center gap-2">
                    <UserAddOutline size="sm" class="text-blue-700" />
                    <P for="researchLeaders" weight="bold" size="base" class="text-gray-700">Add Presenter</P>
                  </div>
                  <div class="">
                    <Checkbox color="blue" class="text-gray-500">Select All</Checkbox>
                  </div>
                </div>
                <div class="">
                  <div class="flex justify-between items-center gap-2 p-2 rounded-md hover:bg-orange-50">
                    <Checkbox color="blue" class="w-full  text-gray-500 ">Insert Research Title</Checkbox>
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
                  </div>
                </div>
              </div>

              <!--modal add panelist-->
              <div class="grid grid-flow-row gap-2">
                <div class="flex justify-between items-center gap-2">
                  <div class="flex justify-start items-center gap-2">
                    <MessageCaptionOutline size="sm" class="text-blue-700" />
                    <P for="researchLeaders" weight="bold" size="base" class="text-gray-700">Add Panelist</P>
                  </div>
                  <div class="flex justify-start items-center gap-2">
                    <Button color="blue" size="sm" class="flex items-center gap-2 rounded-md"><FileCirclePlusOutline size="sm" />Add Existing Panelist</Button>
                    <Button outline color="blue" size="sm" class="flex items-center gap-2 rounded-md"><CalendarEditOutline size="sm" />Create New Panelist</Button>
                  </div>
                </div>

                <div class="">
                  <div class="flex justify-between items-center p-2 rounded-md hover:bg-orange-50">
                    <div class="flex justify-start items-center gap-2">
                      <MessageCaptionSolid size="sm" class="text-blue-700" />
                      <P for="researchLeaders" weight="semibold" size="sm" class="text-gray-500">Insert Panelist Name</P>
                    </div>
                    <div class="">
                      <Button outline color="blue" size="sm" class="flex items-center rounded-full border-none gap-2 p-2"><CloseOutline size="xs" /></Button>
                    </div>
                  </div>
                </div>
              </div>

              <Button on:click={() => alert('Handle "success"')} type="submit" color="blue" size="md" class="rounded-md w-full">Add Schedule</Button>
            </form>
          </Modal>

          <!--card presenter list-->
          <div class="flex justify-center items-center gap-2 shadow-lg border rounded-md p-3">
            <P size="lg" weight="medium" class="text-gray-500">No set schedule</P>
          </div>

          <!--card schedule-->
          <div class="grid grid-flow-row gap-2 shadow-lg border rounded-md p-3">
            <!--card schedule header-->
            <div class="grid grid-flow-row items-center gap-2 p-2">
              <div class="flex justify-between items-center gap-2">
                <div class="flex justify-start items-center gap-2">
                  <CalendarMonthOutline size="md" class="text-blue-700" />
                  <P size="lg" weight="bold" class="uppercase">Sunday, January 21, 2023 at 1:30 PM</P>
                </div>

                <Button outline color="blue" size="sm" class="flex items-center rounded-full border-none gap-2 p-1.5"><DotsHorizontalOutline size="sm" /></Button>
                <Dropdown>
                  <DropdownItem>
                    <div class="flex justify-start items-center gap-2">
                      <TrashBinOutline size="sm" class="text-blue-700" />Delete Schedule
                    </div>
                  </DropdownItem>
                </Dropdown>
              </div>

              <div class="flex flex-wrap justify-start items-center gap-4">
                <div class="flex justify-start items-center gap-2">
                  <MapLocationOutline size="sm" class="text-blue-700" />
                  <P weight="semibold" size="base" class="line-clamp-1 text-gray-500">UNC Testing Center</P>
                </div>

                <div class="flex justify-start items-center gap-2">
                  <UsersGroupOutline size="sm" class="text-blue-700" />
                  <P weight="semibold" size="base" class="line-clamp-1 text-gray-500">5 <span class="font-normal">presenters going</span></P>
                </div>
              </div>
            </div>
            <div class="flex justify-start items-center gap-2">
              <Button color="blue" size="sm" class="flex items-center gap-2 rounded-md"><FileCirclePlusOutline size="sm" />Add Research</Button>
              <Button outline color="blue" size="sm" class="flex items-center gap-2 rounded-md"><CalendarEditOutline size="sm" />Change Schedule</Button>
            </div>

            <!--card presenter-->
            <div class="flex flex-wrap gap-2 rounded-md p-2 hover:bg-orange-50">
              <div class="flex justify-between items-center gap-2 w-full">
                <div class="flex justify-start items-center gap-2">
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
                  <P size="base" weight="bold" class="text-gray-500">·</P>
                  <div class="flex justify-start items-center gap-2">
                    <Badge border large class="flex items-center gap-2">
                      <Indicator color="orange" size="md" class="" />Waiting for Reply
                    </Badge>
                    <Badge border large color="blue" class="flex items-center gap-2">
                      <Indicator color="blue" size="md" class="" />Going
                    </Badge>
                    <Badge border large color="red" class="flex items-center gap-2">
                      <Indicator color="red" size="md" class="" />Not Going
                    </Badge>
                  </div>
                </div>
                <Button outline color="blue" size="sm" class="flex items-center rounded-full border-none gap-2 p-1.5"><DotsHorizontalOutline size="sm" /></Button>
                <Dropdown>
                  <DropdownItem>
                    <div class="flex justify-start items-center gap-2">
                      <TrashBinOutline size="sm" class="text-blue-700" />Delete Schedule
                    </div>
                  </DropdownItem>
                </Dropdown>
              </div>
              <P weight="semibold" size="base" class="line-clamp-3">Streamlining Outcome-Based Education and Continuous Quality Improvement of University of Nueva Caceres through Technology: A Information Management System for Improving Inclusiveness</P>
              <div class="flex items-center gap-2">
                <Button on:click={() => (addSchedule = true)} color="blue" size="sm" class="flex items-center gap-2 rounded-md"><MessageCaptionOutline size="sm" />Add Panelist Comment</Button>
              </div>
            </div>
            <Button on:click={() => (sendNoticeToPresent = true)} color="blue" size="md" class="rounded-md w-full">Send Notice to Present</Button>

            <!--modal send notice to present-->
            <Modal title="Send Notice to Present" bind:open={sendNoticeToPresent} size="xs" autoclose class="w-full">
              <div class="flex justify-center items-center">
                <InfoCircleOutline size="xl" class="text-blue-700" />
              </div>
              <P weight="normal" size="base" class="text-center">Are you sure you want to proceed?</P>
              <div class="flex gap-2">
                <Button color="blue" size="md" class="w-full">Yes</Button>
                <Button type="submit" outline color="blue" size="sm" class="w-full">No</Button>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </TabItem>

    <!--tabitem final presentation-->
    <TabItem>
      <div slot="title" class="flex items-center gap-2"><Indicator color="blue"></Indicator>Final Presentation</div>
    </TabItem>

    <!--tabitem incentive status-->
    <TabItem open>
      <div slot="title" class="flex items-center gap-2"><Indicator color="blue"></Indicator>Incentive Status</div>

      <div class="grid grid-flow-row items-center gap-2 bg-gray-50">
        <div class="flex items-center gap-2">
          <Search size="md" />
          <div class="flex items-center gap-2">
            <Button color="blue" size="sm" class="flex items-center gap-2 rounded-md"><FilterOutline size="sm" />Status</Button>
            <Dropdown>
              <DropdownItem><Checkbox color="blue" class="text-gray-500">Not Starting</Checkbox></DropdownItem>
              <DropdownItem><Checkbox color="blue" class="text-gray-500">Processing</Checkbox></DropdownItem>
              <DropdownItem><Checkbox color="blue" class="text-gray-500">Released</Checkbox></DropdownItem>
            </Dropdown>
          </div>
        </div>
        <Table hoverable={true} noborder={false} shadow={true} class="hover:bg-orange-50 ">
          <TableHead class="bg-blue-700 text-white">
            <TableHeadCell class="w-32">
              <div class="flex items-center gap-1">
                Status<Button color="blue" size="sm" class="flex items-center rounded-full border-none gap-2 p-1.5"><SortOutline size="sm" /></Button>
              </div>
            </TableHeadCell>
            <TableHeadCell class="">
              <div class="flex items-center gap-1">
                Title<Button color="blue" size="sm" class="flex items-center rounded-full border-none gap-2 p-1.5"><SortOutline size="sm" /></Button>
              </div>
            </TableHeadCell>
            <TableHeadCell class="w-44">
              <div class="flex items-center gap-1">
                Leader<Button color="blue" size="sm" class="flex items-center rounded-full border-none gap-2 p-1.5"><SortOutline size="sm" /></Button>
              </div>
            </TableHeadCell>
            <TableHeadCell class="w-56">
              <div class="flex items-center gap-1">
                Timestamp<Button color="blue" size="sm" class="flex items-center rounded-full border-none gap-2 p-1.5"><SortOutline size="sm" /></Button>
              </div>
            </TableHeadCell>
          </TableHead>
          <TableBody>
            {#if proposals}
              {#if researches}
                {#each proposals as p, i}
                  {#if researches.find((x) => x._id === p.researchID)}
                    {#each researches.filter((x) => x._id === p.researchID) as research}
                      <TableBodyRow on:click={() => toggleRow(i)} class="hover:bg-orange-50">
                        <TableBodyCell class="">
                          <!--not starting, processing or released-->
                          <div class="flex items-center gap-2 cursor-pointer text-gray-500"><Indicator color="dark" size="md" class="" />Not Starting</div>

                          <Dropdown>
                            <DropdownItem class="flex items-center gap-2 "><Indicator color="dark" size="md" class="text-gray-500" />Not Starting</DropdownItem>
                            <DropdownItem class="flex items-center gap-2 "><Indicator color="orange" size="md" class="text-gray-500" />Processing</DropdownItem>

                            <!--modal change incentive status to  processing-->
                            <Modal title="Change Incentive Status" bind:open={changeIncentiveStatusToProcessing} size="xs" autoclose class="w-full">
                              <div class="flex justify-center items-center">
                                <InfoCircleOutline size="xl" class="text-blue-700" />
                              </div>
                              <P weight="normal" size="base" class="text-center">Are you sure you want to proceed? This action will notify the researcher of the current incentive status.</P>
                              <div class="flex gap-2">
                                <Button color="blue" size="md" class="w-full">Yes</Button>
                                <Button type="submit" outline color="blue" size="sm" class="w-full">No</Button>
                              </div>
                            </Modal>

                            
                            <DropdownItem class="flex items-center gap-2 "><Indicator color="blue" size="md" class="text-gray-500" />Released</DropdownItem>

                            <!--modal change incentive status to released-->
                            <Modal title="Change Incentive Status" bind:open={changeIncentiveStatusToReleased} size="xs" autoclose class="w-full">
                              <div class="flex justify-center items-center">
                                <InfoCircleOutline size="xl" class="text-blue-700" />
                              </div>
                              <P weight="normal" size="base" class="text-center">Are you sure you want to proceed? This action will notify the researcher of the current incentive status.</P>
                              <div class="flex gap-2">
                                <Button color="blue" size="md" class="w-full">Yes</Button>
                                <Button type="submit" outline color="blue" size="sm" class="w-full">No</Button>
                              </div>
                            </Modal>
                          </Dropdown>
                        </TableBodyCell>
                        <TableBodyCell class="">
                          <P size="sm" weight="semibold" class="line-clamp-1 text-gray-500">{research.researchTitle}</P>
                        </TableBodyCell>
                        <TableBodyCell class="">
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
                        </TableBodyCell>

                        <TableBodyCell class="">
                          <P size="sm" weight="semibold" class=" text-gray-500">{moment(p.createdAt).format("lll")}</P>
                        </TableBodyCell>
                      </TableBodyRow>
                    {/each}
                  {/if}
                {/each}
              {:else}
                No researches found.
              {/if}
            {:else}
              No proposals found.
            {/if}
          </TableBody>
        </Table>
      </div>
    </TabItem>
    <!--tabitem published-->
    <TabItem>
      <div slot="title" class="flex items-center gap-2"><Indicator color="blue"></Indicator>Published</div>
    </TabItem>
    <!--rejected-->
    <TabItem>
      <div slot="title" class="flex items-center gap-2"><Indicator color="blue"></Indicator>Rejected</div>
    </TabItem>
  </Tabs>

  <Modal title="Approve Concept Note?" bind:open={approveConceptNote} size="xs" autoclose class="w-full">
    <div class="flex justify-center items-center">
      <InfoCircleOutline size="xl" />
    </div>
    <P weight="normal" size="base" class="text-center">Once, the Concept Note is approved. A Notice To Proceed will be sent to the owner.</P>
    <div class="flex gap-2">
      <Button class="w-full">Approve</Button>
      <Button class="w-full">Cancel</Button>
    </div>
  </Modal>

  <Modal title="Reject Concept Note?" bind:open={rejectConceptNote} size="xs" autoclose class="w-full">
    <div class="flex justify-center items-center">
      <InfoCircleOutline size="xl" />
    </div>
    <P weight="normal" size="base" class="text-center">Once, you click the reject button. You can find the Concept Note in the Reject tab of the Research Dashboard</P>
    <div class="flex gap-2">
      <Button class="w-full">Reject</Button>
      <Button class="w-full">Cancel</Button>
    </div>
  </Modal>
  <div class="h-96"></div>
  <div class="h-96"></div>
</main>
