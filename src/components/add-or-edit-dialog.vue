/* eslint-disable prettier/prettier */
<template>
  <div>
    <v-dialog width="600px" persistent v-model="show">
      <v-card width="600px" min-height="600px" class="pa-0">
        <h1 v-if="formData.editing" class="pl-5 pt-5">{{ formData.title }}</h1>
        <div>
          <v-text-field
            v-model="formData.title"
            label="Tovar nomi"
            outlined
            hide-details
            class="pa-5"
          />
          <v-autocomplete
            :items="items_category"
            v-model="formData.type"
            item-text="title"
            item-value="title"
            label="Tovar turi"
            outlined
            hide-details
            class="pa-5"
          />
          <v-file-input
            label="Tovar rasmi"
            outlined
            class="pa-5"
            multiple
            v-model="formData.images"
            v-if="!formData.editing"
          />
          <v-textarea
            label="Tovar qo'shimcha ma'lumotlari"
            outlined
            class="pa-5"
            v-model="formData.additional_data"
          />
        </div>

        <div
          style="
            width: 100%;
            height: 70px;
            position: absolute;
            bottom: 0;
            display: flex;
            align-items: center;
            justify-content: end;
          "
        >
          <v-btn
            depressed
            color="success"
            height="45px"
            class="mr-3"
            @click="sendData(formData.editing)"
          >
            saqlash
          </v-btn>
          <v-btn
            @click="hideDialog()"
            depressed
            color="error"
            height="45px"
            class="mr-3"
          >
            bekor qilish
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "../axios";
export default {
  name: "add-or-edit-dialog",

  data() {
    return {
      items_category: [
        {
          title: "texnikalar",
        },
        {
          title: "avto-texnikalar",
        },
        {
          title: "telefonlar",
        },
        {
          title: "kiyimlar",
        },
        {
          title: "aksessuarlar",
        },
        {
          title: "boshqa",
        },
      ],
    };
  },

  computed: {
    ...mapGetters({ show: "addDialog/show" }),
    ...mapGetters({ formData: "addDialog/formData" }),
  },
  methods: {
    async sendData(editing) {
      if (!editing) {
        let formData = new FormData();
        formData.append("product_name", this.formData.title);
        formData.append("product_type", this.formData.type);
        formData.append("product_additional", this.formData.additional_data);
        this.formData.images.forEach((image) => {
          formData.append("images", image);
        });
        try {
          this.$overlay(true);
          const response = await axios.post("products/create", formData);
          this.$store.dispatch("addDialog/hideDialog");
          this.$store.dispatch("items/getItems");
          this.$toast.success(response.data?.message || "Tovar yuklandi!");
        } catch (e) {
          this.$toast.error(
            e.response?.data?.message ||
              "Ma'lumotni yuklashda xatolik yuz berdi!"
          );
        } finally {
          this.$overlay(false);
        }
      } else {
        try {
          this.$overlay(true);
          const response = await axios.put("products/update", {
            item_id: this.formData.item_id,
            product_name: this.formData.title,
            product_type: this.formData.type,
            product_additional: this.formData.additional_data,
          });
          this.$store.dispatch("addDialog/hideDialog");
          this.$store.dispatch("items/getItems");
          this.$toast.success(response.data?.message || "Tovar yuklandi!");
        } catch (e) {
          this.$toast.error(
            e.response?.data?.message ||
              "Ma'lumotni yuklashda xatolik yuz berdi!"
          );
        } finally {
          this.$overlay(false);
        }
      }
    },
    hideDialog() {
      this.$store.dispatch("addDialog/hideDialog");
    },
  },
};
</script>
