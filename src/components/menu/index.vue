<template>
    <el-menu default-active="/style" :router="true" class="el-menu-container" active-text-color="#6c90e6" text-color="#fff"
        :collapse="isCollapse" @select="handleSelect">
        <el-menu-item index="/">
            <el-icon><icon-menu /></el-icon>
            <template #title>Navigator Two</template>
        </el-menu-item>
        <el-menu-item index="/style">
            <el-icon>
                <document />
            </el-icon>
            <template #title>Navigator Three</template>
        </el-menu-item>
        <el-menu-item index="3  ">
            <el-icon>
                <setting />
            </el-icon>
            <template #title>Navigator Four</template>
        </el-menu-item>
    </el-menu>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue'
import {
    Document,
    Menu as IconMenu,
    Setting,
} from '@element-plus/icons-vue'

const isCollapse = ref(true)
const handleSelect = (key: string, keyPath: string[], item: object) => {
    console.log(key, keyPath, item)
}
</script>
  
<style lang="scss" scoped>
.el-menu-container:not(.el-menu--collapse) {
    height: 100%;
}




.el-menu-container {
    height: 100%;
    padding: 3rem 0;
    background: linear-gradient(to bottom, #66a6ff, #7e8aff);
    box-shadow: rgba(0, 0, 0, 0.45) 0px 5px 45px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
}

.el-menu {
    border: none;
}

.is-active {
    background-color: #fff;
    position: relative;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.is-active::after,
.is-active::before {
    content: '';
    position: absolute;
    width: 15px;
    height: 15px;
    background-color: #fff;
}

.is-active::after {
    top: 56px;
    left: 49px;
    transform: rotate(180deg);
    background: radial-gradient(circle at 15px 0,
            transparent 15px,
            #fff 15px);
}

.is-active::before {
    top: -15px;
    left: 49px;
    transform: rotate(180deg);
    background: radial-gradient(circle at 15px 15px,
            transparent 15px,
            #fff 15px);
}

.el-sub-menu:hover {
    display: none !important;
}




// .el-submenu__title:hover {
//     display: none !important;
// } 
.is-active:hover,

.el-menu-item:hover {
    background-color: transparent !important;
}
</style>

  