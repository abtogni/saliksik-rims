<script>
  import { Badge, Indicator, Tooltip } from "flowbite-svelte";
  import { CheckCircleOutline } from "flowbite-svelte-icons";


</script>

<Badge border large color="blue" class="flex items-center gap-2">
  <Indicator color="blue" size="md" class="" />Initial Presentation (Going)
  <CheckCircleOutline color="dark" size="sm" />
  <Tooltip arrow={false} class="rounded-md">Please be ready for your presentation on the set schedule on your dashboard. Good luck!</Tooltip>
</Badge>