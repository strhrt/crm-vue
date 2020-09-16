<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{ info.bill | currency("RUB") }}</h4>
    </div>
    <Loader v-if="loading" />
    <p v-else-if="!categories.length" class="mx-auto">
      Категорий нет. <router-link to="/categories">Добавить</router-link>
    </p>

    <section v-else>
      <div v-for="cat in categories" :key="cat.id">
        <p>
          <strong>{{ cat.title }}:</strong>
          {{ cat.spend | currency("RUB") }} из {{ cat.limit | currency("RUB") }}
        </p>
        <div class="progress">
          <div
            class="determinate"
            :class="[cat.progressColor]"
            :style="{ width: cat.progressPercent + '%' }"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Planning",
  data: () => ({
    loading: true,
    categories: [],
  }),
  computed: { ...mapGetters(["info"]) },
  async mounted() {
    const records = await this.$store.dispatch("fetchRecords");
    const categories = await this.$store.dispatch("fetchCategories");

    this.categories = categories.map((cat) => {
      const spend = records
        .filter((rec) => rec.categoryId === cat.id)
        .filter((rec) => rec.type === "outcome")
        .reduce((acc, record) => (acc += +record.amount), 0);

      const percent = (100 * spend) / cat.limit;
      const progressPercent = percent > 100 ? 100 : percent;
      const progressColor =
        percent < 60 ? "green" : percent < 100 ? "yellow" : "red";
      return { ...cat, percent, progressPercent, progressColor, spend };
    });
    console.log(this.categories);
    this.loading = false;
  },
};
</script>

<style></style>
