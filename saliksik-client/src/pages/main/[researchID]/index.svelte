<script lang="ts">
  import { onMount } from "svelte";
  import { updateResearch } from "../../../components/store";
  import { researchData } from "../../../components/store";
  import { Avatar, Card, Listgroup } from "flowbite-svelte";
  import moment from "moment";

  const currentURL = window.location.href;
  const urlParts = currentURL.split('/');
  const researchID = urlParts[urlParts.length - 1];

  let loading = true, error: any = null;
  let memberNames = [{
    firstName: '',
    lastName: '',
    avatar: '',
  }]
  let leaderNames = [{
    firstName: '',
    lastName: '',
    avatar: '',
  }]
  let proposals: any[] = [];

  async function fetchResearch() {
    if (!isValidResearchID(researchID)) {
      error = "Invalid research ID";
      loading = false;
      return;
    }

    try {
      const response = await fetch(`/api/research/getResearch?researchID=${researchID}`);

      if (response.ok) {
        const research = await response.json();
        updateResearch({
           _id: research._id,
          researchTitle: research.researchTitle,
          researchLeaders: research.researchLeaders,
          researchMembers: research.researchMembers,
          researchAgency: research.researchAgency,
          researchStatus: research.researchStatus,
          createdAt: research.createdAt,
        });
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
      const response = await fetch(`/api/research/getProposalsByID?researchID=${researchID}`);

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
        const names = {
          firstName: user.firstName,
          lastName: user.lastName,
          avatar: user.firstName.charAt(0)+user.lastName.charAt(0)
        }
        return names
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
    if ($researchData) {
      await fetchNames($researchData.researchMembers, memberNames);
      memberNames = memberNames;
    }
    
    if ($researchData) {
      await fetchNames($researchData.researchLeaders, leaderNames);
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
  {:else if $researchData}
    <h2 class="p-5 text-2xl font-bold">{$researchData.researchTitle}</h2>
    <h3>Research Agency: {$researchData.researchAgency}</h3>
    <h3>Created at: {moment($researchData.createdAt).format("MMMM Do YYYY")}</h3>
    <Card size='sm'>
      <div class="flex justify-between items-center mb-4">
        <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Research Leaders</h5>
      </div>
      <Listgroup items={leaderNames} let:item class="border-0">
          <div class="flex items-center space-x-4">
            <Avatar>{item.avatar}</Avatar>
            <div class="flex-1 min-w-0">{`${item.firstName} ${item.lastName}`}</div>
          </div>
      </Listgroup>
    </Card>
    <Card size='sm'>
      <div class="flex justify-between items-center mb-4">
        <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Research Members</h5>
      </div>
      <Listgroup items={memberNames} let:item class="border-0">
          <div class="flex items-center space-x-4">
            <div class="flex-1 min-w-0">{`${item.firstName} ${item.lastName}`}</div>
          </div>
      </Listgroup>
    </Card>


    {#if proposals}
      <h1>Proposals</h1>
      {#each proposals as p, index}
      <a href={`/main/${researchID}/${p._id}`}>{index}</a>
      {/each}
    {/if}
  {/if}
  
</main>
