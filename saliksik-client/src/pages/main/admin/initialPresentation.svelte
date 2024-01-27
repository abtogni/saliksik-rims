<script lang="ts">
  import { Accordion, AccordionItem, Alert, Avatar, Badge, Button, Dropdown, DropdownItem, Indicator, Modal, P, Tooltip } from "flowbite-svelte";
  import { CalendarEditOutline, CalendarMonthOutline, CalendarPlusSolid, DotsHorizontalOutline, EyeOutline, FileCirclePlusOutline, FileLinesOutline, InfoCircleOutline, MapLocationOutline, MessageCaptionOutline, QuestionCircleOutline, TrashBinOutline, UsersGroupOutline } from "flowbite-svelte-icons";
  import { researches, userList } from "../../../components/store";
  import moment from "moment";
  import { onMount } from "svelte";
  import CreatePresentationModal from "../../../modals/CreatePresentationModal.svelte";

  //modal for add schedule
  let addSchedule = false;

  //modal for send notice to present
  let sendNoticeToPresent = false;

  let newUserList: any[];

  onMount(async () => {
    newUserList = $userList.map((user: any) => ({
      id: `${user._id}`,
      name: `${user.firstName} ${user.lastName}`,
      avatar: user.avatar,
    }));
  });
</script>

<main class="p-4">
  <div class="flex justify-center gap-2 bg-gray-50">
    <div class="grid grid-flow-row col-start-2 col-span-3 items-center gap-2 w-11/12 sm:w-full md:w-full lg:w-11/12 xl:w-11/12 2xl:w-11/12">
      <Alert dismissable color="blue" class="border-l-8 w-full  mb-2">
        <div class="flex items-center gap-2">
          <QuestionCircleOutline slot="icon" size="sm" />
          <span class="text-lg font-medium">Initial Presentation</span>
        </div>
        <p class="mt-2 text-sm">Insert helper text</p>
      </Alert>

      <!---->
      <div class="flex justify-between items-center w-full">
        <div class="flex items-center gap-2">
          <FileLinesOutline size="md" class="text-blue-700" />
          <P weight="bold" size="xl" class="text-gray-900">00 <span class="text-gray-500">Researches For Initial Presentation</span></P>
        </div>

        <div class="flex items-center gap-2">
          <Button on:click={() => (addSchedule = true)} color="blue" size="sm" class="flex items-center gap-2 rounded-md"><CalendarPlusSolid size="sm" />Create Schedule</Button>
        </div>
      </div>

      <!--card schedule-->
      <div class="grid grid-flow-row w-full shadow-lg border rounded-lg bg-white">
        <!--card schedule header-->
        <div class="grid grid-flow-row items-center gap-2 px-4 py-3 border-b">
          <div class="flex justify-between items-center gap-2">
            <div class="flex justify-start items-center gap-2">
              <CalendarMonthOutline size="md" class="text-blue-700" />
              <P size="lg" weight="bold" class="uppercase">Sunday, January 21, 2023 at 1:30 PM</P>
            </div>

            <Button outline color="blue" size="sm" class="flex items-center rounded-full border-none gap-2 p-1"><DotsHorizontalOutline size="sm" /></Button>
            <Dropdown>
              <DropdownItem>
                <div class="flex justify-start items-center gap-2">
                  <FileCirclePlusOutline size="sm" class="text-blue-700" />Add Research
                </div>
              </DropdownItem>
              <DropdownItem>
                <div class="flex justify-start items-center gap-2">
                  <CalendarEditOutline size="sm" class="text-blue-700" />Change Schedule
                </div>
              </DropdownItem>
              <DropdownItem>
                <div class="flex justify-start items-center gap-2">
                  <TrashBinOutline size="sm" class="text-blue-700" />Delete Schedule
                </div>
              </DropdownItem>
            </Dropdown>
          </div>

          <div class="flex flex-wrap justify-start items-center gap-4">
            <div class="flex justify-start items-center gap-2">
              <MapLocationOutline size="sm" class="text-blue-700" />
              <P weight="semibold" size="base" class="line-clamp-1 text-gray-500">UNC Testing Center</P>
            </div>

            <div class="flex justify-start items-center gap-2">
              <UsersGroupOutline size="sm" class="text-blue-700" />
              <P weight="semibold" size="base" class="line-clamp-1 text-gray-500">00 <span class="font-normal">presenters going</span></P>
            </div>
          </div>
        </div>

        <Accordion flush>
          {#if $researches}
            {#each $researches as research, i}
              <AccordionItem paddingFlush="">
                <div slot="header" class="flex flex-wrap gap-2 px-4 py-3 w-full hover:bg-blue-50">
                  <div class="flex justify-between items-center gap-2 w-full">
                    <div class="flex justify-start items-center gap-2">
                      <div class="flex items-center gap-0">
                        {#each research.researchLeaders as member}
                          {#if newUserList}
                            {#each newUserList as user}
                              {#if user.id === member}
                                <div class="flex items-center gap-0">
                                  <Avatar border size="xs" class="text-xs font-medium ring-blue-700">{user.avatar}</Avatar>
                                  <Tooltip arrow={false}>{user.name}</Tooltip>
                                </div>
                              {/if}
                            {/each}
                          {/if}
                        {/each}
                      </div>

                      <div class="flex justify-start items-center gap-2">
                        <Badge border large class="flex items-center gap-2">
                          <Indicator color="orange" size="md" class="" />Waiting for Reply
                        </Badge>
                        <Badge border large color="blue" class="flex items-center gap-2">
                          <Indicator color="blue" size="md" class="" />Going
                        </Badge>
                        <Badge border large color="red" class="flex items-center gap-2">
                          <Indicator color="red" size="md" class="" />Not Going
                        </Badge>
                      </div>
                      <div class="flex items-center gap-2">
                        <Button on:click={() => (addSchedule = true)} color="blue" size="sm" class="flex items-center gap-2 rounded-md"><MessageCaptionOutline size="sm" />Add Panelist Comment</Button>
                      </div>
                    </div>
                    <div class="flex justify-end items-center gap-2">
                      <Button outline color="blue" size="sm" class="flex items-center rounded-full border-none gap-2 p-1"><EyeOutline size="sm" /></Button>
                      <Tooltip arrow={false} class="border rounded-md shadow-lg  bg-white">
                        <P weight="normal" size="sm" class="font-medium text-gray-500">Full View</P>
                      </Tooltip>

                      <Button outline color="blue" size="sm" class="flex items-center rounded-full border-none gap-2 p-1"><DotsHorizontalOutline size="sm" /></Button>
                      <Dropdown>
                        <DropdownItem>
                          <div class="flex justify-start items-center gap-2">
                            <TrashBinOutline size="sm" class="text-blue-700" />Remove Research
                          </div>
                        </DropdownItem>
                      </Dropdown>
                    </div>
                  </div>
                  <div class="flex justify-start items-start w-full">
                    <P weight="semibold" size="sm" class="line-clamp-2">{research.researchTitle}</P>
                  </div>
                </div>

                <div slot="arrowup"></div>
                <span slot="arrowdown"> </span>

                <div class="flex flex-wrap justify-start items-center gap-2 p-3 w-full h-96 overflow-auto">
                  <!--concept note overview card-->
                  <div class="grid grid-flow-row w-full shadow-lg border rounded-lg gap-2 p-3 bg-white">
                    <div class="flex items-start gap-2">
                      <div class="grid grid-flow-row items-start gap-2">
                        <div class="flex flex-wrap justify-start items-start gap-2">
                          <P size="sm" weight="medium">Implementing Agency/Department:</P>
                          <Badge border large color="dark" class="flex items-center gap-2 font-normal text-sm border-none text-gray-500">{research.conceptNote.implementingDept}</Badge>
                        </div>
                        <div class="flex flex-wrap justify-start items-start gap-2">
                          <P size="sm" weight="medium">Cooperating Agency:</P>
                          <Badge border large color="dark" class="flex items-center gap-2 font-normal text-sm border-none text-gray-500"></Badge>
                          <Badge border large color="dark" class="flex items-center gap-2 font-normal text-sm border-none text-gray-500">Vice-President for Academic Affairs</Badge>
                        </div>
                        <div class="flex flex-wrap justify-start items-start gap-2">
                          <P size="sm" weight="medium">Site/s of Implementation:</P>
                          <Badge border large color="dark" class="flex items-center gap-2 font-normal text-sm border-none text-gray-500">{research.conceptNote.siteImplementation}</Badge>
                        </div>
                        <div class="flex flex-wrap justify-start items-start gap-2">
                          <P size="sm" weight="medium">Project Duration:</P>
                          <P size="sm" weight="normal" class="text-gray-500">{moment(research.conceptNote.projectDuration).format("LL")}</P>
                        </div>
                        <div class="flex flex-wrap justify-start items-start gap-2">
                          <P size="sm" weight="medium">Total Project Cost:</P>
                          <P size="sm" weight="normal" class="text-gray-500">{research.conceptNote.totalCost}</P>
                        </div>
                        <div class="flex flex-wrap justify-start items-start gap-2">
                          <P size="sm" weight="medium">Funding Source:</P>
                          <Badge border large color="dark" class="flex items-center gap-2 font-normal text-sm border-none text-gray-500">{research.conceptNote.fundingSource}</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionItem>
            {/each}
          {/if}
        </Accordion>
        <!--card presenter-->

        <div class="flex flex-wrap gap-2 px-4 py-3">
          <Button on:click={() => (sendNoticeToPresent = true)} color="blue" size="md" class="rounded-md w-full">Send Notice to Present</Button>
        </div>

        <!--modal send notice to present-->
        <Modal title="Send Notice to Present" bind:open={sendNoticeToPresent} size="xs" autoclose class="w-full">
          <div class="flex justify-center items-center">
            <InfoCircleOutline size="xl" class="text-blue-700" />
          </div>
          <P weight="normal" size="base" class="text-center">Are you sure you want to proceed?</P>
          <div class="flex gap-2">
            <Button color="blue" size="md" class="w-full">Yes</Button>
            <Button type="submit" outline color="blue" size="sm" class="w-full">No</Button>
          </div>
        </Modal>
      </div>
    </div>
  </div>

  <!--modal for create schedule-->
  <Modal title="Create Schedule" bind:open={addSchedule} size="md" autoclose={false} outsideclose class="rounded-md w-full">
    <CreatePresentationModal />
  </Modal>
  <div class="h-96"></div>
  <div class="h-96"></div>
</main>
