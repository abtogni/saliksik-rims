<script lang="ts">
  import { A, Alert, Avatar, Badge, Button, Checkbox, Dropdown, DropdownItem, Indicator, Input, Modal, P, Search, Select, Tooltip } from "flowbite-svelte";
  import { ArchiveOutline, BellActiveAltOutline, DotsHorizontalOutline, EyeOutline, FolderPlusOutline, QuestionCircleOutline, StarOutline, StarSolid, TrashBinOutline, UserAddOutline, UserOutline } from "flowbite-svelte-icons";
  import { getUserList } from "../../../components/fetch";
  import { userList } from "../../../components/store";
  import { onMount } from "svelte";
  import moment from "moment";

  onMount(async () => {
    try {
      await getUserList();
    } catch (error) {
      console.error("Network error:", error);
    }
  });

  let json = {};
  let message: any;
  function submit(e: Event) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    json = Object.fromEntries(formData.entries());

    // Make an HTTP POST request to the API
    fetch("/api/user/createAccount", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(json),
    })
      .then((response) => {
        if (response.ok) {
          message = "Created an account!";
        } else {
          // Handle errors or authentication failures
          console.error("Registration failed");
        }
      })
      .catch((error) => {
        console.error("Network error:", error);
      });
  }

  //modal for create personnel account
  let createPersonnelAccount = false;
</script>

<main class="p-4">
  <div class="flex justify-center gap-2 bg-gray-50">
    <div class="grid grid-flow-row items-center gap-2 w-1/2 sm:w-full md:w-full lg:w-11/12 xl:w-8/12 2xl:w-1/2">
      <Alert dismissable color="blue" class="border-l-8 mb-2">
        <div class="flex items-center gap-2">
          <QuestionCircleOutline slot="icon" size="sm" />
          <span class="text-lg font-medium">Personnel Accounts</span>
        </div>
        <p class="mt-2 text-sm">Insert helper text</p>
      </Alert>

      <!---->
      <div class="flex flex-wrap justify-start items-center gap-0 w-full">
        <div class="flex justify-between items-center gap-2 w-full">
          <div class="flex items-center gap-2">
            <UserOutline size="md" class="text-blue-700" />
            <P size="xl" weight="bold" class="text-gray-900">{$userList.length} <span class="text-gray-500">User Accounts</span></P>
          </div>

          <div class="flex items-center gap-2">
            <Button on:click={() => (createPersonnelAccount = true)} color="blue" size="sm" class="flex items-center gap-2 rounded-md"><UserAddOutline size="sm" />Create Personnel Account</Button>
          </div>
        </div>
        <P size="sm" weight="normal" class="text-gray-500">Create and organize user accounts.</P>
      </div>
      <!--
      <div class="grid grid-flow-row justify-center w-full shadow-lg border rounded-lg gap-2 p-3 mb-4 bg-white">
        <P size="sm" weight="normal" class="text-gray-500">No existing account...<span></span></P>
      </div>
      -->

      <!--personnel accounts-->
      <div class="grid grid-flow-row w-full shadow-lg border rounded-lg bg-white">
        <div class="grid grid-flow-row items-center gap-0">
          {#each $userList as user}
            <div class="flex justify-between items-center gap-2 px-4 py-3 border-b hover:bg-blue-50">
              <div class="flex justify-start items-center gap-2">
                <UserOutline size="sm" class="text-blue-700" />
                <P size="base" weight="semibold" class="whitespace-nowrap">{user.firstName} {user.lastName}</P>
                <P size="base" weight="bold" class="text-gray-500">·</P>
                <P weight="normal" size="sm" class="line-clamp-1 text-gray-500 w-96">Created in <span class="font-medium text-gray-500">{moment(user.createdAt).format("LL")}</span></P>
              </div>
              <div class="flex justify-start items-center gap-0">
                <Button outline color="blue" size="sm" class="flex items-center rounded-full border-none gap-2 p-1"><EyeOutline size="sm" /></Button>
                <Button outline color="blue" size="sm" class="flex items-center rounded-full border-none gap-2 p-1"><DotsHorizontalOutline size="sm" /></Button>
                <Dropdown>
                  <DropdownItem>
                    <div class="flex justify-start items-center gap-2">
                      <TrashBinOutline size="sm" class="text-blue-700" />Delete Account
                    </div>
                  </DropdownItem>
                </Dropdown>
              </div>
            </div>
          {/each}
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
            <Input type="email" id="email" name="email" size="sm" class="rounded-md font-medium text-gray-500 border-orange-700"></Input>
          </div>

          <div class="flex flex-wrap justify-start items-center gap-2">
            <P for="password" weight="bold" size="base" class="text-gray-700">Password</P>
            <Input type="password" id="password" name="password" size="sm" class="rounded-md font-medium text-gray-500 border-orange-700"></Input>
          </div>

          <Button on:click={() => alert('Handle "success"')} type="submit" color="blue" size="md" class="rounded-md w-full">Create Personnel Account</Button>
        </form>
      </Modal>
    </div>
  </div>
  <div class="h-96"></div>
  <div class="h-96"></div>
</main>
