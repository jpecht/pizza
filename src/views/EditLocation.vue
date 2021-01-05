<template>
  <div :class="$style.container">
    <router-link to="/admin">
      Home
    </router-link>
    <h1>Edit this pizza spot</h1>
    <form @submit.prevent="submitEdit">
      <div :class="$style.inputRow">
        <span>name</span>
        <input
          v-model="location.name"
          placeholder="Scooter's Shack"
          @input="resetMessages"
        />
      </div>
      <div :class="$style.inputRow">
        <span>location name</span>
        <input
          v-model="location.location"
          placeholder="Sloan's Lake"
          @input="resetMessages"
        />
      </div>
      <div :class="$style.inputRow">
        <span>google place id</span>
        <input
          v-model="location.googlePlaceId"
          placeholder="xxxxxxxxxxxxxxxxxxxxxxxxx"
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
        Location updated!
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
  name: 'EditLocation',

  data: () => ({
    location: {
      googlePlaceId: '',
      name: '',
      location: '',
    },
    showError: false,
    showServerError: false,
    showSuccess: false,
  }),

  computed: {
    isValid() {
      return Object.values(this.location).every(d => d);
    },
  },

  created() {
    // Fetch the location given the location ID
    const { id } = this.$route.params;
    const db = firebase.firestore();
    db.collection('locations').doc(id).get()
      .then((doc) => {
        this.location = {
          ...doc.data(),
        };
      });
  },

  methods: {
    resetMessages() {
      this.showError = false;
      this.showServerError = false;
      this.showSuccess = false;
    },

    submitEdit() {
      if (!this.isValid) {
        this.showError = true;
        return;
      }

      this.resetMessages();

      const { id } = this.$route.params;
      const db = firebase.firestore();
      db.collection('locations').doc(id).update({
        googlePlaceId: this.location.googlePlaceId,
        name: this.location.name,
        location: this.location.location,
      })
        .then(() => {
          this.showSuccess = true;
        })
        .catch(() => {
          this.showServerError = true;
        });
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
    width: 240px;
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
