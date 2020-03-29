<template>
	<ul v-if="items">
		<template v-for="(item,i) of items">
			<li :key="i"
					:class="[{'active-menuitem': activeIndex === i && !item.path}]">
				<div v-if="item.children && root===true" class='arrow'/>

				<router-link v-if="item.path"
										 :to="item.path"
										 :class="[{'active-route': activeIndex === i}]"
										 @click.native="onMenuItemClick($event,item,i)"
										 exact>
					<i :class="item.meta.icon"/> {{item.meta.label}}

					<i v-if="item.children" class="pi pi-fw pi-angle-down menuitem-toggle-icon"/>
				</router-link>

				<a v-if="!item.path"
					 :href="item.path||'#'"
					 @click="onMenuItemClick($event,item,i)">
					<i :class="item.meta.icon"/> {{item.meta.label}}

					<i v-if="item.children" class="pi pi-fw pi-angle-down menuitem-toggle-icon"/>
				</a>

				<transition name="layout-submenu-wrapper">
					<AppSubMenu v-show="activeIndex === i"
											:items="item.children"
											@menuitem-click="$emit('menuitem-click', $event)"/>
				</transition>
			</li>
		</template>
	</ul>
</template>
<script lang="js">
	import AppSubMenu from './AppSubMenu.vue'

	export default {
		name: 'AppSubMenu',

		components: {
			AppSubMenu
		},

		props: {
			items: Array,
			root: Boolean,
		},

		data () {
			return {
				activeIndex: null,
			}
		},

		methods: {
			/**
			 * action click on menu
			 * @param event
			 * @param item
			 * @param index
			 */
			onMenuItemClick (event, item, index) {
				if (item.disabled) {
					event.preventDefault()
					return
				}

				if (!item.to && !item.url) {
					event.preventDefault()
				}

				this.activeIndex = index === this.activeIndex ? null : index

				this.$emit('menuitem-click', {
					originalEvent: event,
					item: item,
				})
			},
		},
	}
</script>