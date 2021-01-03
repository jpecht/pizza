<template>
  <div class="container">
    <h1 class="header">
      pizza in denver
    </h1>
    <h2 class="subheader">
      reviewed by the most trusted
    </h2>
    <div class="listContainer">

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import firebase from 'firebase';

export default defineComponent({
  name: 'Home',

  data: () => ({
    locations: [],
  }),

  created() {
    const db = firebase.firestore();
    db.collection('locations').doc('Test').set({
      name: 'Test Location',
      location: 'Denver',
    });    
  },
});
</script>

<style lang="scss">
.container {
  padding: 10px 25px;
  text-align: left;
}

.header {
  font-size: 36px;
}

.subheader {
  font-size: 18px;
  font-weight: 300;
}
</style>