<template>
  <Home :isAdmin="true" />
</template>

<script>
import Home from './Home.vue';

export default {
  name: 'Admin',
  components: { Home },
};
</script>
