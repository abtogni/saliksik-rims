<script>
import { Badge, Indicator, Popover } from "flowbite-svelte";
import { CheckCircleOutline, InfoCircleOutline } from "flowbite-svelte-icons";
</script>
<Badge border large color="dark" class="flex items-center gap-2">
    <Indicator color="dark" size="md" class="" />No Status
    <InfoCircleOutline color="dark" size="sm" />
    <Popover arrow={false} class="w-96">Create and submit a concept note to start. Or submit an already existing/published research paper.</Popover>
    <CheckCircleOutline color="dark" size="sm" />
    <Popover arrow={false} class="w-96">The concept note have been submitted. A notication will be sent, once it is approved.</Popover>
  </Badge>