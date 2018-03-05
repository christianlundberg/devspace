<template>
  <form novalidate  class="md-layout md-alignment-center-right">
    <div class="md-layout-item md-size-100">
        <md-field>
            <label>Comment</label>
            <md-textarea @blur="$v.form.text.$touch()" v-model="form.text"></md-textarea>
        </md-field>
    </div>
        <md-button @click="submit" :disabled="saving || $v.$invalid" class="md-accent md-raised">Save</md-button>
  </form>
</template>

<script>
import { required } from "vuelidate/lib/validators";

export default {
  props: ["saving"],
  data() {
    return {
      form: {
        text: ""
      }
    };
  },
  methods: {
    submit() {
      this.$emit("save", this.form);
    }
  },
  validations: {
    form: {
      text: {
        required
      }
    }
  }
};
</script>

