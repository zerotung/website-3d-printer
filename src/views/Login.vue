<template>
  <div class="login">
    <mu-paper class="login-paper">
      <h1>登录</h1>
      <mu-text-field hintText="账户" icon="person" fullWidth/><br/>
      <mu-text-field hintText="密码" type="password" icon="lock" fullWidth/><br/>
      <mu-raised-button label="登录" class="demo-raised-button" primary fullWidth/>
    </mu-paper>
  </div>
</template>

<script>
  
</script>

<style>
.login-paper {
  width: 700px;
  margin: 150px auto;
}
</style>
