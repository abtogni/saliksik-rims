<script lang="ts">
  import { Card, Helper, Input, Label, MultiSelect } from "flowbite-svelte";
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