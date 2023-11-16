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
        console.log(data);
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
      console.log(researches);
    } catch (error) {
      console.error("Network error:", error);
    } finally {
      loading = false;
    }
  });

  loading = false;

  //For search bar
  let searchTerm = "";
  let items = [{ researchTitle: 1, maker: "Toyota", agencyDept: "ABC", type: 2017 }];
  $: filteredItems = items.filter((item) => item.maker.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);

  //for pop-up admin-buttons
  let approve = false;
  let reject = false;

  //table-modal
  let openRow: number;
  let details: { name?: any; researchTitle?: number; maker?: string; agencyDept?: string; type?: number };

  const toggleRow = (i) => {
    openRow = openRow === i ? null : i;
  };
</script>

<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />

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
            {#each items as item, i}
              <TableBodyRow on:click={() => toggleRow(i)}>
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

              {#if openRow === i}
                <TableBodyRow on:dblclick={() => (details = item)} class="table-fixed">
                  <TableBodyCell colspan="4" class="p-0 ">
                    <!--research overview-->
                    <div class="flex justify-between w-full px-2 py-3" transition:slide={{ duration: 300, axis: "y" }}>
                      <!--left-card-->
                      <div class="w-8/12 whitespace-normal  ">
                        <Card class="mb-5 " size="xl">
                          <Heading tag="h1" class="text-xl mb-2  ">Streamlining Outcome-Based Education and Continuous Quality Improvement of University of Nueva Caceres through Technology: A Information Management System for Improving Inclusiveness</Heading>
                          <div>
                            <p class="text-sm mb-2">January 1, 2023</p>
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
                            <p class="mb-2">Outcome-based education (OBE) and continuous quality improvement (CQI) are two of the most important concepts in education today. OBE is a student-centered approach that focuses on the development of specific skills, knowledge, and attitudes that are relevant to the needs of the society. (Akir et al., 2012) CQI, on the other hand, is a continuous process of reviewing, analyzing, and improving educational practices and policies to ensure that the highest quality of education is delivered. (Misran et al.,2011)</p>

                            <p class="mb-2">In recent years, there has been a growing interest in the development and utilization of new educational technologies and resources for inclusive education (Smith, 2018). This is because these technologies have the potential to significantly improve the efficiency and effectiveness of OBE-CQI processes.</p>

                            <p class="mb-2">The University of Nueva Caceres, like many other educational institutions, has faced various challenges in implementing OBE-CQI effectively. One of the main challenges is the manual entry of data, which can be time-consuming and prone to errors (Liu & Huang, 2019). To address this challenge, the researchers propose to develop an Information Management System (IMS) to automate the data entry process.</p>

                            <p class="mb-2">The IMS is expected to improve the inclusiveness of OBE-CQI at the University of Nueva Caceres by making the process more efficient and effective. By streamlining the data entry process, the faculty will be able to focus more on the important tasks of teaching and learning. Additionally, the IMS will also help to reduce the errors and inconsistencies that can occur in manual data entry (Chen, 2021).</p>

                            <p class="mb-2">Therefore, the research aims to design, develop, and evaluate the IMS for OBE-CQI at the University of Nueva Caceres. The study will focus on the following areas: variables or parameters to be measured and evaluated or analyzed; treatments to be used and their layout; experimental procedures and design; statistical analysis; evaluation method and observations to be made; and strategies for implementation.</p>
                          </AccordionItem>

                          <AccordionItem open>
                            <Card slot="header" class="shadow-none border-none  bg-transparent" size="lg" padding="none">
                              <Heading tag="h1" class="text-lg divide-dashed">Significance</Heading>
                            </Card>
                            <p class="mb-2">This study will be valuable for universities and colleges looking to improve the inclusiveness of their educational environment and streamline the implementation of Outcome-Based Education and Continuous Quality Improvement.</p>

                            <p class="mb-2">The proposed Information management system has the potential to serve as a model for other universities and colleges looking to integrate technology into their education processes.</p>
                          </AccordionItem>

                          <AccordionItem open>
                            <Card slot="header" class="shadow-none border-none  bg-transparent" size="lg" padding="none">
                              <Heading tag="h1" class="text-lg divide-dashed">Objectives</Heading>
                            </Card>
                            <p class="mb-2">The main objective of the study is to explore the potential of technology in enhancing inclusiveness in the collegiate level in the University of Nueva Caceres through streamlining the process of Outcome-Based Education and Continuous Quality Improvement. The research aims to develop a Information management system that automates the data entry process and facilitates the implementation of Outcome-Based Education and Continuous Quality Improvement.</p>

                            <p class="mb-2">1. To Identify challenges faced in implementing OBE-CQI and to determine the OBE-CQI that can be leveraged to overcome the OBE implementation challenges.</p>

                            <p class="mb-2">2. To Design and develop an Information Management System that will improve the OBE-CQI Process.</p>

                            <p class="mb-2">3. To implement the OBE-CQI Information Management System at the University of Nueva Caceres.</p>

                            <p class="mb-2">4. To assess the impact of the Information management system on the inclusiveness of the educational environment and the overall effectiveness of Outcome-Based Education and Continuous Quality Improvement.</p>
                          </AccordionItem>

                          <AccordionItem open>
                            <Card slot="header" class="shadow-none border-none  bg-transparent " size="lg" padding="none">
                              <Heading tag="h1" class="text-lg divide-dashed">Methodology</Heading>
                            </Card>
                            <p class="mb-2">The research will adopt EXPLORATORY DESIGN (Multi-method design) incorporating both qualitative and quantitative approaches, to explore the problem and determine possible solutions to facilitate the implementation of Outcome-Based Education and Continuous Quality Improvement (OBE-CQI) in the university.</p>

                            <p class="mb-2">The qualitative component will involve the collection of data through content analysis and semi-structured interviews with relevant stakeholders, such as faculty members and students. Thematic analysis will be used to identify patterns and themes in the data and to gain an understanding of the challenges and potential solutions related to the implementation of OBE-CQI.</p>

                            <p class="mb-2">The quantitative component of the study will involve a descriptive analysis, using a survey as the data gathering tool. The survey will assess the level of user acceptance (based on the ISO standard 9001) and impact of the proposed solutions .</p>

                            <p class="mb-2">In terms of statistical analysis, the study will use percentage and standard deviation to analyze and summarize the data collected.</p>
                          </AccordionItem>

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

  <!--research preview-->
  <div class="flex justify-between w-full">
    <!--left-card-->
    <div class="w-8/12">
      <Card class="mb-5" size="xl">
        <div class="grid grid-flow-col justify-items-start items-center pl-5 mb-2">
          <div class="flex justify-self-start gap-3 pt-1">
            <Avatar stacked border size="md" class=" ring-orange-400">AR</Avatar>
            <div>
              <Heading tag="h2" class="text-lg truncate ">Agnes Reyes</Heading>
              <p class="text-xs">January 1, 2023</p>
            </div>
          </div>
          <div class="flex justify-self-end">
            <span class="material-symbols-outlined rounded-full p-2"> download_2 </span>
            <span class="material-symbols-outlined rounded-full p-2"> visibility </span>
            <span class="material-symbols-outlined rounded-full p-2"> bookmark_add </span>
          </div>
        </div>
        <Heading tag="h1" class="text-xl mb-2 line-clamp-2">Streamlining Outcome-Based Education and Continuous Quality Improvement of University of Nueva Caceres through Technology: A Information Management System for Improving Inclusiveness</Heading>

        <p class="mb-2 line-clamp-4">Outcome-based education (OBE) and continuous quality improvement (CQI) are two of the most important concepts in education today. OBE is a student-centered approach that focuses on the development of specific skills, knowledge, and attitudes that are relevant to the needs of the society. (Akir et al., 2012) CQI, on the other hand, is a continuous process of reviewing, analyzing, and improving educational practices and policies to ensure that the highest quality of education is delivered. (Misran et al.,2011) In recent years, there has been a growing interest in the development and utilization of new educational technologies and resources for inclusive education (Smith, 2018). This is because these technologies have the potential to significantly improve the efficiency and effectiveness of OBE-CQI processes.</p>

        <div>
          <Button href="/" class="bg-orange-500">Read more</Button>
        </div>
      </Card>
      <Card class="mb-5" size="xl">
        <div class="grid grid-flow-col justify-items-start items-center pl-5 mb-2">
          <div class="flex justify-self-start gap-3 pt-1">
            <Avatar stacked border size="md" class=" ring-orange-400">AR</Avatar>
            <div>
              <Heading tag="h2" class="text-lg truncate ">Agnes Reyes</Heading>
              <p class="text-xs">January 1, 2023</p>
            </div>
          </div>
          <div class="flex justify-self-end">
            <span class="material-symbols-outlined rounded-full p-2"> download_2 </span>
            <span class="material-symbols-outlined rounded-full p-2"> visibility </span>
            <span class="material-symbols-outlined rounded-full p-2"> bookmark_add </span>
          </div>
        </div>
        <Heading tag="h1" class="text-xl mb-2 line-clamp-2">Streamlining Outcome-Based Education and Continuous Quality Improvement of University of Nueva Caceres through Technology: A Information Management System for Improving Inclusiveness</Heading>

        <p class="mb-2 line-clamp-4">Outcome-based education (OBE) and continuous quality improvement (CQI) are two of the most important concepts in education today. OBE is a student-centered approach that focuses on the development of specific skills, knowledge, and attitudes that are relevant to the needs of the society. (Akir et al., 2012) CQI, on the other hand, is a continuous process of reviewing, analyzing, and improving educational practices and policies to ensure that the highest quality of education is delivered. (Misran et al.,2011) In recent years, there has been a growing interest in the development and utilization of new educational technologies and resources for inclusive education (Smith, 2018). This is because these technologies have the potential to significantly improve the efficiency and effectiveness of OBE-CQI processes.</p>

        <div>
          <Button href="/" class="bg-orange-500">Read more</Button>
        </div>
      </Card>
    </div>

    <!--reading history-->
    <div class=" justify-self-end pl-12 w-1/3">
      <Card class="pb-5 mb-5" size="lg" padding="none">
        <Card class="shadow-none border-none pl-5 pr-5 pt-5 pb-1" size="lg" padding="none">
          <Heading tag="h1" class="text-lg divide-dashed">Reading History</Heading>
        </Card>

        <Card class="shadow-none  border-none pl-5 pt-1 pr-5" size="lg" padding="none">
          <div>
            <Heading tag="h1" class="text-base line-clamp-2">Streamlining Outcome-Based Education and Continuous Quality Improvement of University of Nueva Caceres through Technology: A Information Management System for Improving Inclusiveness</Heading>
            <div class="flex justify-self-start gap-3 pl-4 pt-1">
              <Avatar stacked border size="xs" class="text-xs ring-orange-400">AR</Avatar>
              <div class="flex justify-start items-center">
                <p class="text-xs">Agnes Reyes</p>
                <p class="pl-1 pr-1">·</p>
                <p class="text-xs">January 1, 2023</p>
              </div>
            </div>
          </div>
        </Card>
        <Card class="shadow-none  border-none pl-5 pt-5 pr-5 " size="lg" padding="none">
          <div>
            <Heading tag="h1" class="text-base line-clamp-2">Streamlining Outcome-Based Education and Continuous Quality Improvement of University of Nueva Caceres through Technology: A Information Management System for Improving Inclusiveness</Heading>
            <div class="flex justify-self-start gap-3 pl-4 pt-1">
              <Avatar stacked border size="xs" class="text-xs ring-orange-400">AR</Avatar>
              <div class="flex justify-start items-center">
                <p class="text-xs">Agnes Reyes</p>
                <p class="pl-1 pr-1">·</p>
                <p class="text-xs">January 1, 2023</p>
              </div>
            </div>
          </div>
        </Card>
      </Card>

      <Card class="pb-5 mb-5" size="lg" padding="none">
        <Card class="shadow-none border-none pl-5 pr-5 pt-5 pb-1" size="lg" padding="none">
          <Heading tag="h1" class="text-lg divide-dashed">Bookmarks</Heading>
        </Card>

        <Card class="shadow-none  border-none pl-5 pt-1 pr-5" size="lg" padding="none">
          <div>
            <Heading tag="h1" class="text-base line-clamp-2">Streamlining Outcome-Based Education and Continuous Quality Improvement of University of Nueva Caceres through Technology: A Information Management System for Improving Inclusiveness</Heading>
            <div class="flex justify-self-start gap-3 pl-4 pt-1">
              <Avatar stacked border size="xs" class="text-xs ring-orange-400">AR</Avatar>
              <div class="flex justify-start items-center">
                <p class="text-xs">Agnes Reyes</p>
                <p class="pl-1 pr-1">·</p>
                <p class="text-xs">January 1, 2023</p>
              </div>
            </div>
          </div>
        </Card>
        <Card class="shadow-none  border-none pl-5 pt-5 pr-5 " size="lg" padding="none">
          <div>
            <Heading tag="h1" class="text-base line-clamp-2">Streamlining Outcome-Based Education and Continuous Quality Improvement of University of Nueva Caceres through Technology: A Information Management System for Improving Inclusiveness</Heading>
            <div class="flex justify-self-start gap-3 pl-4 pt-1">
              <Avatar stacked border size="xs" class="text-xs ring-orange-400">AR</Avatar>
              <div class="flex justify-start items-center">
                <p class="text-xs">Agnes Reyes</p>
                <p class="pl-1 pr-1">·</p>
                <p class="text-xs">January 1, 2023</p>
              </div>
            </div>
          </div>
        </Card>
      </Card>
    </div>
  </div>

  <!--research overview-->
  <div class="flex justify-between w-full">
    <!--left-card-->
    <div class="w-8/12">
      <Card class="mb-5" size="xl">
        <Heading tag="h1" class="text-xl mb-2 ">Streamlining Outcome-Based Education and Continuous Quality Improvement of University of Nueva Caceres through Technology: A Information Management System for Improving Inclusiveness</Heading>
        <div>
          <p class="text-sm mb-2">January 1, 2023</p>
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

      <Accordion activeClass="bg-white" multiple>
        <AccordionItem open>
          <Card slot="header" class="shadow-none border-none  bg-transparent" size="lg" padding="none">
            <Heading tag="h1" class="text-lg divide-dashed">Project Description</Heading>
          </Card>
          <p class="mb-2">Outcome-based education (OBE) and continuous quality improvement (CQI) are two of the most important concepts in education today. OBE is a student-centered approach that focuses on the development of specific skills, knowledge, and attitudes that are relevant to the needs of the society. (Akir et al., 2012) CQI, on the other hand, is a continuous process of reviewing, analyzing, and improving educational practices and policies to ensure that the highest quality of education is delivered. (Misran et al.,2011)</p>

          <p class="mb-2">In recent years, there has been a growing interest in the development and utilization of new educational technologies and resources for inclusive education (Smith, 2018). This is because these technologies have the potential to significantly improve the efficiency and effectiveness of OBE-CQI processes.</p>

          <p class="mb-2">The University of Nueva Caceres, like many other educational institutions, has faced various challenges in implementing OBE-CQI effectively. One of the main challenges is the manual entry of data, which can be time-consuming and prone to errors (Liu & Huang, 2019). To address this challenge, the researchers propose to develop an Information Management System (IMS) to automate the data entry process.</p>

          <p class="mb-2">The IMS is expected to improve the inclusiveness of OBE-CQI at the University of Nueva Caceres by making the process more efficient and effective. By streamlining the data entry process, the faculty will be able to focus more on the important tasks of teaching and learning. Additionally, the IMS will also help to reduce the errors and inconsistencies that can occur in manual data entry (Chen, 2021).</p>

          <p class="mb-2">Therefore, the research aims to design, develop, and evaluate the IMS for OBE-CQI at the University of Nueva Caceres. The study will focus on the following areas: variables or parameters to be measured and evaluated or analyzed; treatments to be used and their layout; experimental procedures and design; statistical analysis; evaluation method and observations to be made; and strategies for implementation.</p>
        </AccordionItem>

        <AccordionItem open>
          <Card slot="header" class="shadow-none border-none  bg-transparent" size="lg" padding="none">
            <Heading tag="h1" class="text-lg divide-dashed">Significance</Heading>
          </Card>
          <p class="mb-2">This study will be valuable for universities and colleges looking to improve the inclusiveness of their educational environment and streamline the implementation of Outcome-Based Education and Continuous Quality Improvement.</p>

          <p class="mb-2">The proposed Information management system has the potential to serve as a model for other universities and colleges looking to integrate technology into their education processes.</p>
        </AccordionItem>

        <AccordionItem open>
          <Card slot="header" class="shadow-none border-none  bg-transparent" size="lg" padding="none">
            <Heading tag="h1" class="text-lg divide-dashed">Objectives</Heading>
          </Card>
          <p class="mb-2">The main objective of the study is to explore the potential of technology in enhancing inclusiveness in the collegiate level in the University of Nueva Caceres through streamlining the process of Outcome-Based Education and Continuous Quality Improvement. The research aims to develop a Information management system that automates the data entry process and facilitates the implementation of Outcome-Based Education and Continuous Quality Improvement.</p>

          <p class="mb-2">1. To Identify challenges faced in implementing OBE-CQI and to determine the OBE-CQI that can be leveraged to overcome the OBE implementation challenges.</p>

          <p class="mb-2">2. To Design and develop an Information Management System that will improve the OBE-CQI Process.</p>

          <p class="mb-2">3. To implement the OBE-CQI Information Management System at the University of Nueva Caceres.</p>

          <p class="mb-2">4. To assess the impact of the Information management system on the inclusiveness of the educational environment and the overall effectiveness of Outcome-Based Education and Continuous Quality Improvement.</p>
        </AccordionItem>

        <AccordionItem open>
          <Card slot="header" class="shadow-none border-none  bg-transparent" size="lg" padding="none">
            <Heading tag="h1" class="text-lg divide-dashed">Methodology</Heading>
          </Card>
          <p class="mb-2">The research will adopt EXPLORATORY DESIGN (Multi-method design) incorporating both qualitative and quantitative approaches, to explore the problem and determine possible solutions to facilitate the implementation of Outcome-Based Education and Continuous Quality Improvement (OBE-CQI) in the university.</p>

          <p class="mb-2">The qualitative component will involve the collection of data through content analysis and semi-structured interviews with relevant stakeholders, such as faculty members and students. Thematic analysis will be used to identify patterns and themes in the data and to gain an understanding of the challenges and potential solutions related to the implementation of OBE-CQI.</p>

          <p class="mb-2">The quantitative component of the study will involve a descriptive analysis, using a survey as the data gathering tool. The survey will assess the level of user acceptance (based on the ISO standard 9001) and impact of the proposed solutions .</p>

          <p class="mb-2">In terms of statistical analysis, the study will use percentage and standard deviation to analyze and summarize the data collected.</p>
        </AccordionItem>

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
      <Listgroup active class="w-full pb-5 mb-5">
        <h3 class="p-2 pl-4 text-left text-xl font-medium text-gray-900 dark:text-white">User list</h3>
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
</main>
