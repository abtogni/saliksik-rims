<script lang="ts">
    import { onMount } from 'svelte';
    export let userID: any;
    import { Button } from 'flowbite-svelte';
  
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

  