<template>
    <div>
      <h1>This is an login page</h1>
      <br>
      <el-form ref="loginFormRef" :model="ruleForm" :rules="rules" label-width="auto" status-icon>
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
    </div>
  </template>
  <script  setup>
    import { reactive, ref } from 'vue'
    import { useAccountStore } from '@/stores/account'
    import { useRouter } from 'vue-router'
    const router = useRouter()
    const store = useAccountStore()

    const loginFormRef = ref()
    const ruleForm = reactive({
      account: '',
      password: ''
    })
    const rules = reactive({
      account: [
        { required: true, message: '请输入账号', trigger: 'blur' },
        { min: 3, max: 5, message: '长度应该为3到5个字符', trigger: 'blur' },
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 3, max: 5, message: '长度应该为3到5个字符', trigger: 'blur' },
      ],
    })

    const submitForm = async (formEl) => {
        if (!formEl) return
        await formEl.validate((valid, fields) => {
            if (valid) {
                const token = ruleForm.account + ruleForm.password
                localStorage.setItem("token",  token)
                store.saveUserInfo({ account: ruleForm.account, password: ruleForm.password, token })
                router.push({ path: '/' })
            } else {
                console.log('error submit!', fields)
            }
        })
    }
  </script>
  <style lang="less" scoped>

  </style>
  