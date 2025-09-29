<template>
  <div class="login-container">
    <section class="left-panel">
      <div class="brand">SmartCard</div>
      <h1 class="heading">Welcome back</h1>
      <p class="subtitle">Please sign in to continue</p>

      <form class="login-form" @submit.prevent>
        <div class="form-field">
          <label for="email">Email</label>
          <input id="email" type="email" placeholder="you@example.com" />
        </div>

        <div class="form-field">
          <label for="password">Password</label>
          <input id="password" type="password" placeholder="Enter your password" />
        </div>

        <div class="form-row">
          <label class="checkbox">
            <input id="remember" type="checkbox" />
            <span>Remember me</span>
          </label>
          <a href="#" class="link">Forgot password?</a>
        </div>

        <button type="submit" class="button">Sign in</button>

        <p class="caption">
          Don’t have an account?
          <a href="#" class="link">Create one</a>
        </p>
      </form>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Login',
}
export {};
</script>

<style scoped>
.login-container {
  display: flex;
  height: 100vh;
  background: #FFFFFF;
  color: #1C1C1C;
  font-family: Sans-Serif, system-ui, -apple-system;
  justify-content: center;
  align-items: center;
}

.left-panel {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px;
  gap: 12px;
  text-align: center;
}

.brand {
  font-weight: 600;
  color: #3C3C3C;
  margin-bottom: 4px;
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

.login-form {
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
  justify-content: space-between;
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

