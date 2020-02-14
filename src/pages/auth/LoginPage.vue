<template>
  <q-page class="row justify-center" padding>
      <div class="column justify-center">
        <div class="login shadow-15">
          <q-card>
            <q-tab-panels v-model="panel" animated>
              <q-tab-panel name="login">
                <login-component ref="form" v-on:changePanel="changePanel"></login-component>
              </q-tab-panel>
              <q-tab-panel name="forgot-pass">
                <forgot-pass-component ref="form" v-on:changePanel="changePanel"></forgot-pass-component>
              </q-tab-panel>
              <q-tab-panel name="forgot-success" class="text-center">
                <q-icon color="primary" name="email" size="xl" class="q-mb-sm forgot-icon"></q-icon>
                <p class="text-h5 text-title">Reset Email Sent!</p>
                <p class="text-caption">Please check your email to reset password.</p>
                <q-btn color="primary" class="q-mt-md" @click="panel = 'login'" icon="chevron_left">Go back to Login</q-btn>
              </q-tab-panel>
            </q-tab-panels>
          </q-card>
        </div>
         <div class="login q-mt-md">
            <div class="text-caption">
              <p class="text-caption text-italic">"{{ quote }}"</p>
              <p class="text-right text-caption"> - {{ author }}</p>
            </div>
          </div>
      </div>
  </q-page>
</template>

<script>
import axios from 'axios'
import LoginComponent from './LoginComponent'
import ForgotPassComponent from './ForgotPassComponent'

export default {
  components: {
    LoginComponent,
    ForgotPassComponent
  },
  data () {
    return {
      panel: 'login',
      splitterModel: 50,
      author: '',
      quote: ''
    }
  },
  methods: {
    'changePanel' (value) {
      this.panel = value
      this.$refs.form.resetValidation()
    }
  },
  mounted () {
    let $this = this

    axios.get('http://quotes.rest/qod.json?category=inspire')
      .then(function (response) {
        $this.quote = response.data.contents.quotes[0].quote
        $this.author = response.data.contents.quotes[0].author
      })
  }
}
</script>

<style lang="stylus" scoped>
.login {
  width: 320px;
}
.q-tab-panel {
  overflow: hidden;
}
.q-page {
  background-color: $f1f3f4;
}
.forgot-icon {
  color: $grey-6
}
</style>
