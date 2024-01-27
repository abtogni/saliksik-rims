<script>
import { Badge, Indicator, Popover, Tooltip } from "flowbite-svelte";
import { CheckCircleOutline, InfoCircleOutline } from "flowbite-svelte-icons";
</script>

<Badge border large color="red" class="flex items-center gap-2">
  <Indicator color="red" size="md" class="" />Incentive (Processing)
  <InfoCircleOutline color="dark" size="sm" />
  <Tooltip arrow={false} class="rounded-md">Congratulations! You have completed your research. Your incentive is in process. A notification will be sent once, it is ready for released.</Tooltip>
</Badge>