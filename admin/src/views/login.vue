<template>
    <div>
      <h1>This is an login page</h1>
      <br>
      <el-form ref="loginFormRef" :model="ruleForm" :rules="rules" status-icon>
        <el-form-item label="账号" prop="account">
            <el-input v-model="ruleForm.account" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm(loginFormRef)"> 登录 </el-button>
        </el-form-item>
      </el-form>

      <el-upload
        v-model:file-list="fileList"
        action="#"
        multiple
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :limit="1"
        :on-exceed="handleExceed"
        :http-request="uploadFile"
      >
        <el-button type="primary">Click to upload</el-button>
        <template #tip>
          <div class="el-upload__tip">
            jpg/png files with a size less than 500KB.
          </div>
        </template>
      </el-upload>

      <el-button type="primary" @click="test"> 测试 </el-button>
    </div>
  </template>
  <script  setup>
    // 引入 登录 api 
    import { login, testApi, upload } from '../services/api.js'
    import { reactive, ref } from 'vue'
    import { useAccountStore } from '@/stores/account'
    import { useRouter } from 'vue-router'

    import { ElMessage, ElMessageBox } from 'element-plus'
    const fileList = ref([])
    const handleRemove = (file, uploadFiles) => {
      console.log(file, uploadFiles)
    }

    const handlePreview = (uploadFile) => {
      console.log(uploadFile)
    }

    const handleExceed = (files, uploadFiles) => {
      ElMessage.warning(
        `The limit is 3, you selected ${files.length} files this time, add up to ${
          files.length + uploadFiles.length
        } totally`
      )
    }
    const uploadFile = async (data) => {
      console.log('开始上传 ', data.file);
      console.log('开始上传 ', fileList.value[0]);
      const form = new FormData()
      form.append('file', data.file)
      upload(form).then(res => {
        console.log('res: ', res);
        
      })
    }

    const beforeRemove = (uploadFile, uploadFiles) => {
      return ElMessageBox.confirm(
        `Cancel the transfer of ${uploadFile.name} ?`
      ).then(
        () => true,
        () => false
      )
    }

    const router = useRouter()
    const store = useAccountStore()
    const test = async () => {
       try {
         const res = await testApi()
         console.log('testApi: ', res);
       } catch (error) {
       }
    }

    const loginFormRef = ref()
    const ruleForm = reactive({
      account: 'admin',
      password: '123456'
    })
    const rules = reactive({
      account: [
        { required: true, message: '请输入账号', trigger: 'blur' },
        { min: 1, max: 10, message: '长度应该为3到5个字符', trigger: 'blur' },
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 1, max: 10, message: '长度应该为3到5个字符', trigger: 'blur' },
      ],
    })

    const submitForm = async (formEl) => {
        if (!formEl) return
        await formEl.validate((valid, fields) => {
            if (valid) {
                 login({ account: ruleForm.account, password: ruleForm.password }).then(res => {
                    const {data} =res
                    localStorage.setItem("token",  data.token)
                    store.saveUserInfo(data.user)
                    router.push({ path: '/home' })
                 })
            } else {
                console.log('error submit!', fields)
            }
        })
    }
  </script>
  <style lang="less" scoped>

  </style>
  