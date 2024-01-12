<script>
import { Badge, Indicator, Popover } from "flowbite-svelte";
import { CheckCircleOutline, InfoCircleOutline } from "flowbite-svelte-icons";
</script>

<Badge border large color="blue" class="flex items-center gap-2">
<Indicator color="blue" size="md" class="" />Published
<InfoCircleOutline color="blue" size="sm" />
<Popover arrow={false} class="w-96">Your research is being published. Once done, an incentive will be sent to your notification</Popover>
<CheckCircleOutline color="blue" size="sm" />
<Popover arrow={false} class="w-96">Congratulations! Your research paper have been published. You can look for your research on the browse research page, all research sidebar or on your profile page.</Popover>
</Badge>