<script lang="ts">
  import { Accordion, AccordionItem, Alert, P } from "flowbite-svelte";
  import { BellActiveAltOutline, CheckCircleOutline, QuestionCircleOutline } from "flowbite-svelte-icons";
  import { researches, logs, userData } from "../../../components/store";
  import { getLogs } from "../../../components/fetch";
  import moment from "moment";
  import { onMount } from "svelte";

  onMount(async () => {
    getLogs($userData._id);
    console.log($logs);
  });
</script>
<main class="p-4">
  <div class="flex justify-center gap-2 bg-gray-50">
    <div class="grid grid-flow-row items-center gap-2 w-1/2 sm:w-full md:w-full lg:w-11/12 xl:w-8/12 2xl:w-1/2">
      <!--helper card-->
      <Alert dismissable color="blue" class="border-l-8">
        <div class="flex items-center gap-2">
          <QuestionCircleOutline slot="icon" size="sm" />
          <span class="text-lg font-medium">Notifications</span>
        </div>
        <p class="mt-2 text-sm">Insert Helper Text</p>
      </Alert>

      <div class="flex flex-wrap justify-start items-center gap-0 w-full">
        <div class="flex justify-between items-center gap-2 w-full">
          <div class="flex items-center gap-2">
            <BellActiveAltOutline size="md" class="text-blue-700" />
            <P size="xl" weight="bold" class="text-gray-900">00 <span class="text-gray-500">Unread Notification</span></P>
          </div>
        </div>
        <P size="sm" weight="normal" class="text-gray-500">Check unread notifications, notices and other things that may require your attention.</P>
      </div>

      <!--card researches inactive
      <div class="grid grid-flow-row justify-center w-full shadow-lg border rounded-lg gap-2 p-3 mb-4 bg-white">
        <P size="sm" weight="normal" class="text-gray-500">No existing researches...<span></span></P>
      </div>
      -->
      <!--card researches active-->
      <div class="grid grid-flow-row w-full shadow-lg border rounded-lg bg-white">
        <!--card research-->
        <Accordion flush >
          {#if $researches}
            {#each $researches as research}
              <AccordionItem paddingFlush="" open>
                <!--accordionItem header-->
                <div slot="header" class="flex flex-wrap gap-2 px-4 py-3 hover:bg-blue-50">
                  <div class="flex justify-start items-center gap-2">
                    <div class="flex items-center gap-2">
                      <CheckCircleOutline size="md" class="text-blue-700" />
                      <P size="xl" weight="bold" class="text-gray-900">Notice To Proceed</P>
                    </div>
                    <div class="flex justify-start items-center gap-2">
                      <P size="base" weight="bold" class="text-gray-500">·</P>
                      <P weight="normal" size="sm" class=" text-gray-500">Sent last <span class="font-medium text-gray-500">{moment(research.updatedAt).format("lll")}</span></P>
                    </div>
                  </div>
                  <P weight="normal" size="sm" class="line-clamp-2 text-gray-500">This research hereto entitled: <span class="font-medium text-gray-900">{research.researchTitle}</span></P>
                </div>

                <div slot="arrowup"></div>
                <span slot="arrowdown"> </span>

                <!--accordionItem content-->
                <div class="flex flex-wrap justify-start items-start gap-2 p-3 w-full h-96 overflow-auto">
                  <!--concept note overview card-->

                  <div class="grid grid-flow-row w-full shadow-lg border rounded-lg gap-2 p-3 mb-4 bg-white">
                    <div>
                      <P weight="normal" size="sm" class="text-center text-gray-500">This research hereto entitled:</P>
                      <P weight="medium" size="sm" class="text-center text-gray-900">{research.researchTitle}</P>
                    </div>
                    
                    <div>
                      <P weight="normal" size="sm" class="text-center text-gray-500">Prepared and submitted by:</P>
                      <P weight="medium" size="sm" class="text-center text-gray-900">Insert Research Leader Names</P>
                      </div>
                    
                      <div>
                        <P weight="normal" size="sm" class="text-center text-gray-500">Has been examined and is recommended for acceptance and approval to proceed to the next phase of research process.</P>
                        </div>
                    
                        <div>
                          <P weight="normal" size="sm" class="text-center text-gray-500">Approved by the University Research Center on <span class="font-medium text-gray-900">Insert timestamp when approved</span></P>
                        </div>
                    
                  </div>
                </div>
              </AccordionItem>
            {/each}
          {/if}
        </Accordion>
      </div>
    </div>
  </div>
  <div class="h-96"></div>
  <div class="h-96"></div>
</main>
