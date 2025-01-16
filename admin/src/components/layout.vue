<template>
  <!-- layout 使用element 的 布局方案 -->

  <!-- element-ui 的 container 组件 -->
  <el-container>
    <!-- element-ui 的 header 组件 -->
    <el-header>Header</el-header>
    <el-container>

    <!-- element-ui 的 el-aside 组件 -->
      <el-aside width="200px">
        <!-- element-ui 的 el-menu 组件 -->
        <el-menu default-active="2"   @open="handleOpen"  @close="handleClose">
            <template v-for="(route, index) in menuList">
                <template v-if="route.children">
                    <el-sub-menu :index="route.name">
                        <template #title>
                            <span>{{route.meta.title}}</span>
                        </template>
                        <template v-for="(children, index) in route.children">
                          <el-menu-item v-if="!children.hideMenu" :index="children.name" @click="handleClick(children.path, children)">{{children.meta.title}} </el-menu-item>
                        </template>
                    </el-sub-menu>
                </template>
                <template v-else>
                    <el-menu-item :index="route.name" @click="handleClick(route.path)">
                        <span>{{route.meta.title}}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- element-ui 的 el-main 组件 -->
        <el-main>
          <!-- main 区域渲染 当前 URL 路径对应的路由组件 -->
          <RouterView />
        </el-main>
        <!-- element-ui 的 el-footer 组件 -->
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>
<script setup>
    import { useRouter } from "vue-router";
    import { menuList } from "../router/index";

    const router = useRouter();
    const handleOpen = (key, keyPath) => {
        console.log(key, keyPath)
        // router.push({path:key})
    }
    const handleClose = (key, keyPath) => {
        console.log(key, keyPath)
    }
    const handleClick = (key) => {
        console.log(key)

        router.push({path:key})
    }
</script>
<style lang="less" scoped>
 .el-header, .el-footer, .el-main,.el-aside {
    display: flex;
    justify-content: center;
    align-items: center
}

 .el-header,.el-footer {
    background-color: var(--el-color-primary-light-7);
    color: var(--el-text-color-primary);
    text-align: center
}

 .el-aside {
    background-color: var(--el-color-primary-light-8);
    color: var(--el-text-color-primary);
    text-align: center
}

 .el-main {
    background-color: var(--el-color-primary-light-9);
    color: var(--el-text-color-primary);
    text-align: center;
    height: calc(100vh - 120px);
    padding: 20px;
    box-sizing: border-box;
}   


</style>
