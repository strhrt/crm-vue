<template>
  <div>
    <Loader v-if="loading" />
    <div class="app-main-layout" v-else>
      <Navbar @click="isOpen = !isOpen" />

      <Sidebar v-model="isOpen" :key="locale" />

      <main class="app-content" :class="{ full: !isOpen }">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link
          class="btn-floating btn-large blue"
          to="/record"
          v-tooltip="'Новая запись'"
        >
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import messages from "@/utils/messages";

export default {
  name: "main-layout",
  components: {
    Navbar: () => import("@/components/Navbar.vue"),
    Sidebar: () => import("@/components/Sidebar.vue"),
  },
  data: () => ({
    isOpen: true,
    loading: true,
  }),
  computed: {
    error() {
      return this.$store.getters.error;
    },
    locale() {
      return this.$store.getters.info.locale;
    },
  },
  watch: {
    error(fbError) {
      console.log(fbError);
      this.$error(messages[fbError.code] || "Что-то пошло не так");
    },
  },

  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch("fetchInfo");
    }
    this.loading = false;
  },
};
</script>

<style lang="scss" scoped>
.app-content {
  padding-left: 300px;
}
</style>
