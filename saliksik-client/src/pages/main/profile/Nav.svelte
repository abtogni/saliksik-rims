<script context="module">
    // main navigation for the application
    import Home from './Task.svelte';
    import Page2 from './FundingInformation.svelte';
    import About from './ResearchOutputs.svelte';
    
    // these are our 'pages' to navigate through (in order for this export to work the script tag MUST include context="module")
    export const navOptions = [
            { page: 'Reasearch Outputs',   component: About },
        { page: 'Task',   component: Home },
        { page: 'Funding Information',   component: Page2 },
            // other navigation pages can go here
    ];
    </script>