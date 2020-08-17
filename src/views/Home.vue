<template>
  <div class="home">
    <b-container class="mb-4">
      <h1>Bem vindo, veja aqui os dados cadastrados:</h1>
    </b-container>

    <List />

    <Form />
  </div>
</template>

<script>
import List from "@/components/List/List";

export default {
  name: "Home",
  components: {
    List
  }
};
</script>
