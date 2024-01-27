<script lang='ts'>
    import { DateInput } from "date-picker-svelte";
    import { Modal, P, Checkbox, Avatar, Tooltip, Button } from "flowbite-svelte";
    import { CalendarPlusSolid, CalendarMonthOutline, UserAddOutline, MessageCaptionOutline, FileCirclePlusOutline, CalendarEditOutline, MessageCaptionSolid, CloseOutline } from "flowbite-svelte-icons";

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



    <form class="grid grid-flow-row gap-6" on:submit={submit}>
      <!--modal date and time-->
      <div class="grid grid-flow-row gap-2">
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
      <div class="grid grid-flow-row gap-2">
        <div class="flex justify-between items-center gap-2">
          <div class="flex justify-start items-center gap-2">
            <UserAddOutline size="sm" class="text-blue-700" />
            <P for="researchLeaders" weight="bold" size="base" class="text-gray-700">Add Presenter</P>
          </div>
          <div class="">
            <Checkbox color="blue" class="text-gray-500">Select All</Checkbox>
          </div>
        </div>
        <div class="">
          <div class="flex justify-between items-center gap-2 p-2 rounded-md hover:bg-orange-50">
            <Checkbox color="blue" class="w-full  text-gray-500 ">Insert Research Title</Checkbox>
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
          </div>
        </div>
      </div>

      <!--modal add panelist-->
      <div class="grid grid-flow-row gap-2">
        <div class="flex justify-between items-center gap-2">
          <div class="flex justify-start items-center gap-2">
            <MessageCaptionOutline size="sm" class="text-blue-700" />
            <P for="researchLeaders" weight="bold" size="base" class="text-gray-700">Add Panelist</P>
          </div>
          <div class="flex justify-start items-center gap-2">
            <Button color="blue" size="sm" class="flex items-center gap-2 rounded-md"><FileCirclePlusOutline size="sm" />Add Existing Panelist</Button>
            <Button outline color="blue" size="sm" class="flex items-center gap-2 rounded-md"><CalendarEditOutline size="sm" />Create New Panelist</Button>
          </div>
        </div>

        <div class="">
          <div class="flex justify-between items-center p-2 rounded-md hover:bg-orange-50">
            <div class="flex justify-start items-center gap-2">
              <MessageCaptionSolid size="sm" class="text-blue-700" />
              <P for="researchLeaders" weight="semibold" size="sm" class="text-gray-500">Insert Panelist Name</P>
            </div>
            <div class="">
              <Button outline color="blue" size="sm" class="flex items-center rounded-full border-none gap-2 p-2"><CloseOutline size="xs" /></Button>
            </div>
          </div>
        </div>
      </div>

      <Button on:click={() => alert('Handle "success"')} type="submit" color="blue" size="md" class="rounded-md w-full">Add Schedule</Button>
    </form>