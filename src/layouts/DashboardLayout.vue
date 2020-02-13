<template>
<transition
  appear
  enter-active-class="animated fadeIn"
  leave-active-class="animated fadeOut"
>
  <loading-screen-component v-if="isLoading">{{loadingMessage}}</loading-screen-component>

  <q-layout v-else view="lHh Lpr lFf">
    <q-header elevated class="bg-grey-4 text-dark">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>{{ user.email }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label header>HRIS MENU</q-item-label>
        <q-item clickable tag="a" target="_blank" href="https://quasar.dev">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Docs</q-item-label>
            <q-item-label caption>quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://github.quasar.dev">
          <q-item-section avatar>
            <q-icon name="code" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Github</q-item-label>
            <q-item-label caption>github.com/quasarframework</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://chat.quasar.dev">
          <q-item-section avatar>
            <q-icon name="chat" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Discord Chat Channel</q-item-label>
            <q-item-label caption>chat.quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://forum.quasar.dev">
          <q-item-section avatar>
            <q-icon name="record_voice_over" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Forum</q-item-label>
            <q-item-label caption>forum.quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://twitter.quasar.dev">
          <q-item-section avatar>
            <q-icon name="rss_feed" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Twitter</q-item-label>
            <q-item-label caption>@quasarframework</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator color="accent" class="q-my-sm" inset />
        <q-item-label header>SETTINGS</q-item-label>
        <q-item clickable tag="a" to="/users">
          <q-item-section avatar>
            <q-icon name="group" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Users</q-item-label>
            <q-item-label caption>Manage application users</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator color="accent" class="q-my-sm" inset />
        <q-item clickable tag="a" @click="logout">
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Logout</q-item-label>
            <q-item-label caption>Logout my account</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</transition>
</template>

<script>
import { mapState } from 'vuex'
import LoadingScreenComponent from '../components/LoadingScreenComponent'

export default {
  name: 'MyLayout',
  components: {
    LoadingScreenComponent
  },
  computed: {
    ...mapState('auth', ['user'])
  },
  data () {
    return {
      leftDrawerOpen: false,
      isLoading: true,
      loadingMessage: 'Loading... Please wait...'
    }
  },
  beforeMount () {
    let $this = this
    $this.loadingMessage = "We're logging you in... Please wait..."
    setTimeout(function () {
      $this.isLoading = $this.$store.dispatch('auth/user')
        .then(() => false).value
      console.log('here')
    }, 3000)
  },
  methods: {
    'logout' () {
      let $this = this
      $this.leftDrawerOpen = false
      $this.isLoading = true
      $this.loadingMessage = "We're logging you out... Thank you!"
      $this.$store.dispatch('auth/logout')
        .then(() => $this.$router.push('/'))
        .finally(function () {
          $this.isLoading = false
        })
    }
  }
}
</script>
