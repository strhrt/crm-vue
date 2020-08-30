<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <div class="row">
        <CreateCategory @created="addNewCategory" />

        <EditCategory />
      </div>
    </section>
  </div>
</template>
<script>
import CreateCategory from "@/components/CreateCategory";
import EditCategory from "@/components/EditCategory";
export default {
  name: "categories",
  components: {
    CreateCategory,
    EditCategory,
  },
  data: () => ({
    categories: [],
  }),
  methods: {
    addNewCategory(category) {
      const lol = this.categories.push(category);
      console.log(this.categories);
    },
  },
};
</script>