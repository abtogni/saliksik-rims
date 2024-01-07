<script>
  import { Alert, Avatar, Breadcrumb, BreadcrumbItem, Button, Card, Gallery, Heading, Hr, P, Tooltip } from "flowbite-svelte";
  import { DotsHorizontalOutline, DownloadOutline, BookmarkOutline, EyeOutline, ClipboardOutline, QuoteOutline, HomeOutline, ChevronDoubleRightOutline, GridOutline, SearchOutline, QuestionCircleOutline } from "flowbite-svelte-icons";

  const images = [
    { alt: "technology roadmap", src: "https://i.pinimg.com/564x/6a/38/c4/6a38c4ac733795a6b8312d0c4d800177.jpg" },
    { alt: "", src: "https://s1.zerochan.net/Ginko.%28Mushishi%29.600.848180.jpg" },
    { alt: "", src: "https://i.pinimg.com/originals/a0/27/ed/a027eda200567140ca2d9c6443a45264.jpg" },
    { alt: "", src: "https://pbs.twimg.com/media/CZ8p7E3UYAABXQx.png" },
  ];
</script>

<main>

  <div class="flex items-center gap-2 pb-2"><P weight="semibold" size="2xl" class="">Browse Researches</P></div>
  
  <Alert dismissable color="blue" class="border-l-8 w-full mb-2">
  <div class="flex items-center gap-2">
    <QuestionCircleOutline slot="icon" size="sm" />
    <span class="text-lg font-medium">Browser Researches</span>
  </div>
  <p class="mt-2 text-sm">Insert helper text</p>
