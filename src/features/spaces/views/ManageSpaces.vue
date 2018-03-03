<template>
    <div v-if="!(user && user.spaces && user.spaces.length)">
        <md-empty-state
            md-icon="devices_other"
            md-label="Looks like you haven't created any spaces"
            md-description="Create a space and people will be able to join it.">
            <md-button to="/spaces/create" class="md-primary md-raised">Create space</md-button>
        </md-empty-state>
    </div>
    <space-list :userSpaces="userSpaces" :spaces="user ? user.spaces : null" v-else></space-list>
</template>
<script>
import SpaceList from '../components/SpaceList';
import { mapGetters } from 'vuex';

export default {
    components: {
        spaceList: SpaceList
    },
    computed: {
        userSpaces(){
            return this.user ? this.user.spaces.map(space => space.data) : []
        },
        ...mapGetters(['user'])
    }
};
</script>

