<template>
	<div class="content-wrapper">
		<!-- Header Table -->
		<ContentHeader :title="$t(`${pageName}.title_list_page`)"/>

		<!-- Content Table -->
		<div class="content">
			<div class="error-page">
				<h2 class="headline text-danger"> 403</h2>

				<div class="error-content">
					<h3><i class="pi pi-exclamation-triangle text-danger"></i> Oops! Unauthorized Access.</h3>

					<p>
						Sorry, your request could not be processed.
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
		name: 'Unauthorized',
		components: {
			ContentHeader
		},
		data () {
			return {
				pageName: 'unauthorized'
			}
		}
	}
</script>

<style scoped>

</style>