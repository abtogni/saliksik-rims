<script lang="ts">
  import { Button, P} from "flowbite-svelte";
  import { InfoCircleOutline } from "flowbite-svelte-icons";

</script>

<div class="flex justify-center items-center">
  <InfoCircleOutline size="xl" />
</div>
<P weight="normal" size="base" class="text-center">Once, the Concept Note is approved. A Notice To Proceed will be sent to the owner.</P>
<div class="flex gap-2">
  <Button class="w-full">Approve</Button>
  <Button class="w-full">Cancel</Button>
</div>
  
