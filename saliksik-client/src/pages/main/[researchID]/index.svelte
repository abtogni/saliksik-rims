<script lang="ts">
  import { A, Accordion, AccordionItem, Alert, Avatar, Badge, Button, Card, Checkbox, Fileupload, FloatingLabelInput, Helper, Indicator, Label, Modal, P, TabItem, Tabs, Tooltip } from "flowbite-svelte";
  import { CalendarMonthOutline, FileCirclePlusOutline, FileLinesOutline, UserOutline, QuestionCircleOutline } from "flowbite-svelte-icons";
  import { goto } from "@roxi/routify";
  import moment from "moment";
  import { DateInput } from "date-picker-svelte";
  import { selectedResearchInfo, updateResearch } from '../../../components/store'
  import { getResearchInfo } from "../../../components/fetch";
  import { onMount } from "svelte";


  const currentURL = window.location.href.split('/');
  const researchID = currentURL[currentURL.length - 1];


  onMount(async () => {
  try {
    await updateResearch(getResearchInfo(researchID));
  } catch (error) {
    console.error("Network error:", error);
  }
  });




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

  //modal for creating concept note
  let createConceptNote = false;

  //modal for submit existing research
  let submitExistingResearch = false;
  let list = [
    {
      name: "Nora Elizabeth F. Maniquiz",
      college: "College Of Computer Studies",
      href: "/",
      class: "hover:bg-orange-100",
    },
    {
      name: "Kristine Idda P. Del Rosario",
      college: "College Of Nursing",
      class: "hover:bg-orange-100",
    },
    {
      name: "Engr. Christine C. Bautista",
      college: "College Of Engineering And Architecture",
      class: "hover:bg-orange-100",
    },
  ];

  //date picker
  let date = new Date();

  //check panelist comment
  let checkComment = false;

  //check panelist comment
  let setInitialPresentation = false;

  //submit existing research
  let existingResearch: any;
</script>

