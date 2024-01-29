<script>
  import { Badge, Indicator, Tooltip } from "flowbite-svelte";
  import { InfoCircleOutline } from "flowbite-svelte-icons";


</script>

<Badge border large color="red" class="flex items-center gap-2">
  <Indicator color="red" size="md" class="" />Concept Note (Rejected)
  <InfoCircleOutline color="dark" size="sm" />
  <Tooltip arrow={false} class="rounded-md">Your concept note is rejected. You can make revisions and resubmit the concept note again.</Tooltip>
</Badge>