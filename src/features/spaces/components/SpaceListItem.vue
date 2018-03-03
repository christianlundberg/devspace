<template>
    <md-card style="margin-bottom: 20px">
      <md-progress-bar md-mode="indeterminate" v-if="deleting" />
      <md-card-header>
        <md-card-header-text>
          <div class="md-title">{{space.name}}</div>
          <div class="md-subhead">{{space.description}}</div>
        </md-card-header-text>

        <md-card-media>
          <img :src="space.logo" alt="Logo">
        </md-card-media>
      </md-card-header>

      <md-card-actions>
        <md-button class="md-primary">Join</md-button>
        <md-button :disabled="deleting" @click="onDelete" v-if="isCreator">Delete</md-button>
      </md-card-actions>
    </md-card>
</template>

<script>
import { types } from '../../../store/modules/spaces';

export default {
    name: 'SpaceListItem',
    props: ["space", "deleting", 'userSpaces'],
    computed: {
      isCreator(){
        return this.userSpaces ? this.userSpaces.some(space => space.userId == this.space.userId) : false;
      }
    },
    methods: {
      onDelete(){
        this.$store.dispatch(types.DELETE_SPACE, this.space);
      }
    }
};
</script>

