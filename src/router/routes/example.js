import { AuthGuard } from '../../guard/auth.guard'
import multiguard from 'vue-router-multiguard'

// Components
import ExampleIndex from '../../views/pages/example/ExampleIndex'
import ExampleBreadcrumb from '../../views/pages/example/ExampleBreadcrumb';
import ExampleCalendar from '../../views/pages/example/ExampleCalendar';
import ExampleMultiSelect from '../../views/pages/example/ExampleMultiSelect';
import ExampleRating from '../../views/pages/example/ExampleRating';
import ExampleCarousel from '../../views/pages/example/ExampleCarousel';
import ExamplePaginator from '../../views/pages/example/ExamplePaginator';

const example = {
  path: '/example',
  component: ExampleIndex,
  meta: {
    title: 'Example',

    // for menu
    icon: 'pi pi-fw pi-list',
    label: 'Example'
  },
  children: [
    {
      path: 'breadcrumb',
      name: 'ExampleBreadcrumb',
      component: ExampleBreadcrumb,
      meta: {
        title: 'Breadcrumb',

        // for menu
        icon: 'pi pi-fw pi-bookmark',
        label: 'Bread crumb'
      },
      beforeEnter: multiguard([AuthGuard])
    },
    {
      path: 'calendar',
      name: 'ExampleCalendar',
      component: ExampleCalendar,
      meta: {
        title: 'Calendar',

        // for menu
        icon: 'pi pi-fw pi-bookmark',
        label: 'Calendar'
      },
      beforeEnter: multiguard([AuthGuard])
    },
    {
      path: 'multiselect',
      name: 'ExampleMultiSelect',
      component: ExampleMultiSelect,
      meta: {
        title: 'MultiSelect',

        // for menu
        icon: 'pi pi-fw pi-bookmark',
        label: 'Multi Select'
      },
      beforeEnter: multiguard([AuthGuard])
    },
    {
      path: 'rating',
      name: 'ExampleRating',
      component: ExampleRating,
      meta: {
        title: 'Rating',

        // for menu
        icon: 'pi pi-fw pi-bookmark',
        label: 'Rating'
      },
      beforeEnter: multiguard([AuthGuard])
    },
    {
      path: 'carousel',
      name: 'ExampleCarousel',
      component: ExampleCarousel,
      meta: {
        title: 'Carousel',

        // for menu
        icon: 'pi pi-fw pi-bookmark',
        label: 'Carousel'
      },
      beforeEnter: multiguard([AuthGuard])
    },
    {
      path: 'paginator',
      name: 'ExamplePaginator',
      component: ExamplePaginator,
      meta: {
        title: 'Paginator',

        // for menu
        icon: 'pi pi-fw pi-bookmark',
        label: 'Paginator'
      },
      beforeEnter: multiguard([AuthGuard])
    }
  ]
};

export default example
