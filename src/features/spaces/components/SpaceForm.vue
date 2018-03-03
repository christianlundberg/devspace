<template>
  <form novalidate  class="md-layout md-alignment-center-center">
    <div class="md-layout-item md-size-50 md-small-size-75 md-xsmall-size-80 ">
        <md-card>
            <md-progress-bar class="md-accent" md-mode="indeterminate" v-if="creating" />
            <md-card-header class="md-primary">
                <div class="md-title">Create your own space:</div>
            </md-card-header>

            <md-card-content>
                <div class="md-layout md-gutter">
                    <div class="md-layout-item md-size-50">
                      <md-field :class="{'md-invalid': $v.form.name.$error}">
                        <label for="name">Name</label>
                        <md-input @blur="$v.form.name.$touch()" v-model="form.name" id="name"/>
                        <span class="md-error" v-if="!$v.form.name.required">The name is required</span>
                      </md-field>
                    </div>
                    <div class="md-layout-item md-size-50">
                      <md-field>
                        <label for="logo">Logo (url)</label>
                        <md-input v-model="form.logo" id="logo"/>
                      </md-field>
                    </div>
                    <div class="md-layout-item md-size-100">
                      <md-field :class="{'md-invalid': $v.form.description.$error}">
                        <label for="description">Description</label>
                        <md-textarea @blur="$v.form.description.$touch()" v-model="form.description" id="description"></md-textarea>
                        <span class="md-error" v-if="!$v.form.description.required">The description is required</span>
                      </md-field>
                    </div>
                    <div class="md-layout-item md-size-100">
                        <md-chips v-model="form.tags" md-placeholder="Add tags..."></md-chips>
                    </div>
                    <div class="md-layout-item md-size-100">
                        <md-switch class="md-primary" v-model="form.chat">Chat enabled</md-switch>
                    </div>
                </div>
            </md-card-content>
            <md-card-actions>
                <md-button :disabled="creating || $v.$invalid" @click="submit" class="md-raised md-primary">Create</md-button>
            </md-card-actions>
        </md-card>
    </div>
  </form>
</template>
<script>
import { required, email, minLength } from "vuelidate/lib/validators";

export default {
  props: ['creating'],
  data() {
    return {
      showSnackbar: false,
      form: {
        name: '',
        logo: '',
        description: '',
        chat: false,
        tags: []
      }
    };
  },
  methods: {
    submit() {
      this.$emit('save', this.form);
    }
  },
  validations: {
    form: {
      name: {
        required
      },
      description: {
        required
      }
    }
  }
};
</script>

