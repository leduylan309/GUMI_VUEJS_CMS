try {
  window.$ = window.jQuery = require('jquery')
  /* Jquery UI */
  require('admin-lte/plugins/jquery/jquery')
  require('admin-lte/plugins/jquery-ui/jquery-ui.min')
  require('admin-lte/dist/js/adminlte.min')
  require('admin-lte/plugins/bootstrap/js/bootstrap')
} catch (e) {
  console.log('Error Adminlte', e)
}
