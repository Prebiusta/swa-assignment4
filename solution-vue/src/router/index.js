import Vue from 'vue'
import VueRouter from 'vue-router'
import Weather from "@/views/Weather";
import SubmitData from "@/views/SubmitData";
import Warnings from "@/views/Warnings";
import WarningsPool from "@/views/WarningsPool";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: Weather
    },
    {
        path: '/submit',
        component: SubmitData
    },
    {
        path: '/warning',
        component: Warnings
    },
    {
        path: '/warning-pooling',
        component: WarningsPool
    },
]

const router = new VueRouter({
    routes
})

export default router
