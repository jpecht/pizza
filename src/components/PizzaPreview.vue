<template>
  <div :class="$style.container">
    <div :class="$style.content">
      <div :class="$style.title">
        {{ location.name }}
      </div>
      <div :class="$style.location">
        {{ location.location }}
      </div>
    </div>
    <img
      v-if="canEdit"
      :class="$style.icon"
      src="@/assets/edit.svg"
      @click="handleEditClick"
    />
    <img
      v-if="canEdit"
      :class="$style.icon"
      src="@/assets/delete.svg"
    />
  </div>
</template>

<script>
export default {
  name: 'PizzaPreview',

  props: {
    canEdit: {
      type: Boolean,
      default: false,
    },
    location: {
      type: Object,
      default: () => ({}),
    },
  },

  methods: {
    handleEditClick() {
      this.$router.push(`/edit/${this.location.id}`);
    },
  },
};
</script>

<style module lang="scss">
.container {
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 2px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  max-width: 320px;
  padding: 15px 25px;
  width: 100%;
}

.content {
  flex: 1;
}

.title {
  font-size: 16px;
  font-weight: bold;
  margin: 5px 0;
}

.location {
  font-size: 14px;
  margin: 5px 0 0;
}

.icon {
  cursor: pointer;
  height: 22px;
  margin-left: 12px;
  opacity: 0.7;
  width: 22px;
}
</style>
