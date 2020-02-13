<template>
<div class="fit row wrap q-ma-lg">
  <div class="q-card col-6">
    <q-card-section>
      <div class="text-h6 text-title">Create User</div>
    </q-card-section>
    <q-card-section class="q-gutter-lg">
      <q-input outlined filled v-model="username" placeholder="Username" label="Username" />
      <q-input outlined filled type="email" v-model="email" placeholder="Email" label="Email" />
      <q-input outlined filled type="password" v-model="password" placeholder="Password" label="Password" />
      <q-input outlined filled type="password" v-model="confirmPassword" placeholder="Confirm Password" label="Confirm Password" />
    </q-card-section>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  }
}
</script>
