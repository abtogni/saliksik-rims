<script lang="ts">
  import { goto } from "@roxi/routify";
  import { Heading, TabItem, TableBody, TableBodyCell, TableBodyRow, Table, TableHead, TableHeadCell, Tabs, TableSearch, Avatar, Popover, Card, Button, Modal, Accordion, AccordionItem, Listgroup, ListgroupItem, ImagePlaceholder, P, Search, Dropdown, DropdownItem, Tooltip, Indicator, Badge, Hr, FloatingLabelInput } from "flowbite-svelte";
  import { ClipboardOutline, ClockOutline, DotsHorizontalOutline, EditOutline, FileLinesOutline, FileOutline, FilterOutline, GridOutline, InfoCircleOutline, SortOutline, StarOutline, TrashBinOutline } from "flowbite-svelte-icons";
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
</script>

<main>
  <div class="flex items-center gap-2"><GridOutline size="sm" /><P weight="semibold" size="2xl" class="">Research Dashboard</P></div>

  <!--all researches-->
  <Tabs style="none" activeClasses="p-2 text-blue-700 border-b-2 border-b-blue-700 rounded-t-lg" inactiveClasses="p-2 text-gray-500 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300" contentClass="bg-white p-0 mt-2 rounded-md border-0 shadow-none" class="">
    <TabItem open>
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
    </TabItem>

    <!--initial presentation-->
    <TabItem>
      <div slot="title" class="flex items-center gap-2"><Indicator color="blue"></Indicator>Initial Presentation</div>
      <div class="flex items-center gap-2 mb-2">
        <Search></Search>
        <div class="flex items-center gap-2">
          <Button class="gap-2"><FilterOutline size="sm" />Date</Button>
          <Dropdown>
            <DropdownItem>Today</DropdownItem>
            <DropdownItem>This Week</DropdownItem>
            <DropdownItem>Insert Date</DropdownItem>
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
                          <Tooltip arrow={false}>Concept Note Approval</Tooltip>
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
    </TabItem>
  
    <!--final presentation-->
    <TabItem>
      <div slot="title" class="flex items-center gap-2"><Indicator color="blue"></Indicator>Final Presentation</div>
    </TabItem>
    <!--for incentive approval-->
    <TabItem>
      <div slot="title" class="flex items-center gap-2"><Indicator color="blue"></Indicator>Incentive Approval</div>
    </TabItem>
    <!--published-->
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
