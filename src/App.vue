<template>
  <div class="container">
    <div class="cushion" />
    <div class="main">
      <router-view />
    </div>
    <div class="cushion" />
  </div>
</template>

<style lang="scss">
body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.container {
  display: flex;
  min-height: 100vh;
}

.cushion {
  background-color: #333;
  width: 100px;
}

.main {
  flex: 1;
  padding: 10px 50px;
  text-align: left;
}
</style>
