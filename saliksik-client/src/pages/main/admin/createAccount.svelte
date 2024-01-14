<script lang="ts">
   import { Alert, Button, Dropdown, DropdownItem, Input, Modal, P, Tooltip, Tabs, TabItem, Indicator, Popover, Card, Hr, Badge, Helper, Checkbox, Search, Avatar, Select } from "flowbite-svelte";
  import { BookSolid, BookmarkOutline, BookmarkSolid, CalendarEditOutline, CheckOutline, ClipboardOutline, CloseOutline, DotsHorizontalOutline, DownloadOutline, EditOutline, EyeOutline, FilePdfOutline, FilterOutline, LabelOutline, LabelSolid, PenOutline, QuestionCircleOutline, QuoteOutline, TrashBinOutline, CalendarPlusSolid, InfoCircleOutline, FileCirclePlusOutline, MapLocationOutline, UserGroupSolid, UsersGroupOutline, CalendarEditSolid, CalendarMonthOutline, UserAddOutline, MessageCaptionOutline, MessageCaptionSolid, MinusOutline, FileLinesOutline, UserOutline, UserSettingsOutline } from "flowbite-svelte-icons";
  import { DateInput } from "date-picker-svelte";

  let json = {};
  let message: any;
  function submit(e: Event) {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  json = Object.fromEntries(formData.entries());

    // Make an HTTP POST request to the API
    fetch('/api/user/createAccount', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(json),
    })
        .then((response) => {
            if (response.ok) {
                message = 'Created an account!';
            } else {
                // Handle errors or authentication failures
                console.error('Registration failed');
            }
        })
        .catch((error) => {
            console.error('Network error:', error);
        });
}

