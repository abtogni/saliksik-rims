<script>
    import { goto } from "@roxi/routify";
    import { onMount } from "svelte";
    import { isAuthenticated } from "../components/store";
    onMount(() => {
        isAuthenticated.set(false);
        localStorage.removeItem('isAuthenticated');
        fetch('/api/logout');
        $goto('/');
    });
</script>