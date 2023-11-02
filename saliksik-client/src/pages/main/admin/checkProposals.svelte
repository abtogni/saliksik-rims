<script lang='ts'>
    import { goto } from "@roxi/routify";
    import moment from "moment";
    import { onMount } from "svelte";

    let proposals: any[], researches: any[] = [], loading = true, error: any = null;
    
    async function getProposalList() {
    try {
        const response = await fetch('/api/research/getProposals');
        const responseData = await response.json();
        proposals = responseData.data;
    } catch (e) {
        $goto("/404");
    }
}


    async function fetchResearch(researchID: any) {

        try {
        const response = await fetch(`/api/research/getResearch?researchID=${researchID}`);

        if (response.ok) {
            const data = await response.json();
            researches.push(data);
            console.log(data);
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

    onMount(async () => {
    try {
        await getProposalList();
        const researchPromises = proposals.map((p) => fetchResearch(p.researchID));
        await Promise.all(researchPromises);
        researches = researches;
        console.log(researches);
    } catch (error) {
        console.error('Network error:', error);
    } finally {
        loading = false;
    }
});



loading = false;

</script>

<main>
  {#if proposals}
    <table class="w-1/2 text-sm text-left text-gray-500 dark:text-gray-400 table-auto">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <th scope="col" class="px-6 py-3">Research Title</th>
        <th scope="col" class="px-6 py-3">Research Leader</th>
        <th scope="col" class="px-6 py-3">Date Submitted</th>
        <th scope="col" class="px-6 py-3">Status</th>
        <th scope="col" class="px-6 py-3"></th>
        </thead>
        <tbody>
            {#each proposals as proposal, i}
  {#if i < researches.length}
    <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {#if researches[i].researchTitle}{researches[i].researchTitle}{:else}N/A{/if}
      </th>
      <td class="px-6 py-4">
        {#if researches[i].researchLeaders}{researches[i].researchLeaders.join(', ')}{:else}N/A{/if}
      </td>
      <td class="px-6 py-4">{moment(proposal.createdAt).format('lll')}</td>
      <td class="px-6 py-4">{proposal.proposalStatus}</td>
      <td class="px-6 py-4">
        <!-- Add action buttons or links here -->
      </td>
    </tr>
  {/if}
{/each}

          


          </tbody>
    </table>
  
  {:else}
    No proposals found.
  {/if}
</main>