//modal for create personnel account
let createPersonnelAccount = false;
  </script>
  
  <div class="flex justify-center gap-2">
    <div class="grid grid-flow-row col-start-2 col-span-3 items-center gap-2 w-1/2 sm:w-full md:w-full lg:w-11/12 xl:w-8/12 2xl:w-1/2">
      <Alert dismissable color="blue" class="border-l-8 w-full  mb-2">
        <div class="flex items-center gap-2">
          <QuestionCircleOutline slot="icon" size="sm" />
          <span class="text-lg font-medium">Personnel Accounts</span>
        </div>
        <p class="mt-2 text-sm">Insert helper text</p>
      </Alert>

      <!---->
      <div class="flex justify-between items-center w-full">
        <div class="flex items-center gap-2">
          <UserOutline size="md" class="text-blue-700" />
          <P weight="bold" size="xl" class="text-gray-900">00 <span class="text-gray-500">User Accounts</span></P>
        </div>

        <div class="flex items-center gap-2">
          <Button on:click={() => (createPersonnelAccount = true)} color="blue" size="sm" class="flex items-center gap-2 rounded-md"><UserAddOutline size="sm" />Create Personnel Account</Button>
        </div>
      </div>

      <!--modal for create personnel account-->
      <Modal title="Create Personnel Account" bind:open={createPersonnelAccount} size="xs" autoclose={false} outsideclose class="rounded-md w-full">
        <form class="grid grid-flow-row gap-4" on:submit={submit}>
          <!---->
          <div class="flex flex-wrap justify-start items-center gap-2">
            <P for="userType" weight="bold" size="base" class="text-gray-700">User Type</P>
            <Select data-te-select-init id="userType" name="userType" placeholder="Choose User Type..." size="sm" class="rounded-md font-medium text-gray-500 border-orange-700">
              <option value="Personnel">Personnel</option>
              <option value="Admin">Admin</option>
            </Select>
          </div>

          <div class="flex flex-wrap justify-start items-center gap-2">
            <P for="firstName" weight="bold" size="base" class="text-gray-700">First Name</P>
            <Input type="text" id="firstName" name="firstName" size="sm" class="rounded-md font-medium text-gray-500 border-orange-700"></Input>
          </div>

          <div class="flex flex-wrap justify-start items-center gap-2">
            <P for="middleName" weight="bold" size="base" class="text-gray-700">Middle Name</P>
            <Input type="text" id="middleName" name="middleName" size="sm" class="rounded-md font-medium text-gray-500 border-orange-700"></Input>
          </div>

          <div class="flex flex-wrap justify-start items-center gap-2">
            <P for="lastName" weight="bold" size="base" class="text-gray-700">Last Name</P>
            <Input type="text" id="lastName" name="lastName" size="sm" class="rounded-md font-medium text-gray-500 border-orange-700"></Input>
          </div>

          <div class="flex flex-wrap justify-start items-center gap-2">
            <P for="suffix" weight="bold" size="base" class="text-gray-700">Suffix</P>
            <Input type="text" id="suffix" name="suffix" size="sm" class="rounded-md font-medium text-gray-500 border-orange-700"></Input>
          </div>

          <div class="flex flex-wrap justify-start items-center gap-2">
            <P for="userID" weight="bold" size="base" class="text-gray-700">Username</P>
            <Input type="text" id="userID" name="userID" size="sm" class="rounded-md font-medium text-gray-500 border-orange-700"></Input>
          </div>

          <div class="flex flex-wrap justify-start items-center gap-2">
            <P for="email" weight="bold" size="base" class="text-gray-700">Email</P>
            <Input type="text" id="email" name="email" size="sm" class="rounded-md font-medium text-gray-500 border-orange-700"></Input>
          </div>

          <div class="flex flex-wrap justify-start items-center gap-2">
            <P for="password" weight="bold" size="base" class="text-gray-700">Password</P>
            <Input type="password" id="password" name="password" size="sm" class="rounded-md font-medium text-gray-500 border-orange-700"></Input>
          </div>

          <Button on:click={() => alert('Handle "success"')} type="submit" color="blue" size="md" class="rounded-md w-full">Create Personnel Account</Button>
        </form>
      </Modal>

      <div class="flex justify-center items-center gap-2 shadow-lg border rounded-md p-3">
        <P size="lg" weight="medium" class="text-gray-500">No accounts</P>
      </div>

      <!--personnel accounts-->
      <div class="grid grid-flow-row gap-2 shadow-lg border rounded-md p-3">
        <div class="grid grid-flow-row items-center gap-0">
          <div class="flex justify-between items-center gap-2 p-2 rounded-md hover:bg-orange-100">
            <div class="flex justify-start items-center gap-2">
              <UserOutline size="sm" class="text-blue-700" />
              <P size="base" weight="semibold" class="">Agnes T. Reyes</P>
              <P size="base" weight="bold" class="text-gray-500">·</P>
              <P weight="normal" size="sm" class="line-clamp-1 text-gray-500 w-96">Created in <span class="font-medium text-gray-500">January 21, 2023</span></P>
            </div>
            <div class="flex justify-start items-center gap-0">
              <Button outline color="blue" size="sm" class="flex items-center rounded-full border-none gap-2 p-1.5"><EyeOutline size="sm" /></Button>
              <Button outline color="blue" size="sm" class="flex items-center rounded-full border-none gap-2 p-1.5"><DotsHorizontalOutline size="sm" /></Button>
              <Dropdown>
                <DropdownItem>
                  <div class="flex justify-start items-center gap-2">
                    <TrashBinOutline size="sm" class="text-blue-700" />Delete Account
                  </div>
                </DropdownItem>
              </Dropdown>
            </div>
          </div>

          <div class="flex justify-between items-center gap-2 p-2 rounded-md hover:bg-orange-100">
            <div class="flex justify-start items-center gap-2">
              <UserOutline size="sm" class="text-blue-700" />
              <P size="base" weight="semibold" class="">Agnes T. Reyes</P>
              <P size="base" weight="bold" class="text-gray-500">·</P>
              <P weight="normal" size="sm" class="line-clamp-1 text-gray-500 w-96">Created in <span class="font-medium text-gray-500">January 21, 2023</span></P>
            </div>
            <div class="flex justify-start items-center gap-0">
              <Button outline color="blue" size="sm" class="flex items-center rounded-full border-none gap-2 p-1.5"><EyeOutline size="sm" /></Button>
              <Button outline color="blue" size="sm" class="flex items-center rounded-full border-none gap-2 p-1.5"><DotsHorizontalOutline size="sm" /></Button>
              <Dropdown>
                <DropdownItem>
                  <div class="flex justify-start items-center gap-2">
                    <TrashBinOutline size="sm" class="text-blue-700" />Delete Account
                  </div>
                </DropdownItem>
              </Dropdown>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
  