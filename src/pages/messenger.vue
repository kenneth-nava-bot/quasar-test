<template>
  <q-page padding>
    <div class="fit row wrap justify-start items-start content-start q-gutter-md">
       <q-list bordered separator class="col-3">
        <q-item @click="viewConvo(conversation, conversation.participants.data[0].id)" clickable ripple v-bind:key="conversation.id" v-for="conversation in conversations">
          <q-item-section>
            <q-item-label>{{ conversation.participants.data[0].name }}</q-item-label>
            <q-item-label caption>{{ conversation.snippet }}</q-item-label>
          </q-item-section>
        </q-item>
       </q-list>
       <div class="column col q-gutter-md">
        <div ref="chat" class="chat-display bg-grey-3">
          <div v-show="loading" class="text-h5 column full-height flex-center">
            <q-spinner-bars color="primary" />
            <p class="text-caption">Loading messages... Please wait...</p>
          </div>
          <div class="column justify-between q-pa-xl">
            <q-chat-message v-bind:key="message.id" v-for="message in selected.messages.data"
              :name="message.from.name"
              :text="[message.message]"
              :sent="isSender(message.from.id)"
              />
          </div>
        </div>
        <div class="row fit wrap justify-start items-start content-start q-gutter-y-md">
          <q-input class="col"
            v-model="text"
            filled
            dense
            type="textarea"
          />
          <q-btn @click="sendMessage" color="primary" class="col-3 q-ml-md">Send</q-btn>
        </div>
       </div>
    </div>
  </q-page>
</template>

<style lang="scss">
.conversations {
  width: 300px;
}
.chat-display {
  height: 300px;
  overflow-y: auto;
}
</style>

<script>
import axios from 'axios'
const PAGE_ACCESS_TOKEN = 'EAAG7MgdQ70ABAMMeivgynIhYY82CLpbLNew1l9ymdCW3TG88vvsbVfBgoLbD2kxhwTksMmDU597HsiNwRsX9805ZBo2BsrhxUpOghdGTD4izVBtsgh9Lph3Yy6bRZChy8ZCZC7gRZCA9COTyCQHfvpVSQrRI0XXot3WIk7mIqScFokbtbKEU6ZBuhjvqjZBuWcZD'
const FB_API = 'https://graph.facebook.com/v6.0/'
const PAGE_ID = '108441390738069'

export default {
  data () {
    return {
      conversations: [],
      selectedId: null,
      selected: {
        messages: []
      },
      loading: false,
      text: ''
    }
  },
  mounted () {
    let $this = this

    axios.get(FB_API + 'me/conversations?access_token=' + PAGE_ACCESS_TOKEN + '&fields=snippet,participants')
      .then(function (response) {
        $this.conversations = response.data.data
      })
  },
  methods: {
    'viewConvo' (conversation, id) {
      let $this = this
      $this.loading = true
      axios.get(FB_API + '/' + conversation.id + '?access_token=' + PAGE_ACCESS_TOKEN + '&fields=messages{to,from,message}')
        .then(function (response) {
          $this.selected = response.data
          $this.selected.messages.data.reverse()
        })
        .finally(function () {
          $this.loading = false
          $this.selectedId = id
          $this.$refs.chat.scrollTop = $this.$refs.chat.scrollHeight
        })
    },
    'sendMessage' () {
      let $this = this
      if ($this.selectedId != null) {
        axios.post(FB_API + 'me/messages?access_token=' + PAGE_ACCESS_TOKEN, {
          recipient: {
            id: $this.selectedId
          },
          message: {
            text: $this.text
          }
        })
          .then(function (response) {
            $this.viewConvo($this.selected, $this.selectedId)
          })
          .finally(function () {
            $this.text = ''
            $this.$refs.chat.scrollTop = 300
          })
      }
    },
    'isSender' (id) {
      return (id === PAGE_ID)
    }
  }
}
</script>
