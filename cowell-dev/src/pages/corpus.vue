<template>
  <div class="page">
    <div class>
      <el-button type="primary" @click="dialogVisible = true">
        语料录入
        <i class="el-icon-plus el-icon--right"></i>
      </el-button>
      <el-button type="primary">物料管理</el-button>
      <el-button class="rightButton" @click="operationRecord=true">操作记录</el-button>
    </div>
    <div class="titleDiv">
      <template>语料管理</template>
    </div>

    <div v-for="(item,index) in tableList" :key="index">
      <div class="tableHeade">
        {{index}}语料包
        <span style="margin-left: 10px;color: white">添加排期</span>
        <div class="rightButton">
          <el-button size="mini" type="success">已上架</el-button>
          <el-button size="mini">下架</el-button>
          <span style="margin-left: 10px;margin-right:10px;color: white">设置</span>
        </div>
      </div>
      <el-table border :data="item.tableData" style="width: 100%">
        <el-table-column label="序号" width="180">
          <template slot-scope="scope">{{ scope.row.number }}</template>
        </el-table-column>
        <el-table-column label="原始物料" width>
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="类型" width>
          <template slot-scope="scope">
            <div v-show="scope.row.type=='1'">
              <p>
                <el-button size="mini" type="success">Action</el-button>
              </p>
              <template>
                <el-radio v-model="scope.row.radio" label="1">备选项</el-radio>
                <el-radio v-model="scope.row.radio" label="2">备选项</el-radio>
              </template>
            </div>
            <div v-show="scope.row.type!='1'">{{scope.row.typeName}}</div>
          </template>
        </el-table-column>
        <el-table-column label="条件" width>
          <template slot-scope="scope">{{ scope.row.condition }}</template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
              icon="el-icon-plus"
            >关联</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">改文案</el-button>
            <el-button size="mini" @click="more=true" type="text">
              <i class="el-icon-more"></i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="操作记录" :visible.sync="operationRecord" width="30%" center>
      <ul>
        <li>123123</li>
        <li>234234</li>
        <li>34534534</li>
      </ul>
    </el-dialog>
    <el-dialog title :visible.sync="more" width="30%" center>
      <div>在下方新增一行</div>
      <div>删除</div>
    </el-dialog>

    <el-dialog title="语料录入" :visible.sync="dialogVisible" width="60%" size="medium">
      <!-- <span>语料录入</span> -->
      <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入内容"
        v-model="textarea"
        @input="changeInput($event)"
      ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd()">添加</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 请求接口

import BaseHttpS from "@/api/base.http.s";

export default {
  components: {},
  data() {
    return {
      dialogVisible: false,
      textarea: "",
      textareaProcess: "",
      filename: __filename,
      operationRecord: false,
      more: false,
      tableList: [
        {
          tableData: [
            {
              number: "02",
              name: "姓名很好",
              type: "1",
              radio: "1",
              typeName: "话术",
              condition: "每日烟量=0"
            },
            {
              number: "02",
              name: "姓名很好",
              type: "1",
              radio: "1",
              typeName: "话术",
              condition: "每日烟量=0"
            },
            {
              number: "02",
              name: "姓名很好",
              type: "0",
              radio: "1",
              typeName: "话术",
              condition: "每日烟量=0"
            },
            {
              number: "02",
              name: "姓名很好",
              type: "1",
              radio: "1",
              typeName: "话术",
              condition: "每日烟量=0"
            }
          ]
        },
        {
          tableData: [
            {
              number: "02",
              name: "姓名很好",
              type: "1",
              radio: "1",
              typeName: "话术",
              condition: "每日烟量=0"
            },
            {
              number: "02",
              name: "姓名很好",
              type: "1",
              radio: "1",
              typeName: "话术",
              condition: "每日烟量=0"
            },
            {
              number: "02",
              name: "姓名很好",
              type: "0",
              radio: "1",
              typeName: "话术",
              condition: "每日烟量=0"
            },
            {
              number: "02",
              name: "姓名很好",
              type: "1",
              radio: "1",
              typeName: "话术",
              condition: "每日烟量=0"
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
    handleDelete(index, row) {
      console.log(index, row);
    },
    changeInput() {
      // this.textareaProcess = this.textarea
      // if (this.textareaProcess.indexOf("\n") > -1) {
      //    this.textarea = this.textarea + "-"
      //   console.log(this.textareaProcess.indexOf("\n"))
      // }

    },
    handleAdd() {
      let tmp = this.textarea.split('\n\n')
      
        // if (this.textarea.indexOf("\n") > -1) {
        //         //  this.textarea = this.textarea + "-"
        //       this.textareaProcess++
        // }
      console.log(tmp[2])


      
    },
    fetchData() {
      BaseHttpS.fetchData({
       
      });
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>

<style lang="less" scoped>
.page {
  .logo {
    width: 120px;
  }
  // .btn-group {
  //   color: $color-text-placehoder;
  //   font-size: 12px;
  //   line-height: 12px;
  //   margin-top: 0px;
  //   margin-bottom: 20px;
  //   .btn-group__btn {
  //     color: $color-text-sub;
  //     &:hover {
  //       color: $color-text-main;
  //     }
  //     &.btn-group__btn--link {
  //       color: $color-primary;
  //     }
  //   }
  // }
}

.leftButton {
  float: left;
}
.rightButton {
  float: right;
}
.tableHeade {
  background: #cccccc;
  height: 35px;
  line-height: 35px;
  font-size: 14px;
  padding: 0 10px;
  margin-top: 10px;
  box-sizing: border-box;
}
.titleDiv {
  margin: 10px 0;
}
ul li {
  list-style: none;
  margin: 10px 0;
}

.el-textarea{
  height: 300px;
 /deep/ .el-textarea__inner {
  height: 300px;

  }
}
</style>
