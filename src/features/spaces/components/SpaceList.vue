<template>
    <div class="md-layout">
        <div v-for="space in spaces" :key="space.id" class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100">
            <space-list-item  :space="space.data" :deleting="space.deleting"  />
        </div>
    </div>
</template>

<script>
import SpaceListItem from './SpaceListItem';

export default {
    name: 'SpaceList',
    components: {
        spaceListItem: SpaceListItem
    },
    props: ['spaces']
}
</script>

