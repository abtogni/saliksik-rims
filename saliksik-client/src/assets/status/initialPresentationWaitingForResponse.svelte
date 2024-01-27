<script>
import { Badge, Indicator, Popover, Tooltip } from "flowbite-svelte";
import { CheckCircleOutline, InfoCircleOutline } from "flowbite-svelte-icons";
</script>

<Badge border large  class="flex items-center gap-2">
  <Indicator color="orange" size="md" class="" />Initial Presentation (Waiting For Response)
  <InfoCircleOutline color="dark" size="sm" />
  <Tooltip arrow={false} class="rounded-md">Your presentation schedule has been set. Choose going or not going to indicate your response.</Tooltip>
</Badge>