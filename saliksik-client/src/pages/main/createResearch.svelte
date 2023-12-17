<script lang="ts">
  import { Button, Card, Datepicker, FloatingLabelInput, Heading, Helper, Input, Label, Modal, MultiSelect, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Textarea, Toolbar, ToolbarButton, ToolbarGroup } from "flowbite-svelte";
  import { BookOutline, CodeOutline, ExclamationCircleOutline, FaceGrinOutline, ImageOutline, MapPinAltSolid, PaperClipOutline, PapperPlaneOutline } from "flowbite-svelte-icons";
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

  //for pop-up admin-buttons
  let saveAsDraft = false;
  let submitResearchProposal = false;

  //date picker
  let date = new Date();
</script>

<main>
  <Heading tag="h1" class="mb-4 text-xl">Create Research Proposal</Heading>

  <!--old research proposal form
  <form on:submit={submit}>
    <div class="mb-4">
      <label class="block font-bold mb-2" for="researchLeaders"> Research Leader </label>
      <MultiSelect items={userList} bind:value={researchLeaders} />
    </div>
    <div class="mb-4">
      <label class="block font-bold mb-2" for="researchTitle"> Research Title </label>
      <input class="w-64 h-9 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-black" type="text" id="researchTitle" name="researchTitle" />
    </div>
    <div class="mb-4">
      <label class="block font-bold mb-2" for="researchTitle"> Research Agency </label>
      <input class="w-64 h-9 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-black" type="text" id="researchAgency" name="researchAgency" />
    </div>

    <MultiSelect items={userList} bind:value={researchMembers} />

    <div class="mb-4">
      <Button type="submit">Create Research</Button>
    </div>
  </form>
  -->

  <form on:submit={submit} class=" grid gap-6 md:grid-cols-4 w-full items-start">
    <!--First Column-->
    <Card size="xl" class="col-span-3">
      <!--First Row-->
      <div class="mb-4">
        <div class="mb-4">
          <label for="researchTitle" class="block font-bold mb-2"> Research Title </label>
          <Input type="text" id="researchTitle" name="researchTitle" required />
          <Helper class="pt-2 text-orange-500"></Helper>
        </div>
      </div>

      <!--Second Row-->

      <div class="grid gap-6 md:grid-cols-3 w-full items-start mb-6">
        <div class="mb-4">
          <label for="researchTitle" class="block font-bold mb-2"> Implementing Agency/Department </label>
          <Input type="text" id="researchTitle" name="researchTitle" required />
          <Helper class="pt-2 text-orange-500"></Helper>
        </div>

        <div class="mb-4">
          <label for="researchTitle" class="block font-bold mb-2"> Cooperating Agency </label>
          <Input type="text" id="researchTitle" name="researchTitle" required />
          <Helper class="pt-2 text-orange-500">State the name of agency to be tapped for funding/ co-implementing the project</Helper>
        </div>

        <div class="mb-4">
          <label for="researchTitle" class="block font-bold mb-2"> Site/s of Implementation </label>
          <Input type="text" id="researchTitle" name="researchTitle" required />
          <Helper class="pt-2 text-orange-500"></Helper>
        </div>
      </div>

      <!--Third Row-->

      <div class="grid gap-6 md:grid-cols-2 w-full items-start mb-6">
        <div class="mb-4">
          <label for="researchTitle" class="block font-bold mb-2"> Total Project Cost </label>
          <Input type="text" id="researchTitle" name="researchTitle" required />
          <Helper class="pt-2 text-orange-500">Include the specific budget allocations for personnel service, maintenance and operations, equipment, trainings/workshops, and administrative costs</Helper>
        </div>

        <div class="mb-4">
          <label for="researchTitle" class="block font-bold mb-2"> Funding Source </label>
          <Input type="text" id="researchTitle" name="researchTitle" required />
          <Helper class="pt-2 text-orange-500">Specific funding source, including counterpart funds</Helper>
        </div>
      </div>
      <!--project description-->
      <div class="grid gap-6 md:grid-cols-1 w-full items-start mb-6">
        <div class="mb-4">
          <label for="project" class="block font-bold mb-2"> Project Description </label>
          <Textarea id="editor" rows="15" class="mb-0">
            <Toolbar slot="header" embedded>
              <ToolbarGroup>
                <ToolbarButton name="Attach file"><PaperClipOutline class="w-5 h-5 rotate-45" /></ToolbarButton>
                <ToolbarButton name="Embed map"><MapPinAltSolid class="w-5 h-5" /></ToolbarButton>
                <ToolbarButton name="Upload image"><ImageOutline class="w-5 h-5" /></ToolbarButton>
              </ToolbarGroup>
              <ToolbarGroup>
                <ToolbarButton name="Format code"><CodeOutline class="w-5 h-5" /></ToolbarButton>
                <ToolbarButton name="Add emoji"><FaceGrinOutline class="w-5 h-5" /></ToolbarButton>
              </ToolbarGroup>
              <ToolbarButton name="send" slot="end"><PapperPlaneOutline class="w-5 h-5 rotate-45" /></ToolbarButton>
            </Toolbar>
          </Textarea>
          <Helper class="pt-2 text-orange-500">Formally written declaration of the project and its idea and context to explain the goals and objectives to be reached and other relevant information that explains the need for the project and aims to describe the amount of work planned for implementation; refers to a simple explanation or depiction of the project that can be used as communication material.</Helper>
        </div>
      </div>
      <!--Fifth Row-->
      <div class="grid gap-6 md:grid-cols-1 w-full items-start mb-6">
        <div class="mb-4">
          <label for="project" class="block font-bold mb-2"> Significance </label>
          <Textarea id="editor" rows="15" class="mb-0">
            <Toolbar slot="header" embedded>
              <ToolbarGroup>
                <ToolbarButton name="Attach file"><PaperClipOutline class="w-5 h-5 rotate-45" /></ToolbarButton>
                <ToolbarButton name="Embed map"><MapPinAltSolid class="w-5 h-5" /></ToolbarButton>
                <ToolbarButton name="Upload image"><ImageOutline class="w-5 h-5" /></ToolbarButton>
              </ToolbarGroup>
              <ToolbarGroup>
                <ToolbarButton name="Format code"><CodeOutline class="w-5 h-5" /></ToolbarButton>
                <ToolbarButton name="Add emoji"><FaceGrinOutline class="w-5 h-5" /></ToolbarButton>
              </ToolbarGroup>
              <ToolbarButton name="send" slot="end"><PapperPlaneOutline class="w-5 h-5 rotate-45" /></ToolbarButton>
            </Toolbar>
          </Textarea>
          <Helper class="pt-2 text-orange-500">Refers to the alignment to UNC research agenda/ UN SDG / tapped agency provided in the matrix attached; review of literature may refer to the following: (a) related researches that have been conducted, state-of-the-art or current technologies from which the project will take off; (b) scientific/technical merit; (c) results of related research conducted by the same Project Leader, if any; (d) Prior Art Search, and; (e) other relevant</Helper>
        </div>
      </div>

      <div class="grid gap-6 md:grid-cols-1 w-full items-start mb-6">
        <div class="mb-4">
          <label for="project" class="block font-bold mb-2"> Objectives </label>
          <Textarea id="editor" rows="15" class="mb-0">
            <Toolbar slot="header" embedded>
              <ToolbarGroup>
                <ToolbarButton name="Attach file"><PaperClipOutline class="w-5 h-5 rotate-45" /></ToolbarButton>
                <ToolbarButton name="Embed map"><MapPinAltSolid class="w-5 h-5" /></ToolbarButton>
                <ToolbarButton name="Upload image"><ImageOutline class="w-5 h-5" /></ToolbarButton>
              </ToolbarGroup>
              <ToolbarGroup>
                <ToolbarButton name="Format code"><CodeOutline class="w-5 h-5" /></ToolbarButton>
                <ToolbarButton name="Add emoji"><FaceGrinOutline class="w-5 h-5" /></ToolbarButton>
              </ToolbarGroup>
              <ToolbarButton name="send" slot="end"><PapperPlaneOutline class="w-5 h-5 rotate-45" /></ToolbarButton>
            </Toolbar>
          </Textarea>
          <Helper class="pt-2 text-orange-500">Statements of the general and specific purposes to address the problem areas of the project; must anchor to the UNC agenda/ SDG/ grant giving body’s agenda</Helper>
        </div>
      </div>

      <div class="grid gap-6 md:grid-cols-1 w-full items-start mb-6">
        <div class="mb-4">
          <label for="project" class="block font-bold mb-2"> Methodology </label>
          <Textarea id="editor" rows="15" class="mb-0">
            <Toolbar slot="header" embedded>
              <ToolbarGroup>
                <ToolbarButton name="Attach file"><PaperClipOutline class="w-5 h-5 rotate-45" /></ToolbarButton>
                <ToolbarButton name="Embed map"><MapPinAltSolid class="w-5 h-5" /></ToolbarButton>
                <ToolbarButton name="Upload image"><ImageOutline class="w-5 h-5" /></ToolbarButton>
              </ToolbarGroup>
              <ToolbarGroup>
                <ToolbarButton name="Format code"><CodeOutline class="w-5 h-5" /></ToolbarButton>
                <ToolbarButton name="Add emoji"><FaceGrinOutline class="w-5 h-5" /></ToolbarButton>
              </ToolbarGroup>
              <ToolbarButton name="send" slot="end"><PapperPlaneOutline class="w-5 h-5 rotate-45" /></ToolbarButton>
            </Toolbar>
          </Textarea>
          <Helper class="pt-2 text-orange-500">Discuss the following: (a) variables or parameters to be measured and evaluated or analyzed; (b) treatments to be used and their layout; (c) experimental procedures and design; (d) statistical analysis; (e) evaluation method and observations to be made, strategies for implementation (Conceptual/Analytical framework)</Helper>
        </div>
      </div>

      <div class="grid gap-6 md:grid-cols-1 w-full items-start mb-6">
        <div class="mb-4">
          <label for="project" class="block font-bold mb-2"> Technology Roadmap </label>
          <Textarea id="editor" rows="15" class="mb-0">
            <Toolbar slot="header" embedded>
              <ToolbarGroup>
                <ToolbarButton name="Attach file"><PaperClipOutline class="w-5 h-5 rotate-45" /></ToolbarButton>
                <ToolbarButton name="Embed map"><MapPinAltSolid class="w-5 h-5" /></ToolbarButton>
                <ToolbarButton name="Upload image"><ImageOutline class="w-5 h-5" /></ToolbarButton>
              </ToolbarGroup>
              <ToolbarGroup>
                <ToolbarButton name="Format code"><CodeOutline class="w-5 h-5" /></ToolbarButton>
                <ToolbarButton name="Add emoji"><FaceGrinOutline class="w-5 h-5" /></ToolbarButton>
              </ToolbarGroup>
              <ToolbarButton name="send" slot="end"><PapperPlaneOutline class="w-5 h-5 rotate-45" /></ToolbarButton>
            </Toolbar>
          </Textarea>
          <Helper class="pt-2 text-orange-500">(If applicable) A visual document that communicates the plan for technology.</Helper>
        </div>
      </div>

      <div class="grid gap-6 md:grid-cols-1 w-full items-start mb-6">
        <div class="mb-4">
          <label for="project" class="block font-bold mb-2"> Expected Outputs (6Ps) </label>
          <Textarea id="editor" rows="15" class="mb-0">
            <Toolbar slot="header" embedded>
              <ToolbarGroup>
                <ToolbarButton name="Attach file"><PaperClipOutline class="w-5 h-5 rotate-45" /></ToolbarButton>
                <ToolbarButton name="Embed map"><MapPinAltSolid class="w-5 h-5" /></ToolbarButton>
                <ToolbarButton name="Upload image"><ImageOutline class="w-5 h-5" /></ToolbarButton>
              </ToolbarGroup>
              <ToolbarGroup>
                <ToolbarButton name="Format code"><CodeOutline class="w-5 h-5" /></ToolbarButton>
                <ToolbarButton name="Add emoji"><FaceGrinOutline class="w-5 h-5" /></ToolbarButton>
              </ToolbarGroup>
              <ToolbarButton name="send" slot="end"><PapperPlaneOutline class="w-5 h-5 rotate-45" /></ToolbarButton>
            </Toolbar>
          </Textarea>
          <Helper class="pt-2 text-orange-500">Deliverables of the project based on the 6Ps metrics of DOST/ typical grants suggested deliverables (Publication, Patent/Intellectual Property, Product, People Service, Place and Partnership, and Policy)</Helper>
        </div>
      </div>

      <div class="grid gap-6 md:grid-cols-1 w-full items-start mb-6">
        <div class="mb-4">
          <label for="project" class="block font-bold mb-2"> Work Plan </label>
          <Textarea id="editor" rows="15" class="mb-0">
            <Toolbar slot="header" embedded>
              <ToolbarGroup>
                <ToolbarButton name="Attach file"><PaperClipOutline class="w-5 h-5 rotate-45" /></ToolbarButton>
                <ToolbarButton name="Embed map"><MapPinAltSolid class="w-5 h-5" /></ToolbarButton>
                <ToolbarButton name="Upload image"><ImageOutline class="w-5 h-5" /></ToolbarButton>
              </ToolbarGroup>
              <ToolbarGroup>
                <ToolbarButton name="Format code"><CodeOutline class="w-5 h-5" /></ToolbarButton>
                <ToolbarButton name="Add emoji"><FaceGrinOutline class="w-5 h-5" /></ToolbarButton>
              </ToolbarGroup>
              <ToolbarButton name="send" slot="end"><PapperPlaneOutline class="w-5 h-5 rotate-45" /></ToolbarButton>
            </Toolbar>
          </Textarea>
          <Helper class="pt-2 text-orange-500">Specific activity to be undertaken per month in a gantt chart to produce the promised results to attain the objectives of the project</Helper>
        </div>
      </div>
    </Card>

    <!--Second Column-->
    <Card size="sm" padding="none" class="col-span-3 md:col-span-1 mb-6 border-none shadow-none">
      <Card class="mb-6">
        <div class="mb-4">
          <label class="block font-bold mb-2" for="researchLeaders"> Research Leader </label>
          <MultiSelect size="lg" items={userList} bind:value={researchLeaders} required />
          <Helper class="pt-2 text-orange-500"></Helper>
        </div>

        <div class="mb-4">
          <label for="researchTitle" class="block font-bold mb-2"> Project Duration </label>
          <!--nawawara ang menu, may kulang gayud
          <Datepicker datepickerFormat="dd/mm/yyyy" range required/>
        -->
          <Helper class="pt-2 text-orange-500">Specific dates that the project will be undertaken (month/year); ideally to be completed minimum 1 year/ depending on the approved grant</Helper>
        </div>
      </Card>

      <Card class="mb-6">
        <div class="mb-4">
          <Button on:click={() => (saveAsDraft = true)} class="w-full">Save As Draft</Button>

          <Modal bind:open={saveAsDraft} size="xs" autoclose outsideclose>
            <div class="text-center mt-6">
              <h3 class="mb-6 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to save this as a draft?</h3>
              <Button color="red" class="mr-2">Yes, I'm sure</Button>
              <Button color="alternative">No, cancel</Button>
            </div>
          </Modal>
        </div>

        <div class="mb-4">
          <Button on:click={() => (submitResearchProposal = true)} class="w-full">Submit Research Proposal</Button>

          <Modal bind:open={submitResearchProposal} size="xs" autoclose outsideclose>
            <div class="text-center mt-6">
              <h3 class="mb-6 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to save this as a draft?</h3>
              <Button color="red" class="mr-2">Yes, I'm sure</Button>
              <Button color="alternative">No, cancel</Button>
            </div>
          </Modal>
        </div>
      </Card>
    </Card>
  </form>
</main>

<!--
  <div class="grid gap-6 md:grid-cols-3 w-full items-start mb-6">
        <div class="mb-4">
          <label for="researchTitle" class="block font-bold mb-2" >  </label>
          <Input type="text" id="researchTitle" name="researchTitle" required/>
        </div>
  
        <div class="mb-4">
          <label for="researchTitle" class="block font-bold mb-2" >  </label>
          <Input type="text" id="researchTitle" name="researchTitle" required/>
        </div>
  
        <div class="mb-4">
          <label for="researchTitle" class="block font-bold mb-2" >  </label>
          <Input type="text" id="researchTitle" name="researchTitle" required/>
        </div>
      </div>
-->
