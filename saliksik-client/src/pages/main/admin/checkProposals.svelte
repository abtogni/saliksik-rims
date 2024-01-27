<script lang="ts">
  import { TabItem, TableBody, TableBodyCell, TableBodyRow, Table, TableHead, TableHeadCell, Tabs, Avatar, Card, Button, Modal, P, Search, Dropdown, DropdownItem, Tooltip, Indicator, Badge, Hr, Alert, Checkbox, MultiSelect, Helper, Accordion, AccordionItem } from "flowbite-svelte";
  import { ArchiveOutline, CalendarEditOutline, CalendarMonthOutline, CalendarPlusSolid, CheckCircleOutline, CirclePlusOutline, ClipboardOutline, CloseOutline, DotsHorizontalOutline, EditOutline, EyeOutline, FileCirclePlusOutline, FileLinesOutline, FilterOutline, InfoCircleOutline, MapLocationOutline, MessageCaptionOutline, MessageCaptionSolid, MinusOutline, QuestionCircleOutline, SortOutline, TrashBinOutline, UsersGroupOutline } from "flowbite-svelte-icons";
  import moment from "moment";
  import { onMount } from "svelte";
  import { slide } from "svelte/transition";
  import CreatePresentationModal from "../../../modals/CreatePresentationModal.svelte";
  import { researches, selectedResearchInfo } from "../../../components/store";

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

