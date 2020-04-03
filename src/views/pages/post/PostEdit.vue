<template>
	<div class="p-form">
		<div class="p-grid">
			<div class="p-md-10 p-col-12">
				<div class="card">
					<h1 class="p-font--bold">{{ $t('admin.edit_admin') }}</h1>

					<div class="card-body">
						<div class="p-form-group">
							<label>{{ $t('common.text.name') }}</label>

							<InputText v-model="item.name" :placeholder="$t('common.text.name')"/>
						</div>

						<div class="p-form-group">
							<label>{{ $t('common.text.email') }}</label>

							<InputText v-model="item.email" :placeholder="$t('common.text.email')"/>
						</div>

						<div class="p-form-group">
							<label>{{ $t('common.text.password') }}</label>

							<Password v-model="item.password" />
						</div>

						<div class="p-form-group">
							<label>{{ $t('common.text.activate') }}</label>

							<InputSwitch class="p-display--block" v-model="item.activate" />
						</div>
					</div>
				</div>
			</div>

			<div class="p-md-2 p-col-12">
				<div class="card">
					<Button type="button"
									icon="pi pi-save"
									:label="$t('common.button.save')"
									class="p-button-success p-component p-button--block p-font--bold"
					/>

					<Button type="button"
									icon="pi pi-times"
									:label="$t('common.button.cancel')"
									class="p-button-secondary p-component p-button--block p-font--bold"
					/>
				</div>
			</div>
		</div>
		<pre>{{ item }}</pre>
	</div>
</template>

<script lang="js">
	// Components
	import Button from 'primevue/button'
	import InputText from 'primevue/inputtext'
	import InputSwitch from 'primevue/inputswitch';
	import Password from 'primevue/password';

	export default {
		name: 'PostEdit',

		components: {
			Button,
			InputText,
			InputSwitch,
			Password
		},

		data () {
			return {
				item: {},
			}
		},

		beforeRouteEnter (to, from, next) {
			next()
		},

	}
</script>