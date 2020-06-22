/**
 * 后台管理的状态管理
 */
import storage from '@utils/storage/base.storage';
//import {APP_KEY} from '../base.storeKeys.d';
import {
    BAM_TOKEN,
    BAM_CONFIG,
    RES_OK_CODE,
    BAM_MODULE_NAME,
    BAM_CONFIGSOURCE,
    BAM_USERINFO,
    BAM_CURRMENUINDEX,
    RIGHT_INTERVIEWER_ID
} from '@api/base.constant.d';
import BaseHttpS from '@api/base.http.s';

const state = {
    loggedIn: false, //判断登录状态
    bam_token: storage.getSessionItem(BAM_TOKEN) || storage.getLocalItem(BAM_TOKEN) || '',
    bam_config: storage.getLocalItem(BAM_CONFIG) ? JSON.parse(storage.getLocalItem(BAM_CONFIG)) : [],
    bam_configSource: storage.getLocalItem(BAM_CONFIGSOURCE) ? JSON.parse(storage.getLocalItem(BAM_CONFIGSOURCE)) : {}, // 未处理的全局配置
    module_name: '',
    routeInfo: null,
    currMenuIndex: storage.getSessionItem(BAM_CURRMENUINDEX) || 0,
    userInfo: JSON.parse(storage.getLocalItem(BAM_USERINFO)) || {},
    defaultRoutePath: '/info' //默认就在信息采集
};
const getters = {
    getToken: (state) => {
        return state.bam_token;
    },
    getLogStatus: (state) => {
        //获取登录状态
        return state.loggedIn;
    },
    getRouteInfo: (state) => {
        //获取当前路由信息
        return state.routeInfo;
    },
    getConfig: (state) => {
        return state.bam_config;
    },
    getConfigSource: (state) => {
        return state.bam_configSource;
    },
    getUserInfo: (state) => {
        return state.userInfo;
    },
    getCurrMenuIndex: (state) => {
        return state.currMenuIndex;
    },
    getDefaultRoutePath: (state) => {
        return state.defaultRoutePath;
    }
};
const actions = {
    getConfig(context, payload) {
        BaseHttpS.getConfig().then(function (res) {
            console.log('--111getConfig--', res.data);
            context.commit({type: 'update_config', cfg: res.data});
        }).catch(function (error) {
            console.log('error=', error);
        });
    }
};
const mutations = {
    doLogIn: (state) => {
        state.loggedIn = true;
    },
    doLogOut: (state) => {
        state.loggedIn = false;
    },
    update_userInfo(state, {data}) {
        state.userInfo = data;
    },
    update_routeInfo(state, {data}) {
        //更新当前路由
        state.routeInfo = JSON.parse(JSON.stringify(data));
    },
    update_config(state, {cfg}) {
        let _cfg = cfg; //baseConfigTrf.init(cfg);
        storage.setLocalItem(BAM_CONFIG, JSON.stringify(_cfg));
        state.bam_config = _cfg;
        storage.setLocalItem(BAM_CONFIGSOURCE, JSON.stringify(cfg));
        state.bam_configSource = cfg;
    },
    setConfig(state, data) {
        state.bam_config = data;
        sessionStorage.setItem(BAM_CONFIG, JSON.stringify(data));
    },
    update_module_name(state) {
        state.module_name = BAM_MODULE_NAME;
        storage.setLocalItem('module_name', BAM_MODULE_NAME);
    },
    update_token(state, {data}) {
        state.bam_token = data;
        sessionStorage.setItem(BAM_TOKEN, data);
    },
    update_currMenuIndex(state, {idx}) {
        state.currMenuIndex = idx;
        storage.setSessionItem(BAM_CURRMENUINDEX, idx);
    },

    update_defaultRoutePath: (state, {data}) => {
        state.defaultRoutePath = data;
    }
};
export default {
    // namespaced:true,
    state,
    getters,
    actions,
    mutations
};
