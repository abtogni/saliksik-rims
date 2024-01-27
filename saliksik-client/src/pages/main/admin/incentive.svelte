<script lang="ts">

  import { Avatar, Button, Checkbox, Dropdown, DropdownItem, Indicator, Modal, P, Search, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Tooltip } from "flowbite-svelte";
  import { FilterOutline, InfoCircleOutline, SortOutline } from "flowbite-svelte-icons";
  import moment from "moment";
  import { researches } from "../../../components/store";

//modal for changing incentive status to processing
let changeIncentiveStatusToProcessing = false;

//modal for changing incentive status to released
let changeIncentiveStatusToReleased = false;

//table-modal
let openRow: number;

const toggleRow = (i: any) => {
  openRow = openRow === i ? null : i;
};
</script>
<main class="p-4">


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
  <div class="h-96"></div>
  <div class="h-96"></div>
</div>
</main>