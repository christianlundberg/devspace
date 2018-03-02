<template>
    <div >
        <space-list :spaces="spaces"></space-list>
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
    computed: mapGetters({
        spaces: types.SPACES
    }),
    created(){
        this.$store.dispatch(types.LOAD_SPACES);
    }
}
</script>

