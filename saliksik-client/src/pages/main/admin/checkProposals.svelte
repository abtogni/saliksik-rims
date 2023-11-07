<script lang="ts">
 import { goto } from "@roxi/routify";
 import moment from "moment";
 import CircleQuestion from "../../../assets/circle-question.svelte";
 import EllipsisVertical from "../../../assets/ellipsis-vertical.svelte";
 import View from "../../../assets/view.svelte";
 import { Tabs, TabItem } from "flowbite-svelte";
 import { onMount } from "svelte";
 import {
  Table,
  TableBody,
  TableBodyCell,
  TableBodyRow,
  TableHead,
  TableHeadCell,
  Checkbox,
  TableSearch,
 } from "flowbite-svelte";
 import {
  Avatar,
  Dropdown,
  DropdownHeader,
  DropdownItem,
  DropdownDivider,
  Tooltip,
 } from "flowbite-svelte";

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
   const response = await fetch(
    `/api/research/getResearch?researchID=${researchID}`
   );

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
</script>

<main class="pt-12">
 <Tabs>
  <TabItem open title="All Research"></TabItem
  >
  <Table hoverable={true} class="table-auto w-full">
   <TableHead>
    <TableHeadCell class="w-96">Research Title</TableHeadCell>
    <TableHeadCell class="w-36">Project Leaders</TableHeadCell>
    <TableHeadCell class="w-44">Status</TableHeadCell>
    <TableHeadCell class="w-32">Phase</TableHeadCell>
    <TableHeadCell class="w-32">Schedule</TableHeadCell>
    <TableHeadCell class="w-28">Agency/Dept.</TableHeadCell>
    <TableHeadCell class="w-36">Date Submitted</TableHeadCell>
    <TableHeadCell class="w-5 align-middle"><EllipsisVertical /></TableHeadCell>
   </TableHead>
   <TableBody>
    <TableBodyRow>
     <TableBodyCell class="truncate ">
      Streamlining Outcome-Based Education and Continuous Quality Improvement of
      University of Nueva Caceres through Technology: A Information Management
      System for Improving Inclusiveness</TableBodyCell
     >
     <TableBodyCell class="flex">
      <Avatar stacked>AR</Avatar>
      <Avatar stacked>JD</Avatar>
      <Avatar stacked>DC</Avatar>
      <Avatar stacked>DI</Avatar>
     </TableBodyCell>

     <TableBodyCell class="text-center">1</TableBodyCell>
     <TableBodyCell>For Initial Presentation</TableBodyCell>
     <TableBodyCell>Initial Presentation</TableBodyCell>
     <TableBodyCell>N/A</TableBodyCell>
     <TableBodyCell>CCS</TableBodyCell>
     <TableBodyCell>Oct. 1, 2025</TableBodyCell>
     <TableBodyCell class="text-center"
      ><a href="/main/admin/forApproval"><View /></a></TableBodyCell
     >
    </TableBodyRow>
   </TableBody>
  </Table>
 </Tabs>
</main>
