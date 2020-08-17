<template>
  <b-container>
    <b-form @submit.prevent="submitForm">
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Nome:" label-for="name">
            <b-form-input
              id="name"
              type="text"
              v-model="$v.name.$model"
              placeholder="Informe o nome completo"
              :class="{
                'is-invalid': $v.name.$error,
                'is-valid': !$v.name.$invalid
              }"
            />
            <div class="invalid">
              <span v-if="$v.name.$error"
                >Por favor digite um nome completo!</span
              >
            </div>
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="CPF:" label-for="cpf">
            <b-form-input
              id="cpf"
              type="text"
              v-model="$v.cpf.$model"
              placeholder="xxx.xxx.xxx-xx"
              maxlength="14"
              :class="{
                'is-invalid': $v.cpf.$error,
                'is-valid': !$v.cpf.$invalid
              }"
            />
            <div class="invalid" v-if="$v.cpf.$error">
              <span v-if="!$v.cpf.required">Por favor digite um CPF!</span>
              <span v-if="!$v.cpf.numeric"
                >CPF inválido, digite apenas números!</span
              >
            </div>
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="Telefone:" label-for="phone">
            <b-row>
              <b-col md="2" sm="2" id="code-place">
                <b-form-select
                  v-model="selected"
                  :options="options"
                ></b-form-select>
              </b-col>
              <b-col md="10" sm="10" id="phone-place">
                <b-form-input
                  id="phone"
                  v-model="$v.phone.$model"
                  type="text"
                  placeholder="Digite o telefone"
                  :class="{
                    'is-invalid': $v.phone.$error,
                    'is-valid': !$v.phone.$invalid
                  }"
                />
                <div class="invalid" v-if="$v.phone.$error">
                  <span v-if="!$v.phone.required"
                    >Por favor digite um número de telefone!</span
                  >
                  <span v-if="!$v.phone.numeric || !$v.phone.maxLength"
                    >Por favor digite um número de telefone válido!</span
                  >
                </div>
              </b-col>
            </b-row>
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="E-mail:" label-for="email">
            <b-form-input
              id="email"
              type="text"
              v-model="$v.email.$model"
              placeholder="example@example.com"
              :class="{
                'is-invalid': $v.email.$error,
                'is-valid': !$v.email.$invalid
              }"
            />
            <div class="invalid" v-if="$v.email.$error">
              <span v-if="!$v.email.required"
                >Por favor digite um E-mail válido!</span
              >
              <span v-if="!$v.email.isUnique">E-mail inválido!</span>
            </div>
          </b-form-group>
        </b-col>
      </b-row>
      <b-button class="btn-submit" type="submit" variant="primary">{{
        edit === "edit" ? "Editar" : "Salvar"
      }}</b-button>
    </b-form>
  </b-container>
</template>

<script>
import axios from "axios";
import { required, email, numeric, maxLength } from "vuelidate/lib/validators";

export default {
  name: "Form",
  props: {
    name_edit: String,
    cpf_edit: String,
    code_edit: String,
    phone_edit: String,
    email_edit: String,
    edit: String,
    index: Number
  },
  data() {
    return {
      codes: [],
      selected: this.code_edit,
      options: [],
      subimitted: "",
      name: this.name_edit,
      cpf: this.cpf_edit,
      phone: this.phone_edit,
      email: this.email_edit
    };
  },
  validations: {
    name: {
      required
    },
    cpf: {
      required,
      numeric,
      maxLength: maxLength(14)
    },
    phone: {
      required,
      numeric,
      maxLength: maxLength(11)
    },
    email: {
      required,
      email,
      isUnique(value) {
        if (value === "") return true;

        const emailRegex = /(^$|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/;

        return new Promise(resolve => {
          setTimeout(() => {
            resolve(emailRegex.test(value));
          }, 350 + Math.random() * 300);
        });
      }
    }
  },
  methods: {
    getCodes() {
      axios.get("https://restcountries.eu/rest/v2/all").then(res => {
        this.codes = res.data;
        this.codes.map(country => {
          const code = {
            value: `+${country.callingCodes}`,
            text: `+${country.callingCodes}`
          };

          if (country.name === "Brazil" && this.edit !== "edit") {
            this.selected = `+${country.callingCodes}`;
          }

          this.options.push(code);
        });
      });
    },
    submitForm() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.subimitted = "true";
        this.$toasted.global.defaultError();
        return;
      } else {
        if (this.edit !== "edit") {
          this.subimitted = "false";

          const oldItems = JSON.parse(localStorage.getItem("data")) || [];

          const data = {
            index: oldItems[oldItems.length - 1].index + 1,
            name: this.$v.name.$model,
            cpf: this.$v.cpf.$model,
            phone: `${this.selected} ${this.phone}`,
            email: this.$v.email.$model
          };

          oldItems.push(data);

          localStorage.setItem("data", JSON.stringify(oldItems));
        } else {
          const oldItems = JSON.parse(localStorage.getItem("data")) || [];

          oldItems[Number(this.index) - 1].name = this.$v.name.$model;
          oldItems[Number(this.index) - 1].cpf = this.$v.cpf.$model;
          oldItems[
            Number(this.index) - 1
          ].phone = `${this.selected} ${this.phone}`;
          oldItems[this.index - 1].email = this.$v.email.$model;

          localStorage.setItem("data", JSON.stringify(oldItems));

          this.$emit("edited", oldItems);
        }

        this.$toasted.global.defaultSuccess();

        this.name = "";
        this.cpf = "";
        this.phone = "";
        this.email = "";

        this.$v.$reset();
      }
    }
  },
  watch: {
    name_edit: function(newVal) {
      this.$v.name.$model = newVal;
    },
    cpf_edit: function(newVal) {
      this.$v.cpf.$model = newVal;
    },
    code_edit: function(newVal) {
      this.selected = newVal;
    },
    phone_edit: function(newVal) {
      const val = newVal.split(" ");
      if (val[1]) {
        this.$v.phone.$model = val[1];
      } else {
        this.$v.phone.$model = newVal;
      }
    },
    email_edit: function(newVal) {
      this.$v.email.$model = newVal;
    }
  },
  mounted() {
    this.getCodes();
  }
};
</script>

<style scoped>
#phone-place {
  padding-left: 0 !important;
}

#phone-place,
#phone-place input {
  margin-left: 0 !important;
}

#code-place,
#code-place select {
  margin-right: 0 !important;
  padding-right: 0 !important;
}

.btn-submit {
  width: 272px;
  height: 48px;
  background: rgb(240, 94, 92) !important;
  outline: none !important;
  box-shadow: none !important;
  border-color: rgb(240, 94, 92) !important;
  border-radius: 4px;

  color: rgb(255, 255, 255) !important;
  font-size: 16px !important;
  font-weight: bold !important;
  line-height: 24px !important;
  text-align: center !important;

  transition: 500ms;
}

.btn-submit:hover {
  background: rgb(194, 81, 81) !important;
}

.is-invalid {
  background-color: rgb(253, 239, 238);
}
</style>
