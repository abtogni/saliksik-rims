<script>
  import { Alert, Button, Dropdown, DropdownItem, Input, Modal, P, Tooltip } from "flowbite-svelte";
  import { BookSolid, BookmarkOutline, BookmarkSolid, CheckOutline, ClipboardOutline, CloseOutline, DotsHorizontalOutline, DownloadOutline, EditOutline, EyeOutline, FilePdfOutline, FilterOutline, LabelOutline, LabelSolid, PenOutline, QuestionCircleOutline, QuoteOutline, TrashBinOutline } from "flowbite-svelte-icons";

  //modal for editLabel
  let editLabels = false;
</script>

<main class="p-4">
  <div class="flex justify-center gap-2">
    <div class="grid grid-flow-row col-start-2 col-span-3 items-center gap-2 w-1/2 sm:w-full md:w-full lg:w-11/12 xl:w-8/12 2xl:w-1/2">
      <Alert dismissable color="blue" class="border-l-8 w-full  mb-2">
        <div class="flex items-center gap-2">
          <QuestionCircleOutline slot="icon" size="sm" />
          <span class="text-lg font-medium">Create Concept Note</span>
        </div>
        <p class="mt-2 text-sm">Insert helper text</p>
      </Alert>
      
      <div class="flex justify-start items-center w-full">
        <P weight="bold" size="xl">All</P>
        <div class="flex items-center gap-2">
          <!--filter button-->
          <Button color="blue" size="sm" class="gap-2"><FilterOutline size="sm" />Filter</Button>
          <Dropdown class="w-96 h-1/2">
            <DropdownItem class="flex justify-between items-center">
              <div class="flex justify-start items-center gap-2">
                <Button pill outline color="blue" size="sm" class="items-center border-none hover:bg-transparent hover:text-blue-700 gap-2 p-0 cursor-auto"><LabelSolid size="sm" /></Button>
                <P weight="medium" size="sm" class="line-clamp-1">All</P>
              </div>

              <Button pill outline color="blue" size="sm" class="items-center border-none hover:bg-transparent hover:text-blue-700 gap-2 p-0 cursor-auto"><CheckOutline size="sm" class="" /></Button>
            </DropdownItem>
            <DropdownItem class="items-center">
              <div class="flex justify-start items-center gap-2">
                <Button pill outline color="blue" size="sm" class="items-center border-none hover:bg-transparent hover:text-blue-700 gap-2 p-0 cursor-auto"><LabelSolid size="sm" /></Button>
                <P weight="medium" size="sm" class="line-clamp-1">Insert Label Name</P>
              </div>
            </DropdownItem>
            <DropdownItem class="items-center">
              <div class="flex justify-start items-center gap-2">
                <Button pill outline color="blue" size="sm" class="items-center border-none hover:bg-transparent hover:text-blue-700 gap-2 p-0 cursor-auto"><LabelSolid size="sm" /></Button>
                <P weight="medium" size="sm" class="line-clamp-1">Streamlining Outcome-Based Education and Continuous Quality Improvement of University of Nueva Caceres through Technology: A Information Management System for Improving Inclusiveness</P>
              </div>
            </DropdownItem>
          </Dropdown>
          <!--edit labels button-->
          <Button on:click={() => (editLabels = true)} outline color="blue" size="sm" class="gap-2"><EditOutline size="sm" />Edit Labels</Button>
        </div>
      </div>

      <!--modal for edit labels-->
      <Modal title="Edit Labels" bind:open={editLabels} size="xs" autoclose={false} outsideclose class=" w-full h-1/2">
        <form class="" action="#">
          <div class="flex justify-between items-center gap-2">
            <Button pill outline color="blue" size="sm" class="items-center border-none gap-2 p-2"><CloseOutline size="sm" /></Button>
            <Tooltip arrow={false}>Cancel</Tooltip>
            <Input size="sm" type="text" id="first_name" placeholder="Create New Label" />
            <Button pill outline color="blue" size="sm" class="items-center border-none gap-2 p-2 "><CheckOutline size="sm" class="" /></Button>
            <Tooltip arrow={false}>Create</Tooltip>
          </div>
        </form>
        <div class="grid grid-flow-row gap-2">
          <div class="flex justify-between items-center gap-2">
            <Button pill outline color="blue" size="sm" class="items-center border-none hover:bg-transparent hover:text-blue-700 gap-2 p-2 cursor-auto"><LabelSolid size="sm" /></Button>
            <P weight="medium" size="sm" class="line-clamp-1">Streamlining Outcome-Based Education and Continuous Quality Improvement of University of Nueva Caceres through Technology: A Information Management System for Improving Inclusiveness</P>
            <Button pill outline color="blue" size="sm" class="items-center border-none gap-2 p-2"><TrashBinOutline size="sm" /></Button>
            <Tooltip arrow={false}>Delete</Tooltip>
          </div>
        </div>

        <Button slot="footer" color="blue" size="sm" class="">Done</Button>
      </Modal>

      <!--bookmarked research-->
      <div class="shadow-lg border rounded-lg gap-2 p-3">
        <P weight="medium" size="base" class="line-clamp-3">Streamlining Outcome-Based Education and Continuous Quality Improvement of University of Nueva Caceres through Technology: A Information Management System for Improving Inclusiveness</P>
        <P weight="normal" size="sm" class="line-clamp-1 text-gray-500 w-96">Bookmarked in <span class="font-medium text-gray-500">Streamlining Outcome-Based Education and Continuous Quality Improvement of University of Nueva Caceres through Technology: A Information Management System for Improving Inclusiveness</span></P>

        <!--buttons-->
        <div class="flex justify-between pt-6">
          <!--left buttons-->
          <div class="flex justify-start items-start gap-2">
            <Button color="blue" size="sm" class="items-center gap-2"><EyeOutline size="sm" /> View</Button>
            <Button outline color="blue" size="sm" class="gap-2"><FilePdfOutline size="sm" />Download</Button>
          </div>

          <!--right buttons-->
          <div class="grid grid-flow-col gap-1">
            <Button pill outline color="blue" size="sm" class="items-center border-none gap-2 p-2.5"><ClipboardOutline size="sm" /></Button>
            <Tooltip arrow={false}>Copy Link To Clipboard</Tooltip>
            <Button pill outline color="blue" size="sm" class="items-center border-none gap-2 p-2.5"><QuoteOutline size="sm" /></Button>
            <Tooltip arrow={false}>Copy Citation</Tooltip>
            <div>
              <Button pill outline color="blue" size="sm" class="items-center border-none gap-2 p-2.5"><LabelOutline size="sm" /></Button>
              <Dropdown class="w-96 h-1/2">
                <DropdownItem class="flex justify-between items-center gap-2 truncate ...">
                  <div class="flex justify-start items-center gap-2">
                    <LabelSolid size="sm" class="text-blue-700" />Current Label
                  </div>
                  <Button pill outline color="blue" size="sm" class="items-center border-none hover:bg-transparent hover:text-blue-700 gap-2 p-0 cursor-auto"><CheckOutline size="sm" class="" /></Button>
                </DropdownItem>
                <DropdownItem class="flex justify-between items-center gap-2 truncate ...">
                  <div class="flex justify-start items-center gap-2">
                    <LabelSolid size="sm" class="text-blue-700" />Insert Label Name
                  </div>
                </DropdownItem>
              </Dropdown>
            </div>
            <Tooltip arrow={false}>Change Label</Tooltip>
            <Button pill outline color="blue" size="sm" class="items-center border-none gap-2 p-2.5"><DotsHorizontalOutline size="sm" /></Button>
            <Dropdown class="">
              <DropdownItem class="flex justify-start items-center gap-2"><BookmarkOutline size="sm" class="text-blue-700" />Remove Bookmark</DropdownItem>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>
