<script lang="ts">
  import { Button, Helper, Label, MultiSelect, P, Textarea, Modal } from "flowbite-svelte";
  import { FolderPlusOutline, InfoCircleOutline, CheckCircleOutline } from "flowbite-svelte-icons";
  import { onMount } from "svelte";

  
</script>

<div class="grid grid-flow-row gap-2" >
  <div class="flex justify-center items-center">
    <InfoCircleOutline color="blue" size="xl" />
  </div>
  <P weight="normal" size="base" class="text-center">Once, the Concept Note is approved. A Notice To Proceed will be sent to the researcher.</P>
  <div class="flex justify-evenly items-center gap-2 w-full mt-4">
    <Button type="submit" color="blue" size="sm" class="flex items-center gap-2 w-full rounded-md"><CheckCircleOutline size="sm" /> Approve</Button>
    <Button type="submit" outline color="blue" size="sm" class="flex items-center gap-2 w-full rounded-md"
      ><svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m13 7-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg> Reject</Button>
  </div>

</div>
  
