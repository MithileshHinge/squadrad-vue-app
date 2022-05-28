<template>
  <button id="sq-the-floating-create-post-btn" class="sq-btn" @click="$router.push('/create-post')">
    <b-icon icon="plus" variant="light" scale="0.75"/>
  </button>
</template>

<style lang="scss" scoped>
#sq-the-floating-create-post-btn {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  font-size: 3rem;
  padding: 0;
  border: none;
  display: block;
  line-height: 100%;
  border-radius: 50%;
  background-color: $my-color-dark;
  background-size: 300%;
}
</style>
