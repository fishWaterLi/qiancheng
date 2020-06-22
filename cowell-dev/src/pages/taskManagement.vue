<template>
    <div id="content">
        <div class="header">
            <span>语料排期</span>
            <span>
                时间：
                <el-date-picker
                    v-model="value1"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
                至
                 <el-date-picker
                         v-model="value2"
                         type="date"
                         placeholder="选择日期">
                </el-date-picker>
            </span>
        </div>
        <div class="button-div">
            <el-button size="small" icon="el-icon-plus" @click="centerDialogVisible = true"> 新增</el-button>
            <div class="right-button"><span style="font-size: 12px;color: #cccccc">(勾选需要调整或删除的语料)</span><el-button size="small">排期调整</el-button><el-button size="small">删除</el-button></div>
        </div>
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    label="日期"
                    width="180">
                <template slot-scope="scope">

                  {{ scope.row.date }}
                </template>
            </el-table-column>
            <el-table-column
                    label="星期"
                    width="180">
                <template slot-scope="scope">

                 {{ scope.row.week }}

                </template>
            </el-table-column>
            <el-table-column
                    label="语料包">
                <template  slot-scope="scope">
                    <ul>
                        <li v-for="(item,index) in scope.row.list" :key="index">

                            <input class="number-input" type="text" v-model="item.input">
                             场景  <span>{{item.content}}</span> |
<!--                            <el-tooltip class="item" effect="light" type="success"  placement="bottom" style=" padding: 5px;font-size: 12px;border: 0;">-->
<!--                                <div slot="content">多行信息<br/></div>-->
<!--                                <div slot="content">第二行<br/></div>-->
<!--                                <el-button>下边</el-button>-->
<!--                            </el-tooltip>-->
                            <el-popover class="message-text-div"
                                    placement="bottom"
                                    width="400"
                                    trigger="hover">
                                <p>多行信息</p>
                                <p>第二行</p>
                                <el-button slot="reference">语料包</el-button>
                            </el-popover>
                        </li>
                    </ul>


                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope" width="80">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">新增</el-button>
                </template>
            </el-table-column>
            <el-table-column
                    label="">
                <template width="80"  slot-scope="scope">
                    <div v-for="(item,index) in scope.row.list" :key="index"> <el-checkbox v-model="item.checked">备选项</el-checkbox></div>


                </template>
            </el-table-column>
        </el-table>

        <el-dialog
                title="提示"
                :visible.sync="centerDialogVisible"
                width="90%"
                center>
            <el-container>
                <el-aside>

                    <el-date-picker
                            v-focus
                            type="dates"
                            v-model="value4"
                            @change="showVal"
                            placeholder="选择一个或多个日期">
                    </el-date-picker>
                </el-aside>
                    <div class="content-div">
                        <div>
                            <span>当前病种：哮喘 </span>
                            <el-select v-model="sceneList"  @change="showSceneList" placeholder="请选择">
                                <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div>
                           <div v-for="(item,index) in corpusList" :key="index">
                               <div>
                                   <el-checkbox v-model="item.checked">备选项</el-checkbox>
                               </div>
                               <ul>
                                   <li v-for="(item1,index1) in item.corpusContentList" :key="index1">
                                       <p>|1.1| {{item1.content}}</p>
                                   </li>

                               </ul>
                           </div>
                        </div>
                    </div>

            </el-container>
            <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
  data() {
    return {
        value1:'',
        value2:'',
        centerDialogVisible: false,
        dislock:true,
        tableData: [{
            date: '2016-05-02',
            week: '星期二',
           list:[
               {
                 input:'1',
                 content:'吸烟史了解',
                   checked:false
               },
               {
                 input:'2',
                 content:'吸烟史了解2',
                   checked:true
               }
           ]
        },{
                date: '2016-05-03',
                week: '星期三',
                list:[
                    {
                        input:'1',
                        content:'吸烟史了解',
                        checked:false
                    },
                    {
                        input:'2',
                        content:'吸烟史了解2',
                        checked:true
                    }
                ]
            }],

        value4:'',
        options: [{
            value: '选项1',
            label: '黄金糕'
        }, {
            value: '选项2',
            label: '双皮奶'
        }, {
            value: '选项3',
            label: '蚵仔煎'
        }, {
            value: '选项4',
            label: '龙须面'
        }, {
            value: '选项5',
            label: '北京烤鸭'
        }],
        sceneList:'',
        corpusList:[
            {
                checked:false,
                corpusContentList:[
                    {
                        content:'很好',
                    },
                    {
                        content:'吸烟有害健康',
                    }
                ]

            }
        ]

    };
  },
  methods: {
      handleEdit(index, row) {
          console.log(index, row);
      },
      showVal(){
          console.log(this.value4)
        },
      showSceneList(){
          console.log(this.sceneList)
      },
      // 日期格式化
       CurentTime(val){
        var year = val.getFullYear();       //年
        var month = val.getMonth() + 1;     //月
        var day = val.getDate();            //日
        var clock = year + "-";
        if(month < 10)
            clock += "0";
        clock += month + "-";
        if(day < 10)
            clock += "0";
        clock += day + " ";
        return(clock);
    }
},
    // 使用directives注册v-focus全局指令
    directives: {
        focus: {
            inserted: function (el) {
                el.querySelector('date-picker-id').focus()
            }
        }
    },
    watch:{
    }

};
</script>
<style lang="less" scoped>
    #content{
        padding: 10px;
    }
    .header{
        padding: 10px;
        border-bottom: 1px solid #cccccc;
    }
    .button-div{
        padding: 10px;
    }
    .right-button{
        float: right;
    }
    ul li{
        list-style: none;
    }

    .number-input{
        width: 12px;
        text-align: center;
        outline: none;
        border: 1px solid #cccccc;
        background: rgb(235,244,255);
    }
    .message-text-div button{
        padding: 0;
        margin: 0;
        border: 0;
        color: #409EFF;
    }
    .is-selected {
        color: #1989FA;
    }

    .el-container{
        border: 1px solid #cccccc;
    }
    .el-aside{
        padding: 10px;
    }
    .content-div{
        border-left: 1px solid #cccccc;
        padding: 10px;
    }

</style>
