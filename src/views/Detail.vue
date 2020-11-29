<template>
  <div>
    <Loader v-if="loading" />
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb"
          >  {{ "History" | localize }}
        </router-link>
        <a @click.prevent class="breadcrumb"> {{
          record.type === "income" ? "Доход" : "Расход"
        }}</a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div
            class="card"
            :class="{
              red: record.type === 'outcome',
              green: record.type === 'income',
            }"
          >
            <div class="card-content white-text">
              <p>{{ "Description" | localize }}: {{ record.description }}</p>
              <p>{{ "Amount" | localize }}: {{ record.amount | currency }}</p>
              <p>{{ "Category" | localize }}: {{ record.categoryName }}</p>

              <p>{{ record.date | date("datetime") }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p v-else class="center">
      {{ "Record" | localize }} {{ $route.params.id }}
      {{ "Message_DoesntExist" | localize }}
    </p>
  </div>
</template>

<script>
export default {
  name: "DetailRecord",
  data: () => ({
    record: null,
    loading: true,
  }),
  async mounted() {
    const id = this.$route.params.id;
    const record = await this.$store.dispatch("fetchRecordById", id);
    const category = await this.$store.dispatch(
      "fetchCategoryById",
      record.categoryId
    );

    this.record = {
      ...record,
      categoryName: category.title,
    };
    this.loading = false;
  },
};
</script>

<style lang="scss" scoped>
.card {
  margin-top: 1rem;
}
p {
  margin: 5px 0 !important;
}
</style>
