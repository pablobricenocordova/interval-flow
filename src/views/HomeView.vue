<template>
  <div class="home">
    <img src="@/assets/logo.png" alt="" />
  </div>
</template>

<script>
export default {
  name: "HomeView",
};
</script>

<style lang="scss" scoped>
.home {
  width: 125px;
  height: 125px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: #fff;
  img {
    max-width: 75px;
    height: auto;
    animation: heartbeat 3s infinite reverse;
  }
}

@keyframes heartbeat {
  0%,
  100% {
    transform: scale(1);
  }
  40%,
  45% {
    transform: scale(1.2);
  }
  50%,
  55% {
    transform: scale(1);
  }
  90%,
  95% {
    transform: scale(1.2);
  }
}
</style>
