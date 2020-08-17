<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>
<script>
import "@/assets/styles/styles.css";
import Navbar from "@/components/Navbar";
export default {
  components: {
    Navbar
  }
};
</script>

<style lang="scss">
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
