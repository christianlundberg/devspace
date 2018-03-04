<template>
  <form novalidate  class="md-layout">
    <div class="md-layout-item md-size-100">
        <h4>Here you can write out your own post.</h4>
    </div>
    <div class="md-layout-item md-size-100">
        <md-field :class="{'md-invalid': $v.form.title.$error}">
            <label>Title</label>
            <md-input @blur="$v.form.title.$touch()" v-model="form.title"></md-input>
            <span v-if="!$v.form.title.required" class="md-error">The title of the post is required.</span>
        </md-field>
    </div>
    <div class="md-layout-item md-size-100">
        <md-field :class="{'md-invalid': $v.form.text.$error}">
            <label>Text</label>
            <md-textarea @blur="$v.form.text.$touch()" v-model="form.text"></md-textarea>
            <span v-if="!$v.form.text.required" class="md-error">The text is required.</span>
        </md-field>
    </div>
    <div class="md-layout-item md-size-100">
        <md-button @click="submit" :disabled="posting || $v.$invalid" class="md-primary md-raised">Save</md-button>
        <md-button :to="`/spaces/${this.$route.params.id}`">Cancel</md-button>
    </div>
  </form>
</template>

<script>
import { required, url } from "vuelidate/lib/validators";

export default {
  props: ['posting'],
  data() {
    return {
      form: {
        title: '',
        text: ''
      }
    };
  },
  methods: {
    submit(){
      this.$emit('save', this.form);
    }
  },
  validations: {
    form: {
      title: {
        required
      },
      text: {
        required
      }
    }
  }
};
</script>