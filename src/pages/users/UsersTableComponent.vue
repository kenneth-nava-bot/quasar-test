<template>
<div class="column full-width q-gutter-md">
  <div class="column">
    <div class="row">
      <q-btn color="primary" icon="add" label="Create" />
    </div>
  </div>
  <div class="column">
    <q-table
      :data="users"
      :columns="columns"
      :loading="isLoading"
      :filter="filter"
      row-key="id"
    >
      <template v-slot:loading>
        <div class="full-width column flex-center text-dark q-gutter-sm q-pa-md">
          <div class="text-h6 text-title"><q-spinner-bars color="primary" /></div>
          <div class="text-caption"><slot>Loading Data... Please Wait...</slot></div>
        </div>
      </template>

      <template v-slot:top-right>
        <q-input class="bg-grey-4 q-px-md" borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:no-data="{ icon, message }">
          <div v-if="message != 'Loading...'" class="full-width row flex-center text-accent q-gutter-sm">
            <q-icon size="2em" :name="icon" />
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
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('users', ['users'])
  },
  data () {
    return {
      isLoading: true,
      filter: '',
      userTypeColors: [
        'dark'
      ],
      columns: [
        { name: 'username', field: 'username', label: 'USERNAME', align: 'left', sortable: true },
        { name: 'email', field: 'email', label: 'EMAIL', align: 'left', sortable: true },
        { name: 'active', field: 'active', label: 'ACTIVE', align: 'left', sortable: true, format: (val) => val ? 'Yes' : 'No' },
        { name: 'user_type', field: row => row.user_type.name, label: 'Role', align: 'left', sortable: true }
      ]
    }
  },
  mounted () {
    let $this = this

    $this.isLoading = $this.$store.dispatch('users/index')
      .then(() => false).value
  }
}
</script>
