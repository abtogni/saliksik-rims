<script lang="ts">
  import { goto } from "@roxi/routify";
  import { Heading, TabItem, TableBody, TableBodyCell, TableBodyRow, Table, TableHead, TableHeadCell, Tabs, TableSearch, Avatar, Popover, Card, Button, Modal, Accordion, AccordionItem, Listgroup, ListgroupItem, ImagePlaceholder } from "flowbite-svelte";
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
</script>

<main class="h-full w-screen bg-white">
  <Heading tag="h1" class="mb-6 text-2xl">All Researches</Heading>

  <!--tabs and table-->
  <Tabs style="underline" class="grid grid-flow-col justify-stretch w-full">
    <div class="grid grid-flow-col justify-start">
      <!--tab-approval-->
      <TabItem open title="Approval">
        <TableSearch hoverable={true} class="table-fixed w-full" placeholder="Search by maker name" bind:inputValue={searchTerm}>
          <!--table-head-->
          <TableHead class="capitalize">
            <TableHeadCell class="w-6/12">Research Title</TableHeadCell>
            <TableHeadCell>Proponents</TableHeadCell>
            <TableHeadCell>Agency/Dept.</TableHeadCell>
            <TableHeadCell>Date Submitted</TableHeadCell>
          </TableHead>

          <!--table-rows-->
          <TableBody>
            {#if proposals}
              {#if researches}
                {#each proposals as p, i}
                  {#if researches.find((x) => x._id === p.researchID)}
                    {#each researches.filter((x) => x._id === p.researchID) as research}
                      <TableBodyRow on:click={() => toggleRow(i)}>
                        <TableBodyCell class="truncate">{research.researchTitle}</TableBodyCell>
                        <TableBodyCell class="flex pl-10 ">
                          <!-- to do -->
                          <Avatar>AR</Avatar>
                          <Avatar>JD</Avatar>
                          <Avatar>DC</Avatar>
                          <Avatar>DI</Avatar>
                          <!-- to do -->
                        </TableBodyCell>
                        <!-- to do -->
                        <TableBodyCell>{research.researchAgency}</TableBodyCell>
                        <!-- to do -->
                        <TableBodyCell>{moment(p.createdAt).format("lll")}</TableBodyCell>
                      </TableBodyRow>

                      {#if openRow === i}
                        <TableBodyRow on:dblclick={() => p} class="table-fixed">
                          <TableBodyCell colspan="4" class="p-0 ">
                            <!--research overview-->
                            <div class="flex justify-between w-full px-2 py-3" transition:slide={{ duration: 300, axis: "y" }}>
                              <!--left-card-->
                              <div class="w-8/12 whitespace-normal">
                                <Card class="mb-5 " size="xl">
                                  <Heading tag="h1" class="text-xl mb-2  ">{research.researchTitle}</Heading>
                                  <div>
                                    <p class="text-sm mb-2">{moment(p.createdAt).format("lll")}</p>
                                  </div>

                                  <div class="flex justify-start items-center pl-5 mb-2">
                                    <div class="flex justify-self-start gap-2 pt-1">
                                      <Avatar stacked border size="xs" class="text-xs ring-orange-400">AR</Avatar>
                                      <div class="flex justify-start items-center">
                                        <p class="text-sm">Agnes Reyes</p>
                                      </div>
                                    </div>

                                    <div class="flex justify-self-start gap-2 pl-7 pt-1">
                                      <Avatar stacked border size="xs" class="text-xs ring-orange-400">JD</Avatar>
                                      <div class="flex justify-start items-center">
                                        <p class="text-sm">June Arreb Danila</p>
                                      </div>
                                    </div>

                                    <div class="flex justify-self-start gap-2 pl-7 pt-1">
                                      <Avatar stacked border size="xs" class="text-xs ring-orange-400">DC</Avatar>
                                      <div class="flex justify-start items-center">
                                        <p class="text-sm">Danny Casimero</p>
                                      </div>
                                    </div>

                                    <div class="flex justify-self-start gap-2 pl-7 pt-1">
                                      <Avatar stacked border size="xs" class="text-xs ring-orange-400">DI</Avatar>
                                      <div class="flex justify-start items-center">
                                        <p class="text-sm">Dennis Ignacio</p>
                                      </div>
                                    </div>
                                  </div>
                                </Card>
                                <Accordion activeClass="bg-white" multiple class="whitespace-normal ">
                                  <AccordionItem open>
                                    <Card slot="header" class="shadow-none border-none  bg-transparent" size="lg" padding="none">
                                      <Heading tag="h1" class="text-lg divide-dashed">Project Description</Heading>
                                    </Card>
                                    <p class="mb-2">{p.description}</p>
                                  </AccordionItem>

                                  <AccordionItem open>
                                    <Card slot="header" class="shadow-none border-none  bg-transparent" size="lg" padding="none">
                                      <Heading tag="h1" class="text-lg divide-dashed">Significance</Heading>
                                    </Card>
                                    <p class="mb-2">{p.significance}</p>
                                  </AccordionItem>

                                  <AccordionItem open>
                                    <Card slot="header" class="shadow-none border-none  bg-transparent" size="lg" padding="none">
                                      <Heading tag="h1" class="text-lg divide-dashed">Objectives</Heading>
                                    </Card>

                                    <p class="mb-2">{p.objectives}</p>
                                  </AccordionItem>

                                  <AccordionItem open>
                                    <Card slot="header" class="shadow-none border-none  bg-transparent " size="lg" padding="none">
                                      <Heading tag="h1" class="text-lg divide-dashed">Methodology</Heading>
                                    </Card>
                                    <p class="mb-2">{p.methodolog}</p></AccordionItem>

                                  <AccordionItem open>
                                    <Card slot="header" class="shadow-none border-none  bg-transparent" size="lg" padding="none">
                                      <Heading tag="h1" class="text-lg divide-dashed">Technology Roadmap</Heading>
                                    </Card>
                                    <p class="mb-2">To be followed...</p>
                                  </AccordionItem>

                                  <AccordionItem open>
                                    <Card slot="header" class="shadow-none border-none  bg-transparent" size="lg" padding="none">
                                      <Heading tag="h1" class="text-lg divide-dashed">Expected Outputs (6Ps)</Heading>
                                    </Card>
                                    <p class="mb-2">Publication, Intellectual Property, and Product</p>
                                  </AccordionItem>

                                  <AccordionItem open>
                                    <Card slot="header" class="shadow-none border-none  bg-transparent" size="lg" padding="none">
                                      <Heading tag="h1" class="text-lg divide-dashed">Work Plan</Heading>
                                    </Card>
                                    <p class="mb-2">To be followed...</p>
                                  </AccordionItem>
                                </Accordion>
                              </div>

                              <!--right-cards-->
                              <div class=" justify-self-end pl-12 w-1/3">
                                <!--Project Leaders-->
                                <Listgroup active class="w-full pb-5 mb-5">
                                  <Heading tag="h1" class="p-2 pl-4 text-left text-xl ">Project Leaders</Heading>
                                  <ListgroupItem class="text-base font-semibold gap-2">
                                    <Avatar border size="sm" class="text-sm ring-orange-400">AR</Avatar> Agnes Reyes
                                  </ListgroupItem>
                                  <ListgroupItem class="text-base font-semibold gap-2">
                                    <Avatar border size="sm" class="text-sm ring-orange-400">JD</Avatar> June Arreb Danila
                                  </ListgroupItem>
                                  <ListgroupItem class="text-base font-semibold gap-2">
                                    <Avatar border size="sm" class="text-sm ring-orange-400">DC</Avatar> Danny Casimero
                                  </ListgroupItem>

                                  <ListgroupItem class="text-base font-semibold gap-2">
                                    <Avatar border size="sm" class="text-sm ring-orange-400">DI</Avatar> Dennis Ignacio
                                  </ListgroupItem>
                                </Listgroup>

                                <Card class="pb-5 mb-5 whitespace-normal" size="lg" padding="none">
                                  <Card class="shadow-none  border-none pl-5 pt-1 pr-5" size="lg" padding="none">
                                    <div>
                                      <Heading tag="h1" class="text-lg line-clamp-2  pr-5 pt-5 pb-1">Implenting Agency/Department</Heading>
                                      <div class="flex justify-self-start gap-3 pt-1">
                                        <div class="flex justify-start items-center">
                                          <p class="text-base">College of Computer Studies</p>
                                        </div>
                                      </div>
                                    </div>
                                  </Card>
                                  <Card class="shadow-none  border-none pl-5 pt-1 pr-5" size="lg" padding="none">
                                    <div>
                                      <Heading tag="h1" class="text-lg line-clamp-2  pr-5 pt-5 pb-1">Cooperating Agency</Heading>
                                      <div class="flex justify-self-start gap-3 pt-1">
                                        <div class="flex justify-start items-center">
                                          <p class="text-base">Research Center, College Department, VPAA</p>
                                        </div>
                                      </div>
                                    </div>
                                  </Card>

                                  <Card class="shadow-none  border-none pl-5 pt-1 pr-5" size="lg" padding="none">
                                    <div>
                                      <Heading tag="h1" class="text-lg line-clamp-2 pr-5 pt-5 pb-1">Site/s of implementation</Heading>
                                      <div class="flex justify-self-start gap-3 pt-1">
                                        <div class="flex justify-start items-center">
                                          <p class="text-base">Collegiate Level in the University of Nueva Caceredasdasdasdsadas</p>
                                        </div>
                                      </div>
                                    </div>
                                  </Card>
                                  <Card class="shadow-none  border-none pl-5 pt-1 pr-5" size="lg" padding="none">
                                    <div>
                                      <Heading tag="h1" class="text-lg line-clamp-2  pr-5 pt-5 pb-1">Project Duration</Heading>
                                      <div class="flex justify-self-start gap-3 pt-1">
                                        <div class="flex justify-start items-center">
                                          <p class="text-base">12 months</p>
                                        </div>
                                      </div>
                                    </div>
                                  </Card>

                                  <Card class="shadow-none  border-none pl-5 pt-1 pr-5" size="lg" padding="none">
                                    <div>
                                      <Heading tag="h1" class="text-lg line-clamp-2  pr-5 pt-5 pb-1">Total Project Cost</Heading>
                                      <div class="flex justify-self-start gap-3 pt-1">
                                        <div class="flex justify-start items-center">
                                          <p class="text-base">430,000 Pesos</p>
                                        </div>
                                      </div>
                                    </div>
                                  </Card>

                                  <Card class="shadow-none  border-none pl-5 pt-1 pr-5" size="lg" padding="none">
                                    <div>
                                      <Heading tag="h1" class="text-lg line-clamp-2  pr-5 pt-5 pb-1">Funding Source</Heading>
                                      <div class="flex justify-self-start gap-3 pt-1">
                                        <div class="flex justify-start items-center">
                                          <p class="text-base">University of Nueva Caceres</p>
                                        </div>
                                      </div>
                                    </div>
                                  </Card>
                                </Card>

                                <!--admin-buttons-->
                                <Card class="pb-5 mb-5" size="lg" padding="none">
                                  <Card class="shadow-none border-none pl-5 pr-5 pt-5 pb-1" size="lg" padding="none">
                                    <Heading tag="h1" class="text-lg divide-dashed">Insert status</Heading>
                                  </Card>

                                  <Card class="shadow-none  border-none pl-5 pt-5 pr-5 " size="lg" padding="none">
                                    <Button on:click={() => (approve = true)}>Approve</Button>

                                    <Modal bind:open={approve} size="xs" autoclose>
                                      <div class="text-center">
                                        <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to approve this research?</h3>
                                        <Button color="red" class="mr-2">Yes, I'm sure</Button>
                                        <Button color="alternative">No, cancel</Button>
                                      </div>
                                    </Modal>
                                  </Card>
                                  <Card class="shadow-none  border-none pl-5 pt-3 pr-5" size="lg" padding="none">
                                    <Button on:click={() => (reject = true)}>Reject</Button>

                                    <Modal bind:open={reject} size="xs" autoclose>
                                      <div class="text-center">
                                        <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to reject this research?</h3>
                                        <Button color="red" class="mr-2">Yes, I'm sure</Button>
                                        <Button color="alternative">No, cancel</Button>
                                      </div>
                                    </Modal>
                                  </Card>
                                  <Card class="shadow-none  border-none pl-5 pt-3 pr-5 " size="lg" padding="none">
                                    <Button>Back To All Researches</Button>
                                  </Card>
                                </Card>
                              </div>
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
        </TableSearch>
      </TabItem>

      <!--tab-initital presentation-->
      <TabItem title="Initial Presentation"
        ><Table hoverable={true} class="table-fixed w-full">
          <TableSearch class="table-fixed w-full" placeholder="Search by maker name" bind:inputValue={searchTerm}
            ><TableHead class="capitalize">
              <TableHeadCell class="w-6/12">Research Title</TableHeadCell>
              <TableHeadCell>Proponents</TableHeadCell>
              <TableHeadCell>Agency/Dept.</TableHeadCell>
              <TableHeadCell>Date Submitted</TableHeadCell>
            </TableHead>

            <TableBody>
              <TableBodyRow>
                <TableBodyCell class="truncate">Streamlining Outcome-Based Education and Continuous Quality Improvement of University of Nueva Caceres through Technology: A Information Management System for Improving Inclusiveness</TableBodyCell>
                <TableBodyCell class="flex pl-10 ">
                  <Avatar>AR</Avatar>

                  <Avatar>JD</Avatar>
                  <Avatar>DC</Avatar>
                  <Avatar>DI</Avatar>
                </TableBodyCell>
                <TableBodyCell>College of Computer Studies</TableBodyCell>
                <TableBodyCell>Oct. 21, 2023 11:00 AM</TableBodyCell>
              </TableBodyRow>
            </TableBody></TableSearch>
        </Table>
      </TabItem>
    </div>
  </Tabs>

  <!--research overview-->
</main>

<div>
</div>
