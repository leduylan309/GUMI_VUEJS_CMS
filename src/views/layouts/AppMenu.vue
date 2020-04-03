<template>
	<nav class="mt-2">
		<AppSubmenu :items="model" :root="true"/>
	</nav>
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
	}
</script>

<style scoped>

</style>
