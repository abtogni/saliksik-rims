<script lang="ts">
    import { onMount } from "svelte";

    let json = {}, memberCount = 0;;
    
    function addMember() {
		  memberCount++;
	  }

    var userData: any, userList: any;

  async function fetchUser() {
      const response = await fetch('/api/checkUser');
      userData = await response.json();
  }

  async function fetchUserList() {
      const response = await fetch('/api/user/getUsers');
      userList = await response.json();
  }


  onMount(() => {
    fetchUser();
    fetchUserList();
  });

  
  function submit(e: Event) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    json = Object.fromEntries(formData.entries());

    // Make an HTTP POST request to the API
    fetch('/api/research/createResearch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(json),
    })
      .then((response) => {
        if (response.ok) {
          // Handle a successful response (e.g., redirect to a new page)
          window.location.href = '/main/';
        } else {
          // Handle errors or authentication failures
          console.error('Login failed');
        }
      })
      .catch((error) => {
        console.error('Network error:', error);
      });
  }
    </script>
    
<!-- svelte-ignore missing-declaration -->
<main>
  <form on:submit={submit}>
    <div class="mb-4">
      <label class="block text-white font-bold mb-2" for="researchLeaders">
        Research Leader
      </label>
      {#if userData}
      <input
        class="w-64 h-9 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-black"
        type="text"
        id="researchLeaders"
        name="researchLeaders"
        value={`${userData.user._id}`}
        hidden
      />
      <input
        class="w-64 h-9 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-black"
        type="text"
        id="researchLeader"
        name="researchLeader"
        value={`${userData.user.lastName}, ${userData.user.firstName}`}
        disabled
      />
      {:else}
      <input
      class="w-64 h-9 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-black"
      type="text"
      id="researchLeader"
      name="researchLeader"
      value=''
    />
    {/if}
    </div>
    <div class="mb-4">
        <label class="block text-white font-bold mb-2" for="researchTitle">
          Research Title
        </label>
        <input
          class="w-64 h-9 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-black"
          type="text"
          id="researchTitle"
          name="researchTitle"
        />
      </div>

      <div class="mb-4">
        <button 
      type="button"
      class="w-64 h-10  bg-red-800 hover:bg-red-900 shadow-lg text-white font-bold py-2 px-4 mb-6 border rounded"
      on:click={addMember}>
        Add Research Member
      </button>
      
      {#if memberCount > 0}
      <div class="mb-4 grid grid-cols-1 gap-4">
          <label class="block text-white font-bold mb-2" for="researchMembers">
            Research Members
          </label>
         {#each Array(memberCount) as _, index (index)}
            <div>

              <select id="researchMembers"
              name="researchMembers">
              
                {#if userList}
                  {#each userList as user}
                    <option value={user._id}>{`${user.lastName}, ${user.firstName}`}</option>
                  {/each}
                {:else}
                   <!-- else content here -->
                {/if}
              </select>
             
            </div>
          
         {/each}
        </div>
      {:else}
         <!-- else content here -->
      {/if}
      </div>
      
      <div class="mb-4">
        <button
      class="w-64 h-10  bg-red-800 hover:bg-red-900 shadow-lg text-white font-bold py-2 px-4 mb-6 border rounded"
      type="submit"
    >
      Create Research
    </button>
      </div>
  </form>
  
</main>
    
    <style>
      /* Your CSS styles go here */
    </style>
    