<template>
  <header>
    <router-link to="/">
      <h1>Lightspeed Shop</h1>
    </router-link>
  </header>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

a:link,
a:visited,
a:hover,
a:active {
  text-decoration: none;
  color: #2c3e50;
}
</style>
