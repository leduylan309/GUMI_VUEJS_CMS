<template>
	<div class="breadcrumb-section">
		<ol class="breadcrumb float-sm-right" v-if="this.$route.matched">
			<template v-for="(breadcrumb, index) in this.$route.matched">
				<li class="breadcrumb-item"
						:key="index"
						:class="{'active': isActive(breadcrumb.name)}"
						v-if="breadcrumb.meta.title">
					<router-link v-if="!isActive(breadcrumb.name)"
											 :to="breadcrumb.path || { name: breadcrumb.name}"
					>
						{{ breadcrumb.meta.title }}
					</router-link>

					<span v-else>{{ breadcrumb.meta.title }}</span>
				</li>
			</template>
		</ol>
	</div>
</template>

<script>
	export default {
		name: 'Breadcrumb',

		props: {
			breadcrumbs: null,
		},

		created () {
			console.log(this.$route.matched)
		},

		methods: {
			isActive (name) {
				return this.$route.name === name
			},
		},
	}
</script>

<style scoped>

</style>