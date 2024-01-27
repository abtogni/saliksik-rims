<script>
import { Badge, Indicator, Popover, Tooltip } from "flowbite-svelte";
import { CheckCircleOutline, InfoCircleOutline } from "flowbite-svelte-icons";
</script>
<Badge border large color="dark" class="flex items-center gap-2">
    <Indicator color="dark" size="md" class="" />No Status
    <InfoCircleOutline color="dark" size="sm" />
    <Tooltip arrow={false} class="rounded-md">Create and submit a concept note to start. Or submit an already existing/published research paper.</Tooltip>
</Badge>
<Badge border large class="flex items-center gap-2">
    <Indicator color="orange" size="md" class="" />Concept Note (For Approval)
    <InfoCircleOutline color="dark" size="sm" />
    <Tooltip arrow={false} class="rounded-md">Your concept note is in approval. A notice to proceed will be sent to your notification, once approved.</Tooltip>
</Badge>
<Badge border large color="blue" class="flex items-center gap-2">
    <Indicator color="blue" size="md" class="" />Concept Note (Approved)
    <CheckCircleOutline color="dark" size="sm" />
    <Tooltip arrow={false} class="rounded-md">Your concept note is approved. A notice to present will be sent to your notification, once the presentation schedule is set.</Tooltip>
</Badge>
<Badge border large color="red" class="flex items-center gap-2">
    <Indicator color="red" size="md" class="" />Concept Note (Rejected)
    <InfoCircleOutline color="dark" size="sm" />
    <Tooltip arrow={false} class="rounded-md">Your concept note is rejected. You can make revisions and resubmit the concept note again.</Tooltip>
</Badge>
<Badge border large  class="flex items-center gap-2">
    <Indicator color="orange" size="md" class="" />Initial Presentation (Waiting For Response)
    <InfoCircleOutline color="dark" size="sm" />
    <Tooltip arrow={false} class="rounded-md">Your presentation schedule has been set. Choose going or not going to indicate your response.</Tooltip>
</Badge>
<Badge border large color="blue" class="flex items-center gap-2">
    <Indicator color="blue" size="md" class="" />Initial Presentation (Going)
    <CheckCircleOutline color="dark" size="sm" />
    <Tooltip arrow={false} class="rounded-md">Please be ready for your presentation on the set schedule on your dashboard. Good luck!</Tooltip>
</Badge>
<Badge border large color="red" class="flex items-center gap-2">
    <Indicator color="red" size="md" class="" />Initial Presentation (Not Going)
    <InfoCircleOutline color="dark" size="sm" />
    <Tooltip arrow={false} class="rounded-md">A new schedule will be sent to your notification, once a new presentation schedule is set.</Tooltip>
</Badge>
<Badge border large color="red" class="flex items-center gap-2">
    <Indicator color="red" size="md" class="" />Initial Presentation (Not Going)
    <InfoCircleOutline color="dark" size="sm" />
    <Tooltip arrow={false} class="rounded-md">A new schedule will be sent to your notification, once a new presentation schedule is set.</Tooltip>
</Badge>
<Badge border large color="red" class="flex items-center gap-2">
    <Indicator color="red" size="md" class="" />Incentive (Processing)
    <InfoCircleOutline color="dark" size="sm" />
    <Tooltip arrow={false} class="rounded-md">Congratulations! You have completed your research. Your incentive is in process. A notification will be sent once, it is ready for released.</Tooltip>
</Badge>
<Badge border large color="red" class="flex items-center gap-2">
    <Indicator color="red" size="md" class="" />Incentive (Released)
    <CheckCircleOutline color="dark" size="sm" />
    <Tooltip arrow={false} class="rounded-md">You can now claim your incentive in the UNC Accounting Office.</Tooltip>
</Badge>
<Badge border large color="blue" class="flex items-center gap-2">
    <Indicator color="blue" size="md" class="" />Published
    <CheckCircleOutline color="dark" size="sm" />
    <Tooltip arrow={false} class="rounded-md">You can now claim your incentive in the UNC Accounting Office.</Tooltip>
</Badge>
