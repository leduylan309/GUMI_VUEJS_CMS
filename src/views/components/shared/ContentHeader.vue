<template>
	<div class="content-header">
		<div class="container-fluid">
			<div class="row">
				<div class="col-sm-6">
					<h1 class="m-0 text-dark">
						{{ title }}
					</h1>
				</div>

				<div class="col-sm-6">
					<Breadcrumb/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Breadcrumb from './Breadcrumb'

	export default {
		name: 'ContentHeader',

		props: {
			title: String,
		},

		components: { Breadcrumb },
	}
</script>

<style scoped>

</style>