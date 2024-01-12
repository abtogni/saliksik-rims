<script>
import { Badge, Indicator, Popover } from "flowbite-svelte";
import { CheckCircleOutline, InfoCircleOutline } from "flowbite-svelte-icons";
</script>

<Badge border large class="flex items-center gap-2"><Indicator color="orange" size="md" class="" />Concept Note
    <InfoCircleOutline color="orange" size="sm" />
    <Popover arrow={false} class="w-96">The concept note is in the approval process.</Popover>
    <CheckCircleOutline color="orange" size="sm" />
    <Popover arrow={false} class="w-96">The approval process is done. Please check your notification, to see the reseult.</Popover>
</Badge>