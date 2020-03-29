<template>
	<div class="layout-topbar">
		<button class="p-link layout-menu-button" @click="onMenuToggle">
			<span class="pi pi-bars"></span>
		</button>
		<div class="layout-topbar-icons">
			<button class="p-link">
				<span class="layout-topbar-item-text">{{$t('common.events')}}</span>
				<span class="layout-topbar-icon pi pi-calendar"></span>
				<span class="layout-topbar-badge">5</span>
			</button>
			<button class="p-link">
				<span class="layout-topbar-item-text">{{$t('common.settings')}}</span>
				<span class="layout-topbar-icon pi pi-cog"></span>
			</button>
		</div>
	</div>
</template>

<script lang="js">
	export default {
		name: 'AppTopBar',

		methods: {
			onMenuToggle (event) {
				this.$emit('menu-toggle', event)
			},
		},
	}
</script>