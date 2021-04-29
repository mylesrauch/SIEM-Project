<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="logs"
      :search="search"
      sort-by="hostname"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>Logs</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
          ></v-text-field>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
            <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
    </v-data-table>
  </div>
</template>            


<script>

  export default {
        data: () => ({
      search:'',
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Hostname',
          align: 'start',
          sortable: true,
          value: 'hostname',
        },
        { text: 'IP Address', value: 'ip' },
        // { text: 'Type', value: 'type' },
        { text: 'Description', value: 'description' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      logs: [],
      defaultItem: {
        hostname: '',
        ip: '',
        //type: 0,
        description: '',
      },
    }),
    
    async fetch() {
    this.logs = await this.$axios.$get("/api/all-logs");
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.pollData()
    },

    methods: {
      async pollData() {
        this.polling = setInterval(async () => {
          this.$fetch();
        }, 30000);
      },
    },
      beforeUnmount() {
        clearInterval(this.polling);
      },

      deleteItem (item) {
        this.editedIndex = this.logs.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.logs.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
    }
</script>