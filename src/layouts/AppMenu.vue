<template>
	<div class="layout-menu-container">
		<AppSubmenu :items="model" class="layout-menu" :root="true" @menuitem-click="onMenuItemClick"/>
	</div>
</template>

<script lang="js">
	import AppSubmenu from './AppSubMenu.vue'

	export default {
		name: 'AppMenu',

		components: {
			AppSubmenu,
		},

		props: {
			model: Array,
		},

		methods: {
			onMenuItemClick (event) {
				return event
			},
		},
	}
</script>

<style scoped>

</style>
