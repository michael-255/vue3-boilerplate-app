import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar } from 'quasar'
import '@quasar/extras/roboto-font-latin-ext/roboto-font-latin-ext.css'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'
import 'quasar/src/css/index.sass'

import App from './App.vue'
import router from './router'

// Testing...
import { database } from './services/LocalDatabase'
// console.log(await database.addUser())
console.log('addExample:', await database.addExample())
console.log('getAllUsers:', await database.getAllUsers())
console.log('getAllExamples:', await database.getAllExamples())
console.log('getUserByName:', await database.getUserByName('My User'))
console.log('getNewestExample:', await database.getNewestExample())
console.log('getOldestExample:', await database.getOldestExample())

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
  /*
  config: {
    brand: {
      // primary: '#e46262',
      // ... or all other brand colors
    },
    notify: {...}, // default set of options for Notify Quasar plugin
    loading: {...}, // default set of options for Loading Quasar plugin
    loadingBar: { ... }, // settings for LoadingBar Quasar plugin
    // ..and many more (check Installation card on each Quasar component/directive/plugin)
  }
  */
})

app.mount('#app')