<main class="p-4">
  <Alert dismissable color="blue" class="border-l-8 w-full mb-2">
    <div class="flex items-center gap-2">
      <QuestionCircleOutline slot="icon" size="sm" />
      <span class="text-lg font-medium">Admin Dashboard</span>
    </div>
    <p class="mt-2 text-sm">Insert helper text</p>
  </Alert>
  <div class="flex items-center gap-2"><P weight="semibold" size="2xl" class="">Admin Dashboard</P></div>

  <!--all researches-->
  <Tabs style="none" activeClasses="p-2 text-blue-700 border-b-2 border-b-blue-700 rounded-t-lg" inactiveClasses="p-2 text-gray-500 rounded-t-lg hover:text-gray-600 hover:bg-blue-50 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300" contentClass="bg-white p-0 mt-2 rounded-md border-0 shadow-none" class="">
    <TabItem>
      <div slot="title" class="flex items-center gap-2"><Indicator color="blue"></Indicator>All Researches</div>
      <div class="flex items-center gap-2 mb-2">
        <Search color="blue" size="sm" placeholder="Search by title or status..." class="border rounded-md "></Search>
        <div class="flex items-center gap-2">
          <div class="flex items-center gap-2">
            <Button color="blue" size="sm" class="flex items-center gap-2 rounded-md"><Indicator class="text-white" />Status</Button>

            <Dropdown>
              <DropdownItem class=" rounded-md hover:bg-blue-50">
                <Checkbox color="blue" class="font-medium text-sm w-full  text-gray-500 ">All</Checkbox>
              </DropdownItem>
              <DropdownItem class=" rounded-md hover:bg-blue-50">
                <Checkbox color="blue" class="font-medium text-sm w-full  text-gray-500 ">Concept Note Approval</Checkbox>
              </DropdownItem>
              <DropdownItem class=" rounded-md hover:bg-blue-50">
                <Checkbox color="blue" class="font-medium text-sm w-full  text-gray-500 ">Initial Presentation</Checkbox>
              </DropdownItem>
              <DropdownItem class="rounded-md hover:bg-blue-50">
                <Checkbox color="blue" class="font-medium text-sm w-full  text-gray-500 ">Final Presentation</Checkbox>
              </DropdownItem>
              <DropdownItem class=" rounded-md hover:bg-blue-50">
                <Checkbox color="blue" class="font-medium text-sm w-full  text-gray-500 ">Incentive Processing</Checkbox>
              </DropdownItem>
              <DropdownItem class=" rounded-md hover:bg-blue-50">
                <Checkbox color="blue" class="font-medium text-sm w-full  text-gray-500 ">Incentive Released</Checkbox>
              </DropdownItem>
              <DropdownItem class=" rounded-md hover:bg-blue-50">
                <Checkbox color="blue" class="font-medium text-sm w-full  text-gray-500 ">Published</Checkbox>
              </DropdownItem>
              <DropdownItem class=" rounded-md hover:bg-blue-50">
                <Checkbox color="blue" class="font-medium text-sm w-full  text-gray-500 ">Rejected</Checkbox>
              </DropdownItem>
            </Dropdown>
          </div>
        </div>
      </div>

      <Table hoverable={true} noborder={false} shadow={true} class="bg-blue-50">
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
              Agency/Department<Button color="blue" size="sm" class="flex items-center rounded-full border-none gap-2 p-1.5"><SortOutline size="sm" /></Button>
            </div>
          </TableHeadCell>
          <TableHeadCell class="w-56">
            <div class="flex items-center gap-1">
              Date Submitted<Button color="blue" size="sm" class="flex items-center rounded-full border-none gap-2 p-1.5"><SortOutline size="sm" /></Button>
            </div>
          </TableHeadCell>
        </TableHead>

        <TableBody>
          {#if $researches}
            {#each $researches as research, i}
              <!-- content here -->

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
                    <Badge border large color="none" class="flex items-center gap-2 border-none font-normal text-black bg-transparent">{moment(research.updatedAt).format("lll")}</Badge>
                  </div>
                </TableBodyCell>
              </TableBodyRow>
              {#if openRow === i}
                <TableBodyRow class="">
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
                        <P weight="normal">{research.conceptNote.description}</P>
                      </Card>
                      <Card size="xl" class="gap-2 w-full">
                        <P weight="semibold" size="xl">Significance</P>
                        <Hr classHr="my-1" />
                        <P weight="normal">{research.conceptNote.significance}</P>
                      </Card>
                      <Card size="xl" class="gap-2 w-full">
                        <P weight="semibold" size="lg">Objectives</P>
                        <Hr classHr="my-1" />
                        <P weight="normal">{research.conceptNote.objectives}</P>
                      </Card>
                      <Card size="xl" class="gap-2 w-full">
                        <P weight="semibold" size="lg">Methodology</P>
                        <Hr classHr="my-1" />
                        <P weight="normal">{research.conceptNote.methodology}</P>
                      </Card>
                      <Card size="xl" class="gap-2 w-full">
                        <P weight="semibold" size="lg">Technology Roadmap</P>
                        <Hr classHr="my-1" />
                        <P weight="normal">{research.conceptNote.technologyRoadmap}</P>
                      </Card>
                      <Card size="xl" class="gap-2 w-full">
                        <P weight="semibold" size="lg">Expected Outputs (6Ps)</P>
                        <Hr classHr="my-1" />
                        <P weight="normal">{research.conceptNote.expectedOutput}</P>
                      </Card>
                      <Card size="xl" class="gap-2 w-full">
                        <P weight="semibold" size="lg">Work Plan</P>
                        <Hr classHr="my-1" />
                        <P weight="normal">{research.conceptNote.workPlan}</P>
                      </Card>
                    </div>
                  </TableBodyCell>
                </TableBodyRow>
              {/if}
            {/each}
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
          {#if $researches}
            {#each $researches as research, i}
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
                    <Badge border large color="none" class="flex items-center gap-2 border-none font-normal text-black">{moment(research.createdAt).format("lll")}</Badge>
                  </div>
                </TableBodyCell>
              </TableBodyRow>
              {#if openRow === i}
                <TableBodyRow on:dblclick={() => research} class="">
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
                              <P>{research.conceptNote.implementingDept}</P>
                            </div>
                            <div class="flex items-center gap-2">
                              <P weight="medium" size="base">Cooperating Agency:</P>
                              <P>{research.conceptNote.coopAgency}</P>
                            </div>
                            <div class="flex items-center gap-2">
                              <P weight="medium" size="base">Site/s of Implementation:</P>
                              <P>{research.conceptNote.siteImplementation}</P>
                            </div>
                          </div>
                          <div class="w-1/2 gap-2">
                            <div class="flex items-center gap-2">
                              <P weight="medium" size="base">Project Duration:</P>
                              <P>{research.conceptNote.projectDuration}</P>
                            </div>
                            <div class="flex items-center gap-2">
                              <P weight="medium" size="base">Total Project Cost:</P>
                              <P>{research.conceptNote.totalCost}</P>
                            </div>
                            <div class="flex items-center gap-2">
                              <P weight="medium" size="base">Funding Source:</P>
                              <P>{research.conceptNote.fundingSource}</P>
                            </div>
                          </div>
                        </div>
                      </Card>
                      <Card size="xl" class="gap-2 w-full">
                        <P weight="semibold" size="lg">Project Description</P>
                        <Hr classHr="my-1" />
                        <P weight="normal">{research.conceptNote.description}</P>
                      </Card>
                      <Card size="xl" class="gap-2 w-full">
                        <P weight="semibold" size="xl">Significance</P>
                        <Hr classHr="my-1" />
                        <P weight="normal">{research.conceptNote.significance}</P>
                      </Card>
                      <Card size="xl" class="gap-2 w-full">
                        <P weight="semibold" size="lg">Objectives</P>
                        <Hr classHr="my-1" />
                        <P weight="normal">{research.conceptNote.objectives}</P>
                      </Card>
                      <Card size="xl" class="gap-2 w-full">
                        <P weight="semibold" size="lg">Methodology</P>
                        <Hr classHr="my-1" />
                        <P weight="normal">{research.conceptNote.methodology}</P>
                      </Card>
                      <Card size="xl" class="gap-2 w-full">
                        <P weight="semibold" size="lg">Technology Roadmap</P>
                        <Hr classHr="my-1" />
                        <P weight="normal">{research.conceptNote.technologyRoadmap}</P>
                      </Card>
                      <Card size="xl" class="gap-2 w-full">
                        <P weight="semibold" size="lg">Expected Outputs (6Ps)</P>
                        <Hr classHr="my-1" />
                        <P weight="normal">{research.conceptNote.expectedOutput}</P>
                      </Card>
                      <Card size="xl" class="gap-2 w-full">
                        <P weight="semibold" size="lg">Work Plan</P>
                        <Hr classHr="my-1" />
                        <P weight="normal">{research.conceptNote.workPlan}</P>
                      </Card>
                    </div>
                  </TableBodyCell>
                </TableBodyRow>
              {/if}
            {/each}
          {/if}
        </TableBody>
      </Table>
    </TabItem>

    <!--initial presentation-->
    <TabItem open>
      <div slot="title" class="flex items-center gap-2"><Indicator color="blue"></Indicator>Initial Presentation</div>
      <div class="flex justify-center gap-2 bg-gray-50">
        <div class="grid grid-flow-row col-start-2 col-span-3 items-center gap-2 w-11/12 sm:w-full md:w-full lg:w-11/12 xl:w-11/12 2xl:w-11/12 ">
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
              <P weight="bold" size="xl" class="text-gray-900">00 <span class="text-gray-500">Researches For Initial Presentation</span></P>
            </div>

            <div class="flex items-center gap-2">
              <Button on:click={() => (addSchedule = true)} color="blue" size="sm" class="flex items-center gap-2 rounded-md"><CalendarPlusSolid size="sm" />Create Schedule</Button>
            </div>
          </div>

          <!--card schedule-->
          <div class="grid grid-flow-row w-full shadow-lg border rounded-lg bg-white">
            <!--card schedule header-->
            <div class="grid grid-flow-row items-center gap-2 px-4 py-3 border-b">
              <div class="flex justify-between items-center gap-2">
                <div class="flex justify-start items-center gap-2">
                  <CalendarMonthOutline size="md" class="text-blue-700" />
                  <P size="lg" weight="bold" class="uppercase">Sunday, January 21, 2023 at 1:30 PM</P>
                </div>

                <Button outline color="blue" size="sm" class="flex items-center rounded-full border-none gap-2 p-1"><DotsHorizontalOutline size="sm" /></Button>
                <Dropdown>
                  <DropdownItem>
                    <div class="flex justify-start items-center gap-2">
                      <FileCirclePlusOutline size="sm" class="text-blue-700" />Add Research
                    </div>
                  </DropdownItem>
                  <DropdownItem>
                    <div class="flex justify-start items-center gap-2">
                      <CalendarEditOutline size="sm" class="text-blue-700" />Change Schedule
                    </div>
                  </DropdownItem>
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
                  <P weight="semibold" size="base" class="line-clamp-1 text-gray-500">00 <span class="font-normal">presenters going</span></P>
                </div>
              </div>
            </div>

            <Accordion flush>
              {#if $researches}
                {#each $researches as research, i}
                  <AccordionItem paddingFlush="" >
                    <div slot="header" class="flex flex-wrap gap-2 px-4 py-3 hover:bg-blue-50">
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
                          <div class="flex items-center gap-2">
                            <Button on:click={() => (addSchedule = true)} color="blue" size="sm" class="flex items-center gap-2 rounded-md"><MessageCaptionOutline size="sm" />Add Panelist Comment</Button>
                          </div>
                        </div>
                        <div class="flex justify-end items-center gap-2">
                          <Button outline color="blue" size="sm" class="flex items-center rounded-full border-none gap-2 p-1"><EyeOutline size="sm" /></Button>
                          <Tooltip arrow={false} class="border rounded-md shadow-lg  bg-white">
                            <P weight="normal" size="sm" class="font-medium text-gray-500">Full View</P>
                          </Tooltip>
    
                          <Button outline color="blue" size="sm"  class="flex items-center rounded-full border-none gap-2 p-1"><DotsHorizontalOutline size="sm" /></Button>
                          <Dropdown>
                            <DropdownItem>
                              <div class="flex justify-start items-center gap-2">
                                <TrashBinOutline size="sm" class="text-blue-700" />Remove Research
                              </div>
                            </DropdownItem>
                          </Dropdown>
                        </div>
                      </div>
                      <div class="flex justify-start items-start w-full">
                        <P weight="semibold" size="sm" class="line-clamp-2">{research.researchTitle}</P>
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
                              <Badge border large color="dark" class="flex items-center gap-2 font-normal text-sm border-none text-gray-500">{research.conceptNote.implementingDept}</Badge>
                            </div>
                            <div class="flex flex-wrap justify-start items-start gap-2">
                              <P size="sm" weight="medium">Cooperating Agency:</P>
                              <Badge border large color="dark" class="flex items-center gap-2 font-normal text-sm border-none text-gray-500"></Badge>
                              <Badge border large color="dark" class="flex items-center gap-2 font-normal text-sm border-none text-gray-500">Vice-President for Academic Affairs</Badge>
                            </div>
                            <div class="flex flex-wrap justify-start items-start gap-2">
                              <P size="sm" weight="medium">Site/s of Implementation:</P>
                              <Badge border large color="dark" class="flex items-center gap-2 font-normal text-sm border-none text-gray-500">{$selectedResearchInfo.conceptNote.siteImplementation}</Badge>
                            </div>
                            <div class="flex flex-wrap justify-start items-start gap-2">
                              <P size="sm" weight="medium">Project Duration:</P>
                              <P size="sm" weight="normal" class="text-gray-500">{moment($selectedResearchInfo.conceptNote.projectDuration).format("LL")}</P>
                            </div>
                            <div class="flex flex-wrap justify-start items-start gap-2">
                              <P size="sm" weight="medium">Total Project Cost:</P>
                              <P size="sm" weight="normal" class="text-gray-500">{$selectedResearchInfo.conceptNote.totalCost}</P>
                            </div>
                            <div class="flex flex-wrap justify-start items-start gap-2">
                              <P size="sm" weight="medium">Funding Source:</P>
                              <Badge border large color="dark" class="flex items-center gap-2 font-normal text-sm border-none text-gray-500">{$selectedResearchInfo.conceptNote.fundingSource}</Badge>
                            </div>
                          </div>
                        </div>
                      </div>
    
                      <P size="lg" weight="medium">Project Description</P>
                      <div class="grid grid-flow-row w-full shadow-lg border rounded-lg gap-2 p-3 mb-4 bg-white">
                        <P size="sm" weight="normal" class="text-gray-500">{research.conceptNote.description}</P>
                      </div>
                      <P size="lg" weight="medium">Significance</P>
                      <div class="grid grid-flow-row w-full shadow-lg border rounded-lg gap-2 p-3 mb-4 bg-white">
                        <P size="sm" weight="normal" class="text-gray-500">{research.conceptNote.significance}</P>
                      </div>
                      <P size="lg" weight="medium">Objectives</P>
                      <div class="grid grid-flow-row w-full shadow-lg border rounded-lg gap-2 p-3 mb-4 bg-white">
                        <P size="sm" weight="normal" class="text-gray-500">{research.conceptNote.objectives}</P>
                      </div>
                      <P size="lg" weight="medium">Methodology</P>
                      <div class="grid grid-flow-row w-full shadow-lg border rounded-lg gap-2 p-3 mb-4 bg-white">
                        <P size="sm" weight="normal" class="text-gray-500">{research.conceptNote.methodology}</P>
                      </div>
                      <P size="lg" weight="medium">Technology Roadmap</P>
                      <div class="grid grid-flow-row w-full shadow-lg border rounded-lg gap-2 p-3 mb-4 bg-white">
                        <P size="sm" weight="normal" class="text-gray-500">{research.conceptNote.technologyRoadmap}</P>
                      </div>
                      <P size="lg" weight="medium">Expected Outputs (6Ps)</P>
                      <div class="grid grid-flow-row w-full shadow-lg border rounded-lg gap-2 p-3 mb-4 bg-white">
                        <P size="sm" weight="normal" class="text-gray-500">{research.conceptNote.expectedOutput}</P>
                      </div>
                      <P size="lg" weight="medium">Work Plan</P>
                      <div class="grid grid-flow-row w-full shadow-lg border rounded-lg gap-2 p-3 mb-2 bg-white">
                        <P size="sm" weight="normal" class="text-gray-500">{research.conceptNote.workPlan}</P>
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
            <!--card presenter-->
            
            <div class="flex flex-wrap gap-2 px-4 py-3">
              <Button on:click={() => (sendNoticeToPresent = true)} color="blue" size="md" class="rounded-md w-full">Send Notice to Present</Button>
            </div>
            

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
    <TabItem>
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
        <Table hoverable={true} noborder={false} shadow={true} class="hover:bg-blue-50 ">
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
          {#if $researches}
            {#each $researches as research, i}
              <TableBody>
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
                    <P size="sm" weight="semibold" class=" text-gray-500">{moment(research.updatedAt).format("lll")}</P>
                  </TableBodyCell>
                </TableBodyRow>
              </TableBody>
            {/each}
          {/if}
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

  <!--modal for create schedule-->
  <Modal title="Create Schedule" bind:open={addSchedule} size="md" autoclose={false} outsideclose class="rounded-md w-full">
    <CreatePresentationModal />
  </Modal>
  <div class="h-96"></div>
  <div class="h-96"></div>
</main>
