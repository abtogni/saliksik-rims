<script lang='ts'>
    import { onMount } from "svelte";
  
    const currentURL = window.location.href;
    const urlParts = currentURL.split('/');
    const researchID = urlParts[urlParts.length - 1];
  
    let research: any = null;
    let loading = true;
    let error: any = null;
  
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
  
    function isValidResearchID(id: any) {
      // Add validation logic for research ID here, if needed
      return id !== null && id !== undefined && id.trim() !== "";
    }
  
    let memberNames: any[] = [];
  
    async function fetchNames(memberIds: any) {
      for (const memberId of memberIds) {
        const response = await fetch(`/api/user/getUser?id=${memberId}`);
        if (response.ok) {
          const user = await response.json();
          memberNames.push(`${user.firstName} ${user.lastName}`);
        } else {
          memberNames.push('Unknown Member');
        }
      }
    }
  
    onMount(async () => {
      await fetchResearch();
  
      if (research && research.researchMembers) {
        await fetchNames(research.researchMembers).then(() => {
          memberNames = [...memberNames]; // Trigger Svelte reactivity
        });
      }
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
      <p>Members: {memberNames.join(', ')}</p>
    {/if}
  </main>
  