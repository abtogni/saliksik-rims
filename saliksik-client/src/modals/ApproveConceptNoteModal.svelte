<script lang="ts">
  import { Button, P} from "flowbite-svelte";
  import { InfoCircleOutline } from "flowbite-svelte-icons";
  import { onMount } from "svelte";
  import { getResearchInfo } from "../components/fetch";
  import { selectedResearchInfo,userList } from "../components/store";
  export let propValue: any;

  let matchedUsers = $userList.filter(user => $selectedResearchInfo.researchLeaders.includes(user._id));
  console.log(matchedUsers);
  onMount(async () => {
    getResearchInfo(propValue);
  });

 let noticeToProceed = {
  logName: 'Notice to Proceed',
  userIDs: $selectedResearchInfo.researchLeaders,
  logDescription: `This research hereto entitled:\n${$selectedResearchInfo.researchTitle}\nPrepared and submitted by: Prepared and submitted by: ${matchedUsers.map(user => `${user.firstName} ${user.lastName}`).join(', ')}\nHas been examined and is recommended for acceptance and approval to proceed to the next phase of research process.`
};
  let data = { researchStatus: 'Concept Note (Approved)' };

  function approve(_e: Event){

      fetch(`/api/logs/createLog`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(noticeToProceed),
        }).then((response) => {
            if (response.ok) {
              window.alert('Sent notice to proceed');
            } else {
              console.error("Error occured");
            }
          })
          .catch((error) => {
            console.error("Network error:", error);
          });
      fetch(`/api/research/updateResearch?researchID=${propValue}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.ok) {
            window.alert('Approved');
          } else {
            console.error("Error occured");
          }
        })
        .catch((error) => {
          console.error("Network error:", error);
        });
  }

</script>

<div class="flex justify-center items-center">
  <InfoCircleOutline size="xl" />
</div>
<P weight="normal" size="base" class="text-center">Once, the Concept Note is approved. A Notice To Proceed will be sent to the owner.</P>
<div class="flex gap-2">
  <Button class="w-full" on:click={approve}>Approve</Button>
  <Button class="w-full">Cancel</Button>
</div>
  
