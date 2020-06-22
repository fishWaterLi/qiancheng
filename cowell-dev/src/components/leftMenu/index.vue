<template>
 <div class="left-menu"> 
    <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose">
        <el-submenu v-for="(item,index) in menuList" :key="index" index="index">
            <template slot="title">
                <span @click="dialogVisible=true" >{{item.sceneName}}</span>
            </template>
            <el-menu-item-group>
                <template slot="title">场景 <i class="el-icon-plus" size="mini" style="float: right" @click="showScene"></i></template>
                <el-menu-item  v-for="(diseaseItem,index1) in item.diseaseList" :key="index1" @click="showIndex" index="1-1">{{diseaseItem.diseaseName}}
                    <el-tag  size="mini">单聊</el-tag><i class="el-icon-more" @click="isShowChildren=true"></i>
                </el-menu-item>
            </el-menu-item-group>
        </el-submenu>
    </el-menu>
     <!-- 添加病种 -->
    <el-card v-show="dialogVisible" class="popup" >
        <div class="add">
            <el-input v-model="input" placeholder="输入添加新病种"></el-input>
            <el-button type="primary" style="margin-left:10px">添加</el-button>
        </div>
    <ul class="choose-list">
                    <span class='choose-txt'>选择病种</span>
                    <li class="choose-type" @click="dialogVisible=false">哮喘</li>
                </ul>
    </el-card>
        <!-- 添加场景 -->
        <el-card class="box-card" v-show="isShowScene">
            <div slot="header" class="clearfix">
            <span class="clearfix-txt">场景</span>
               <i class="el-icon-close" @click="isShowScene=false"></i>
            </div>
            <div class="add-scene" v-for="(scene,index) in scenes" :key='index'>
                <el-input v-model="input" placeholder="输入场景名称" class="add-scene-input"></el-input>
                <el-checkbox v-model="checked">群聊</el-checkbox>
                <el-checkbox v-model="personalChecked">私聊</el-checkbox>   
            </div>
            <el-button type="text" class="button" @click="addScene">新增</el-button>
            <div class="footer-button">
                <el-button class="active-button">保存</el-button>
                <el-button :class="{ 'active-button': isActiveButton }" @click="isActiveButton=true">删除</el-button>
            </div>
        </el-card> 
          <!-- 添加子场景 -->
        <el-card class="scene-child-popup" v-show="isShowChildren">
            <div slot="header" class="clearfix">
            <span class="clearfix-txt">更多</span>
               <i class="el-icon-close" @click="isShowChildren=false"></i>
            </div>
            <div class="add-child" @click="">
                <i class="el-icon-plus"></i>
                <span>新增子场景</span>
            </div>
            <div class="add-child" @click="isShowCondition=true;isShowChildren=false">
                <i class="el-icon-plus"></i>
                <span>设置场景发起条件</span>
            </div>
            <div class="footer-button">
                <el-button :class="{ 'active-button': isActiveButton }" @click="isActiveButton=true">保存</el-button>
                <el-button :class="{ 'active-button': isActiveButton }" @click="isActiveButton=true">删除</el-button>
            </div>
        </el-card> 
        <!-- 新增子场景 -->
        <el-card class="box-card" v-show="isShowChildrenScene">
            <div slot="header" class="clearfix">
            <i class="el-icon-arrow-left" @click="isShowChildrenScene=false;isShowChildren=true">返回</i>
            <span class="clearfix-txt">子场景</span>
            <i class="el-icon-close" @click="isShowChildrenScene=false;"></i>
            </div>
            <div class="add-scene" v-for="(scene,index) in scenes" :key='index'>
                <el-input v-model="input" placeholder="输入场景名称" class="add-scene-input"></el-input>
                <el-checkbox v-model="checked">群聊</el-checkbox>
                <el-checkbox v-model="personalChecked">私聊</el-checkbox>   
            </div>
            <el-button type="text" class="button" @click="addChildrenScenes">新增</el-button>
            <div class="footer-button">
                <el-button class="active-button">保存</el-button>
                <el-button :class="{ 'active-button': isActiveButton }" @click="isActiveButton=true">删除</el-button>
            </div>
        </el-card> 
        <!-- 设置子场景发起条件-->
        <el-card class="box-card" v-show="isShowCondition">
            <div slot="header" class="clearfix">
            <i class="el-icon-arrow-left" @click="isShowCondition=false;isShowChildren=true">返回</i>
            <span class="clearfix-txt">场景发起条件</span>
            <i class="el-icon-close" @click="isShowCondition=false;isShowConditioni=false"></i>
            </div>
            <el-checkbox v-model="checkeda">指定时间重复发起</el-checkbox>
           
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
            <el-checkbox v-model="checkedn">满足以下条件发起</el-checkbox>
            <el-select v-model="value" placeholder="小于14天">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
            </el-select>
        </el-card>  
    </div>
</template>
<script>
    export default {
        name: 'LeftMenu',
        data() {
            return {
                menuList:[
                    {
                        sceneName:'哮喘',
                        sceneId:'01',
                        sceneType:'01',
                        diseaseList:[
                            {
                                diseaseName:'注册信息',
                                diseaseCode:'01'
                            }
                        ]

                    }
                ],
                dialogVisible:false,
                isShowScene:false,//场景添加框
                isShowChildren:false,//子场景添加框
                scenes:[''],
                childrenScenes:[''],
                input:'',
                checked:'',
                isActiveButton:false,//添加场景保存,删除按钮样式
                isShowChildrenScene:false,//子场景添加
                isShowCondition:false//子场景条件设置
            };

        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            showIndex(){
                console.log('dianjile')
            },
            addScene(){
                this.scenes.push('')
            },
            addChildrenScene(){
                this.isShowChildrenScene=true;
                this.isShowChildren=false

            },
            addChildrenScenes(){
                this.childrenScenes.push('')
            },
            showScene(){
                this.isShowScene=true;
                this.scenes=['']
            }
        }
    };
</script>
<style lang="less" scoped>
.el-card__body{
    padding: 0 !important
}
.popup{
      width:240px;
      padding: 15px;
      position: absolute;
      top:100px;
      left:120px;
      z-index: 999;
      background-color:white;
      .add{
        display: flex;
        justify-content: space-between;
      }
      .choose-list{
          list-style: none;
          font-size: 14px;
          .choose-txt{
              color: #909399;
          }
          li{
              border-bottom: 1px solid #909399;
              height: 35px;
              line-height: 35px;
          }
      }
    }
.box-card{
    width:240px;
    padding:0 16px;
    position: absolute;
    top:140px;
    left:175px;
    z-index: 999;
    .add-scene{
       margin-top: 20px;
    }
    .clearfix{
        text-align: center;
        .el-icon-close{
           float: right;
           margin-top:4px;
           cursor: pointer;;
        }
    .footer-button{
        display: flex;
        justify-content: center;
        .active-button{
            border: none;
        }
    }
    }
}
.scene-child-popup{
    width:240px;
    padding:0 15px;
    position: absolute;
    top:180px;
    left:145px;
    z-index: 999;
    .clearfix{
        text-align: center;
        .el-icon-close{
           float: right;
           margin-top:4px;
           cursor: pointer;
        }
    }
    .add-child{
        font-size: 14px;
        height:40px;
        line-height: 40px;
        border-bottom: 1px solid beige;
        cursor: pointer;
    }
    .footer-button{
        margin-top:60px;
    }
}
</style>
