<script lang="ts">
    import { Button, P} from "flowbite-svelte";
    import { InfoCircleOutline } from "flowbite-svelte-icons";
    export let propValue: any;
    let data = { researchStatus: 'Rejected' };
  
    function reject(_e: Event){
      fetch(`/api/research/updateResearch?researchID=${propValue}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.ok) {
            window.alert('Rejected');
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
<P weight="normal" size="base" class="text-center">Once, you click the reject button. You can find the Concept Note in the Reject tab of the Research Dashboard</P>
<div class="flex gap-2">
<Button class="w-full" on:click={reject}>Reject</Button>
<Button class="w-full">Cancel</Button>
</div>