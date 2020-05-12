// Components
import PageNotFound from '../../views/pages/PageNotFound'

const notfound = {
  path: '/404',
  alias: '*',
  name: 'PageNotFound',
  component: PageNotFound,
  meta: {
    title: '404 Error Page',
  },
}

export default notfound