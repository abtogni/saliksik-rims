<script lang="ts">
  import { DateInput } from "date-picker-svelte";
  import { P, Button, MultiSelect, Input } from "flowbite-svelte";
  import { CalendarPlusSolid, CalendarMonthOutline, MessageCaptionOutline, FileCirclePlusOutline, MinusOutline, CirclePlusOutline, FileLinesOutline, CalendarWeekOutline } from "flowbite-svelte-icons";
  import { researches, panelist } from "../components/store";
  import { onMount } from "svelte";
    import { getPanelists } from "../components/fetch";

  var selectedResearches: any[] = [], currentResearches: any[] = [], researchList: any,addedResearches: any, presentationDate:any;

  var selectedPanelists: any[] = [], currentPanelists: any[] = [], addedPanelists: any = [], panelistView: any;
  onMount(async () => {
    getPanelists();
    panelistView = $panelist.map((p: any)=>({
      value: `${p._id}`,
      name: `${p.firstName} ${p.lastName}`
    }))
    researchList = $researches.map((research: any) => ({
      value: `${research._id}`,
      name: `${research.researchTitle} `,
    }));
  });

  function addPanelist(e: Event) {
    currentPanelists.push(...selectedPanelists);
    selectedPanelists = [];
    addedPanelists = $panelist
      .filter((r) => currentPanelists.includes(r._id))
      .map((r) => ({
        _id: r._id,
        firstName: r.firstName,
        lastName: r.lastName
      }));
      
  }


  function addResearch(e: Event) {
    currentResearches.push(...selectedResearches);
    selectedResearches = [];
    researchList = researchList.filter((x: any) => !currentResearches.includes(x.value));
    addedResearches = $researches
      .filter((r) => currentResearches.includes(r._id))
      .map((r) => ({
        _id: r._id,
        researchTitle: r.researchTitle,
      }));
      
  }

  function submit(e: Event) {
    e.preventDefault();
    const researchIDs = addedResearches.map((r:any) => r._id);
    const panelistNames = addedPanelists.map((p:any) => `${p.firstName} ${p.lastName}`);
    const formData = new FormData(e.target as HTMLFormElement);
    let json = Object.fromEntries(formData.entries());
    json = {...json, presentationDate, researchIDs, panelistNames};
    console.log(JSON.stringify(json));

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

<form class="flex flex-col gap-2" on:submit={submit}>
  <!--modal date and time-->
  <div class="grid grid-flow-row gap-2 border-b pb-2">
    <div class="flex justify-start items-center gap-2">
      <CalendarMonthOutline size="sm" class="text-blue-700" />
      <P for="researchLeaders" weight="semibold" size="base" class="text-gray-700">Date and Time</P>
    </div>
    <div class="flex justify-start items-center gap-2 px-2 py-0">
      <CalendarWeekOutline size="sm" class="text-blue-700" />
      <DateInput format="yyyy-MM-dd" bind:value={presentationDate} placeholder="YYYY-MM-DD" required --date-picker-highlight-border="#1d4ed8" --date-picker-highlight-shadow="none" --date-input-width="100%" class="w-full rounded-md text-gray-500  " />
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
        <MultiSelect disabled items={researchList} name="researchList" bind:value={selectedResearches} size="md" class="text-sm font-medium rounded-md focus:ring-blue-700 focus:border-blue-700 text-gray-500" />
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
              <!-- Avatar and Tooltip elements here -->
            </div>
            <Input type="hidden" name="researchIDs" value={r._id} />
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
        <MultiSelect disabled items={panelistView} name="panelistList" bind:value={selectedPanelists} size="md" class="text-sm font-medium rounded-md focus:ring-blue-700 focus:border-blue-700 text-gray-500" />
      </div>
      <div class="flex items-center gap-2">
        <Button color="blue" size="sm" on:click={addPanelist} class="flex items-center gap-2 rounded-md whitespace-nowrap" ><CirclePlusOutline size="sm" />Add</Button>
      </div>
    </div>
    
      {#if addedPanelists}
         {#each addedPanelists as p}
         <div class="flex justify-between items-center p-2 rounded-md border-b hover:bg-blue-50">
          <div class="flex justify-start items-center gap-2">
            <MessageCaptionOutline size="sm" class="text-blue-700" />
            <P for="researchLeaders" weight="semibold" size="sm" class="text-gray-500">{`${p.firstName} ${p.lastName}`}</P>
          </div>
          <Button outline color="blue" size="sm" class="flex items-center rounded-full border-none gap-2 p-1"><MinusOutline size="sm" /></Button>
        </div>
          {/each}
      {/if}
      
      
    
  </div>
  <Button on:click={() => alert('Handle "success"')} type="submit" color="blue" size="md" class="rounded-md w-full mt-6">Add Schedule</Button>
</form>
