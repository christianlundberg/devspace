<template>
    <md-card style="margin-bottom: 20px">
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
        <md-button>Delete</md-button>
      </md-card-actions>
    </md-card>
</template>

<script>
export default {
    name: 'SpaceListItem',
    props: ["space", "deleting"]
};
</script>

