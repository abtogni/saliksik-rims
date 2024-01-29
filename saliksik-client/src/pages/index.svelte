<script lang="ts">
  import { goto } from '@roxi/routify';
  import { isAuthenticated } from '../components/store';
  
    $: {
      if (!$isAuthenticated) {
        $goto('/login');
      } else {
        $goto('/main');
      }
    }

</script>



