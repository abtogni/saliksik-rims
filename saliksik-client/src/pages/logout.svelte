<script>
    import { goto } from "@roxi/routify";
    import { onMount } from "svelte";
    onMount(() => {
        fetch('/api/logout').then(()=>$goto('/'));
    });
</script>