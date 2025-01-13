<template>
  <el-container>
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu default-active="2"   @open="handleOpen"  @close="handleClose">
            <template v-for="(route, index) in menuList">
                <template v-if="route.children">
                    <el-sub-menu :index="route.path">
                        <template #title>
                            <span>{{route.meta.title}}</span>
                        </template>
                        <el-menu-item v-for="(children, index) in route.children" :index="children.path" @click="handleClick(children.path)">{{children.meta.title}}</el-menu-item>
                    </el-sub-menu>
                </template>
                <template v-else>
                    <el-menu-item :index="route.path" @click="handleClick(route.path)">
                        <span>{{route.meta.title}}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <RouterView #default="{ Component, route }">
            <keep-alive>
              <component :is="Component" :key="route.fullPath" />
            </keep-alive>
          </RouterView>
        </el-main>
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
