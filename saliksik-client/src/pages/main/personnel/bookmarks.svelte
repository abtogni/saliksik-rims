<script>
  import { Button, Dropdown, DropdownItem, P, Tooltip } from "flowbite-svelte";
  import { BookSolid, BookmarkSolid, CheckOutline, ClipboardOutline, DotsHorizontalOutline, EditOutline, EyeOutline, FilterOutline, LabelOutline, LabelSolid, PenOutline, QuoteOutline, TrashBinOutline } from "flowbite-svelte-icons";
</script>

<main class="flex justify-center gap-2">
  <div class="grid grid-flow-row items-center gap-2 w-1/2">
    <div class="flex justify-between items-center w-full">
      <P weight="bold" size="xl">All</P>
      <Button color="blue" size="sm" class="gap-2"><LabelSolid size="sm" />Labels</Button>
      <Dropdown class="w-96">
        <DropdownItem class="flex justify-between items-center">
          <div class="flex items-center gap-2">
            <LabelSolid size="sm" class="text-blue-700" />All
            </div>
          
          <div class="flex items-center gap-2">
            <Button pill outline color="blue" size="sm" class="items-center border-none gap-2 p-2.5"><EditOutline size="sm" /></Button>
            <Tooltip arrow={false}>Rename</Tooltip>
            <Button pill outline color="blue" size="sm" class="items-center border-none hover:bg-white hover:text-blue-700 gap-2"><TrashBinOutline size="sm" /></Button>
            <Tooltip arrow={false}>Delete</Tooltip>
          </div>
        </DropdownItem>
        <DropdownItem class="truncate ...">Insert label name</DropdownItem>
        <DropdownItem class="truncate ...">Streamlining Outcome-Based Education and Continuous Quality Improvement of University of Nueva Caceres through Technology: A Information Management System for Improving Inclusiveness</DropdownItem>
      </Dropdown>
    </div>
    <div class="shadow-lg border rounded-lg gap-2 p-3">
      <P weight="medium" size="base" class="line-clamp-3">Streamlining Outcome-Based Education and Continuous Quality Improvement of University of Nueva Caceres through Technology: A Information Management System for Improving Inclusiveness</P>
      <P weight="normal" size="sm" class="line-clamp-1 text-gray-500 w-96">Bookmarked in <span class="font-medium text-gray-500">Streamlining Outcome-Based Education and Continuous Quality Improvement of University of Nueva Caceres through Technology: A Information Management System for Improving Inclusiveness</span></P>
      <div class="flex justify-between pt-6">
        <Button color="blue" size="sm" class="items-center gap-2"><EyeOutline size="sm" /> View</Button>
        <div class="grid grid-flow-col gap-1">
          <Button pill outline color="blue" size="sm" class="items-center border-none gap-2 p-2.5"><ClipboardOutline size="sm" /></Button>
          <Tooltip arrow={false}>Copy Link To Clipboard</Tooltip>
          <Button pill outline color="blue" size="sm" class="items-center border-none gap-2 p-2.5"><QuoteOutline size="sm" /></Button>
          <Tooltip arrow={false}>Copy Citation</Tooltip>
          <div>
            <Button pill outline color="blue" size="sm" class="items-center border-none gap-2 p-2.5"><LabelOutline size="sm" /></Button>
            <Dropdown class="w-96">
              <DropdownItem class="flex justify-start items-center gap-2"><TrashBinOutline size="sm" class="text-blue-700" />Remove Bookmark </DropdownItem>
              <DropdownItem class="flex justify-start items-center gap-2 truncate ..."><LabelOutline size="sm" class="text-blue-700"/>Insert label name</DropdownItem>
            </Dropdown>
          </div>
          <Tooltip arrow={false}>Change Label</Tooltip>
          <Button pill outline color="blue" size="sm" class="items-center border-none gap-2  p-2.5"><DotsHorizontalOutline size="sm" /></Button>
          <Dropdown class="">
            <DropdownItem class="flex items-center gap-2 truncate ..."><BookmarkSolid size="sm" />Remove Bookmark</DropdownItem>
          </Dropdown>
        </div>
      </div>
    </div>
  </div>
</main>
