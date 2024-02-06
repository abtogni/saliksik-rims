<template>
  <v-container fluid class="fill-height body pa-0">
    <!--header-->
    <v-row no-gutters class="row-header">
      <v-col class="col-start">
        <v-row no-gutters>
          <h2>Create Concept Note</h2>
        </v-row>
        <v-row no-gutters>
          <h2 class="caption">
            Fill out all required fields. Put "N/A" if not applicable.
          </h2>
        </v-row>
      </v-col>
      <v-col class="col-end">
        <v-btn type="submit" class="button-regular">
          <v-icon start type="submit" icon="mdi-file-upload"></v-icon> Submit
        </v-btn>
        <v-btn type="submit" class="button-outlined">
          <v-icon start type="save_as_draft" icon="mdi-file"></v-icon> Save As
          Draft
        </v-btn>
      </v-col>
    </v-row>

    <!--form-->

    <v-row no-gutters class="row-content">
      <v-form class="form-concept-note">
        <v-card class="card-concept-note">
          <v-text-field label="Project Title" variant="outlined"></v-text-field>
          <v-select label="Project Leaders" variant="outlined" multiple chips>
          </v-select>
          <v-row>
            <v-col>
              <v-text-field
                label="Implementing Agency/Department"
                variant="outlined"
              ></v-text-field>
              <v-text-field
                label="Cooperating Agency"
                variant="outlined"
              ></v-text-field>
              <v-text-field
                label="Site/s of Implementation"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                label="Project Duration"
                variant="outlined"
              ></v-text-field>
              <v-text-field
                label="Total Project Cost"
                variant="outlined"
              ></v-text-field>
              <v-text-field
                label="Funding Source"
                variant="outlined"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card>
        <v-card class="card-concept-note">
          <v-textarea
            label="Project Description"
            variant="outlined"
            rows="20"
            auto-grow
          ></v-textarea
          ><v-file-input
            label="Upload images, charts, tables here, if necessary."
            variant="outlined"
            chips
            multiple
          ></v-file-input>
        </v-card>
        <v-card class="card-concept-note"
          ><v-textarea
            label="Significance"
            variant="outlined"
            rows="20"
            auto-grow
          ></v-textarea
          ><v-file-input
            label="Upload images, charts, tables here, if necessary."
            variant="outlined"
            chips
            multiple
          ></v-file-input
        ></v-card>
        <v-card class="card-concept-note"
          ><v-textarea
            label="Objectives"
            variant="outlined"
            rows="20"
            auto-grow
          ></v-textarea
          ><v-file-input
            label="Upload images, charts, tables here, if necessary."
            variant="outlined"
            chips
            multiple
          ></v-file-input
        ></v-card>
        <v-card class="card-concept-note"
          ><v-textarea
            label="Methodology"
            variant="outlined"
            rows="20"
            auto-grow
          ></v-textarea
          ><v-file-input
            label="Upload images, charts, tables here, if necessary."
            variant="outlined"
            chips
            multiple
          ></v-file-input
        ></v-card>
        <v-card class="card-concept-note"
          ><v-textarea
            label="Technology Roadmap"
            variant="outlined"
            rows="20"
            auto-grow
          ></v-textarea
          ><v-file-input
            label="Upload images, charts, tables here, if necessary."
            variant="outlined"
            chips
            multiple
          ></v-file-input
        ></v-card>
        <v-card class="card-concept-note"
          ><v-textarea
            label="Expected Outputs (6Ps)"
            variant="outlined"
            rows="20"
            auto-grow
          ></v-textarea
          ><v-file-input
            label="Upload images, charts, tables here, if necessary."
            variant="outlined"
            chips
            multiple
          ></v-file-input
        ></v-card>
        <v-card class="card-concept-note"
          ><v-textarea
            label="Work Plan"
            variant="outlined"
            rows="20"
            auto-grow
          ></v-textarea>
          <v-file-input
            label="Upload images, charts, tables here, if necessary."
            variant="outlined"
            chips
            multiple
          ></v-file-input>
        </v-card>
      </v-form>
    </v-row>
  </v-container>
</template>
