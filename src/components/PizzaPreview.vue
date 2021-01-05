<template>
  <div :class="$style.container">
    <div :class="$style.title">
      {{ location.name }}
    </div>
    <div :class="$style.location">
      {{ location.location }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'PizzaPreview',

  props: {
    location: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style module lang="scss">
.container {
  border: 1px solid #ccc;
  border-radius: 2px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
  max-width: 320px;
  padding: 15px 25px;
  width: 100%;
}

.title {
  font-size: 16px;
  font-weight: bold;
  margin: 5px 0;
}

.location {
  font-size: 14px;
  margin: 5px 0;
}
</style>
