<template>
  <div style="width: 100%; height: 100%">
    <div
      style="
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      "
    >
      <v-row class="pa-0 ma-0">
        <v-col
          v-for="(admin, index) of admins"
          :key="index"
          cols="12"
          md="3"
          style="display: flex; justify-content: center"
        >
          <v-card
            style="
              box-shadow: 0px 0px 15px -9px;
              border-radius: 10px;
              display: flex;
              align-items: center;
              justify-content: center;
            "
            width="400px"
            height="250px"
            :to="admin.to"
          >
            <h2>{{ admin.title }}</h2>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <addDialog />
  </div>
</template>

<script>
import addDialog from "../components/add-or-edit-dialog";
export default {
  name: "Home",
  components: { addDialog },

  data() {
    return {
      admins: [
        {
          title: "Tovarlar",
          to: "/items",
        },
        {
          title: "Buyurtmalar",
          to: "/orders",
        },
        {
          title: "Bekor qilingan buyurtmalar",
          to: "/canceled-orders",
        },
        {
          title: "Foydalanuvchilar",
          to: "/users",
        },
      ],
    };
  },
  methods: {},
};
</script>
