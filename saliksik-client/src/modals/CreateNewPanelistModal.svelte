<script>
  import { Button, Input, P, Select } from "flowbite-svelte";
</script>

<form class="grid grid-flow-row gap-4">
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
    <Input type="text" id="mastersDegree" name="mastersDegree" size="md" placeholder="MIS / MIT / MA / M Arch. / MA Ed." class="text-sm font-medium rounded-md focus:ring-blue-700 focus:border-blue-700 text-gray-500"></Input>
  </div>

  <Button on:click={() => alert('Handle "success"')} type="submit" color="blue" size="md" class="rounded-md w-full">Create Panelist</Button>
</form>
