<script>
import { Badge, Indicator, Popover, Tooltip } from "flowbite-svelte";
import { CheckCircleOutline, InfoCircleOutline } from "flowbite-svelte-icons";
</script>

<Badge border large class="flex items-center gap-2">
    <Indicator color="orange" size="md" class="" />Concept Note (Waiting For Approval)
    <InfoCircleOutline color="dark" size="sm" />
    <Tooltip arrow={false} class="rounded-md">Your concept note is in approval. A notice to proceed will be sent to your notification, once approved.</Tooltip>
</Badge>