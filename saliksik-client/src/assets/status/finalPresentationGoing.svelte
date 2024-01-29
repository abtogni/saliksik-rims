<script>
import { Badge, Indicator, Popover, Tooltip } from "flowbite-svelte";
import { CheckCircleOutline, InfoCircleOutline } from "flowbite-svelte-icons";
</script>

<Badge border large color="blue" class="flex items-center gap-2">
  <Indicator color="blue" size="md" class="" />Final Presentation (Going)
  <CheckCircleOutline color="dark" size="sm" />
  <Tooltip arrow={false} class="rounded-md">You can now claim your incentive in the UNC Accounting Office.</Tooltip>
</Badge>