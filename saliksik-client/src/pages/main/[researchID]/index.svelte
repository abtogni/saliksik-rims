<script lang="ts">
  import { A, Accordion, AccordionItem, Alert, Avatar, Badge, Button, Card, Checkbox, Dropdown, DropdownItem, Fileupload, FloatingLabelInput, Helper, Indicator, Label, Modal, P, TabItem, Tabs, Tooltip } from "flowbite-svelte";
  import { CalendarMonthOutline, FileCirclePlusOutline, FileLinesOutline, UserOutline, QuestionCircleOutline, DotsHorizontalOutline, EditOutline, FilePenOutline, FileExportOutline, BookmarkOutline, TrashBinOutline, ClockOutline, CalendarPlusSolid, UsersGroupOutline, CalendarEditOutline, MapLocationOutline, MessageCaptionOutline, CheckCircleOutline, CloseCircleSolid, UserCircleOutline } from "flowbite-svelte-icons";
  import { goto } from "@roxi/routify";
  import moment from "moment";
  import { DateInput } from "date-picker-svelte";
  import { selectedResearchInfo, userList } from "../../../components/store";
  import { getResearchInfo } from "../../../components/fetch";
  import { onMount } from "svelte";
  import Research from "../profile/Research.svelte";
  import { Popover } from "flowbite";

  const currentURL = window.location.href.split("/");
  const researchID = currentURL[currentURL.length - 1];

  onMount(async () => {
    try {
      await getResearchInfo(researchID);
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
    <!--page concept note-->
    <TabItem open title="">
      <div slot="title" class="flex items-center gap-2"><FileLinesOutline size="sm" />Concept Note</div>

      <div class="flex justify-center gap-2 bg-gray-50">
        <div class="grid grid-flow-row items-center gap-2 w-1/2 sm:w-full md:w-full lg:w-11/12 xl:w-8/12 2xl:w-1/2">
          <!--helper card-->
          <Alert dismissable color="blue" class="border-l-8">
            <div class="flex items-center gap-2">
              <QuestionCircleOutline slot="icon" size="sm" />
              <span class="text-lg font-medium">Submission and Concept Note Approval</span>
            </div>
            <p class="mt-2 text-sm">You are required to submit a concept note of your research. Click the create concept note button and fill out all the fields. You can either save as draft for latter submission or submit for approval. Once submitted, a notice to proceed will be sent on your notification.</p>
            <p class="mt-2 text-sm">On the other hand, you can submit an already existing/published (owned) research. An incentive will be given based on the following:</p>
          </Alert>

          <!--concept note overview header-->
          <div class="flex justify-between items-center gap-2 w-full">
            <P size="xl" weight="bold">Concept Note Overview</P>
            <div class="flex items-center gap-2">
              <Button href={`/main/${researchID}/createConceptNote`} color="blue" size="sm" class="flex items-center gap-2 rounded-md"><FileCirclePlusOutline size="sm" /> Create Concept Note</Button>
              <Button on:click={() => (submitExistingResearch = true)} outline color="blue" size="sm" class="flex items-center gap-2 rounded-md"><FileExportOutline size="sm" /> Submit Existing Research</Button>
            </div>
          </div>

          <!--concept note overview card-->

          <div class="grid grid-flow-row w-full shadow-lg border rounded-lg gap-2 p-3 mb-4 bg-white">
            <div class="flex justify-between items-center gap-2">
              <div class="flex items-center gap-2">
                <Button href={`/main/${researchID}/createConceptNote`} color="blue" size="sm" class="flex items-center gap-2 rounded-md"><FilePenOutline size="sm" /> Edit</Button>
                <Button on:click={() => (submitExistingResearch = true)} outline color="blue" size="sm" class="flex items-center gap-2 rounded-md"><FileExportOutline size="sm" /> Submit</Button>
                <div class="flex items-center gap-2">
                  <Badge border large color="dark" class="flex items-center gap-2 font-medium text-sm whitespace-nowrap text-gray-500"><Indicator color="dark" size="md" class="" />Saved as Draft</Badge>
                  <Tooltip arrow={false} class="border rounded-md shadow-lg  bg-white">
                    <P weight="normal" size="sm" class=" text-gray-500">Last Updated in <span class="font-medium text-gray-500">January 21, 2023</span></P>
                  </Tooltip>
                  <Badge border large class="flex items-center gap-2 font-medium text-sm  whitespace-nowrap text-gray-500"><Indicator color="orange" size="md" class="" />Waiting for Approval</Badge>
                  <Tooltip arrow={false} class="border rounded-md shadow-lg bg-white">
                    <P weight="normal" size="sm" class=" text-gray-500">Submitted in <span class="font-medium text-gray-500">January 21, 2023</span></P>
                  </Tooltip>
                  <Badge border large color="blue" class="flex items-center gap-2 font-medium text-sm text-gray-500"><Indicator color="blue" size="md" class="" />Approved</Badge>
                  <Tooltip arrow={false} class="border rounded-md shadow-lg  bg-white">
                    <P weight="normal" size="sm" class=" text-gray-500">Approved in <span class="font-medium text-gray-500">January 21, 2023</span></P>
                  </Tooltip>
                </div>
              </div>
              
              <div class="flex items-center gap-0">
                <Button pill outline color="blue" size="sm" class="items-center border-none gap-2 p-1"><ClockOutline size="sm" /></Button>
                <Dropdown>
                  <DropdownItem class="flex justify-start items-center gap-2 hover:bg-blue-50"
                    ><ClockOutline size="sm" class="text-blue-700" />
                    <div class="flex justify-start items-center gap-2">
                      <P weight="normal" size="sm" class=" text-gray-500">Created in <span class="font-medium text-gray-500">{moment($selectedResearchInfo.conceptNote.createdAt).format("LL")}</span></P>
                    </div>
                  </DropdownItem>
                  <DropdownItem class="flex justify-start items-center gap-2 hover:bg-blue-50"
                    ><ClockOutline size="sm" class="text-blue-700" />
                    <div class="flex justify-start items-center gap-2">
                      <P weight="normal" size="sm" class=" text-gray-500">Submitted in <span class="font-medium text-gray-500">Insert Date and Time</span></P>
                    </div>
                  </DropdownItem>
                  <DropdownItem class="flex justify-start items-center gap-2 hover:bg-blue-50"
                    ><ClockOutline size="sm" class="text-blue-700" />
                    <div class="flex justify-start items-center gap-2">
                      <P weight="normal" size="sm" class=" text-gray-500">Approved in <span class="font-medium text-gray-500">Insert Date and Time</span></P>
                    </div>
                  </DropdownItem>
                </Dropdown>
                <Button pill outline color="blue" size="sm" class="items-center border-none gap-2 p-1"><DotsHorizontalOutline size="sm" /></Button>
                <Dropdown>
                  <DropdownItem class="flex justify-start items-center gap-2"><TrashBinOutline size="sm" class="text-blue-700" />Delete</DropdownItem>
                </Dropdown>
              </div>
            </div>
          </div>
          {#if $selectedResearchInfo}
            <div class="grid grid-flow-row w-full shadow-lg border rounded-lg gap-2 p-3 mb-4 bg-white">
              <P size="base" weight="medium">{$selectedResearchInfo.researchTitle}</P>
              <div class="flex items-center gap-2">
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
              </div>

              <div class="flex items-start gap-2">
                <div class="grid grid-flow-row items-start gap-2">
                  <div class="flex flex-wrap justify-start items-start gap-2">
                    <P size="sm" weight="medium">Implementing Agency/Department:</P>
                    <Badge border large color="dark" class="flex items-center gap-2 font-normal text-sm border-none text-gray-500">{$selectedResearchInfo.conceptNote.implementingDept}</Badge>
                  </div>
                  <div class="flex flex-wrap justify-start items-start gap-2">
                    <P size="sm" weight="medium">Cooperating Agency:</P>
                    <Badge border large color="dark" class="flex items-center gap-2 font-normal text-sm border-none text-gray-500">{$selectedResearchInfo.conceptNote.coopAgency}</Badge>
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
              {#each $selectedResearchInfo.conceptNote.description.split("\n") as paragraph}
                <P size="sm" weight="normal" class="text-gray-500">{paragraph}</P>
              {/each}
            </div>

            <P size="lg" weight="medium">Significance</P>
            <div class="grid grid-flow-row w-full shadow-lg border rounded-lg gap-2 p-3 mb-4 bg-white">
              {#each $selectedResearchInfo.conceptNote.significance.split("\n") as paragraph}
                <P size="sm" weight="normal" class="text-gray-500">{paragraph}</P>
              {/each}
            </div>
            <P size="lg" weight="medium">Objectives</P>
            <div class="grid grid-flow-row w-full shadow-lg border rounded-lg gap-2 p-3 mb-4 bg-white">
              {#each $selectedResearchInfo.conceptNote.objectives.split("\n") as paragraph}
                <P size="sm" weight="normal" class="text-gray-500">{paragraph}</P>
              {/each}
            </div>
            <P size="lg" weight="medium">Methodology</P>
            <div class="grid grid-flow-row w-full shadow-lg border rounded-lg gap-2 p-3 mb-4 bg-white">
              {#each $selectedResearchInfo.conceptNote.methodology.split("\n") as paragraph}
                <P size="sm" weight="normal" class="text-gray-500">{paragraph}</P>
              {/each}
            </div>
            <P size="lg" weight="medium">Technology Roadmap</P>
            <div class="grid grid-flow-row w-full shadow-lg border rounded-lg gap-2 p-3 mb-4 bg-white">
              {#each $selectedResearchInfo.conceptNote.technologyRoadmap.split("\n") as paragraph}
                <P size="sm" weight="normal" class="text-gray-500">{paragraph}</P>
              {/each}
            </div>
            <P size="lg" weight="medium">Expected Outputs (6Ps)</P>
            <div class="grid grid-flow-row w-full shadow-lg border rounded-lg gap-2 p-3 mb-4 bg-white">
              {#each $selectedResearchInfo.conceptNote.expectedOutput.split("\n") as paragraph}
                <P size="sm" weight="normal" class="text-gray-500">{paragraph}</P>
              {/each}
            </div>
            <P size="lg" weight="medium">Work Plan</P>
            <div class="grid grid-flow-row w-full shadow-lg border rounded-lg gap-2 p-3 mb-4 bg-white">
              {#each $selectedResearchInfo.conceptNote.workPlan.split("\n") as paragraph}
                <P size="sm" weight="normal" class="text-gray-500">{paragraph}</P>
              {/each}
            </div>
          {/if}
        </div>
      </div>
    </TabItem>

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

    <!--page initial presentation-->
    <TabItem title="">
      <div slot="title" class="flex items-center gap-2"><CalendarMonthOutline size="sm" />Initial Presentation</div>
      <div class="flex justify-center gap-2 bg-gray-50">
        <div class="grid grid-flow-row col-start-2 col-span-3 items-center gap-2 w-1/2 sm:w-full md:w-full lg:w-11/12 xl:w-8/12 2xl:w-1/2">
          <!--helper card-->
          <Alert dismissable color="blue" class="border-l-8">
            <div class="flex items-center gap-2">
              <QuestionCircleOutline slot="icon" size="sm" />
              <span class="text-lg font-medium">Initial Presentation</span>
            </div>
            <p class="mt-2 text-sm">Insert helper text</p>
          </Alert>

          <!--header schedule-->
          <div class="flex justify-between items-center gap-2 w-full">
            <P size="xl" weight="bold">Presentation Schedule</P>
          </div>

          <!--card schedule not active
          <div class="grid grid-flow-row justify-center w-full shadow-lg border rounded-lg gap-2 p-3 mb-4 bg-white">
            <P size="sm" weight="normal" class="text-gray-500">Wait for the Admin to set the Initial Presentation Schedule...<span></span></P>
          </div>
          -->
          <!--card schedule active-->
          <div class="grid grid-flow-row w-full shadow-lg border rounded-lg gap-2 p-3 mb-4">
            <div class="grid grid-flow-row items-center gap-2 p-2">
              <div class="flex justify-between items-center gap-2">
                <div class="flex justify-start items-center gap-2">
                  <CalendarMonthOutline size="md" class="text-blue-700" />
                  <P size="lg" weight="semibold" class="uppercase">Sunday, January 21, 2023 at 1:30 PM</P>
                  <div class="flex flex-wrap items-center gap-2">
                    <Badge border large color="dark" class="flex items-center gap-2 font-medium text-sm whitespace-nowrap text-gray-500">
                      <Indicator color="dark" size="md" class="" />No Status</Badge>
                    <Badge border large color="blue" class="flex items-center gap-2 font-medium text-sm whitespace-nowrap text-gray-500">
                      <Indicator color="blue" size="md" class="" />Going</Badge>
                    <Badge border large color="red" class="flex items-center gap-2 font-medium text-sm whitespace-nowrap text-gray-500">
                      <Indicator color="red" size="md" class="" />Not Going</Badge>
                  </div>
                </div>

                <Button pill outline color="blue" size="sm" class="items-center border-none gap-2 p-1"><DotsHorizontalOutline size="sm" /></Button>
                <Dropdown>
                  <DropdownItem class="flex justify-start items-center gap-2"><CalendarEditOutline size="sm" class="text-blue-700" />Change Status</DropdownItem>
                </Dropdown>
              </div>

              <div class="flex flex-wrap justify-start items-center gap-4">
                <div class="flex justify-start items-center gap-2">
                  <MapLocationOutline size="sm" class="text-blue-700" />
                  <P weight="semibold" size="base" class="line-clamp-1 text-gray-500">UNC Testing Center</P>
                </div>

                <div class="flex justify-start items-center gap-2">
                  <UsersGroupOutline size="sm" class="text-blue-700" />
                  <P weight="semibold" size="base" class="line-clamp-1 text-gray-500">5 <span class="font-normal"> other presenters going</span></P>
                </div>
              </div>
            </div>
            <div class="flex justify-start items-center gap-2">
              <Button color="blue" size="sm" class="flex items-center gap-2 rounded-md"><CheckCircleOutline size="sm" />Going</Button>
              <Button outline color="blue" size="sm" class="flex items-center gap-2 rounded-md text-blue-700 hover:text-white"
                ><svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m13 7-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg> Not Going</Button>
            </div>
          </div>

          <!--header comment-->
          <P size="xl" weight="bold">Panelist Comments</P>

          <!--card comment not active
          <div class="grid grid-flow-row justify-center w-full shadow-lg border rounded-lg gap-2 p-3 mb-4 bg-white">
            <P size="sm" weight="normal" class="text-gray-500">Waiting for your confirmation to the set schedule...<span></span></P>
          </div>
-->
          <!--card comment active-->
          <div class="grid grid-flow-row w-full shadow-lg border rounded-lg gap-2 p-3 mb-4 bg-white">
            <div class="flex justify-start items-center gap-2">
              <MessageCaptionOutline size="md" class="text-blue-700" />
              <P size="lg" weight="medium" class="">Engr. Christine C. Bautista</P>
            </div>

            <div class="grid grid-flow-row justify-start items-center gap-2 p-2 rounded-md hover:bg-blue-50">
              <Checkbox color="blue" class="font-normal text-sm w-full  text-gray-500 ">Overall, the proposal has a clear objective and methodology to address the problem of enhancing inclusiveness in the collegiate level in the University of Nueva Caceres through the use of technology to streamline the process of Outcome-Based Education and Continuous Quality Improvement.</Checkbox>
            </div>
            <div class="grid grid-flow-row justify-start items-center gap-2 p-2 rounded-md hover:bg-blue-50">
              <Checkbox color="blue" class="font-normal text-sm w-full  text-gray-500 ">1. Literature Review:Additional literature review to provide a comprehensive understanding of the current state of Outcome- Based Education and Continuous Quality Improvement, including challenges and potential solutions, as well as the use of technology to enhance inclusiveness in higher education. environment.</Checkbox>
            </div>
            <div class="grid grid-flow-row justify-start items-center gap-2 p-2 rounded-md hover:bg-blue-50">
              <Checkbox color="blue" class="font-normal text-sm w-full  text-gray-500 ">2. Data Analysis: While the proposal mentions the use of thematic analysis and descriptive statistics, it would be helpful to provide more detail on the specific analysis techniques that will be used to analyze the data collected from the interviews and surveys.</Checkbox>
            </div>
            <div class="grid grid-flow-row justify-start items-center gap-2 p-2 rounded-md hover:bg-blue-100">
              <Checkbox color="blue" class="font-normal text-sm w-full  text-gray-500 ">3.Expected Outcomes: The proposal could provide more specific expected outcomes from the research, such as the anticipated impact of the Information Management System on the efficiency and effectiveness of the OBE-CQI process, and how it can contribute to the enhancement of inclusiveness in the educational environment.</Checkbox>
            </div>
          </div>
        </div>
      </div>
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

  <div class="h-96"></div>
  <div class="h-96"></div>
</main>
