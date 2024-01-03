<script lang="ts">
  import { A, Accordion, AccordionItem, Alert, Avatar, Badge, Button, Card, Dropdown, DropdownItem, FloatingLabelInput, Helper, Hr, Indicator, Input, Modal, P, TabItem, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Tabs, Tooltip } from "flowbite-svelte";
  import { BookOutline, BookmarkOutline, CalendarMonthOutline, CalendarWeekOutline, ClipboardOutline, ClockOutline, DotsHorizontalOutline, EditOutline, EyeOutline, FileCirclePlusOutline, FileLinesOutline, GridOutline, QuestionCircleOutline, TrashBinOutline } from "flowbite-svelte-icons";
  import { goto } from "@roxi/routify";
  import moment from "moment";
  import { onMount } from "svelte";

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

  //modal for creating concept note
  let createConceptNote = false;
</script>

<main class="bg-white">
  <Tabs style="underline" class="">
    <TabItem open title="">
      <div slot="title" class="flex items-center gap-2"><FileLinesOutline size="sm" />Concept note</div>

      <div class="grid grid-flow-row justify-items-start gap-2">
        <Alert dismissable color="blue" class="border-l-8">
          <div class="flex items-center gap-2">
            <QuestionCircleOutline slot="icon" size="sm" />
            <span class="text-lg font-medium">Submission and Approval of Concept Note</span>
          </div>
          <p class="mt-2 text-sm">In this section, you are required to submit a concept note of your research. Click the create concept note button and fill out all necessary fields. You can have multiple draft and only one submission. Once submitted, a notice to proceed will be sent on your notification.</p>
        </Alert>
        <Button on:click={() => (createConceptNote = true)} class="flex items-center gap-2"><FileCirclePlusOutline size="sm" /> Create concept note</Button>
        <Table hoverable={true} noborder={true} class="">
          <TableHead>
            <TableHeadCell class="w-3/4">Concept Note Name</TableHeadCell>
            <TableHeadCell>Last Update</TableHeadCell>
            <TableHeadCell>Tools</TableHeadCell>
          </TableHead>

          <TableBody>
            {#if proposals}
              {#if researches}
                {#each proposals as p, i}
                  {#if researches.find((x) => x._id === p.researchID)}
                    {#each researches.filter((x) => x._id === p.researchID) as research}
                      <TableBodyRow>
                        <TableBodyCell class="">
                          <div class="flex justify-start items-center gap-2">
                            <Indicator color="dark"></Indicator>
                            <Tooltip arrow={false}>Saved as draft</Tooltip>
                            <P size="sm" weight="medium" class="line-clamp-1">{research.researchTitle}</P>
                          </div>
                        </TableBodyCell>
                        <TableBodyRow class="">
                          <TableBodyCell class="">{moment(p.createdAt).format("lll")}</TableBodyCell>
                        </TableBodyRow>
                        <TableBodyCell>
                          <div class="flex justify-start items-center gap-2">
                            <EyeOutline on:click={() => toggleRow(i)} size="sm" />
                            <Tooltip arrow={false} class="">View</Tooltip>
                            <EditOutline size="sm" />
                            <Tooltip arrow={false}>Edit</Tooltip>
                            <ClipboardOutline size="sm" />
                            <Tooltip arrow={false}>Copy link to clipboard</Tooltip>
                            <TrashBinOutline size="sm" />
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
                                  <P weight="semibold" size="base" class="">Streamlining Outcome-Based Education and Continuous Quality Improvement of University of Nueva Caceres through Technology: A Information Management System for Improving Inclusiveness Streamlining Outcome-Based Education and Continuous Quality Improvement of University of Nueva Caceres through Technology: A Information Management System for Improving Inclusiveness</P>
                                  <a href="#" class="text-blue-700 text-sm font-medium w-60 text-right hover:underline">Edit Concept Note Name</a>
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
                                    <Button href="/" class="gap-2"><EditOutline size="sm" />Edit concept note</Button>
                                    <Button href="/" class="gap-2"><ClipboardOutline size="sm" />Copy link to clipboard</Button>
                                    <Button href="/" class="gap-2"><TrashBinOutline size="sm" />Delete</Button>
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
                  {:else}{/if}
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

    <TabItem title="">
      <div slot="title" class="flex items-center gap-2"><CalendarMonthOutline size="sm" />Research presentation</div>
      <div class="grid grid-flow-row justify-items-start gap-2">
        <Alert dismissable color="blue" class="border-l-8">
          <div class="flex items-center gap-2">
            <QuestionCircleOutline slot="icon" size="sm" />
            <span class="text-lg font-medium">Initial Presentation and Final Presentation</span>
          </div>
          <p class="mt-2 text-sm">In this section, you are required to submit a concept note of your research. Click the create concept note button and fill out all necessary fields. You can have multiple draft and only one submission. Once submitted, a notice to proceed will be sent on your notification.</p>
        </Alert>
      </div>
    </TabItem>
    <TabItem title="Bookmarks">
      <div slot="title" class="flex items-center gap-2"><BookmarkOutline size="sm" />Bookmarks</div>
    </TabItem>
    <TabItem title="Bookmarks">
      <div slot="title" class="flex items-center gap-2"><GridOutline size="sm" />Dashboard</div>
    </TabItem>
  </Tabs>

  <Modal title="Enter Concept Note Name" bind:open={createConceptNote} size="xs" autoclose class="w-full">
    <form class="grid grid-flow-row grid-rows-1 items-start gap-2">
      <FloatingLabelInput type="text" style="outlined" id="floating_filled" name="floating_filled" label="Concept Note Name" required class="w-full">Concept Note Name</FloatingLabelInput>
      <Helper></Helper>
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
