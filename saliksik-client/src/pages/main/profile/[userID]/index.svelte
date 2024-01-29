<script lang="ts">
  import { onMount } from 'svelte';
  export let userID: any;
  import { Card, Avatar, Button } from 'flowbite-svelte';

  let userData: any;
  
  async function fetchUser() {
    try {
      const url = `/api/user/getUser?id=${userID}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        
        userData = await response.json();
      } else {
        
        console.error('Failed to fetch user data:', response.status);
      }
    } catch (e: any) {
      console.error('Error:', e.message);
    }
  }

  onMount(() => {
    fetchUser();
  });
</script>
<main>
 <div class="translate-x-1/4 mt-10 container">

  {#if userData}
  <Card padding="sm">
    <div class="flex flex-col items-center pb-4">
      <Avatar size='xl'><h1 class="text-5xl"> {userData.firstName.charAt(0) + userData.lastName.charAt(0)} </h1></Avatar>
      <h1 class="mb-1 text-3xl font-medium text-gray-900 dark:text-white">{`${userData.firstName} ${userData.lastName}`}</h1>
      <span class="text-lg text-gray-500 dark:text-gray-400">{userData.userType}</span>
    </div>
  </Card>
  {/if}
 </div>
</main>
