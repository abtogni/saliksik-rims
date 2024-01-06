<script>
  import { Button, Dropdown, DropdownItem, P } from "flowbite-svelte";
  import { CheckOutline, FilterOutline } from "flowbite-svelte-icons";

  </script>
  <main class="flex justify-center gap-2 ">
    <div class="grid grid-flow-row items-center gap-2 w-1/2">
      <div class="flex justify-between items-center w-full">
        <P weight="bold" size="xl">Bookmarks</P>
        <Button class="gap-2"><FilterOutline size="sm"/>Label</Button>
        <Dropdown class="w-96">
          <DropdownItem class="flex justify-between items-center gap-2">All<CheckOutline size="sm"/></DropdownItem>
          <DropdownItem>Insert label name</DropdownItem>
          <DropdownItem>Insert label name</DropdownItem>
        </Dropdown>
      </div>
      <div class="shadow-lg border rounded-lg p-3">
        <P weight="medium" size="base" class="line-clamp-2">Streamlining Outcome-Based Education and Continuous Quality Improvement of University of Nueva Caceres through Technology: A Information Management System for Improving Inclusiveness Streamlining Outcome-Based Education and Continuous Quality Improvement of University of Nueva Caceres through Technology: A Information Management System for Improving Inclusiveness</P>
      </div>
    </div>
    
  </main>