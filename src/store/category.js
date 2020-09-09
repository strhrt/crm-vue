import firebase from "firebase/app";

export default {
  state: {},
  getters: {},
  actions: {
    async fetchCategories({ commit, dispatch }) {
      try {
        const uid = await dispatch("getUserId");
        const categories =
          (
            await firebase
              .database()
              .ref(`/users/${uid}/categories`)
              .once("value")
          ).val() || {};

        return Object.keys(categories).map((key) => ({
          ...categories[key],
          id: key,
        }));
      } catch (err) {
        commit("setError", err);
        throw err;
      }
    },
    async createCategory({ commit, dispatch }, { title, limit }) {
      try {
        const uid = await dispatch("getUserId");
        const category = await firebase
          .database()
          .ref(`/users/${uid}/categories`)
          .push({ title, limit });

        return { title, limit, id: category.key };
      } catch (err) {
        commit("setError", err);
        throw err;
      }
    },
    async updateCategory({ commit, dispatch }, { title, limit, id }) {
      try {
        const uid = await dispatch("getUserId");
        await firebase
          .database()
          .ref(`/users/${uid}/categories`)
          .child(id)
          .update({ title, limit });
      } catch (err) {
        commit("setError", err);
        throw err;
      }
    },
  },
  mutations: {},
};