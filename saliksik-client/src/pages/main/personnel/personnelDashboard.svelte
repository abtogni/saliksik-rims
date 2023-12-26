<script>
  import { Accordion, AccordionItem, Button, Card, Dropdown, DropdownItem, Heading, Indicator, P, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Tooltip } from "flowbite-svelte";
  import { BookOutline, EditOutline, EyeOutline, ClipboardOutline, TrashBinOutline, DotsVerticalOutline } from "flowbite-svelte-icons";
</script>

<main>
  <div class="grid grid-cols-6 gap-4">
    <div class="grid gap-2 col-start-0 col-span-6 md:col-start-2 md:col-span-4 ...">
      <Heading tag="h1" class="mb-6 text-xl ">Dashboard</Heading>

      <Card padding="none" size="xl" class="">
        <Table hoverable={true} class="table-fixed ">
          <caption class="">
            <Heading tag="h5" class="line-clamp-1 p-5 text-left ">Recently Updated Researches</Heading>
          </caption>

          <TableHead>
            <TableHeadCell class="w-auto">Research Title</TableHeadCell>
            <TableHeadCell class="w-5 text-right "></TableHeadCell>
          </TableHead>
          <TableBody>
            <TableBodyRow class="">
              <TableBodyCell class="">
                <div class="flex items-center justify-start gap-3">
                  <Indicator color="dark" />
                  <Tooltip>Draft</Tooltip>
                  <p class="truncate ...">Streamlining Outcome-Based Education and Continuous Quality Improvement of University of Nueva Caceres through Technology: A Information Management System for Improving Inclusiveness Streamlining Outcome-Based Education and Continuous Quality Improvement of University of Nueva Caceres through Technology: A Information Management System for Improving Inclusiveness</p>
                  <p>01/01/2023</p>
                </div>
              </TableBodyCell>

              <!--Visible Tool
<TableBodyCell class="flex justify-between gap-3 ">
                <EditOutline></EditOutline>
                <Tooltip>Edit Research</Tooltip>
                <EyeOutline></EyeOutline>
                <Tooltip>View Research</Tooltip>
                <ClipboardOutline></ClipboardOutline>
                <Tooltip>Copy Link to Clipboard</Tooltip>
                <TrashBinOutline></TrashBinOutline>
                <Tooltip>Delete Research</Tooltip>
              </TableBodyCell>
              -->

              <TableBodyCell class="flex items-center justify-end">
                <DotsVerticalOutline></DotsVerticalOutline>
                <Dropdown placement="left" class="-z-30">
                  <DropdownItem href="/" class="flex gap-2">
                    <EyeOutline />
                    <p>View Research</p>
                  </DropdownItem>
                  <DropdownItem href="/" class="flex gap-2">
                    <EditOutline />
                    <p>Edit Research</p>
                  </DropdownItem>

                  <DropdownItem href="/" class="flex gap-2">
                    <ClipboardOutline />
                    <p>Copy Link to Clipboard</p>
                  </DropdownItem>
                  <DropdownItem href="/" class="flex gap-2">
                    <TrashBinOutline />
                    <p>Delete Research</p>
                  </DropdownItem>
                </Dropdown>
              </TableBodyCell>
            </TableBodyRow>
          </TableBody>
        </Table>
      </Card>

      
    </div>
  </div>

  <!--

<Table shadow class="table-fixed">
      <caption class="bg-orange-500">
        <Heading tag="h5" class="line-clamp-1 p-5 text-left ">Recently Updated Researches</Heading>
      </caption>
      
      <TableHead>
        <TableHeadCell class="w-11/12">Research Title</TableHeadCell>
        <TableHeadCell class="w-44 text-right"></TableHeadCell>
      </TableHead>
      <TableBody >
        <TableBodyRow class=""> 
          <TableBodyCell class=" whitespace-normal bg-blue-200">
            Streamlining Outcome-Based Education and Continuous Quality Improvement of University of Nueva Caceres through Technology: A Information Management System for Improving Inclusiveness
          </TableBodyCell>
          <TableBodyCell class="flex flex-wrap justify-end gap-4 ">
            <EditOutline></EditOutline>
            <EyeOutline></EyeOutline>
            <ClipboardOutline></ClipboardOutline>
            <TrashBinOutline></TrashBinOutline>
          </TableBodyCell>
        </TableBodyRow>
  
        <TableBodyRow class="">
          <TableBodyCell class="whitespace-normal">
            Streamlining Outcome-Based Education and Continuous Quality Improvement of University of Nueva Caceres through Technology: A Information Management System for Improving Inclusiveness
          </TableBodyCell>
          <TableBodyCell class="flex flex-wrap justify-end gap-4">
            <EditOutline></EditOutline>
            <EyeOutline></EyeOutline>
            <ClipboardOutline></ClipboardOutline>
            <TrashBinOutline></TrashBinOutline>
          </TableBodyCell>
        </TableBodyRow>
        
      </TableBody>
    </Table>
    -->
</main>
