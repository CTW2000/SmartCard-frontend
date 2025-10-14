<template>
  <div class="signup-container">
    <section class="content">
      <div class="brand">NFT市场</div>
      <h1 class="heading">创建你的账号</h1>
      <p class="subtitle">设置你的账号</p>
      <form class="signup-form" @submit.prevent>
        <div class="form-field">
          <label for="name">全名</label>
          <input id="name" type="text" placeholder="Jane Doe" />
        </div>
        <div class="form-field">
          <label for="email">邮箱</label>
          <input id="email" type="email" placeholder="you@example.com" />
        </div>
        <div class="form-field">
          <label for="password">密码</label>
          <input id="password" type="password" placeholder="Create a password" />
        </div>
        <div class="form-field">
          <label for="confirm">确认密码</label>
          <input id="confirm" type="password" placeholder="Re-enter your password" />
        </div>
        <div class="form-row">
          <label class="checkbox">
            <input id="terms" type="checkbox" />
            <span>我同意隐私政策</span>
          </label>
        </div>
        <button type="submit" class="button">创建账号</button>
        <p class="caption">
          已有账号?
          <a href="/login" class="link">登录</a>
        </p>
      </form>
    </section>
  </div>
</template>

<script>
export default {
  name: 'CreateAccounts',
}
export {};
</script>

<style scoped>
.signup-container {
  display: flex;
  height: 100vh;
  background: #FFFFFF;
  color: #1C1C1C;
  font-family: Sans-Serif, system-ui, -apple-system;
  justify-content: center;
  align-items: center;
  padding: 24px;
}

.content {
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  text-align: center;
}

.brand {
  font-weight: 600;
  color: #3C3C3C;
}

.heading {
  font-size: 24px;
  font-weight: 600;
  line-height: 1.4;
  margin: 0;
}

.subtitle {
  color: #666666;
  margin: 0 0 8px 0;
}

.signup-form {
  width: 100%;
  max-width: 320px;
  display: grid;
  row-gap: 12px;
}

.form-field {
  display: grid;
  row-gap: 6px;
}

label {
  font-size: 14px;
  font-weight: 500;
  color: #1C1C1C;
}

input[type="text"],
input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid #DADADA;
  background: #FFFFFF;
  color: #1C1C1C;
  font-size: 14px;
  transition: border-color 150ms ease-in-out, box-shadow 150ms ease-in-out;
}

input::placeholder {
  color: #B0B0B0;
}

input:focus {
  outline: none;
  border-color: #3C3C3C;
  box-shadow: 0 0 0 3px rgba(60, 60, 60, 0.15);
}

.form-row {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.checkbox {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #1C1C1C;
}

.checkbox input[type="checkbox"] {
  width: 16px;
  height: 16px;
}

.button {
  height: 44px;
  border: none;
  border-radius: 8px;
  background: #3C3C3C;
  color: #FFFFFF;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 150ms ease-in-out;
}

.button:hover {
  background: #2A2A2A;
}

.link {
  font-size: 12px;
  color: #3C3C3C;
  text-decoration: none;
  transition: text-decoration-color 150ms ease-in-out;
}

.link:hover {
  text-decoration: underline;
}

.caption {
  margin: 0;
  font-size: 12px;
  color: #666666;
}
</style>

