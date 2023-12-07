import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {createRouter, createWebHistory} from 'vue-router'
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Reservation from "./views/Reservation.vue";
import History from "./views/History.vue";
import Success from "./views/Success.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', name: 'Home', component: Home },
        {path: '/login', name: 'Login', component: Login },
        {path: '/reservation', name: 'Reservation', component: Reservation },
        {path: '/history', name: 'History', component: History },
        {path: '/success', name: 'Success', component: Success }
    ]
})

const app = createApp(App);
app.use(router);
app.mount('#app');
