<template>
  <form @submit.prevent="handleSubmit">
    <label>Emial:</label>
    <input type="email" v-model="email" />
    <label>Password:</label>
    <input type="password" v-model="password" />
    <div class="error" v-if="passwordError">{{ passwordError }}</div>
    <label>Role</label>
    <select v-model="role">
      <option
        v-for="({ value, text }, index) in roleOptions"
        :value="value"
        :key="index"
      >
        {{ text }}
      </option>
    </select>
    <label>Skills</label>
    <input
      type="text"
      v-model="tempSkill"
      @keyup.alt="addSkill"
      placeholder="Alt + ,(comma)"
    />
    <div v-for="skill in skills" :key="skill" class="pill">
      <span @click="deleteSkill(skill)">{{ skill }}</span>
    </div>
    <div class="terms">
      <input type="checkbox" v-model="term" required />
      <label>Accept terms and conditions </label>
    </div>
    <div class="submit">
      <button>Create an Account</button>
    </div>
    <hr />
    <div>
      <input type="checkbox" value="shaun" v-model="names" />
      <label>Shaun </label>
    </div>
    <div>
      <input type="checkbox" value="yoshi" v-model="names" />
      <label>yoshi </label>
    </div>
    <div>
      <input type="checkbox" value="mario" v-model="names" />
      <label>mario </label>
    </div>
  </form>
  <p>Email: {{ email }}</p>
  <p>Password: {{ password }}</p>
  <p>Role: {{ role }}</p>
  <p>Term accepted: {{ term }}</p>
  <p>Names: {{ names }}</p>
  <p>Skills: {{ skills }}</p>
</template>

<script>
const roleOptions = [
  { value: 'developer', text: 'Web Developer' },
  { value: 'designer', text: 'Web Designer' },
]

import { reactive, toRefs } from 'vue'
export default {
  setup() {
    const formData = reactive({
      email: '',
      password: '',
      role: roleOptions[0].value,
      roleOptions,
      tempSkill: '',
      skills: [],
      term: false,
      names: [],
    })
    const validations = reactive({
      passwordError: '',
    })
    const addSkill = (e) => {
      if (e.key === ',' && formData.tempSkill) {
        if (formData.skills.includes(formData.tempSkill)) {
          return
        }
        formData.skills.push(formData.tempSkill)
        formData.tempSkill = ''
      }
    }
    const deleteSkill = (skill) => {
      let index = formData.skills.indexOf(skill)
      if (index === -1) {
        return
      }
      formData.skills.splice(index, 1)
    }

    const handleSubmit = () => {
      if (formData.password.length <= 5) {
        validations.passwordError = 'Password must be at least 6 chars long'
        return
      }
      console.log('Email: ', formData.email)
      console.log('Password: ', formData.password)
      console.log('Role: ', formData.role)
      console.log('Skills: ', formData.skills)
      formData.email = ''
      formData.password = ''
      formData.role = roleOptions[0].value
      formData.tempSkill = ''
      formData.skills = []
      formData.term = false
    }

    return {
      ...toRefs(formData),
      ...toRefs(validations),
      addSkill,
      deleteSkill,
      handleSubmit,
    }
  },
}
</script>

<style>
form {
  background: white;
  max-width: 420px;
  margin: 30px auto;
  text-align: left;
  padding: 40px;
  border-radius: 10px;
}
label {
  color: #aaa;
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 0.6em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}
input,
select {
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #ddd;
  color: #555;
}
input[type='checkbox'] {
  display: inline-block;
  width: 16px;
  margin: 0 10px 0 0;
  position: relative;
  top: 2px;
}
.pill {
  display: inline-block;
  margin: 10px 10px 0 0;
  padding: 6px 12px;
  background: #eee;
  border-radius: 20px;
  font-size: 12px;
  letter-spacing: 1px;
  font-weight: bold;
  color: #777;
  cursor: pointer;
}
button {
  cursor: pointer;
  background: #0b6dff;
  border: 0;
  padding: 10px 20px;
  margin-top: 20px;
  color: white;
  border-radius: 20px;
}
.submit {
  text-align: center;
}

.error {
  color: #ff0062;
  margin-top: 10px;
  font-size: 0.8em;
  font-weight: bold;
}
</style>
