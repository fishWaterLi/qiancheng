/**
 * admin全局状态管理
 */
import Vue from 'vue';
import Vuex from 'vuex'; 
import storagePlugin from './plugin/storagePlugin';
import adminx from './modules/base.admin.x';
Vue.use(Vuex);
const debug=process.env.NODE_ENV!=="production";
export default new Vuex.Store({
    modules:{adminx},
    strict:debug,
    plugins:storagePlugin     
});
