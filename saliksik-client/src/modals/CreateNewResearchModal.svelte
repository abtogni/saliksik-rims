<script lang="ts">
  import { Button, Helper, Label, MultiSelect, P, Textarea, Modal } from "flowbite-svelte";
  import { FolderPlusOutline } from "flowbite-svelte-icons";
  import { onMount } from "svelte";
  let json = {},
    researchLeaders: any[] = [];
  let users: any, userList: any;

  async function fetchUserList() {
    const response = await fetch("/api/user/getUsers");
    users = await response.json();
  }

  onMount(async () => {
    await fetchUserList();
    userList = users.map((user: any) => ({
      value: `${user._id}`,
      name: `${user.firstName} ${user.lastName}`,
    }));
  });

  let countries = [
    { value: "us", name: "United States" },
    { value: "ca", name: "Canada" },
    { value: "fr", name: "France" },
    { value: "jp", name: "Japan" },
    { value: "en", name: "England" },
  ];

  function submit(e: Event) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    json = Object.fromEntries(formData.entries());
    json = {
      ...json,
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
          window.location.href = "/main/";
        } else {
          console.error("Error occured");
        }
      })
      .catch((error) => {
        console.error("Network error:", error);
      });
  }
</script>

<form class="flex flex-col gap-2" on:submit={submit}>
  <div class="gap-2">
    <P weight="semibold" size="base" for="researchLeaders">Research Leader</P>
    <MultiSelect items={userList} bind:value={researchLeaders} required size="sm" class=""/>
    <Helper class="pt-2 text-orange-500"></Helper>
  </div>

  <div class="gap-2">
    <Label class="font-semibold text-base " for="researchTitle"><span>Research Title</span></Label>
    <Textarea color="blue" rows="5" id="researchTitle" name="researchTitle" required class=""/>
  </div>

  <Button on:click={() => alert('Handle "success"')} type="submit" color="blue" size="sm" class="flex items-center gap-2 rounded-md"><FolderPlusOutline size="sm" /> Create New Research</Button>
</form>
