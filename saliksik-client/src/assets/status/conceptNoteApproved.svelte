<script>
  import { Badge, Indicator, Tooltip } from "flowbite-svelte";
  import { CheckCircleOutline } from "flowbite-svelte-icons";


</script>

<Badge border large color="blue" class="flex items-center gap-2">
  <Indicator color="blue" size="md" class="" />Concept Note (Approved)
  <CheckCircleOutline color="dark" size="sm" />
  <Tooltip arrow={false} class="rounded-md">Your concept note is approved. A notice to present will be sent to your notification, once the presentation schedule is set.</Tooltip>
</Badge>