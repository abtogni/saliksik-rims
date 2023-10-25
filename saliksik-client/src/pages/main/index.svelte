<script lang='ts'>
    import { onMount } from "svelte";
    export let scoped: any;
    
    $: ({userID} = scoped)

    var researches: any;
    let loading = true; // Initialize loading to true
    let error: string | null = null; // Initialize error as null

    async function fetchResearches() {
        try {
            const response = await fetch(`/api/research/getUserResearches?userID=${userID}`);

            if (response.ok) {
                researches = await response.json();
            } else {
                console.error('Failed to fetch researches');
                // Set the error message when fetching fails
                error = 'Failed to fetch researches';
            }
        } catch (err) {
            console.error('Error fetching researches:', err);
            // Set the error message in case of an error
            error = 'Error fetching researches';
        } finally {
            // Set loading to false once the operation is completed
            loading = false;
        }
    }

    onMount(() => {
        fetchResearches();
    })
</script>

<main>
    <a href="/main/createResearch" class="bg-button hover:bg-button-hover text-white font-bold py-2 mb-4 px-4 rounded">Create Research</a>
    {#if loading}
        <p>Loading...</p>
    {:else if error}
        <p>Error: {error}</p>
    {:else if researches}
        {#each researches as r}
            <div class="grid grid-cols-1">
                <a href={`/main/${r._id}`}>{r.researchTitle}</a>
            </div>
        {/each}
    {:else}
        <p>No researches found</p>
    {/if}
</main>
