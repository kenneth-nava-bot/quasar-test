<template>
  <q-page padding>
    <div class="text-h5 text-title q-mb-md">
      Users
      <span class="text-caption q-pl-sm">Manage list of application users</span>
    </div>
    <div v-if="activeComponent == 'UsersList'" class="row">
      <users-table-component></users-table-component>
    </div>
  </q-page>
</template>

<script>
import UsersTableComponent from './UsersTableComponent'

export default {
  components: {
    UsersTableComponent
  },
  data () {
    return {
      activeComponent: 'UsersList'
    }
  }
}
</script>