<main class="p-4">
  <Tabs style="none" activeClasses="p-2 text-blue-700 border-b-2 border-b-blue-700 rounded-t-lg" inactiveClasses="p-2 text-gray-500 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300" contentClass="bg-white p-0 mt-2 rounded-md border-0 shadow-none" class="">
    <TabItem open title="">
      <div slot="title" class="flex items-center gap-2"><FileLinesOutline size="sm" />Concept Note</div>

      <div class="grid grid-flow-row justify-items-start gap-2">
        <Alert dismissable color="blue" class="border-l-8">
          <div class="flex items-center gap-2">
            <QuestionCircleOutline slot="icon" size="sm" />
            <span class="text-lg font-medium">Submission and Approval of Concept Note</span>
          </div>
          <p class="mt-2 text-sm">In this section, you are required to submit a concept note of your research. Click the create concept note button and fill out all necessary fields. You can have multiple draft and only one submission. Once submitted, a notice to proceed will be sent on your notification.</p>
          <p class="mt-2 text-sm">Or you can submit an already existing/published (owned) research. An incentive will be given based on the following:</p>
        </Alert>
        <div class="flex items-center gap-2">
          <Button href={`/main/${researchID}/createConceptNote`} color="blue" size="sm" class="flex items-center gap-2 rounded-md"><FileCirclePlusOutline size="sm" /> Create Concept Note</Button>
          <Button on:click={() => (submitExistingResearch = true)} outline color="blue" size="sm" class="flex items-center gap-2 rounded-md"><FileCirclePlusOutline size="sm" /> Submit Existing Research</Button>
        </div>

        <!-- <Table hoverable={true} noborder={false} shadow={true} class="">
          <TableHead theadClass="text-xs uppercase" class="bg-blue-200">
            <TableHeadCell class="w-3/4">Concept Note Name</TableHeadCell>
            <TableHeadCell>Last Update</TableHeadCell>
            <TableHeadCell></TableHeadCell>
          </TableHead>

          <TableBody>
            {#if proposals}
              {#if researches}
                {#each proposals as p, i}
                  {#if researches.find((x) => x._id === p.researchID)}
                    {#each researches.filter((x) => x._id === p.researchID) as research}
                      <TableBodyRow on:click={() => toggleRow(i)} >
                        <TableBodyCell class="">
                          <div class="flex justify-start items-center gap-2">
                            <Indicator color="dark"></Indicator>
                            <Tooltip arrow={false}>Saved As Draft</Tooltip>
                            <P size="sm" weight="medium" class="line-clamp-1 font-normal">{research.researchTitle}</P>
                          </div>
                        </TableBodyCell>
                        <TableBodyCell class="bg-transparent"><P size="sm" weight="medium" class="line-clamp-1 font-normal">{moment(p.createdAt).format("lll")}</P></TableBodyCell>
                        <TableBodyCell>
                          <div class="flex justify-start items-center gap-0.5">
                            <Button pill outline color="blue" size="sm" class="items-center border-none gap-2 p-1.5"><EditOutline size="sm" /></Button>
                            <Tooltip arrow={false}>Edit</Tooltip>
                            <Button pill outline color="blue" size="sm" class="items-center border-none gap-2 p-1.5"><ClipboardOutline size="sm" /></Button>
                            <Tooltip arrow={false}>Copy Link To Clipboard</Tooltip>
                            <Button pill outline color="blue" size="sm" class="items-center border-none gap-2 p-1.5"><TrashBinOutline size="sm" /></Button>
                            <Tooltip arrow={false}>Delete</Tooltip>
                          </div>
                        </TableBodyCell>
                      </TableBodyRow>
                      {#if openRow === i}
                        <TableBodyRow on:dblclick={() => p} class="">
                          <TableBodyCell colspan="3" class="">
                            <div class="flex flex-wrap justify-center gap-2">
                              <Card size="xl" class="gap-2 w-full">
                                <div class="flex justify-between items-start gap-2">
                                  <P weight="semibold" size="base" class="">Streamlining Outcome-Based Education and Continuous Quality Improvement of University of Nueva Caceres through Technology: A Information Management System for Improving Inclusiveness</P>
                                  <a href="#" class="text-blue-700 text-sm font-medium w-24 text-right hover:underline">Edit Name</a>
                                </div>
                                <div class="flex justify-start items-center gap-2">
                                  <div><P weight="normal" class="flex items-center gap-2"><ClockOutline size="sm" />{moment(p.createdAt).format("lll")}</P></div>
                                  <Tooltip arrow={false}>Last update</Tooltip>
                                  <Badge border large class="flex items-center gap-2"><Indicator color="dark" class="" />Saved as draft</Badge>
                                </div>
                              </Card>
                              <Card size="xl" padding="none" class="gap-2 pt-6 w-full border-none shadow-none">
                                <div class="flex justify-between items-start gap-2">
                                  <P weight="semibold" size="xl" class="">Concept Note Overview</P>
                                  <div class="flex items-center gap-2">
                                    <Button color="blue" size="sm" class="gap-2"><EditOutline size="sm" />Edit Concept Note</Button>
                                    <Button outline color="blue" size="sm" class="gap-2"><ClipboardOutline size="sm" />Copy Link To Clipboard</Button>
                                    <Button pill outline color="blue" size="sm" class="items-center border-none gap-2 p-2"><DotsHorizontalOutline size="sm" /></Button>
                                    <Dropdown class="">
                                      <DropdownItem class="flex justify-start items-center gap-2"><TrashBinOutline size="sm" class="text-blue-700" />Delete Concept Note</DropdownItem>
                                    </Dropdown>
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
                    <P weight="normal">TEST</P>
                  </Card>
                  <Card size="xl" class="gap-2 w-full">
                    <P weight="semibold" size="xl">Significance</P>
                    <Hr classHr="my-1" />
                    <P weight="normal">TEST</P>
                  </Card>
                  <Card size="xl" class="gap-2 w-full">
                    <P weight="semibold" size="lg">Objectives</P>
                    <Hr classHr="my-1" />
                    <P weight="normal">TEST</P>
                  </Card>
                  <Card size="xl" class="gap-2 w-full">
                    <P weight="semibold" size="lg">Methodology</P>
                    <Hr classHr="my-1" />
                    <P weight="normal">TEST</P>
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
          </TableBody>
        </Table> -->
      </div>
    </TabItem>

    <!--modal for create concept note
  <Modal title="Enter Concept Note Name" bind:open={createConceptNote} size="xs" autoclose class="w-full">
    <form class="grid grid-flow-row grid-rows-1 items-start gap-2">
      <FloatingLabelInput type="text" style="outlined" id="floating_filled" name="floating_filled" label="Concept Note Name" required class="w-full">Concept Note Name</FloatingLabelInput>
      <Helper></Helper>
      <div class="flex gap-2">
        <!--on continue, dapat ma save ang concept note name at magdisplay sa table--
        <Button href="/main/personnel/createConceptNote" class="w-full">Continue</Button>
        <Button class="w-full">Cancel</Button>
      </div>
    </form>
  </Modal>
-->

    <!--modal for submit existing research-->
    <Modal title="Upload Existing Research" bind:open={submitExistingResearch} size="xs" autoclose class="w-full">
      <form class="grid grid-flow-row items-start gap-0">
        <Label for="" class="font-medium text-base space-y-2">
          <span>Upload file</span>
          <Fileupload bind:existingResearch />
        </Label>
        <Label class="font-medium text-sm">File: {existingResearch}</Label>
      </form>
    </Modal>

    <!--initial presentation-->
    <TabItem title="">
      <div slot="title" class="flex items-center gap-2"><CalendarMonthOutline size="sm" />Initial Presentation</div>
      <Alert dismissable color="blue" class="border-l-8 w-full mt-2 mb-2">
        <div class="flex items-center gap-2">
          <QuestionCircleOutline slot="icon" size="sm" />
          <span class="text-lg font-medium">Initial Presentation</span>
        </div>
        <p class="mt-2 text-sm">Insert helper text</p>
      </Alert>
      <div class="grid grid-flow-row justify-items-start gap-2">
        <div class="flex items-center gap-2">
          <div class="">
            <Button on:click={() => (setInitialPresentation = true)} color="blue" size="sm" class="flex items-center gap-2"><FileCirclePlusOutline size="sm" /> Set Schedule</Button>
          </div>

          <Badge border large color="red" class="flex items-center gap-2"><Indicator color="red" class="" />No Schedule</Badge>
          <Badge border large class="flex items-center gap-2"><Indicator color="orange" class="" />Waiting For Approval</Badge>
          <Badge border large color="blue" class="flex items-center gap-2"><Indicator color="blue" class="" />January 6, 2024 13:00</Badge>
          <Tooltip>Schedule Is Set</Tooltip>
        </div>
      </div>

      <div class="gap-2 mt-4 mb-2">
        <P weight="semibold" size="lg">Panelist Comments</P>
        <P weight="normal" size="sm" class="text-gray-500">See panelist comments to make changes on your research.</P>
      </div>
      <Tabs style="none" activeClasses="p-2 text-blue-700 border-b-2 border-b-blue-700 rounded-t-lg" inactiveClasses="p-2 text-gray-500 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300" contentClass="bg-white p-0 mt-2 rounded-md border-0 shadow-none" class="">
        <TabItem open title="">
          <div slot="title" class="flex items-center gap-2"><UserOutline size="sm" />Panelist Name 1</div>
          <div class="flex items-center gap-2">
            <A href="/" class="text-lg font-semibold text-black">Panelist Name 1</A>
            <Badge border large color="none" class="flex items-center gap-2">College Of Computer Studies</Badge>
          </div>
          <div class="grid grid-flow-row justify-start gap-1 mt-2 w-full">
            <P weight="normal" size="base" class="flex items-center gap-0 text-gray-600"><Checkbox on:click={(checkComment) => true} />Make a detail of your proposed budget.</P>
            <P weight="normal" size="base" class="flex items-center gap-0 text-gray-600"><Checkbox />Collaborate with sister schools, like Mapua if ever this will not be approved by the UNC admin.</P>
          </div>
        </TabItem>
        <TabItem title="">
          <div slot="title" class="flex items-center gap-2"><UserOutline size="sm" />Panelist Name 2</div>
        </TabItem>
        <TabItem title="">
          <div slot="title" class="flex items-center gap-2"><UserOutline size="sm" />Panelist Name 3</div>
        </TabItem>
        <TabItem title="">
          <div slot="title" class="flex items-center gap-2"><UserOutline size="sm" />Panelist Name 4</div>
        </TabItem>
        <TabItem title="">
          <div slot="title" class="flex items-center gap-2"><UserOutline size="sm" />Panelist Name 5</div>
        </TabItem>
      </Tabs>
    </TabItem>

    <!--final presentation-->
    <TabItem title="">
      <div slot="title" class="flex items-center gap-2"><CalendarMonthOutline size="sm" />Final Presentation</div>
    </TabItem>
  </Tabs>

  <!--modal for setting schedule for -->
  <Modal title="Set Date And Time" bind:open={setInitialPresentation} size="xs" autoclose class="w-full">
    <form class="grid grid-flow-row grid-rows-1 items-start gap-2">
      <div class="gap-2">
        <P weight="medium" size="base" for="researchLeaders"></P>
        <DateInput bind:value={date} format="yyyy-MM-dd" required class="" />
      </div>
      <div class="flex gap-2">
        <!--on continue, dapat ma save ang concept note name at magdisplay sa table-->
        <Button href="/main/personnel/createConceptNote" class="w-full">Continue</Button>
        <Button class="w-full">Cancel</Button>
      </div>
    </form>
  </Modal>
</main>
