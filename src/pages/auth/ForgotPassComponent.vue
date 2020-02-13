<template>
    <q-form ref="forgotForm" @submit="send">
      <q-card-section>
        <div class="text-h5 q-mt-sm q-mb-xs">Forgot your password?</div>
        <div class="text-caption q-mb-sm">Enter your email below to receive a reset password email.</div>
        <q-input @input="resetValidation" v-model="email" type="text" label="Email" :disable="isLoading" :error="errors.hasOwnProperty('email')">
          <template v-slot:prepend>
            <q-icon name="email"></q-icon>
          </template>
          <template v-slot:error>
            {{ errors['email'][0] }}
          </template>
        </q-input>
      </q-card-section>
      <q-card-actions align="between">
        <q-btn type="reset" flat color="primary" :disable="isLoading" @click="$emit('changePanel', 'login')" label="Go Back" icon="chevron_left"/>
        <q-btn type="submit" color="primary" :loading="isLoading" :disable="isLoading" label="Send" icon-right="send" />
      </q-card-actions>
    </q-form>
</template>

<script>
import { mapState } from 'vuex'

export default {
  // name: 'ComponentName',
  data () {
    return {
      email: ''
    }
  },
  computed: {
    ...mapState('forgot', ['errors', 'isLoading'])
  },
  methods: {
    'send' () {
      let $this = this

      if (this.isLoading) {
        return
      }

      this.$store.dispatch('forgot/sendResetEmail', this.email)
        .then(() => {
          $this.$emit('changePanel', 'forgot-success')
        })
    },
    'resetValidation' (value) {
      this.$store.dispatch('forgot/resetValidation')
      this.$refs.forgotForm.resetValidation()
    }
  }
}
</script>
