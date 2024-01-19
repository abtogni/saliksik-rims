<script lang="ts">
  import { A, Alert, Avatar, Badge, Button, Checkbox, Dropdown, DropdownItem, Indicator, Modal, P, Search, Tooltip } from "flowbite-svelte";
  import { ArchiveOutline, BellActiveAltOutline, BellOutline, DotsHorizontalOutline, EyeOutline, FileCirclePlusOutline, FileExportOutline, FilePenOutline, FilterOutline, FolderOutline, FolderPlusOutline, MessageCaptionOutline, QuestionCircleOutline, StarOutline, StarSolid, TrashBinOutline, UserAddOutline, UserOutline } from "flowbite-svelte-icons";

</script>

<main class="p-4">
  <div class="flex justify-center gap-2 bg-gray-50">
    <div class="grid grid-flow-row items-center gap-2 w-1/2 sm:w-full md:w-full lg:w-11/12 xl:w-8/12 2xl:w-1/2">
      <!--helper card-->
      <Alert dismissable color="blue" class="border-l-8">
        <div class="flex items-center gap-2">
          <QuestionCircleOutline slot="icon" size="sm" />
          <span class="text-lg font-medium">Notifications</span>
        </div>
        <p class="mt-2 text-sm">Insert Helper Text</p>
      </Alert>

      <div class="flex flex-wrap justify-start items-center gap-0 w-full">
        <div class="flex justify-between items-center gap-2 w-full">
          <div class="flex items-center gap-2">
            <BellActiveAltOutline size="md" class="text-blue-700" />
            <P size="xl" weight="bold" class="text-gray-900">00 <span class="text-gray-500">Unread Notification</span></P>
          </div>
          <div class="flex items-center gap-2">
            <Button type="submit" color="blue" size="sm" class="flex items-center gap-2 rounded-md"><FolderPlusOutline size="sm" /> Create New Research</Button>
          </div>
        </div>
        <P size="sm" weight="normal" class="text-gray-500">Check unread notifications, notices and other things that may require your attention.</P>
      </div>

      <!--card researches inactive-->
      <div class="grid grid-flow-row justify-center w-full shadow-lg border rounded-lg gap-2 p-3 mb-4 bg-white">
        <P size="sm" weight="normal" class="text-gray-500">No existing researches...<span></span></P>
      </div>
      <!--card researches active-->
      <div class="grid grid-flow-row w-full shadow-lg border rounded-lg gap-2 p-3 mb-4 bg-white">
        <div class="flex justify-between items-center gap-2 w-full">
          <Search color="blue" size="sm" placeholder="Search by title or status..." class="border rounded-md"></Search>
          <div class="flex items-center gap-2">
            <Button color="blue" size="sm" class="flex items-center gap-2 rounded-md"><Indicator class="text-white" />Status</Button>
            <Dropdown>
              <DropdownItem class=" rounded-md hover:bg-blue-50">
                <Checkbox color="blue" class="font-medium text-sm w-full  text-gray-500 ">All</Checkbox>
              </DropdownItem>
              <DropdownItem class=" rounded-md hover:bg-blue-50">
                <Checkbox color="blue" class="font-medium text-sm w-full  text-gray-500 ">No Status</Checkbox>
              </DropdownItem>
              <DropdownItem class=" rounded-md hover:bg-blue-50">
                <Checkbox color="blue" class="font-medium text-sm w-full  text-gray-500 ">Concept Note Approval</Checkbox>
              </DropdownItem>
              <DropdownItem class=" rounded-md hover:bg-blue-50">
                <Checkbox color="blue" class="font-medium text-sm w-full  text-gray-500 ">Initial Presentation</Checkbox>
              </DropdownItem>
              <DropdownItem class="rounded-md hover:bg-blue-50">
                <Checkbox color="blue" class="font-medium text-sm w-full  text-gray-500 ">Final Presentation</Checkbox>
              </DropdownItem>
              <DropdownItem class=" rounded-md hover:bg-blue-50">
                <Checkbox color="blue" class="font-medium text-sm w-full  text-gray-500 ">Incentive Processing</Checkbox>
              </DropdownItem>
              <DropdownItem class=" rounded-md hover:bg-blue-50">
                <Checkbox color="blue" class="font-medium text-sm w-full  text-gray-500 ">Incentive Released</Checkbox>
              </DropdownItem>
              <DropdownItem class=" rounded-md hover:bg-blue-50">
                <Checkbox color="blue" class="font-medium text-sm w-full  text-gray-500 ">Published</Checkbox>
              </DropdownItem>
              <DropdownItem class=" rounded-md hover:bg-blue-50">
                <Checkbox color="blue" class="font-medium text-sm w-full  text-gray-500 ">Rejected</Checkbox>
              </DropdownItem>
              <DropdownItem class=" rounded-md hover:bg-blue-50">
                <Checkbox color="blue" class="font-medium text-sm w-full  text-gray-500 ">Archive</Checkbox>
              </DropdownItem>
            </Dropdown>
          </div>
        </div>

        <div class="flex flex-wrap gap-2 rounded-md p-2 hover:bg-blue-50">
          <div class="flex justify-between items-center gap-2 w-full">
            <div class="flex justify-start items-center gap-2">
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

              <div class="flex justify-start items-center gap-2">
                <Badge border large class="flex items-center gap-2">
                  <Indicator color="orange" size="md" class="" />No Status
                </Badge>
                <Tooltip arrow={false} class="border rounded-md shadow-lg  bg-white">
                  <P weight="normal" size="sm" class=" text-gray-500">Last Updated in <span class="font-medium text-gray-500">January 21, 2023</span></P>
                </Tooltip>
                <Badge border large color="blue" class="flex items-center gap-2">
                  <Indicator color="blue" size="md" class="" />Concept Note Approval
                </Badge>
              </div>
              <div class="flex justify-start items-center gap-2">
                <P size="base" weight="bold" class="text-gray-500">·</P>
                <P weight="normal" size="sm" class=" text-gray-500">Created in <span class="font-medium text-gray-500">January 21, 2023</span></P>
              </div>
            </div>
            <StarOutline size="sm" class="text-blue-700" />
            <Tooltip arrow={false} class="border rounded-md shadow-lg  bg-white">
              <P weight="normal" size="sm" class="font-medium text-gray-500">Not Starred</P>
            </Tooltip>
            <StarSolid size="sm" class="text-blue-700" />
            <Tooltip arrow={false} class="border rounded-md shadow-lg  bg-white">
              <P weight="normal" size="sm" class="font-medium text-gray-500">Starred</P>
            </Tooltip>
            <Button outline color="blue" size="sm" class="flex items-center rounded-full border-none gap-2 p-1.5"><DotsHorizontalOutline size="sm" /></Button>
            <Dropdown>
              <DropdownItem class="flex justify-start items-center gap-2 rounded-md font-medium text-sm w-full text-gray-500  hover:bg-blue-50">
                <StarOutline size="sm" class="text-blue-700" />Star
                <StarSolid size="sm" class="text-blue-700" />Starred
              </DropdownItem>
              <DropdownItem class="flex justify-start items-center gap-2 rounded-md font-medium text-sm w-full text-gray-500  hover:bg-blue-50">
                <EyeOutline size="sm" class="text-blue-700" />View Research
              </DropdownItem>
              <DropdownItem class="flex justify-start items-center gap-2 rounded-md font-medium text-sm w-full text-gray-500  hover:bg-blue-50">
                <ArchiveOutline size="sm" class="text-blue-700" />Archive Research
              </DropdownItem>
              <DropdownItem class="flex justify-start items-center gap-2 rounded-md font-medium text-sm w-full text-gray-500  hover:bg-blue-50">
                <TrashBinOutline size="sm" class="text-blue-700" />Delete Research
              </DropdownItem>
            </Dropdown>
          </div>
          <P weight="semibold" size="sm" class="line-clamp-2"><A href="" class="text-black">Streamlining Outcome-Based Education and Continuous Quality Improvement of University of Nueva Caceres through Technology: A Information Management System for Improving Inclusiveness</A></P>
        </div>

        <div class="flex flex-wrap gap-2 rounded-md p-2 hover:bg-blue-50">
          <div class="flex justify-between items-center gap-2 w-full">
            <div class="flex justify-start items-center gap-2">
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

              <div class="flex justify-start items-center gap-2">
                <Badge border large class="flex items-center gap-2">
                  <Indicator color="orange" size="md" class="" />No Status
                </Badge>
                <Tooltip arrow={false} class="border rounded-md shadow-lg  bg-white">
                  <P weight="normal" size="sm" class=" text-gray-500">Last Updated in <span class="font-medium text-gray-500">January 21, 2023</span></P>
                </Tooltip>
                <Badge border large color="blue" class="flex items-center gap-2">
                  <Indicator color="blue" size="md" class="" />Concept Note Approval
                </Badge>
              </div>
              <div class="flex justify-start items-center gap-2">
                <P size="base" weight="bold" class="text-gray-500">·</P>
                <P weight="normal" size="sm" class=" text-gray-500">Created in <span class="font-medium text-gray-500">January 21, 2023</span></P>
              </div>
            </div>
            <StarOutline size="sm" class="text-blue-700" />
            <Tooltip arrow={false} class="border rounded-md shadow-lg  bg-white">
              <P weight="normal" size="sm" class="font-medium text-gray-500">Not Starred</P>
            </Tooltip>
            <StarSolid size="sm" class="text-blue-700" />
            <Tooltip arrow={false} class="border rounded-md shadow-lg  bg-white">
              <P weight="normal" size="sm" class="font-medium text-gray-500">Starred</P>
            </Tooltip>
            <Button outline color="blue" size="sm" class="flex items-center rounded-full border-none gap-2 p-1.5"><DotsHorizontalOutline size="sm" /></Button>
            <Dropdown>
              <DropdownItem class="flex justify-start items-center gap-2 rounded-md font-medium text-sm w-full text-gray-500  hover:bg-blue-50">
                <EyeOutline size="sm" class="text-blue-700" />View Research
              </DropdownItem>
              <DropdownItem class="flex justify-start items-center gap-2 rounded-md font-medium text-sm w-full text-gray-500  hover:bg-blue-50">
                <ArchiveOutline size="sm" class="text-blue-700" />Archive Research
              </DropdownItem>
              <DropdownItem class="flex justify-start items-center gap-2 rounded-md font-medium text-sm w-full text-gray-500  hover:bg-blue-50">
                <TrashBinOutline size="sm" class="text-blue-700" />Delete Research
              </DropdownItem>
            </Dropdown>
          </div>
          <P weight="semibold" size="sm" class="line-clamp-2"><A href="" class="text-black">Streamlining Outcome-Based Education and Continuous Quality Improvement of University of Nueva Caceres through Technology: A Information Management System for Improving Inclusiveness</A></P>
        </div>
      </div>
    </div>
  </div>

  <div class="h-96"></div>
</main>
