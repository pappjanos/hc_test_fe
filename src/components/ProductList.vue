<template>
  <v-data-table
    :headers="headers"
    :items="products"
    sort-by="productName"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Products</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              New Product
            </v-btn>
          </template>
          <v-form
              v-model="valid"
              lazy-validation
              ref="form"
              @submit.prevent="onSubmit"
          >
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.productName"
                        label="Product name"
                        :rules="[required]"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.cost"
                        label="Cost"
                        :rules="[required, number]"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.amountAvailable"
                        label="Amount available"
                        :rules="[required, number]"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  :disabled="!valid"                  
                  @click="save"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
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
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>

  </v-data-table>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      number: (value) => isNaN(value) ? 'Must be a number!' : true,
      required: (value) => !value || value == 0 ? 'Required or must be over 0!' : true,      
      valid: true,
      headers: [
        {
          text: 'id',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        {
          text: 'Product name',
          sortable: true,
          align: 'start',
          value: 'productName',
        },
        {
          text: 'Product cost',
          sortable: true,
          align: 'start',
          value: 'cost',
        },
        {
          text: 'Amount available',
          align: 'start',
          sortable: true,
          value: 'amountAvailable',
        },                
        { text: 'Actions', value: 'actions', sortable: false, align: 'start', },        
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        productName: '',
        cost: 0,
        amountAvailable: 0,
      },
      defaultItem: {
        productName: '',
        cost: 0,
        amountAvailable: 0,
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New product' : 'Edit product'
      },
      ...mapGetters("products", ["products"]),
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    async created () {
      await this.getProductList();
    },
    methods: {
      ...mapActions("products", ["getProductList", "addProduct", "patchProduct", "deleteProduct"]),

      editItem (item) {
        this.editedIndex = this.products.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.products.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      async deleteItemConfirm () {
        await this.deleteProduct(this.editedItem.id)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      async save () {
        if (this.editedIndex > -1) {
          //in case of edit object
          await this.patchProduct(this.editedItem)
        } else {
          // in case of add object
          await this.addProduct(this.editedItem)
          this.desserts.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>