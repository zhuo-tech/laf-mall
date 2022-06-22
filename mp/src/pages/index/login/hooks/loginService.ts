import {login,sendLoginSmsCode} from "../../../../api/user"
import { showTip } from "../../../../utils/show";
import { ref } from "vue";


export function setToken(token: any) {
  uni.setStorageSync('token', token)
}

export function getToken() {
  return !!uni.getStorageSync('token')

}

export function loginService(){
  const form = ref({
    phone:'',
    code:null,
  })

  const time =ref()

  const clearPhone = () => {
    form.value.phone = ''
    }

    const getCode = () => {
      if (!form.value.phone) {
        showTip('请填写手机号')
          return
      }
      sendLoginSmsCode(form.value.phone).then((res: any) => {
          if (res.code !== 0) {
            showTip(res.error)
              return
          }
      }).catch((err: any) => {
        showTip(err.toString())
      }).finally(() => {
          countdown()
      })
    }

  const countdown = () => {
    time.value = 60
    const timing = setInterval(() => {
        if (time.value <= 0) {
            clearInterval(timing)
        } else {
            time.value--
        }
     }, 1000)
    }

    const onsubmit = () => {
      if (!form.value.code) {
        showTip('请输入验证码')
          return
      }
      login(form.value.phone, form.value.code).then((response) => {
          if (response.code !== '0') {
            showTip(response.error)
              return
          }
          setToken(response.data.access_token)
          uni.navigateBack({delta: 1})
      }).catch(err => {
        showTip(err.toString())
      })
  }

  return {
      time,
      form,
      clearPhone,
      getCode,
      onsubmit,
  }

}