<template>
  <v-hover v-slot:default="{ isHovering, props }">
    <v-card
      flat
      rounded="0"
      v-bind="props"
      :color="isHovering ? '#eef2ff' : undefined"
    >
      <v-card-text class="notif-body">
        <div class="notif-header">
          <div class="notif-left">
            <h7
              >Notice To Proceed ~
              <span class="notif-txt">
                The proposal hereto entitled
                <span class="bold"
                  >Streamlining Outcome-Based Education and Continuous Quality
                  Improvement of University of Nueva Caceres through Technology:
                  A Information Management System for Improving
                  Inclusiveness.</span
                >

                Prepared and submitted by:
                <span class="bold"
                  >Cynthia Liza Arce Abarca, MBA, Maricar Bien, MM, Maria
                  Cristina Maniquiz, MBA, and Jason Keith Boñaga, AEM, MDRCM,
                  MBA.</span
                >

                Has been examined and is recommended for acceptance and approval
                to proceed to the next phase of research process. Approved by
                the University Research Council on
                <span class="bold">April 11, 2023.</span>
              </span>
            </h7>
            <span class="notif-date-txt"> Jan 21, 2023 </span>
          </div>
          <div class="notif-right">
            <v-badge dot color="primary"></v-badge>
          </div>
        </div>

        <div>
          <v-btn flat density="comfortable" class="button-regular">
            Proceed To Next Phase
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-hover>
</template>
