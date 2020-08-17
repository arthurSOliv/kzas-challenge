<template>
  <div>
    <b-container class="mb-5">
      <b-table hover striped :items="list" :fields="fields">
        <template v-slot:cell(actions)="data">
          <b-button
            variant="warning"
            @click="getToEdit(data.item)"
            class="mr-2"
          >
            <i class="fa fa-pencil"></i>
          </b-button>
          <b-button variant="danger" @click="remove(data.item)" class="mr-2">
            <i class="fa fa-trash"></i>
          </b-button>
        </template>
      </b-table>

      <Form
        :name_edit="name"
        :cpf_edit="cpf"
        :code_edit="code"
        :phone_edit="phone"
        :email_edit="email"
        :edit="edit"
        :index="index"
        @edited="updateValue"
        v-if="index != 0"
      />
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
import Form from "@/components/Form/Form";

export default {
  name: "List",
  components: {
    Form
  },
  data() {
    return {
      list: [],
      edit: "edit",
      name: "",
      cpf: "",
      code: "",
      phone: "",
      email: "",
      index: 0,
      fields: [
        { key: "index", label: "ID", sortable: true },
        { key: "name", label: "Nome Completo", sortable: true },
        { key: "cpf", label: "CPF", sortable: true },
        { key: "phone", label: "Telefone", sortable: true },
        { key: "email", label: "E-mail", sortable: true },
        { key: "actions", label: "Ações" }
      ]
    };
  },
  methods: {
    startList() {
      if (!localStorage.data) {
        axios
          .get("https://private-21e8de-rafaellucio.apiary-mock.com/users")
          .then(res => {
            res.data.map((r, index) => {
              r.index = Number(index) + 1;
            });
            this.list = res.data;
            localStorage.setItem("data", JSON.stringify(res.data));
          });
      } else {
        this.list = JSON.parse(localStorage.getItem("data"));
      }
    },
    getToEdit(data) {
      this.name = data.name;
      this.cpf = data.cpf;
      this.code = data.phone.split(" ")[0];
      this.phone = data.phone.split(" ")[1];
      this.email = data.email;
      this.index = data.index;

      this.$forceUpdate();
    },
    remove(data) {
      const index = this.list.indexOf(data);
      this.list.splice(index, 1);
      localStorage.setItem("data", JSON.stringify(this.list));
    },
    updateValue() {
      this.index = 0;
      this.startList();
    }
  },
  mounted() {
    this.startList();
  }
};
</script>

<style></style>
