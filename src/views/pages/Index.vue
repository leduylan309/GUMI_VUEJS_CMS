<template>
	<div class="transition sidebar-mini">
		<div class="wrapper">
			<!-- Navbar -->
			<nav class="main-header navbar navbar-expand navbar-white navbar-light">
				<!-- Left navbar links -->
				<ul class="navbar-nav">
					<li class="nav-item">
						<a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="pi pi-bars"></i></a>
					</li>
				</ul>

				<!-- Right navbar links -->
				<ul class="navbar-nav ml-auto">
					<!-- Messages Dropdown Menu -->
					<li class="nav-item dropdown">
						<a class="nav-link" data-toggle="dropdown" href="#">
							<i class="pi pi-user"></i>
						</a>

						<div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
							<div class="dropdown-divider"></div>
							<a @click="logout" class="dropdown-item dropdown-footer">Log out</a>
						</div>
					</li>

					<!-- Notifications Dropdown Menu -->
					<li class="nav-item">
						<a class="nav-link" data-widget="control-sidebar" data-slide="true" href="#" role="button">
							<i class="fas fa-th-large"></i>
						</a>
					</li>
				</ul>
			</nav>

			<!-- Main Sidebar Container -->
			<aside class="main-sidebar sidebar-dark-primary elevation-4 ">
				<!-- Brand Logo -->
				<router-link class="brand-link text-center" :to="{ name: 'Dashboard' }">
					<img alt=""
							 class="img-responsive"
							 src="../../assets/images/newphoria_logo.svg">
				</router-link>

				<!-- Sidebar -->
				<transition>
					<div class="sidebar">
						<AppMenu :model="menu"/>
					</div>
				</transition>
			</aside>
			<!-- Main Content -->
			<router-view/>

		</div>
	</div>
</template>

<script>
	// Component
	import AppMenu from '../layouts/AppMenu.vue'
	import {AuthService} from '../../api'

	export default {
		name: 'PostIndex',

		components: {
			AppMenu,
		},

		data () {
			return {
				menu: [],
				isOpen: true,
			}
		},

		created () {
			const { routes } = this.$router.options

			const menus = _.pickBy(routes, (value) => {
				return value.name === 'Index'
			})

			this.menu = menus[1].children
		},

		methods: {
			async logout () {
				await AuthService.logout()
				await this.$router.push({ name: 'Login' })
			}
		}
	}
</script>

<style scoped>

</style>