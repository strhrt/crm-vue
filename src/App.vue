<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>
<script>

export default {
  components: { AuthLayout: () => import( "@/layouts/AuthLayout.vue"),
   MainLayout: () => import("@/layouts/MainLayout.vue") },
  computed: {
    layout() {
      return (this.$route.meta.layout || "auth") + "-layout";
    },
  },
};
</script>
<style lang="scss">
@import "~materialize-css/dist/css/materialize.min.css";
@import "assets/index.css";
</style>
