<script lang="ts">
  import { DateInput } from "date-picker-svelte";
  import { P, Button, MultiSelect, Input } from "flowbite-svelte";
  import { CalendarPlusSolid, CalendarMonthOutline, MessageCaptionOutline, FileCirclePlusOutline, MinusOutline, CirclePlusOutline, FileLinesOutline, CalendarWeekOutline } from "flowbite-svelte-icons";
  import { researches } from "../components/store";
  import { onMount } from "svelte";

  var researchTitles: any[] = [],
    researchList: any,
    addedResearches: any;

  onMount(async () => {
    researchList = $researches.map((research: any) => ({
      value: `${research._id}`,
      name: `${research.researchTitle} `,
    }));
  });

  function addResearch(e: Event) {
    researchList = researchList.filter((x: any) => !researchTitles.includes(x.value));
    addedResearches = $researches
      .filter((r) => researchTitles.includes(r._id))
      .map((r) => ({
        _id: r._id,
        researchTitle: r.researchTitle,
      }));
    researchTitles = [];
  }

  console.log(addedResearches);

  function submit(e: Event) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    let json = Object.fromEntries(formData.entries());
    json = {...json, presentationDate};
    console.log(JSON.stringify(json));

    // fetch("/api/research/createPresentation", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(json),
    // })
    //   .then((response) => {
    //     if (response.ok) {
    //       window.location.href = "/main/";
    //     } else {
    //       console.error("Error occured");
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Network error:", error);
    //   });
  }

  //modal for add schedule
  let addSchedule = false;
</script>

<form class="flex flex-col gap-2" on:submit={submit}>
  <!--modal date and time-->
  <div class="grid grid-flow-row gap-2 border-b pb-2">
    <div class="flex justify-start items-center gap-2">
      <CalendarMonthOutline size="sm" class="text-blue-700" />
      <P for="researchLeaders" weight="semibold" size="base" class="text-gray-700">Date and Time</P>
    </div>
    <div class="flex justify-start items-center gap-2 px-2 py-0">
      <CalendarWeekOutline size="sm" class="text-blue-700" />
      <DateInput format="yyyy-MM-dd" placeholder="yyyy-MM-dd" required --date-picker-highlight-border="#1d4ed8" --date-picker-highlight-shadow="none" --date-input-width="100%" class="w-full rounded-md text-gray-500  " />
    </div>
  </div>

  <!--modal add presenter-->
  <div class="grid grid-flow-row gap-2 border-b ">
    <div class="flex justify-start items-center gap-2">
      <FileCirclePlusOutline size="sm" class="text-blue-700" />
      <P for="researchLeaders" weight="semibold" size="base" class="whitespace-nowrap text-gray-700">Add Research</P>
    </div>
    <div class="flex justify-start items-center gap-2 rounded-md w-full">
      <div class="gap-2 w-full">
        <MultiSelect required items={researchList} bind:value={researchTitles} size="md" class="text-sm font-medium rounded-md focus:ring-blue-700 focus:border-blue-700 text-gray-500" />
      </div>
      <div class="flex items-center gap-2">
        <Button color="blue" size="sm" class="flex items-center gap-2 rounded-md whitespace-nowrap" on:click={addResearch}><CirclePlusOutline size="sm" />Add</Button>
      </div>
    </div>
    <div class="">
      {#if addedResearches}
      {#each addedResearches as r}
        <div class="flex justify-between items-center p-2 rounded-md border-b hover:bg-blue-50">
          <div class="flex justify-between items-center gap-2">
            <FileLinesOutline size="sm" class="text-blue-700" />
            <div class="flex items-center gap-0">
              <!-- Your Avatar and Tooltip elements here -->
            </div>
            <P for="researchLeaders" weight="semibold" size="sm" class="line-clamp-2 text-gray-500">{r.researchTitle}</P>
          </div>
          <Button outline color="blue" size="sm" class="flex items-center rounded-full border-none gap-2 p-1"><MinusOutline size="sm" /></Button>
        </div>
      {/each}
    {/if}
    </div>
    
  </div>

  <!--modal add panelist-->
  <div class="grid grid-flow-row gap-1">
    <div class="flex justify-between items-center gap-2">
      <div class="flex justify-start items-center gap-2">
        <MessageCaptionOutline size="sm" class="text-blue-700" />
        <P for="researchLeaders" weight="semibold" size="base" class="whitespace-nowrap text-gray-700">Add Panelist</P>
      </div>
    </div>
    <div class="flex justify-start items-center gap-2 rounded-md w-full">
      <div class="gap-2 w-full">
        <MultiSelect required size="md" class="text-sm font-medium rounded-md focus:ring-blue-700 focus:border-blue-700 text-gray-500" />
      </div>
      <div class="flex items-center gap-2">
        <Button color="blue" size="sm" class="flex items-center gap-2 rounded-md whitespace-nowrap"><CirclePlusOutline size="sm" />Add</Button>
      </div>
    </div>
    <div class="flex justify-between items-center p-2 rounded-md hover:bg-blue-50">
      <div class="flex justify-start items-center gap-2">
        <MessageCaptionOutline size="sm" class="text-blue-700" />
        <P for="researchLeaders" weight="semibold" size="sm" class="text-gray-500"><Input type="text" id="panelistNames" name="panelistNames" placeholder="Insert Panelist Name" required /></P>
      </div>
      <Button outline color="blue" size="sm" class="flex items-center rounded-full border-none gap-2 p-1"><MinusOutline size="sm" /></Button>
    </div>
  </div>
  <Button on:click={() => alert('Handle "success"')} type="submit" color="blue" size="md" class="rounded-md w-full mt-6">Add Schedule</Button>
</form>
