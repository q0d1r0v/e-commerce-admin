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
      <h1>404 not-found</h1>
      <div style="position: absolute; width: 200px; margin-top: 110px">
        <v-btn
          block
          depressed
          color="primary"
          height="45px"
          @click="$router.push('/')"
          >home</v-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "not-found",
};
</script>

<style scoped></style>
