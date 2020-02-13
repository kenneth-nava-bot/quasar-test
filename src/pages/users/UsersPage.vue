<template>
  <q-page padding>
    <div class="text-h5 text-title">
      Users
      <span class="text-caption q-pl-sm">Manage list of application users</span>
    </div>
    <q-table class="q-my-lg"
      :data="users"
      :columns="columns"
      :loading="isLoading"
      :filter="filter"
      row-key="id"
    >
      <template v-slot:top-left>
        <q-btn color="primary" icon="add" label="Create" to="/users/create" />
      </template>

      <template v-slot:top-right>
        <q-input class="q-px-md" filled borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:no-data="{ icon, message }">
          <div class="full-width row flex-center text-caption q-gutter-sm">
            <q-spinner-bars v-if="message == 'Loading...'" />
            <q-icon v-else size="2em" :name="icon" />
            <span>
              {{ message }}
            </span>
          </div>
        </template>

        <template v-slot:body-cell-active="{ row, col, value }">
          <td class="text-left">
            <q-badge :color="value ? 'positive' : 'negative'">
              {{ value ? 'Yes' : 'No' }}
            </q-badge>
          </td>
        </template>

        <template v-slot:body-cell-user_type="{ row, col, value }">
          <td class="text-left">
            <q-badge :color="userTypeColors[row.user_type.id - 1]">
              {{ value }}
            </q-badge>
          </td>
        </template>
    </q-table>
  </q-page>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('users', ['users'])
  },
  data () {
    return {
      isLoading: false,
      filter: '',
      userTypeColors: [
        'dark'
      ],
      columns: [
        { name: 'username', field: 'username', label: 'USERNAME', align: 'left', sortable: true },
        { name: 'email', field: 'email', label: 'EMAIL', align: 'left', sortable: true },
        { name: 'active', field: 'active', label: 'ACTIVE', align: 'left', sortable: true, format: (val) => val ? 'Yes' : 'No' },
        { name: 'user_type', field: row => row.user_type.name, label: 'TYPE', align: 'left', sortable: true }
      ]
    }
  },
  mounted () {
    let $this = this

    $this.isLoading = true
    setTimeout(function () {
      $this.$store.dispatch('users/index')
        .then()
        .finally(function () {
          $this.isLoading = false
        })
    }, 3000)
  },
  methods: {
    'create' () {
      this.$emit('showForm')
    }
  }
}
</script>
