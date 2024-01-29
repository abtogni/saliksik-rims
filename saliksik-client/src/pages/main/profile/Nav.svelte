<script context="module">
    // main navigation
    import Home from './Research.svelte';
    import Page2 from './Stats.svelte';
    import About from './Profile.svelte';
    
    // these are our 'pages' to navigate through (in order for this export to work the script tag MUST include context="module")
    export const navOptions = [
            { page: 'Profile',   component: About },
        { page: 'Research',   component: Home },
        { page: 'Stats',   component: Page2 },
            
    ];
    </script>