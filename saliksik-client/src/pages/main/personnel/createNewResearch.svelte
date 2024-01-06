<script lang="ts">
  import { Button, Card, Helper, Input, Label, Modal, MultiSelect, P, Textarea } from "flowbite-svelte";
  import { onMount } from "svelte";

  let json = {},
    researchMembers: any[] = [],
    researchLeaders: any[] = [];

  var userData: any, users: any, userList: any;

  async function fetchUser() {
    const response = await fetch("/api/checkUser");
    userData = await response.json();
  }

  async function fetchUserList() {
    const response = await fetch("/api/user/getUsers");
    users = await response.json();
  }

  onMount(async () => {
    await Promise.all([fetchUser(), fetchUserList()]);
    userList = users.map((user: any) => ({
      value: user._id,
      name: `${user.firstName} ${user.lastName}`,
    }));
  });

  function submit(e: Event) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    json = Object.fromEntries(formData.entries());
    json = {
      ...json,
      researchMembers,
      researchLeaders,
    };

    fetch("/api/research/createResearch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(json),
    })
      .then((response) => {
        if (response.ok) {
          // Handle a successful response (e.g., redirect to a new page)
          window.location.href = "/main/";
        } else {
          // Handle errors or authentication failures
          console.error("Login failed");
        }
      })
      .catch((error) => {
        console.error("Network error:", error);
      });
  }
</script>

<!--
<main>
  <div class="flex justify-center items-center">
    <Card size="lg">
      <form class="">
        <Label for="researchTitle">Research Title</Label>
          <Input type="text" id="researchTitle"/>
          <label class="block font-bold mb-2" for="researchLeaders"> Research Leader </label>
          <MultiSelect size="lg" items={userList} bind:value={researchLeaders} required />
          <Helper class="pt-2 text-orange-500"></Helper>
          <Label>Project Duration</Label>
        </form>
    </Card>
    </div>
    
      
</main>

-->

<main>
  <Modal size="xs" autoclose={false} outsideclose class="w-full">
    <form class="flex flex-col space-y-6" action="#">
      <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Create new research</h3>
      <Label class="font-medium text-base space-y-2">
        <span>Research Title</span>
        <Textarea rows="5" id="researchTitle" for="researchTitle" required />
      </Label>
      <div class="gap-2">
        <P weight="medium" size="base" for="researchLeaders">Research Leader</P>
  
        <MultiSelect size="sm" items={userList} bind:value={researchLeaders} required />
  
        <Helper class="pt-2 text-orange-500"></Helper>
      </div>
      <Button on:click={() => alert('Handle "success"')} type="submit" class="w-full1">Create New Research</Button>
    </form>
  </Modal>
  </main>


