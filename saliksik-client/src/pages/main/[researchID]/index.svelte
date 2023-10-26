<script lang="ts">
  import { onMount } from "svelte";

  const currentURL = window.location.href;
  const urlParts = currentURL.split('/');
  const researchID = urlParts[urlParts.length - 1];

  let research: any = null, loading = true, error: any = null;
  let memberNames: any[] = [], leaderNames: any[] = [], proposals: any[] = [];

  async function fetchResearch() {
    if (!isValidResearchID(researchID)) {
      error = "Invalid research ID";
      loading = false;
      return;
    }

    try {
      const response = await fetch(`/api/research/getResearch?researchID=${researchID}`);

      if (response.ok) {
        research = await response.json();
      } else {
        // Handle non-OK responses here
        if (response.status === 404) {
          error = "Research not found";
        } else {
          error = "Failed to fetch research";
        }
      }
    } catch (error) {
      console.error('Error fetching research:', error);
      error = "Error fetching research";
    } finally {
      loading = false;
    }
  }

  async function fetchProposals() {
    try {
      const response = await fetch(`/api/research/getProposals?researchID=${researchID}`);

      if (response.ok) {
        const data = await response.json();
        proposals = data.data;
      } else {
        error = "Failed to fetch proposals";
      }
    } catch (error) {
      console.error('Error fetching proposals:', error);
      error = "Error fetching proposals";
    }
  }

  function isValidResearchID(id: any) {
    return id !== null && id !== undefined && id.trim() !== "";
  }

  async function fetchNames(ids: any[], names: any[]) {
  const validIds = ids.filter(id => id && typeof id === 'string' && id.trim() !== '');

  const promises = validIds.map(async (id) => {
    try {
      const response = await fetch(`/api/user/getUser?id=${id}`);
      if (response.ok) {
        const user = await response.json();
        return `${user.firstName} ${user.lastName}`;
      } else {
        return 'Unknown Member';
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      return 'Unknown Member';
    }
  });

  try {
    const resultNames = await Promise.all(promises);
    names.length = 0; // Clear the array
    names.push(...resultNames); // Add the fetched names
  } catch (error) {
    console.error('Error processing user names:', error);
  }
}


  onMount(async () => {
    await fetchResearch();
    if (research && research.researchMembers) {
      await fetchNames(research.researchMembers, memberNames);
      memberNames = memberNames;
    }
    
    if (research && research.researchLeaders) {
      await fetchNames(research.researchLeaders, leaderNames);
      leaderNames = leaderNames;
    }

    await fetchProposals().then(() =>{ proposals = proposals });


    
    loading = false;
  });
</script>

<main>
  <button class="bg-button hover:bg-button-hover text-white font-bold py-2 mb-4 px-4 rounded">
    <a href={`/main/${researchID}/createProposal`}>Create Concept Note</a>
  </button>

  {#if loading}
    <p>Loading...</p>
  {:else if error}
    <p>Error: {error}</p>
  {:else if research}
    <h2>{research.researchTitle}</h2>
    <p>Leaders: {leaderNames.join(', ')}</p>
    <p>Members: {memberNames.join(', ')}</p>
    {#if proposals}
      <h1>Proposals</h1>
      {#each proposals as p, index}
      <a href={`/main/${researchID}/${p._id}`}>{index}</a>
      {/each}
    {/if}
  {/if}
  
</main>
