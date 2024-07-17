<script setup lang="ts">
import Menu from "@/components/menu/index.vue";
import { onMounted } from "vue";
import { searchToken, uploadToken, getToken } from "@/api/oneDrive";

const getT = async () => {
  let res = await getToken()
  if (res.code === 200) {
    res.data.access_token && localStorage.setItem("access_token", res.data.access_token)
    res.data.refresh_token && localStorage.setItem("refresh_token", res.data.refresh_token)
    res.data.token_type && localStorage.setItem("token_type", res.data.token_type)
  }
}
const judgeUrl = async () => {
  const paramsStr = window.location.search
  const params = new URLSearchParams(paramsStr)
  let code = params.get('code') // list
  if (code) {
    //首页做url判断，存在code则请求token
    let res = await searchToken(code as string)
    if (res.code == 200) {
      let onedrive = JSON.parse(res.data.body)
      onedrive.access_token && localStorage.setItem("access_token", onedrive.access_token)
      onedrive.refresh_token && localStorage.setItem("refresh_token", onedrive.refresh_token)
      onedrive.token_type && localStorage.setItem("token_type", onedrive.token_type)
      await uploadToken(onedrive)
    }
  } else {
    getT()
  }
}
onMounted(() => {
  judgeUrl()
})
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="3.2rem">
        <Menu />
      </el-aside>
      <el-container>
        <!-- <el-header>Header</el-header> -->
        <el-main class="main">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.Aside {
  background-color: $theme-color;

}

.common-layout {
  width: 100%;
  height: 100%;
}

.el-container {
  width: 100%;
  height: 100%;
}

.main {
  padding: 1.5rem !important;
}

:deep(.el-dialog__header) {
  padding: 0 !important;
}

:deep(.el-dialog__body) {
  padding: 0 !important;
}
</style>
