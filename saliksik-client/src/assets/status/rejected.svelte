<script>
import { Badge, Indicator, Popover } from "flowbite-svelte";
import { CheckCircleOutline, InfoCircleOutline } from "flowbite-svelte-icons";
</script>

<Badge border large color="red" class="flex items-center gap-2">
<Indicator color="red" size="md" class="" />Rejected
<InfoCircleOutline color="red" size="sm" />
<Popover arrow={false} class="w-96">Your concept note have been rejected. You can make changes and resubmit again.</Popover>
</Badge>