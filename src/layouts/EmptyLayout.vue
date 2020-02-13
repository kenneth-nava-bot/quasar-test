<template>
<transition
  appear
  enter-active-class="animated fadeIn"
  leave-active-class="animated fadeOu"
>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->

    <q-page-container>
      <!-- This is where pages get injected -->
      <router-view />
    </q-page-container>

  </q-layout>
</transition>
</template>

<script>
export default {
  // name: 'EmptyLayout',

  data () {
    return {

    }
  }
}
</script>
