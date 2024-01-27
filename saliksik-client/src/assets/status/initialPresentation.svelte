<script>
import { Badge, Indicator, Popover } from "flowbite-svelte";
import { CheckCircleOutline, InfoCircleOutline } from "flowbite-svelte-icons";
</script>

<Badge border large color="green" class="flex items-center gap-2">
    <Indicator color="green" size="md" class="" />Initial Presentation
    <InfoCircleOutline color="green" size="sm" />
    <Popover arrow={false} class="w-96">Upload your research paper on the submit bin. Then, set a schedule for your initial presentation. Choose among the available dates.</Popover>
    <CheckCircleOutline color="green" size="sm" />
    <Popover arrow={false} class="w-96">Scheduled On <span class="font-bold">Insert Date and Time</span></Popover>
  </Badge>