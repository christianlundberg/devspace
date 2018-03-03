<template>
    <div>
        <space-list :userSpaces="userSpaces" :spaces="spaces"></space-list>
    </div>
</template>
<script>
import SpaceList from '../components/SpaceList';
import { mapGetters } from 'vuex';
import { types } from '../../../store/modules/spaces';

export default {
    components: {
        spaceList: SpaceList
    },
    computed: {
        userSpaces(){
            return this.user ? this.user.spaces.map(space => space.data) : [];
        },
        ...mapGetters({
            user: 'user',
            spaces: types.SPACES
        })
    },
    created(){
        this.$store.dispatch(types.LOAD_SPACES);
    }
}
</script>

