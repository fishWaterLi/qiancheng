import createLogger from './logger';
import storage from '@utils/storage/base.storage';
import {APP_KEY} from '../base.storeKeys.d';
const storagePlugin=store=>{
    store.subscribe((mutation,state)=>{        
            if(typeof localStorage==='object'){
                try{
                    //storage.setData(APP_KEY,JSON.stringify(state));//当前只存储了baseAppX模块下的状态
                }catch(e){
                    console.log('--当前浏览器处于隐私模式--');
                }
            }           
        }) 
 
}
export default process.env.NODE_ENV!=="production"?[createLogger(),storagePlugin]:[storagePlugin];