<script lang="ts">
  import { DateInput } from "date-picker-svelte";
  import { Modal, P, Checkbox, Avatar, Tooltip, Button, MultiSelect } from "flowbite-svelte";
  import { CalendarPlusSolid, CalendarMonthOutline, UserAddOutline, MessageCaptionOutline, FileCirclePlusOutline, CalendarEditOutline, MessageCaptionSolid, CloseOutline, MinusOutline, CirclePlusOutline, FileLinesOutline } from "flowbite-svelte-icons";

  function submit(e: Event) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    let json = Object.fromEntries(formData.entries());

    fetch("/api/research/createPresentation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(json),
    })
      .then((response) => {
        if (response.ok) {
          window.location.href = "/main/";
        } else {
          console.error("Error occured");
        }
      })
      .catch((error) => {
        console.error("Network error:", error);
      });
  }

  //modal for add schedule
  let addSchedule = false;
</script>

<form class="flex flex-col gap-2">
  <!--modal date and time-->
  <div class="grid grid-flow-row gap-2 border-b pb-5">
    <div class="flex justify-start items-center gap-2">
      <CalendarPlusSolid size="sm" class="text-blue-700" />
      <P for="researchLeaders" weight="bold" size="base" class="text-gray-700">Date and Time</P>
    </div>
    <div class="flex justify-start items-center gap-2 px-2 py-0">
      <CalendarMonthOutline size="sm" class="text-blue-700" />
      <DateInput format="yyyy-MM-dd" placeholder="yyyy-MM-dd" required --date-picker-highlight-border="#b43403" --date-picker-highlight-shadow="none" --date-input-width="100%" class="w-full rounded-md text-gray-500  " />
    </div>
  </div>

  <!--modal add presenter-->
  <div class="grid grid-flow-row gap-2 border-b pb-5">
    <div class="flex justify-start items-center gap-2">
      <FileCirclePlusOutline size="sm" class="text-blue-700" />
      <P for="researchLeaders" weight="bold" size="base" class="whitespace-nowrap text-gray-700">Add Research</P>
      <div class="flex justify-start items-center gap-2 p-2 rounded-md w-full">
        <div class="gap-2 w-full">
          <MultiSelect required size="sm" class="" />
        </div>
        <div class="flex items-center gap-2">
          <Button color="blue" size="sm" class="flex items-center gap-2 rounded-md whitespace-nowrap"><CirclePlusOutline size="sm" />Add</Button>
        </div>
      </div>
    </div>

    <div class="flex justify-between items-center p-2 rounded-md hover:bg-blue-50">
      <div class="flex justify-between items-center gap-2">
        <FileLinesOutline size="sm" class="text-blue-700" />
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
        <P for="researchLeaders" weight="semibold" size="sm" class="text-gray-500">Insert Research Title</P>
      </div>
      <Button outline color="blue" size="sm" class="flex items-center rounded-full border-none gap-2 p-1"><MinusOutline size="sm" /></Button>
    </div>
  </div>

  <!--modal add panelist-->
  <div class="grid grid-flow-row gap-2">
    <div class="flex justify-between items-center gap-2">
      <div class="flex justify-start items-center gap-2">
        <MessageCaptionOutline size="sm" class="text-blue-700" />
        <P for="researchLeaders" weight="bold" size="base" class="whitespace-nowrap text-gray-700">Add Panelist</P>
      </div>
      <div class="flex justify-start items-center gap-2 p-2 rounded-md w-full">
        <div class="gap-2 w-full">
          <MultiSelect required size="sm" class="" />
        </div>
        <div class="flex items-center gap-2">
          <Button color="blue" size="sm" class="flex items-center gap-2 rounded-md whitespace-nowrap"><CirclePlusOutline size="sm" />Add</Button>
        </div>
      </div>
    </div>
    <div class="flex justify-between items-center p-2 rounded-md hover:bg-blue-50">
      <div class="flex justify-start items-center gap-2">
        <MessageCaptionOutline size="sm" class="text-blue-700" />
        <P for="researchLeaders" weight="semibold" size="sm" class="text-gray-500">Insert Panelist Name</P>
      </div>
      <Button outline color="blue" size="sm" class="flex items-center rounded-full border-none gap-2 p-1"><MinusOutline size="sm" /></Button>
    </div>
  </div>
  <Button on:click={() => alert('Handle "success"')} type="submit" color="blue" size="md" class="rounded-md w-full mt-6">Add Schedule</Button>
</form>
