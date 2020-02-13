<template>
  <q-form ref="loginForm"  @submit="login">
    <q-card-section class="q-mb-md">
      <div class="text-h5 text-title q-mt-sm q-mb-xs">Dashboard</div>
      <div class="text-caption q-mb-sm">Welcome to HRIS Dashboard!</div>
        <q-input @input="resetValidation" :disable="isLoading" v-model="username" label="Username" :error="errors.hasOwnProperty('username')">
          <template v-slot:prepend>
              <q-icon name="person"></q-icon>
          </template>
          <template v-slot:error>
            {{errors['username'][0]}}
          </template>
        </q-input>
        <q-input @input="resetValidation" :disable="isLoading" v-model="password" type="password" label="Password" :error="errors.hasOwnProperty('password')">
          <template v-slot:prepend>
            <q-icon name="lock"></q-icon>
          </template>
          <template v-slot:error>
            {{errors['password'][0]}}
          </template>
        </q-input>
    </q-card-section>
    <q-card-actions align="between">
      <q-btn type="reset" :disable="isLoading" flat color="primary" @click="$emit('changePanel', 'forgot-pass')" label="Forgot Password" />
      <q-btn type="submit" :loading="isLoading" :disable="isLoading" color="primary" icon-right="vpn_key" label="Login" @click="login" />
    </q-card-actions>
  </q-form>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      panel: 'login',
      username: '',
      password: '',
      email: ''
    }
  },
  beforeMount () {
    if (this.token != null) {
      this.$router.push('home')
    }
  },
  computed: {
    ...mapState('auth', ['isLoading', 'errors', 'token'])
  },
  methods: {
    'login' () {
      let $this = this

      if (this.isLoading) {
        return
      }

      this.$store.dispatch('auth/authenticate', { username: this.username, password: this.password })
        .then(() => {
          $this.$store.dispatch('auth/user')
            .then(function () {
              $this.$router.push('/home')
            })
        })
    },
    'resetValidation' (value) {
      this.$store.dispatch('auth/resetValidation')
      this.$refs.loginForm.resetValidation()
    }
  }
}
</script>
