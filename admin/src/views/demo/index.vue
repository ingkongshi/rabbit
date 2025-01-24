<!-- 页面说明  常规的表格页面
    1. 列表
    2. 搜索
    3. 增删查改
    4. 
-->
   
    <template>
        <div class="demoPage">
            <header>
                <!-- 搜索表单 -->
                <el-form :inline="true" :model="searchForm">
                    <el-form-item label="姓名:">
                        <el-input v-model="searchForm.name" placeholder="请输入用户名" clearable @change="goSearch" />
                    </el-form-item>
                    <el-form-item label="注册日期:">
                        <el-date-picker  v-model="searchForm.date" type="date" placeholder="请选择日期" clearable  @change="goSearch" format="YYYY/MM/DD" value-format="YYYY-MM-DD" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="goSearch" :loading="loading">查询</el-button>
                    </el-form-item>
                </el-form>
                <el-button type="primary" @click="onAddItem">新增</el-button>
            </header>
            <main v-loading="loading">
                <!-- 表格数据展示 -->
                <el-table :data="tableData" stripe fit style="width: 100%">
                    <el-table-column type="index" width="80" label="序号" />
                    <el-table-column prop="date" label="日期"  />
                    <el-table-column prop="name" label="姓名"  />
                    <el-table-column prop="address" label="地址" />
                    <el-table-column fixed="right" label="操作" min-width="120">
                        <template #default="scope">
                          <el-button link type="primary" size="small" @click="JumptoDetails(scope.$index, scope.row)">查看</el-button>
                          <el-divider direction="vertical" />
                          <el-button link type="primary" size="small" @click="toEdit(scope.$index, scope.row)">编辑</el-button>
                          <el-divider direction="vertical" />
                          <el-button link type="danger" size="small" @click="deleteRow(scope.$index, scope.row)">删除</el-button>
                        </template>
                      </el-table-column>
                </el-table>
                <div class="tableFooter">
                    <!-- 分页组件 -->
                    <el-pagination background
                        v-model:current-page="currentPage"
                        v-model:page-size="pageSize"
                        :page-sizes="[10, 20, 30, 40]"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                    />
                </div>
            </main>
            <!-- 详情/新增/编辑展示 -->
            <el-drawer v-model="drawerShow" append-to-body :title="drawerTitle">
                <template v-if="drawerType === 'details'">
                    <el-descriptions title="基本信息" column="2" border>
                        <el-descriptions-item label="姓名">{{drawerData.name}}</el-descriptions-item>
                        <el-descriptions-item label="电话">18100000000</el-descriptions-item>
                        <el-descriptions-item label="日期">{{drawerData.date}}</el-descriptions-item>
                        <el-descriptions-item label="标签">
                          <el-tag size="small">School</el-tag>
                        </el-descriptions-item>
                        <el-descriptions-item label="地址">{{drawerData.address}}</el-descriptions-item>
                    </el-descriptions>
                </template>
                <template v-else>
                    <el-form :model="drawerForm">
                        <el-form-item label="姓名:">
                            <el-input v-model="drawerForm.name" placeholder="请输入用户名" clearable maxlength="10" />
                        </el-form-item>
                        <el-form-item label="日期:">
                            <el-date-picker  v-model="drawerForm.date" type="date" placeholder="请选择日期" clearable  format="YYYY/MM/DD" value-format="YYYY-MM-DD" />
                        </el-form-item>
                        <el-form-item label="地址:">
                            <el-input v-model="drawerForm.address" placeholder="请输入地址" clearable :autosize="{ minRows: 2, maxRows: 4 }" type="textarea" maxlength="50" />
                        </el-form-item>
                        <el-form-item style="justify-content: center;">
                            <el-button type="primary" @click="confirmClick">确定</el-button>
                        </el-form-item>
                    </el-form>
                </template>
            </el-drawer>
        </div>
    </template>

  <script setup>
    // 引入 element-plus 组件
    import { ElMessage, ElMessageBox } from 'element-plus'
    // 引入 vue api
    import { reactive, ref, onMounted } from 'vue'

    const testList = [
        {
            date: '2025-01-03',
            name: '张三',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2025-01-02',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2025-01-04',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2025-01-01',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2025-01-08',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2025-01-06',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2025-01-07',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
    ]
    // 加载状态
    const loading = ref(false)
    // 当前页
    const currentPage = ref(1)
    // 总条数
    const total = ref(7)
    // 每页条数
    const pageSize = ref(20)
    // 表格数据
    const tableData = ref(testList)
    // 搜索表单
    const searchForm = reactive({
        name: '',
        date: ''
    })

    // 抽屉 -- 详情/编辑/添加 
    const drawerShow = ref(false)
    // 抽屉标题
    const drawerTitle = ref('')
    // 抽屉类型
    const drawerType = ref('details')
    // 抽屉数据
    const drawerData = ref({})
    // 抽屉表单
    const drawerForm = reactive({
        name: '',
        date: '',
        address: ''
    })

    const editIndex = ref(0)

    // 生命周期 -- 表示页面加载完成
    onMounted(() => {
        // 获取表格数据
        getData()
    })
    //  搜索方法
    const goSearch = () => {
        // 搜索重置分页
        currentPage.value = 1
        pageSize.value = 20
        getData()
    }
    // 分页条数变化函数
    const handleSizeChange = (val) => {
        console.log(`${val} items per page`)
        getData()
    }
    // 分页变化
    const handleCurrentChange = (val) => {
        console.log(`current page: ${val}`)
        getData()
    }
    // 获取表格数据函数
    const getData = () => {
        // 设置加载状态；展示加载动画
        loading.value = true
        // 处理请求参数
        const params = {
            ...searchForm,
            currentPage: currentPage.value,
            pageSize: pageSize.value
        }
        // 发起请求 请求成功之后 重置加载状态
        setTimeout(() => {
            if(searchForm.name && searchForm.date) {
                tableData.value = testList.filter(item => (item.name.includes(searchForm.name)&&item.date.includes(searchForm.date)))
            } else if(searchForm.name) {
                tableData.value = testList.filter(item => item.name.includes(searchForm.name))
            } else if(searchForm.date) {
                tableData.value = testList.filter(item => item.date.includes(searchForm.date))
            } else  {
                tableData.value = testList
            }
            loading.value = false
        }, 1000)
    }
    // 查看详情
    const JumptoDetails = (index, data) => {
        drawerData.value = data
        drawerTitle.value = '查看'
        drawerShow.value = true
    }
    // 新增
    const onAddItem = () => {
        drawerTitle.value = '新增'
        drawerShow.value = true
        drawerType.value = 'add'
    }
    // 编辑函数
    const toEdit = (index, data) => {
        drawerForm.name = data.name
        drawerForm.date = data.date
        drawerForm.address = data.address
        drawerTitle.value = '编辑'
        drawerShow.value = true
        drawerType.value = 'edit'
        editIndex.value = index
    }
    // 删除函数
    const deleteRow = (index, data) => {
        ElMessageBox.confirm( `确定删除 -- ${data.name}?`, '提示',
            {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }
        )
        .then(() => {
            tableData.value.splice(index, 1)
            ElMessage({  type: 'success',  message: '操作成功', })
        })
        .catch(() => {
            ElMessage({ type: 'info', message: '取消操作', })
        })
    }

    // 新增
    const confirmClick = () => {
        const data = {
            date: drawerForm.date,
            name: drawerForm.name,
            address: drawerForm.address
        }
        if (drawerType.value === 'add') {
            tableData.value.push(data)
        } else if (drawerType.value === 'edit') {
            tableData.value.splice(editIndex, 1, data)
        }
        drawerShow.value = false
    }
    // 取消
    const cancelClick = () => {
    }
  </script>

  <style lang="less" scoped>
    .demoPage {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        background: #fff;
    }
    header {
        display: flex;
        margin-bottom: 20px;
        justify-content: space-between;
    }
    main {
        flex: 1;
        position: relative;
        .tableFooter {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            display: flex;
            justify-content: flex-end;
            margin-top: 20px;
        }
    }
  </style>
  