</Alert>

  <div class="grid grid-cols-3 gap-2 items-start">
    
    <!--left column-->
    <div class=" grid col-span-3 md:col-span-2 gap-2">
      <Card padding="sm" size="xl" class="grid gap-2">
        <div class="flex justify-between gap-4 items-start">
          <div class="flex gap-3 items-start">
            <div>
              <Avatar border size="md" class=" ring-orange-400">AR</Avatar>
            </div>

            <div class="">
              <div class="flex justify-start gap-1 items-center">
                <P weight="bold" size="base" class="line-clamp-1">Agnes T. Reyes</P>
                <P weight="medium" size="base" color="text-orange-600" class="line-clamp-1">w/ June Arreb C. Danila, Dennis E. Ignacio, Danny Casimero</P>
              </div>

              <P weight="normal" size="sm" color="text-grey-500">January 1, 2023</P>
            </div>
          </div>

          <DotsHorizontalOutline />
          <Tooltip placement="bottom">More</Tooltip>
        </div>

        <div>
          <Heading tag="h6" class="line-clamp-2">Streamlining Outcome-Based Education and Continuous Quality Improvement of University of Nueva Caceres through Technology: A Information Management System for Improving Inclusiveness</Heading>
        </div>
        <div class="flex justify-start gap-2 items-start">
          <Button color="alternative" pill class="rounded-lg shadow-none p-2 font-medium text-xs">CCS</Button>
          <Button color="alternative" pill class="rounded-lg shadow-none p-2 font-medium text-xs">Information Management System</Button>
        </div>
        <div class="line-clamp-6">
          <P weight="normal" size="sm">Outcome-based education (OBE) and continuous quality improvement (CQI) are two of the most important concepts in education today. OBE is a student-centered approach that focuses on the development of specific skills, knowledge, and attitudes that are relevant to the needs of the society. (Akir et al., 2012) CQI, on the other hand, is a continuous process of reviewing, analyzing, and improving educational practices and policies to ensure that the highest quality of education is delivered. (Misran et al.,2011) In recent years, there has been a growing interest in the development and utilization of new educational technologies and resources for inclusive education (Smith, 2018). This is because these technologies have the potential to significantly improve the efficiency and effectiveness of OBE-CQI processes.</P>
        </div>

        <div>
          <Gallery items={images} let:item class="grid grid-cols-2 md:grid-cols-4 gap-1  ">
            <div class="">
              <img src={item.src} alt={item.alt} class="object-cover h-52 md:h-64 w-full rounded-lg" />
            </div>
          </Gallery>
        </div>
        <Hr classHr="my-2" />
        <div class="flex justify-between">
          <div class="flex justify-start items-start gap-1">
            <EyeOutline />
            <P weight="medium" size="sm" color="text-grey-700">0.00K</P>
          </div>
          <Tooltip placement="bottom">View</Tooltip>
          <QuoteOutline />
          <Tooltip placement="bottom">Copy Citation</Tooltip>
          <ClipboardOutline />
          <Tooltip placement="bottom">Copy Link to Clipboard</Tooltip>
          <BookmarkOutline />
          <Tooltip placement="bottom">Bookmark</Tooltip>
          <DownloadOutline />
          <Tooltip placement="bottom">Download as PDF</Tooltip>
        </div>
      </Card>
    </div>
    <!--right column-->
    <div class="grid col-span-3 md:col-span-1 gap-2">
      <Card padding="sm" size="xl" class="">
        <Heading tag="h5" class="line-clamp-1">Reading History</Heading>
        <Hr classHr="my-2" />
        <div class="grid grid-cols-1 gap-5">
          <div class="grid grid-cols-1 gap-1">
            <div class="line-clamp-2">
              <P weight="bold" size="base">Streamlining Outcome-Based Education and Continuous Quality Improvement of University of Nueva Caceres through Technology: A Information Management System for Improving Inclusiveness</P>
            </div>
            <div class="flex justify-between items-center">
              <div class="flex items-center gap-2">
                <!--
                  <div>
                  <Avatar border size="sm" class=" ring-orange-400">AR</Avatar>
                </div>
                -->
                <div class="">
                  <P weight="medium" size="xs" class="line-clamp-1 ">Agnes T. Reyes</P>
                  <P weight="normal" size="xs" color="text-orange-600" class="line-clamp-1 ">w/ June Arreb C. Danila, Dennis E. Ignacio, Danny Casimero</P>
                </div>
              </div>
              <div class="w-20">
                <P weight="normal" size="xs" color="text-grey-500" class="text-right">01/01/2023</P>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 gap-1">
            <div class="line-clamp-2">
              <P weight="bold" size="base">Streamlining Outcome-Based Education and Continuous Quality Improvement of University of Nueva Caceres through Technology: A Information Management System for Improving Inclusiveness</P>
            </div>
            <div class="flex justify-between items-center">
              <div class="flex items-center gap-2">
                <!--
                  <div>
                  <Avatar border size="sm" class=" ring-orange-400">AR</Avatar>
                </div>
                -->

                <div class="">
                  <P weight="medium" size="xs" class="line-clamp-1">Agnes T. Reyes</P>
                  <P weight="normal" size="xs" color="text-orange-600" class="line-clamp-1">w/ June Arreb C. Danila, Dennis E. Ignacio, Danny Casimero</P>
                </div>
              </div>
              <div class="w-20">
                <P weight="normal" size="xs" color="text-grey-500" class="text-right">01/01/2023</P>
              </div>
            </div>
          </div>
          <P size="base" class="text-orange-500">Show More</P>
        </div>
      </Card>

      <Card padding="sm" size="xl" class="">
        <Heading tag="h5" class="">Bookmarks</Heading>
        <Hr classHr="my-2" />
        <div class="grid grid-cols-1 gap-5">
          <div class="grid grid-cols-1 gap-1">
            <div class="line-clamp-2">
              <P weight="bold" size="base">Streamlining Outcome-Based Education and Continuous Quality Improvement of University of Nueva Caceres through Technology: A Information Management System for Improving Inclusiveness</P>
            </div>
            <div class="flex justify-between items-center">
              <div class="flex items-center gap-2">
                <!--
                  <div>
                  <Avatar border size="sm" class=" ring-orange-400">AR</Avatar>
                </div>
                -->
                <div class="">
                  <P weight="medium" size="xs" class="line-clamp-1 ">Agnes T. Reyes</P>
                  <P weight="normal" size="xs" color="text-orange-600" class="line-clamp-1 ">w/ June Arreb C. Danila, Dennis E. Ignacio, Danny Casimero</P>
                </div>
              </div>
              <div class="w-20">
                <P weight="normal" size="xs" color="text-grey-500" class="text-right">01/01/2023</P>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 gap-1">
            <div class="line-clamp-2">
              <P weight="bold" size="base">Streamlining Outcome-Based Education and Continuous Quality Improvement of University of Nueva Caceres through Technology: A Information Management System for Improving Inclusiveness</P>
            </div>
            <div class="flex justify-between items-center">
              <div class="flex items-center gap-2">
                <!--
                  <div>
                  <Avatar border size="sm" class=" ring-orange-400">AR</Avatar>
                </div>
                -->

                <div class="">
                  <P weight="medium" size="xs" class="line-clamp-1">Agnes T. Reyes</P>
                  <P weight="normal" size="xs" color="text-orange-600" class="line-clamp-1">w/ June Arreb C. Danila, Dennis E. Ignacio, Danny Casimero</P>
                </div>
              </div>
              <div class="w-20">
                <P weight="normal" size="xs" color="text-grey-500" class="text-right">01/01/2023</P>
              </div>
            </div>
          </div>
          <P size="base" class="text-orange-500">Show More</P>
        </div>
      </Card>
    </div>
  </div>
  <div class="h-96"></div>
</main>
