<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>
    <Loader v-if="loading" />
    <p class="center" v-else-if="!records.length">
      Записей нет
      <router-link to="/record">Добавить запись</router-link>
    </p>
    <section v-else>
      <HistoryTable :records="items" />
      <Paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="changePageHandler"
        :prev-text="'Назад'"
        :next-text="'Вперед'"
        :container-class="'pagination'"
        :page-class="'waves-effect'"
      />
    </section>
  </div>
</template>

<script>
import paginationMixin from "@/mixins/pagination.mixin";
import HistoryTable from "@/components/HistoryTable";

export default {
  name: "History",
  components: {
    HistoryTable,
  },
  mixins: [paginationMixin],
  data: () => ({
    loading: true,
    record: [],
  }),
  async mounted() {
    this.records = await this.$store.dispatch("fetchRecords");
    const categories = await this.$store.dispatch("fetchCategories");
    this.setupPagination(
      this.records.map((record) => {
        return {
          ...record,
          categoryName: categories.find((c) => c.id === record.categoryId)
            .title,
          typeClass: record.type === "income" ? "green" : "red",
          typeText: record.type === "income" ? "доход" : "расход",
        };
      })
    );
    this.loading = false;
  },
};
</script>

<style></style>
