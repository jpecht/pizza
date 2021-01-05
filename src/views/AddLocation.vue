<template>
  <div :class="$style.container">
    <router-link to="/admin">
      Home
    </router-link>
    <h1>Add a pizza spot</h1>
    <form @submit.prevent="addLocation">
      <div :class="$style.inputRow">
        <span>name</span>
        <input
          v-model="form.name"
          placeholder="Scooter's Shack"
          @input="resetMessages"
        />
      </div>
      <div :class="$style.inputRow">
        <span>location</span>
        <input
          v-model="form.location"
          placeholder="Sloan's Lake"
          @input="resetMessages"
        />
      </div>
      <div
        v-show="showError"
        :class="$style.error"
      >
        You're missing some shit
      </div>
      <div
        v-show="showServerError"
        :class="$style.error"
      >
        Oops something went wrong.
      </div>
      <div
        v-show="showSuccess"
        :class="$style.success"
      >
        Location added!
      </div>
      <button :class="$style.submitButton">
        submit
      </button>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'AddLocation',

  data: () => ({
    form: {
      name: '',
      location: '',
    },
    showError: false,
    showServerError: false,
    showSuccess: false,
  }),

  computed: {
    isValid() {
      return Object.values(this.form).every(d => d);
    },
  },

  methods: {
    addLocation() {
      if (!this.isValid) {
        this.showError = true;
        return;
      }

      this.showError = false;

      const db = firebase.firestore();
      db.collection('locations').add({
        name: this.form.name,
        location: this.form.location,
      })
        .then(() => {
          this.showSuccess = true;
          Object.keys(this.form).forEach((formKey) => {
            this.form[formKey] = '';
          });
        })
        .catch(() => {
          this.showServerError = true;
        });
    },

    resetMessages() {
      this.showError = false;
      this.showSuccess = false;
    },
  },
};
</script>

<style module lang="scss">
.container { padding-top: 20px; }

.inputRow {
  display: block;
  margin-bottom: 20px;

  & > span {
    color: #333;
    display: block;
    font-size: 13px;
    font-weight: bold;
  }

  input {
    border: 1px solid #555;
    border-radius: 2px;
    font-size: 13px;
    margin-top: 3px;
    outline: none;
    padding: 4px 10px;
  }
}

.submitButton {
  background-color: white;
  border: 1px solid #777;
  border-radius: 2px;
  cursor: pointer;
  margin-top: 15px;
  outline: none;
  padding: 5px 15px;

  &:hover {
    background-color: #eee;
  }
}

.error {
  color: red;
  font-size: 13px;
}

.success {
  color: green;
  font-size: 13px;
}
</style>
