<template>
  <form novalidate  class="md-layout">
    <div class="md-layout-item md-size-100">
        <h4>Here you can post the link to something you'd like to share, like an article.</h4>
    </div>
    <div class="md-layout-item md-size-100">
        <md-field :class="{'md-invalid': $v.form.title.$error}">
            <label>Title</label>
            <md-input @blur="$v.form.title.$touch()" v-model="form.title"></md-input>
            <span v-if="!$v.form.title.required" class="md-error">The title of the post is required.</span>
        </md-field>
    </div>
    <div class="md-layout-item md-size-100">
        <md-field :class="{'md-invalid': $v.form.url.$error}">
            <label>Url</label>
            <md-input @blur="$v.form.url.$touch()" v-model="form.url"></md-input>
            <span v-if="!$v.form.url.required" class="md-error">The url is required.</span>
            <span v-if="!$v.form.url.url" class="md-error">This isn't a valid url.</span>
        </md-field>
    </div>
    <div class="md-layout-item md-size-100">
        <md-button @click="submit" :disabled="creating || $v.$invalid" class="md-primary md-raised">Save</md-button>
    </div>
  </form>
</template>

<script>
import { required, url } from 'vuelidate/lib/validators';

export default {
    props: ['creating'],
    data(){
        return {
            form: {
                title: '',
                url: ''
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
            url: {
                required,
                url
            }
        }
    }
};
</script>

