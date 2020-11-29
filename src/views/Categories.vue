<template>
  <div>
    <div class="page-title">
      <h3>{{ "Categories" | localize }}</h3>
    </div>
    <section>
      <Loader v-if="loading" />
      <div class="row" v-else>
        <CreateCategory @created="addNewCategory" />

        <EditCategory
          v-if="categories.length"
          :categories="categories"
          :key="categories.length + updateCount"
          @updated="updateCategories"
        />
        <p v-else class="center mt-5">
          {{ "Message_NoCategories" | localize }}
        </p>
      </div>
    </section>
  </div>
</template>
<script>
// import CreateCategory from "@/components/CreateCategory";
// import EditCategory from "@/components/EditCategory";

export default {
  name: "categories",
  components: {
    CreateCategory: () => import("@/components/CreateCategory"),
    EditCategory: ()=> import("@/components/EditCategory")
  },
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0,
  }),
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");
    this.loading = false;
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category);
    },
    updateCategories(category) {
      const idx = this.categories.findIndex((c) => c.id === category.id);
      this.categories[idx].title = category.title;
      this.categories[idx].limit = category.limit;
      this.updateCount++;
    },
  },
};
</script>
