<script setup>
import { Form, CellGroup, Field, Button, showNotify } from 'vant'
import { ref } from 'vue'
import GoogleIcon from '@/components/icons/GoogleIcon.vue'
import { BASE_URL } from '@/utils/consts.js'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { store } from '@/store/index.js'

const router = useRouter()

const email = ref('')

const password = ref('')

const emailPattern =
  /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const passPattern = /^[a-zA-Z0-9]{8,30}$/

const onSubmit = async (values) => {
  const user = {
    password: values.password,
    email: values.email
  }

  try {
    const { data } = await axios.post(`${BASE_URL}/auth/login`, user, { withCredentials: true })
    if (data) {
      const { data: userData } = await axios.get(`${BASE_URL}/auth/profile`, {
        withCredentials: true
      })

      store.commit('setUser', userData)
      store.commit('setIsAuth', true)

      showNotify({ type: 'success', message: data.message })

      router.push('/')
    }
  } catch (error) {
    showNotify({ type: 'danger', message: error.response.data.message })
  }
}
</script>

<template>
  <div class="login-form">
    <div class="login-form-wrapper">
      <h1 class="login-title">Login</h1>
      <Form @submit="onSubmit">
        <CellGroup>
          <Field
            class="login-input"
            v-model="email"
            name="email"
            label="Email"
            placeholder="Your email"
            :rules="[
              { required: true, message: 'Email is required' },
              { pattern: emailPattern, message: 'Email is not valid' }
            ]"
          />
          <Field
            v-model="password"
            class="login-input"
            name="password"
            type="password"
            label="Password"
            placeholder="Your password"
            :rules="[
              { required: true, message: 'Password is required' },
              {
                pattern: passPattern,
                message: 'Password must be between 8 and 30 characters long'
              }
            ]"
          />
        </CellGroup>
        <Button type="primary" class="form-button" native-type="submit">Login</Button>
      </Form>
      <p class="divider">or</p>
      <Button type="default" class="google-button" :url="`${BASE_URL}/auth/google/callback`" block
        ><GoogleIcon /> Login with Google</Button
      >
      <p class="register-wrapper">
        Don't have an account?
        <router-link to="/register" class="register-link">Register</router-link>
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/variables.scss';
.login-form {
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.login-form-wrapper {
  box-shadow: $box-shadow;
  border-radius: 10px;
  padding: 40px;
  max-width: 600px;

  form {
    width: 400px;
    margin-top: 40px;
  }
}

.login-title {
  font-size: $fs-36;
  text-align: center;
}

.login-input {
  padding: 20px;
}

.form-button {
  width: 100%;
  margin-top: 20px;
  transition: $transition;

  &:hover {
    background-color: darken($primary, 5%);
  }
}

.divider {
  margin-top: 20px;
  text-align: center;
  font-size: $fs-18;
  position: relative;

  &:before,
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    width: 40%;
    height: 1px;
    background-color: $light-grey;
    transform: translateY(-50%);
  }

  &:before {
    left: 0;
  }

  &:after {
    right: 0;
  }
}

.google-button {
  svg {
    width: 20px;
    height: 20px;
  }
  margin-top: 20px;
  transition: $transition;

  &:hover {
    background-color: darken(#fff, 3%);
  }
}

.register-wrapper {
  font-size: $fs-14;
  margin-top: 40px;
  text-align: center;
}

.register-link {
  color: $primary;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}
</style>
