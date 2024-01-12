<script>
import { Badge, Indicator, Popover } from "flowbite-svelte";
import { CheckCircleOutline, InfoCircleOutline } from "flowbite-svelte-icons";
</script>

<Badge border large color="pink" class="flex items-center gap-2 ">
<Indicator color="teal" size="md" class="" />Final Presentation
<InfoCircleOutline color="teal" size="sm" />
<Popover arrow={false} class="w-96">Make changes on your research paper based on the panelist comments and others. Then, set a schedule for your final presentation. Choose among the available dates.</Popover>
<CheckCircleOutline color="teal" size="sm" />
<Popover arrow={false} class="w-96">Scheduled On <span class="font-bold">Insert Date and Time</span></Popover>
</Badge>