import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router/index'
// PrimeVue
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import ToastService from 'primevue/toastservice'
import DialogService from 'primevue/dialogservice'
import ConfirmationService from 'primevue/confirmationservice'

// PrimeVue иконки
import 'primeicons/primeicons.css'

// Компоненты PrimeVue
import Password from 'primevue/password'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Card from 'primevue/card'
import Toast from 'primevue/toast'
import Dialog from 'primevue/dialog'
import Menu from 'primevue/menu'
import Sidebar from 'primevue/sidebar'
import Panel from 'primevue/panel'
import Calendar from 'primevue/calendar'
import InputNumber from 'primevue/inputnumber'
import Textarea from 'primevue/textarea'
import RadioButton from 'primevue/radiobutton'
import Checkbox from 'primevue/checkbox'
import Menubar from 'primevue/menubar'
import DataView from 'primevue/dataview'
import ProgressBar from 'primevue/progressbar'
import Timeline from 'primevue/timeline'
import Chart from 'primevue/chart'

const app = createApp(App)

app.component('Button', Button)
app.component('InputText', InputText)
app.component('Dropdown', Dropdown)
app.component('Card', Card)
app.component('Toast', Toast)
app.component('Dialog', Dialog)
app.component('Menu', Menu)
app.component('Sidebar', Sidebar)
app.component('Panel', Panel)
app.component('Calendar', Calendar)
app.component('InputNumber', InputNumber)
app.component('Textarea', Textarea)
app.component('RadioButton', RadioButton)
app.component('Checkbox', Checkbox)
app.component('Password', Password)
app.component('Menubar', Menubar)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('DataView', DataView)
app.component('ProgressBar', ProgressBar)
app.component('Timeline', Timeline)
app.component('Chart', Chart)

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)

app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
})
app.use(ToastService)
app.use(DialogService)
app.use(ConfirmationService)

app.mount('#app')
