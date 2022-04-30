<template>
  <div>
    <div
      style="
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: right;
        box-shadow: 0px 0px 15px -9px black;
        border-radius: 5px;
      "
    >
      <div style="width: 200px" class="mt-2 mr-3">
        <v-text-field
          outlined
          dense
          label="Qidiuv..."
          append-icon="mdi-magnify"
          v-model="search_items"
          @keyup.enter="searchItems(search_items)"
          @click:append="searchItems(search_items)"
        />
      </div>
      <div class="mr-3" style="margin-top: 10px">
        <v-btn
          depressed
          class="error"
          :disabled="!data_table_items.length"
          @click="showDeleteItemsDialog(data_table_items)"
        >
          o'chirish
          <v-icon small> mdi-delete </v-icon>
        </v-btn>
      </div>
    </div>
    <v-data-table
      :headers="headers"
      :items="items"
      show-select
      v-model="data_table_items"
      style="
        box-shadow: 0px 0px 15px -9px black;
        border-radius: 5px;
        margin-top: 15px;
      "
    >
      <template #item.actions="item">
        <v-btn
          icon
          class="warning mr-1"
          small
          @click="showEditDialog(item.item)"
        >
          <v-icon x-small color="#fff"> mdi-pencil </v-icon>
        </v-btn>
        <v-btn icon class="error" small @click="showDeleteDialog(item.item)">
          <v-icon x-small color="#fff"> mdi-delete </v-icon>
        </v-btn>
      </template>
      <template #item.image="item">
        <div style="width: 70px; height: 70px; margin: auto">
          <v-img
            width="100%"
            height="100%"
            :src="image_base_url + item.item.images[0]"
          />
        </div>
      </template>
    </v-data-table>
    <v-dialog v-model="delete_dialog" width="500px" persistent>
      <v-card width="500px" min-height="230px">
        <h1 class="pa-5">
          {{ item_data.item_title }}ni o'chirishni tasdiqlaysizmi?
        </h1>
        <div style="position: absolute; bottom: 15px; right: 15px">
          <v-btn class="success mr-3" @click="deleteItem()" depressed>
            tasdiqlash
          </v-btn>
          <v-btn class="error" depressed @click="delete_dialog = false">
            bekor qilish
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog v-model="delete_items_dialog" width="500px" persistent>
      <v-card width="500px" min-height="230px">
        <h1 class="pa-5">Tanlangan tovarlarni o'chirishni tasdiqlaysizmi?</h1>
        <div style="position: absolute; bottom: 15px; right: 15px">
          <v-btn class="success mr-3" @click="deleteItems()" depressed>
            tasdiqlash
          </v-btn>
          <v-btn class="error" depressed @click="delete_items_dialog = false">
            bekor qilish
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "../../axios";
export default {
  name: "items-page",

  data() {
    return {
      delete_files: [],
      item_data: {
        item_id: "",
        item_title: "",
        items_id: [],
      },
      delete_dialog: false,
      delete_items_dialog: false,
      image_base_url: process.env.VUE_APP_GET_FILE_BASE_URL,
      search_items: "",
      data_table_items: [],
      headers: [
        {
          text: "Tovar ID",
          value: "id",
          align: "center",
        },
        {
          text: "Tovar rasmi",
          value: "image",
          align: "center",
        },
        {
          text: "Tovar nomi",
          value: "product_name",
          align: "center",
        },
        {
          text: "Tovar narxi",
          value: "product_price",
          align: "center",
        },
        {
          text: "Tovar turi",
          value: "product_type",
          align: "center",
        },
        {
          text: "Tovar qo'shimcha ma'lumotlari",
          value: "product_additional",
          align: "center",
        },
        {
          text: "Amallar",
          value: "actions",
          align: "center",
        },
      ],
    };
  },

  computed: {
    ...mapGetters({ items: "items/items" }),
  },

  created() {
    this.getItems();
  },

  methods: {
    showDeleteDialog(item) {
      this.delete_files = item.images;
      this.item_data.item_title = item.product_name;
      this.item_data.item_id = item.id;
      this.delete_dialog = true;
    },

    showDeleteItemsDialog(items) {
      items.forEach((el) => this.item_data.items_id.push(el.id));
      this.delete_items_dialog = true;
    },

    async deleteItems() {
      try {
        this.$overlay(true);
        const response = await axios.delete("products/delete-many", {
          params: {
            items_id: this.item_data.items_id,
            items: this.data_table_items,
          },
        });
        this.$store.dispatch("items/getItems");
        this.delete_items_dialog = false;
        this.item_data.items_id = [];
        this.data_table_items = [];
        this.$toast.success(
          response.data.message || "Tovar muvoffaqiyatli o'chirildi!"
        );
      } catch (e) {
        this.$toast.error(
          e.response.data.message || "Tovarni o'chirishda xatolik yuz berdi"
        );
      } finally {
        this.$overlay(false);
      }
    },
    async deleteItem() {
      try {
        this.$overlay(true);
        const response = await axios.delete("products/delete-one", {
          params: {
            item_id: this.item_data.item_id,
            images: this.delete_files,
          },
        });
        this.$store.dispatch("items/getItems");
        this.delete_dialog = false;
        this.$toast.success(
          response.data.message || "Tovar muvoffaqiyatli o'chirildi!"
        );
      } catch (e) {
        this.$toast.error(
          e.response.data.message || "Tovarni o'chirishda xatolik yuz berdi"
        );
      } finally {
        this.$overlay(false);
      }
    },
    showEditDialog(item) {
      this.$store.dispatch("addDialog/showEditDialog", item);
    },
    async searchItems(msg) {
      try {
        this.$overlay(true);
        await this.$store.dispatch("items/searchItems", {
          params: {
            item: msg,
          },
        });
      } catch (e) {
        this.$toast.error(
          e.response.data.message || "Qidirishda xatolik yuz berdi!"
        );
      } finally {
        this.$overlay(false);
      }
    },
    async getItems() {
      try {
        this.$overlay(true);
        await this.$store.dispatch("items/getItems");
      } catch (e) {
        this.$toast.error(
          e.response.data.message ||
            "Ma'lumotlarni yuklab olishda xatolik yuz berdi!"
        );
      } finally {
        this.$overlay(false);
      }
    },
  },
};
</script>

<style scoped></style>
