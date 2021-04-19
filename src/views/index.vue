<template>
  <div>
    <div id="aox_1">
      <img src="../assets/1.png" alt id="aox_2" />
      <div id="aox_3">
        <p id="aox_4">智慧宿管云平台</p>

        <el-input placeholder="请输入账号" v-model="username" clearable></el-input>
        <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
        <div class="aox_2">
          <div class="verificationCode">
            <el-input placeholder="请输入验证码" v-model="bsd" @click="imgurl()" clearable></el-input>
          </div>
          <img :src="imgurl" width="100px" height="30px" class="aox_3" />
        </div>
        <div class="aox_4">
          <!-- 单选框 -->
          <el-checkbox v-model="checked">记住密码</el-checkbox>
        </div>
        <!-- 登录button -->
        <el-row>
          <el-button @click="denglu()">登录</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>
<style scoped>
.aox_4{
  overflow: hidden;
  margin-bottom: 20px;
}
.el-button--small,
.el-button--small.is-round {
  padding: 9px 15px;
  width: 100%;
  background-color: rgb(8, 150, 245);
  color: white;
  font-size: 16px;
}
.verificationCode {
  width: 70% !important;
  display: inline-block;
}
.aox_3 {
  float: right;
}
.aox_2 {
  overflow: hidden;
}
.el-input {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 100%;
  margin-bottom: 20px;
}
.verificationCode .el-input__inner {
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: 0;
  padding: 0 15px;
  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 70%;
}
.verificationCode .el-input {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 100%;
}
#aox_4 {
  overflow: hidden;
  font-weight: bold;
  font-size: 17px;
  color: rgb(150, 151, 151);
  margin-bottom: 30px;
  text-align: center;
}
#aox_3 {
  width: 400px;
  border-radius: 4px;
  padding: 20px;
  height: 300px;
  background-color: white;
  justify-content: center;
  align-items: center;
  display: inline-block;
  text-align: left;
}
#aox_2 {
  width: 1536px;
  height: 721px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}

#aox_1 {
  overflow: hidden;
  height: 706px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background: url("../assets/1.png")no-repeat;
  background-size: cover; */
}
</style>
<script scoped>
export default {
  data() {
    return {
      // 设置一个v-mod接收
      checked: "",
      username: "admin",
      password: "accpyy",
      bsd: "",
      uuid: "",
      code: "",
      imgurl: ""
    };
  },
  created() {
    this.axios({
      method: "GET",
      // 获取地址
      url: "http://122.112.253.28:8095/prod-api/captchaImage"
    }).then(result => {
      // 解析图片获取
      this.imgurl = "data:image/gif;base64," + result.data.data.img;
      this.uuid = result.data.data.uuid;
    });
  },

  methods: {
    // 点击切换验证码
    img() {
      this.axios({
        method: "GET",
        url: "http://122.112.253.28:8095/prod-api/captchaImage"
      }).then(result => {
        this.imgurl = "data:image/gif;base64," + result.data.data.img;
        this.uuid = result.data.data.uuid;
      });
    },
    // 点击登录
    denglu() {
      this.axios({
        method: "post",
        // 登录接口
        url: "http://122.112.253.28:8095/prod-api/admin/login",
        data: {
          // 判断跟接口里面的数据是否一样
          username: this.username,
          password: this.password,
          code: this.bsd,
          uuid: this.uuid
        }
      })
        // 判断是否登录成功
        .then(result => {
          // 打印为毛不成功
          console.log(result);
          if (result.data.code == 200) {
            sessionStorage.setItem(
              "token",
              result.data.data.tokenHead + result.data.data.token
            );
            this.$router.push("index_1");
          } else {
            // 打印
            console.log("出不来");
          }
        });
    }
  }
};
</script>