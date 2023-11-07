<script lang="ts">
    import { Label, MultiSelect } from 'flowbite-svelte';
    import { onMount } from "svelte";

    let json = {}, researchMembers: any[] = [], researchLeaders: any[] = [];
    

    var userData: any, users: any, userList: any;

  async function fetchUser() {
      const response = await fetch('/api/checkUser');
      userData = await response.json();
  }

  async function fetchUserList() {
      const response = await fetch('/api/user/getUsers');
      users = await response.json();
  }


  onMount(async () => {
  await Promise.all([fetchUser(), fetchUserList()]);
  userList = users.map((user: any) => ({
    value: user._id,
    name: `${user.firstName} ${user.lastName}`
  }));
});


  
  function submit(e: Event) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    json = Object.fromEntries(formData.entries());
    json = {
      ...json,
      researchMembers,
      researchLeaders,
    };
    
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
    
<main>
  <form on:submit={submit}>
    <div class="mb-4">
      <label class="block text-white font-bold mb-2" for="researchLeaders">
        Research Leader
      </label>
      <MultiSelect items={userList} bind:value={researchLeaders} />
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

      <MultiSelect items={userList} bind:value={researchMembers} />
      
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
    