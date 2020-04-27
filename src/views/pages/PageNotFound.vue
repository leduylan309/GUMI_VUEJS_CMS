<template>
	<div class="content-wrapper">
		<!-- Header Table -->
		<ContentHeader :title="$t(`${pageName}.title_list_page`)"/>

		<!-- Content Table -->
		<div class="content">
			<div class="error-page">
				<h2 class="headline text-warning"> 404</h2>

				<div class="error-content">
					<h3><i class="pi pi-exclamation-triangle text-warning"></i> Oops! Page not found.</h3>

					<p>
						We could not find the page you were looking for.
						Meanwhile, you may <router-link :to="{ name: 'Dashboard' }">return to dashboard</router-link>.
					</p>
				</div>
				<!-- /.error-content -->
			</div>
		</div>
	</div>
</template>

<script>
	import ContentHeader from '../components/shared/ContentHeader'

	export default {
		name: 'PageNotFound',
		components: {
			ContentHeader
		},
		data () {
			return {
				pageName: 'not_found'
			}
		}
	}
</script>

<style scoped>

</style>