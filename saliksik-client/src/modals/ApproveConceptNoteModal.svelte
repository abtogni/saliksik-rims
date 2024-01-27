<script lang="ts">
  import { Button, P} from "flowbite-svelte";
  import { InfoCircleOutline } from "flowbite-svelte-icons";
  export let propValue: any;

  let data = { researchStatus: 'Approved' };

  function approve(_e: Event){
    fetch(`/api/research/updateResearch?researchID=${propValue}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          window.alert('Approved');
        } else {
          console.error("Error occured");
        }
      })
      .catch((error) => {
        console.error("Network error:", error);
      });
  }

</script>

<div class="flex justify-center items-center">
  <InfoCircleOutline size="xl" />
</div>
<P weight="normal" size="base" class="text-center">Once, the Concept Note is approved. A Notice To Proceed will be sent to the owner.</P>
<div class="flex gap-2">
  <Button class="w-full" on:click={approve}>Approve</Button>
  <Button class="w-full">Cancel</Button>
</div>
  
