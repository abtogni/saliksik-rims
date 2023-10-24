<script lang='ts'>
    import { onMount } from "svelte";

    const currentURL = window.location.href;
    const urlParts = currentURL.split('/');
    const proposalID = urlParts[urlParts.length - 1];

    let proposal: any = null, loading = true, error: any = null;

    async function fetchProposal() {
    if (!isValidID(proposalID)) {
      error = "Invalid proposal ID";
      loading = false;
      return;
    }

    try {
      const response = await fetch(`/api/research/getProposal?proposalID=${proposalID}`);

      if (response.ok) {
        proposal = await response.json();
      } else {
        // Handle non-OK responses here
        if (response.status === 404) {
          error = "Concept note not found";
        } else {
          error = "Failed to fetch Concept note";
        }
      }
    } catch (error) {
      console.error('Error fetching Concept note:', error);
      error = "Error fetching Concept note";
    } finally {
      loading = false;
    }
  }

  function isValidID(id: any) {
    return id !== null && id !== undefined && id.trim() !== "";
  }

  onMount(async () => {
    await fetchProposal();
  });
</script>


<div class="container">
    {#if loading}
        <p>Loading...</p>
    {:else if error}
        <p>Error: {error}</p>
    {:else if proposal}
        {proposal.data._id}
    {/if}
    <div class="body">woah</div>
</div>
