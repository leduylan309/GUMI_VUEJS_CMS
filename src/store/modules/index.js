const requireModule = require.context('.', false, /\.store\.js$/)
const modules = {}

requireModule.keys().forEach((filename) => {
  // remove the store.js extension and capitalize
  const moduleName = filename.replace(/(\.\/|\.store\.js)/g, '').replace(/^\w/, c => c.toLowerCase())

  modules[moduleName] = requireModule(filename).default || requireModule(filename)
})

export default modules