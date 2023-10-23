<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '@roxi/routify';
  
    async function checkAuthentication() {
  try {
    const response = await fetch('/api/checkAuth');
    const data = await response.json();

    if (response.status === 401) {
      $goto('/login');
    } else if (data.message === 'error') {
      $goto('/login');
    } else {   
      $goto('/main');
    }
  } catch (e) {
    $goto('/login');
  }
}

  
    onMount(() => {
      checkAuthentication();
    });
</script>



