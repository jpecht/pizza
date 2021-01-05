<template>
  <div :class="$style.container">
    <h1 :class="$style.header">
      pizza in denver
    </h1>
    <h2 :class="$style.subheader">
      reviewed by the "homies"
    </h2>
    <div :class="$style.main">
      <div :class="$style.mainContent">
        <div
          v-if="isAdmin"
          :class="$style.addButtonContainer"
        >
          <router-link to="/add">
            <button :class="$style.addButton">
              Add a new pizza spot
            </button>
          </router-link>
        </div>
        <div :class="$style.listContainer">
          <ul>
            <li
              v-for="location in locations"
              :key="location.name"
            >
              <PizzaPreview
                :canEdit="isAdmin"
                :location="location"
              />
            </li>
          </ul>
        </div>
      </div>
      <div :class="$style.mapContent">
        <iframe
          width="800"
          height="400"
          frameborder="0"
          style="border:0"
          :src="`https://www.google.com/maps/embed/v1/place?key=${googleApiKey}&q=place_id:ChIJh5CRUXuHa4cR6gH1P0MAGEo&zoom=14`"
          allowfullscreen
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import PizzaPreview from '../components/PizzaPreview.vue';
import firebase from 'firebase';

export default defineComponent({
  name: 'Home',

  components: {
    PizzaPreview,
  },

  props: {
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    googleApiKey: 'AIzaSyBcFhZMc4UwaXgQA-tKKmVJzezkHSfTapo',
    locations: [],
  }),

  created() {
    // Get all locations and write to component data
    const db = firebase.firestore();
    db.collection('locations').get()
      .then((querySnapshot) => {
        this.locations = querySnapshot.docs.map(d => ({
          ...d.data(),
          id: d.id,
        }));
      });
  },
});
</script>

<style lang="scss" module>
.header {
  font-size: 36px;
}

.subheader {
  font-size: 18px;
  font-weight: 300;
}

.main {
  display: flex;
  margin-top: 40px;
}

.mainContent {
  flex: 1;
}

.listContainer {
  ul {
    margin: 0;
    padding: 0;
  }

  li {
    list-style-type: none;
    padding: 0;
  }
}

.addButtonContainer {
  margin-bottom: 20px;
}

.addButton {
  background-color: white;
  border: 1px solid #aaa;
  border-radius: 4px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  font-size: 15px;
  margin-right: 20px;
  outline: none;
  padding: 5px 10px;

  &:hover {
    background-color: #eee;
  }
}

</style>
