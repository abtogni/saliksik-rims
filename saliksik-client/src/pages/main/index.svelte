<script lang='ts'>
    import { onMount } from "svelte";
    export let scoped: any;
    
    $: ({userID} = scoped)


    var researches: any;

    async function fetchResearches(){
        fetch(`/api/research/getUserResearches?userID=${userID}`)
    .then(async (response) => {
        if (response.ok) {
            researches = await response.json();
        } else {
            console.error('Failed to fetch researches');
        }
  })
  .catch((error) => {
    console.error('Error fetching researches:', error);
  });
    }

    onMount(() => {
        fetchResearches();
    })

</script>

<main>
  {#if researches}
    {#each researches as r}
        <div class="grid grid-cols-1">
            {r.researchTitle} 
        </div>
        
    {/each}
  {:else}
     No researches found
  {/if}
</main>