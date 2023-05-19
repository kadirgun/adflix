<template>
  <div class="flex justify-center">
    <div class="card w-[300px] bg-base-100 shadow-xl">
      <figure class="bg-white">
        <div class="h-[250px] flex justify-center align-middle p-20">
          <img src="https://cdn-icons-png.flaticon.com/512/564/564633.png?w=826&t=st=1684445623~exp=1684446223~hmac=4fcf40176037c91bfd9c148470bb724e73294852b0dc8423a47dd7e446792dde" alt="">
        </div>
      </figure>
      <div class="card-body">
        <h2 class="card-title">Password Protected</h2>
        <input type="password" placeholder="Enter password" class="input input-bordered w-full max-w-xs" v-model="state.password" />

        <div class="card-actions justify-end">
          <button class="btn btn-primary btn-block normal-case" @click="onSubmit">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import sha256 from 'crypto-js/sha256';

const emit = defineEmits(['passed']);

const state = reactive({
  link: window.link,
  password: ''
})

const onSubmit = async () => {
  if(!state.password) return;
  let hash = sha256(state.password).toString();

  if(hash === state.link.password_hash) {
    emit('passed');
  }
}

</script>

<style lang="scss" scoped>

</style>