<script>
import { Badge, Indicator, Popover, Tooltip } from "flowbite-svelte";
import { CheckCircleOutline, InfoCircleOutline } from "flowbite-svelte-icons";
</script>
<Badge border large color="dark" class="flex items-center gap-2">
    <Indicator color="dark" size="md" class="" />No Status
    <InfoCircleOutline color="dark" size="sm" />
    <Tooltip arrow={false} class="rounded-md">Create and submit a concept note to start. Or submit an already existing/published research paper.</Tooltip>
</Badge>
