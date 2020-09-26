<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ "Edit" | localize }}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option v-for="cat of categories" :key="cat.id" :value="cat.id">{{
              cat.title
            }}</option>
          </select>
          <label>{{ "Message_chooseCategory" | localize }}</label>
        </div>

        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="title"
            :class="{ invalid: $v.title.$dirty && !$v.title.required }"
          />
          <label for="name">{{ "Title" | localize }}</label>
          <span v-if="$v.title.$dirty && !$v.title.required" class="helper-text"
            >{{ "Message_EnterCategory" | localize }}
          </span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{ invalid: $v.limit.$dirty && !$v.limit.minValue }"
          />
          <label for="limit">{{ "Limit" | localize }}</label>
          <span v-if="$v.limit.$dirty && !$v.limit.minValue" class="helper-text"
            >{{ "Message_MinValue" | localize }}
            {{ $v.limit.$params.minValue.min }}</span
          >
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{ "Update" | localize }}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from "vuelidate/lib/validators";

export default {
  name: "EditCategory",
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    title: "",
    limit: 100,
    select: null,
    current: null,
  }),

  validations: {
    title: { required },
    limit: { minValue: minValue(100) },
  },
  watch: {
    current(catId) {
      const { title, limit } = this.categories.find((c) => c.id === catId);
      this.title = title;
      this.limit = limit;
    },
  },
  created() {
    const { id, title, limit } = this.categories[0];
    this.current = id;
    this.title = title;
    this.limit = limit;
  },
  mounted() {
    M.updateTextFields();
    this.select = M.FormSelect.init(this.$refs.select);
  },
  beforeDestroy() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit,
        };
        await this.$store.dispatch("updateCategory", categoryData);
        this.$message("Категория успешно обновлена");
        this.$emit("updated", categoryData);
      } catch (err) {}
    },
  },
};
</script>

<style></style>
