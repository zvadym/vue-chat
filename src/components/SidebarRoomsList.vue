<template>
  <v-list flat dense>
    <v-list-item>
      <v-list-item-icon>
        <v-icon>mdi-pound</v-icon>
      </v-list-item-icon>
      <v-list-item-title>
        Rooms
        <v-btn
          color="grey darken-2"
          dark
          x-small
          absolute
          right
          outlined
          :to="{ name: 'room-create' }"
          >new</v-btn
        >
      </v-list-item-title>
    </v-list-item>

    <v-list-item-group v-model="activeRoom" color="primary">
      <v-list-item
        v-for="item in rooms"
        :key="item.id"
        :value="item.id"
        :disabled="item.id === activeRoom"
        :color="item.id === activeRoom ? 'light-blue' : undefined"
      >
        <v-list-item-icon>
          <v-icon size="16" v-if="item.isPrivate" color="purple"
            >mdi-ghost</v-icon
          >
          <v-icon size="24" v-else>mdi-account-group</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  name: 'RoomsList',
  computed: {
    activeRoom: {
      get: function() {
        return this.$store.state.messenger.activeRoomId
      },
      set: function(id) {
        this.$router.push({ name: 'room', params: { id } })
        this.$emit('closeMenu')
      }
    },
    rooms() {
      return this.$store.getters['messenger/roomsOrdered']
    }
  }
}
</script>
