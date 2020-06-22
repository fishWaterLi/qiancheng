<template>
  <div id="app">
    <el-container style="height:100%;border: 1px solid #eee">
      <!-- <el-aside width="200px" style="background-color: #fff">
        <div id="logoDiv" style="height: 60px"></div>
        <LeftMenu></LeftMenu>
      </el-aside> -->

      <el-container>
        <el-header style="text-align: right; font-size: 12px;line-height: 60px;background-color: #fff;">
          <div class="headerDiv header-logo"></div>
          <div class="headerDiv" style="width: 80%">
            <el-menu
                    :default-active="activeIndex"
                    class="el-menu-demo"
                    mode="horizontal"
                    @select="handleSelect"
            >
              <el-menu-item index="1">语料库</el-menu-item>
              <el-menu-item index="2">任务管理</el-menu-item>
            </el-menu>
          </div>
          <div class="headerDiv" style="width: 8%">
            <span>王小虎</span>
            <el-dropdown>
              <i class="el-icon-setting" style="margin-right: 15px;margin-left:15px"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>查看</el-dropdown-item>
                <el-dropdown-item>新增</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>
        <router-view class="mian-container"></router-view>
      </el-container>
    </el-container>

  </div>
</template>
<script>
// import LeftMenu from '@/components/leftMenu/index';
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1"
    };
  },
  components:{
    // LeftMenu
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      switch (key) {
        case '1':
          this.$router.push({ path: '/corpus' })
          break;
           case '2':
          this.$router.push({ path: '/taskManagement' })

          break;

        default:
          break;
      }
    },

  },
  created() {
    // this.$router.push({ path: '/main1' })

  },

};
</script>
<style lang="less" scoped>
  #app{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  .el-header {
    padding: 0;
  }
  .headerDiv{
    display: inline-block;
    vertical-align: top;
    background-color: rgb(238, 241, 246);
  }
  .headerDiv .el-menu{
    background-color: #fff;
  }
  .header-logo{
    background-image: url("./assets/images/murong.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    width: 100px;
    height: 42px;
    margin-top: 10px;
    margin-left: 10px;
    float: left;
  }
  .mian-container {
    padding: 20px;
  }
</style>



