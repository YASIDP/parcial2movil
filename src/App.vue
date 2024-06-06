<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/game">juego</router-link> |
  </nav>
  <router-view/>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
}
body{
  background-color: rgb(155, 208, 255);
}
nav {
  padding: 30px;
  

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #001aff;
    }
  }
}
</style>
