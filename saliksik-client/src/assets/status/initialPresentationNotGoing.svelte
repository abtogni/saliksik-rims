<script>
  import { Badge, Indicator, Tooltip } from "flowbite-svelte";
  import { InfoCircleOutline } from "flowbite-svelte-icons";


</script>

<Badge border large color="red" class="flex items-center gap-2">
  <Indicator color="red" size="md" class="" />Initial Presentation (Not Going)
  <InfoCircleOutline color="dark" size="sm" />
  <Tooltip arrow={false} class="rounded-md">A new schedule will be sent to your notification, once a new presentation schedule is set.</Tooltip>
</Badge>