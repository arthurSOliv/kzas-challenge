<template>
  <div class="mb-5">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#"></b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item>
            <router-link to="/">Home</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/admin">Administração</router-link>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Navbar"
};
</script>

<style>
.router-link-exact-active {
  color: lightpink !important;
}

.nav-item a {
  font-size: 16px;
  color: azure;
  font-weight: bold;
  text-decoration: none;
}

.nav-item a:hover {
  color: bisque;
  text-decoration: none;
}
</style>
