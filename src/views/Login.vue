<template>
  <form novalidate style="height: 100vh;"  class="md-layout md-alignment-center-center">
    <div class="md-layout-item md-size-33 md-small-size-50 md-xsmall-size-80 ">
        <md-card>
            <md-progress-bar class="md-accent" md-mode="indeterminate" v-if="loggingIn" />
            <md-card-header class="md-primary">
                <div class="md-title">Login to your Devspace account</div>
            </md-card-header>

            <md-card-content>
                <div class="md-layout md-gutter">
                    <div class="md-layout-item md-size-100">
                        <md-field :class="{'md-invalid': $v.email.$error}">
                            <label for="email">Email</label>
                            <md-input @blur="$v.email.$touch()" v-model="email" name="email" id="email"/>
                            <span class="md-error" v-if="!$v.email.required">The email is required</span>
                            <span class="md-error" v-else-if="!$v.email.email">Invalid email</span>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-size-100">
                        <md-field :class="{'md-invalid': $v.password.$error}">
                            <label for="password">Password</label>
                            <md-input @blur="$v.password.$touch()" v-model="password" type="password" name="password" id="password"/>
                            <span class="md-error" v-if="!$v.password.required">The password is required</span>
                            <span class="md-error" v-if="!$v.password.minLength">The password must have at least 6 characters.</span>
                        </md-field>
                    </div>
                </div>
            </md-card-content>
            <md-card-actions>
                <div class="md-layout md-alignment-center-center">
                    <div class="md-layout-item md-size-100 md-layout md-alignment-center-left">
                        <md-button :disabled="loggingIn || $v.$invalid" @click="submit" class="md-raised md-primary">Login</md-button>
                    </div>
                    <br><br><br>
                    <div class="md-layout md-layout-item md-size-100 md-alignment-center-right">
                        <span>Don't have an account?</span>
                        <md-button class="md-accent" to="/sign-up" >Sign up</md-button>
                    </div>
                </div>                
            </md-card-actions>
        </md-card>
        <md-snackbar md-position="center" :md-duration="4000" :md-active.sync="showSnackbar" md-persistent>
            <span>{{this.error ? this.error.message : ''}}</span>
            <md-button class="md-primary md-raised" @click="showSnackbar = false">Ok</md-button>
        </md-snackbar>
    </div>
  </form>
</template>

<script>
import { mapGetters } from 'vuex';
import { required, email, minLength } from 'vuelidate/lib/validators';

export default {
    data(){
        return {
            showSnackbar: false,
            email: '',
            password: ''
        }
    },
    computed: mapGetters(['loggingIn', 'error']),
    watch: {
        error(value){
            this.showSnackbar = true;
        }
    },
    methods: {
        submit(){
            this.$store.dispatch('login', {email: this.email, password: this.password})
                .then(() => this.$router.push({path: '/spaces'}));
        }
    },
    validations: {
        email: {
            required,
            email
        },
        password: {
            required,
            minLength: minLength(6)
        }
    }
};
</script>

