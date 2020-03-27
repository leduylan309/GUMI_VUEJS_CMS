<template>
	<div class="layout-wrapper layout-static"
			 :class="containerClass"
			 @click="onWrapperClick">

		// TOP MENU
		<AppTopBar @menu-toggle="onMenuToggle"/>

		// SIDE MENU
		<transition name="layout-sidebar">
			<div class="layout-sidebar layout-sidebar-dark" @click="onSidebarClick" v-show="isSidebarVisible()">
				<div class="layout-logo">
					<router-link to="/">
						<h2>Newphoria</h2>
					</router-link>
				</div>

				<AppMenu :model="menu" @menuitem-click="onMenuItemClick"/>
			</div>
		</transition>

		// MAIN CONTENT
		<div class="layout-main">
			<router-view/>
		</div>

		// FOOTER APP
		<AppFooter/>
	</div>
</template>

<script>
	// Component
	import AppFooter from '../layouts/AppFooter.vue'
	import AppTopBar from '../layouts/AppTopBar.vue'
	import AppMenu from '../layouts/AppMenu.vue'

	export default {
		name: 'Index',

		components: {
			AppFooter,
			AppTopBar,
			AppMenu,
		},

		data () {
			return {
				layoutMode: 'static',
				staticMenuInactive: false,
				overlayMenuActive: false,
				mobileMenuActive: false,
				menuClick: false,
				menu: [],
			}
		},

		created () {
			const { routes } = this.$router.options

			const menus = _.pickBy(routes, (value) => {
				return value.name === 'Index'
			})

			this.menu = menus[1].children
		},

		beforeUpdate () {
			if (this.mobileMenuActive)
				this.addClass(document.body, 'body-overflow-hidden')
			else
				this.removeClass(document.body, 'body-overflow-hidden')
		},

		computed: {
			containerClass () {
				return [
					'layout-wrapper', {
						'layout-overlay': this.layoutMode === 'overlay',
						'layout-static': this.layoutMode === 'static',
						'layout-static-sidebar-inactive': this.staticMenuInactive && this.layoutMode === 'static',
						'layout-overlay-sidebar-active': this.overlayMenuActive && this.layoutMode === 'overlay',
						'layout-mobile-sidebar-active': this.mobileMenuActive,
					}]
			},
		},

		methods: {
			/**
			 * Action for Container
			 */
			onWrapperClick () {
				if (!this.menuClick) {
					this.overlayMenuActive = false
					this.mobileMenuActive = false
				}

				this.menuClick = false
			},

			onSidebarClick () {
				this.menuClick = true
			},

			onMenuToggle (event) {
				this.menuClick = true

				if (this.isDesktop()) {
					if (this.layoutMode === 'overlay') {
						this.overlayMenuActive = !this.overlayMenuActive
					} else if (this.layoutMode === 'static') {
						this.staticMenuInactive = !this.staticMenuInactive
					}
				} else {
					this.mobileMenuActive = !this.mobileMenuActive
				}

				event.preventDefault()
			},

			isDesktop () {
				return window.innerWidth > 1024
			},

			onMenuItemClick (event) {
				if (event.item && !event.item.items) {
					this.overlayMenuActive = false
					this.mobileMenuActive = false
				}
			},

			isSidebarVisible () {
				if (this.isDesktop()) {
					if (this.layoutMode === 'static')
						return !this.staticMenuInactive
					else if (this.layoutMode === 'overlay')
						return this.overlayMenuActive
					else
						return true
				} else {
					return true
				}
			},

			addClass (element, className) {
				if (element.classList)
					element.classList.add(className)
				else
					element.className += ' ' + className
			},

			removeClass (element, className) {
				if (element.classList)
					element.classList.remove(className)
				else
					element.className = element.className.replace(
									new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ')
			},
		},
	}
</script>

<style scoped>

</style>