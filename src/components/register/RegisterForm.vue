<script setup>
import { Form, CellGroup, Field, Button, showNotify } from 'vant'
import { ref } from 'vue'
import GoogleIcon from '@/components/icons/GoogleIcon.vue'
import { BASE_URL } from '@/utils/consts.js'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')

const password = ref('')

const confirmPassword = ref('')

const name = ref('')

const emailPattern =
  /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const passPattern = /^[a-zA-Z0-9]{8,30}$/

const namePattern = /^[a-zA-Z]{2,30}$/

const passValidator = (value) => {
  return value === password.value
}

const onSubmit = async (values) => {
  try {
    const user = {
      name: values.name,
      password: values.password,
      emails: [values.email],
      role: ['user']
    }
    const { data } = await axios.post(`${BASE_URL}/auth/register`, user)
    if (data) {
      showNotify({ type: 'success', message: data.message })

      router.push('/login')
    }
  } catch (error) {
    showNotify({ type: 'danger', message: error.response.data.message })
  }
}
</script>

<template>
  <div class="register-form">
    <div class="register-form-wrapper">
      <h1 class="register-title">Register</h1>
      <Form @submit="onSubmit">
        <CellGroup>
          <Field
            class="register-input"
            v-model="name"
            name="name"
            label="Name"
            placeholder="Your name"
            :rules="[
              { required: true, message: 'Name is required' },
              {
                pattern: namePattern,
                message: 'Name must be between 2 and 30 characters long'
              }
            ]"
          />
          <Field
            class="register-input"
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
            class="register-input"
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
          <Field
            v-model="confirmPassword"
            class="register-input"
            name="password"
            type="password"
            label="Repeat password"
            placeholder="Repeat password"
            :rules="[
              { required: true, message: 'Password is required' },
              {
                pattern: passPattern,
                message: 'Password is too short. Should be at least 6 characters'
              },
              {
                validator: passValidator,
                message: 'Passwords do not match'
              }
            ]"
          />
        </CellGroup>
        <Button type="primary" class="form-button" native-type="submit">Register</Button>
      </Form>
      <p class="divider">or</p>
      <Button type="default" class="google-button" :url="`${BASE_URL}/auth/google/callback`" block
        ><GoogleIcon /> Continue with Google</Button
      >
      <p class="register-wrapper">
        Already have an account?
        <router-link to="/login" class="register-link">Register</router-link>
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/variables.scss';
.register-form {
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.register-form-wrapper {
  box-shadow: $box-shadow;
  border-radius: 10px;
  padding: 40px;
  max-width: 600px;

  form {
    width: 400px;
    margin-top: 40px;
  }
}

.register-title {
  font-size: $fs-36;
  text-align: center;
}

.register-input {
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
