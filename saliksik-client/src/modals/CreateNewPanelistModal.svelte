<script lang='ts'>
  import { Button, Input, P, Select } from "flowbite-svelte";

  function submit(e: Event) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    let json = Object.fromEntries(formData.entries());
    console.log(JSON.stringify(json));

    fetch("/api/research/createPanelist", {
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

<form class="grid grid-flow-row gap-4" on:submit={submit}>
  <div class="flex flex-wrap justify-start items-center gap-1">
    <P for="honorific" weight="semibold" size="base" class="text-black">Honorific</P>
    <Input type="text" id="honorific" name="honorific" size="md" placeholder="Engr. / Dr. / Phd." class="text-sm font-medium rounded-md focus:ring-blue-700 focus:border-blue-700 text-gray-500"></Input>
  </div>

  <div class="flex flex-wrap justify-start items-center gap-1">
    <P for="firstName" weight="semibold" size="base" class="text-black">First Name</P>
    <Input type="text" id="firstName" name="firstName" size="md" class="text-sm font-medium rounded-md focus:ring-blue-700 focus:border-blue-700 text-gray-500"></Input>
  </div>

  <div class="flex flex-wrap justify-start items-center gap-1">
    <P for="middleName" weight="semibold" size="base" class="text-black">Middle Name</P>
    <Input type="text" id="middleName" name="middleName" size="md" class="text-sm font-medium rounded-md focus:ring-blue-700 focus:border-blue-700 text-gray-500"></Input>
  </div>

  <div class="flex flex-wrap justify-start items-center gap-1">
    <P for="lastName" weight="semibold" size="base" class="text-black">Last Name</P>
    <Input type="text" id="lastName" name="lastName" size="md" class="text-sm font-medium rounded-md focus:ring-blue-700 focus:border-blue-700 text-gray-500"></Input>
  </div>

  <div class="flex flex-wrap justify-start items-center gap-1">
    <P for="suffix" weight="semibold" size="base" class="text-black">Suffix</P>
    <Input type="text" id="suffix" name="suffix" size="md" placeholder="Jr. / Sr. / III / IV" class="text-sm font-medium rounded-md focus:ring-blue-700 focus:border-blue-700 text-gray-500"></Input>
  </div>

  <div class="flex flex-wrap justify-start items-center gap-1">
    <P for="mastersDegree" weight="semibold" size="base" class="text-black">Master's Degree</P>
    <Input type="text" id="degree" name="degree" size="md" placeholder="MIS / MIT / MA / M Arch. / MA Ed." class="text-sm font-medium rounded-md focus:ring-blue-700 focus:border-blue-700 text-gray-500"></Input>
  </div>

  <Button on:click={() => alert('Handle "success"')} type="submit" color="blue" size="md" class="rounded-md w-full">Create Panelist</Button>
</form>
