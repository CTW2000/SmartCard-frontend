<template>
  <div class="chat-page">
    <div class="chat-layout">
      <main class="main-area">
        <h1 class="title">智能对话</h1>
        <p class="subtitle">开启一段对话.</p>

        <section class="chat-card">
          <textarea class="chat-input" placeholder="Type your message..."></textarea>
          <div class="actions">
            <button type="button" class="btn">发送</button>
            <button type="button" class="icon-btn" aria-label="Send">
              <span class="icon">→</span>
            </button>
          </div>
        </section>
      </main>

      <aside class="right-sidebar">
        <div class="history">
          <div class="history-item">
            <div class="avatar"></div>
            <div class="text">对话历史 1</div>
          </div>
          <div class="history-item">
            <div class="avatar"></div>
            <div class="text">对话历史 2</div>
          </div>
        </div>

        <div class="ad">广告位</div>
      </aside>
    </div>
  </div>
 </template>

<script>
export default {
  name: 'SmartDialoge',
}
</script>

<style scoped>
.chat-page {
  background: #F5F7FA;
  color: #1A1A1A;
  font-family: system-ui, sans-serif;
  min-height: 100vh;
  padding: 24px;
  box-sizing: border-box;
}

.chat-layout {
  display: grid;
  grid-template-columns: 70% 30%;
  gap: 20px;
}

.main-area {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.title {
  font-size: 24px;
  font-weight: 600;
  line-height: 1.4;
  margin: 0;
}

.subtitle {
  font-size: 14px;
  color: #666666;
  margin: 0 0 8px 0;
}

.chat-card {
  background: #FFFFFF;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0px 2px 6px rgba(0,0,0,0.05);
  display: grid;
  gap: 12px;
}

.chat-input {
  width: 100%;
  min-height: 100px;
  font-size: 14px;
  border: 1px solid #E0E0E0;
  border-radius: 12px;
  padding: 12px;
  resize: none;
  box-sizing: border-box;
}

.chat-input:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(60,60,60,0.12);
  border-color: #D0D0D0;
}

.actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
}

.btn {
  background: #EDEDED;
  color: #1C1C1C;
  font-size: 14px;
  font-weight: 500;
  padding: 10px 20px;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
}

.btn:hover {
  box-shadow: 0px 2px 8px rgba(0,0,0,0.08);
}

.icon-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #3C3C3C;
  color: #FFFFFF;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
}

.icon {
  line-height: 1;
}

.right-sidebar {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.history {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.history-item {
  display: grid;
  grid-template-columns: 36px 1fr;
  align-items: center;
  gap: 12px;
  background: #D9D9D9;
  border-radius: 20px;
  padding: 12px 16px;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #BDBDBD;
}

.text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
}

.ad {
  height: 160px;
  border-radius: 20px;
  background: #D9D9D9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #666666;
}

@media (max-width: 900px) {
  .chat-layout {
    grid-template-columns: 1fr;
  }
}
</style>


