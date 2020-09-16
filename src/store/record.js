import firebase from "firebase/app";

export default {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async createRecord({ dispatch, commit }, record) {
      try {
        const uid = await dispatch("getUserId");
        return await firebase
          .database()
          .ref(`/users/${uid}/records`)
          .push(record);
      } catch (err) {
        commit("setError", e);
        throw e;
      }
    },
    async fetchRecords({ dispatch, commit }) {
      try {
        const uid = await dispatch("getUserId");
        const records =
          (
            await firebase
              .database()
              .ref(`/users/${uid}/records`)
              .once("value")
          ).val() || {};

        return Object.keys(records).map((key) => ({
          ...records[key],
          id: key,
        }));
      } catch (err) {
        commit("setError", err);
        throw err;
      }
    },
  },
};
