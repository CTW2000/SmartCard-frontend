<template>
  <section class="dashboard">
    <div class="container">
      <div class="stats">
        <StatCard title="本周店长评分" value="9.0分" color="brand" metaLabel="同比上周" metaValue="5%" trend="down" />
        <StatCard title="员工服务评分" value="9.2分" color="brand" metaLabel="同比上周" metaValue="1.7%" trend="down" />
        <StatCard title="菜品差评率" value="10%" color="success" metaLabel="与上周持平" />
        <StatCard title="投流转化率" value="23%" color="success" metaLabel="与上周相比下降" />
      </div>

      <div class="grid-two">
        <div class="card">
          <div class="card-header">菜品差评率</div>
          <div class="card-body donut-wrap">
            <svg viewBox="0 0 120 120" class="donut">
              <circle cx="60" cy="60" r="50" class="donut-bg"></circle>
              <circle cx="60" cy="60" r="50" class="donut-seg" stroke-dasharray="20 314"></circle>
            </svg>
            <ul class="legend">
              <li><span class="dot brand"></span> 豆芽菜 <strong>50%</strong></li>
              <li><span class="dot"></span> 凉拌菜 <strong>30%</strong></li>
              <li><span class="dot neutral"></span> 土豆 <strong>20%</strong></li>
            </ul>
          </div>
        </div>
        <div class="card">
          <div class="card-header">投流转化率</div>
          <div class="card-body">
            <svg viewBox="0 0 400 160" class="line-chart">
              <rect x="0" y="0" width="400" height="160" fill="var(--surface)" stroke="var(--border)"/>
              <polyline fill="none" stroke="var(--brand)" stroke-width="2" points="0,120 40,110 80,115 120,90 160,100 200,70 240,95 280,60 320,80 360,75 400,85"/>
              <polyline fill="none" stroke="var(--success)" stroke-width="2" stroke-dasharray="4 4" points="0,100 40,95 80,105 120,85 160,92 200,88 240,90 280,78 320,82 360,80 400,88"/>
            </svg>
          </div>
        </div>
      </div>

      <div class="card table">
        <div class="card-header">员工服务评分</div>
        <div class="card-body">
          <table>
            <thead>
              <tr>
                <th>姓名</th>
                <th>编号</th>
                <th>岗位</th>
                <th>日均服务时间</th>
                <th>每周差评事件</th>
                <th>评分</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>张三</td><td>02245</td><td>后厨</td><td>6h 20m</td><td>1</td><td>9.2</td>
              </tr>
              <tr>
                <td>李四</td><td>01873</td><td>前台</td><td>7h 05m</td><td>0</td><td>9.5</td>
              </tr>
              <tr>
                <td>王五</td><td>01921</td><td>外卖</td><td>5h 10m</td><td>2</td><td>8.9</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import StatCard from '../components/StatCard.vue'
export default {
  name: 'Home',
  components: { StatCard },
}
</script>

<style scoped>
/* minimal CSS derived from design.json */
.dashboard {
  --brand: #D94447; /* tokens.color.brand.600 */
  --success: #648D55; /* tokens.color.success.500 */
  --surface: #FFFFFF; /* layout.surfaces.cardBg */
  --app-bg: #F4F6F9; /* layout.surfaces.appBg */
  --border: rgba(0,0,0,0.06); /* tokens.overlay.border */
  --radius: 18px; /* tokens.radius.lg */
  --shadow: 0 6px 24px rgba(0,0,0,0.08); /* tokens.shadow.md */
  background: var(--app-bg);
  min-height: calc(100vh - 64px);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}

.stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}

.card-header {
  padding: 12px 16px;
  border-bottom: 1px solid var(--border);
  font-weight: 600;
  color: #0E1116;
}

.card-body {
  padding: 16px;
}

.stat {
  padding: 12px 16px;
}

.stat .caption {
  color: #656665;
  font-size: 13px;
}

.stat .value {
  font-size: 28px;
  font-weight: 700;
  margin: 6px 0;
}

.stat .value.brand { color: var(--brand); }
.stat .value.success { color: var(--success); }

.meta { color: #656665; font-size: 12px; }
.meta .down { color: var(--brand); margin-left: 6px; }

.grid-two {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 24px;
  margin-top: 24px;
}

/* donut */
.donut-wrap { display: flex; gap: 24px; align-items: center; }
.donut { width: 160px; height: 160px; }
.donut-bg { fill: none; stroke: #EEF1F5; stroke-width: 20; }
.donut-seg { fill: none; stroke: var(--brand); stroke-width: 20; stroke-linecap: round; transform: rotate(-90deg); transform-origin: 60px 60px; }

.legend { list-style: none; padding: 0; margin: 0; font-size: 14px; color: #0E1116; }
.legend li { margin: 6px 0; }
.dot { display: inline-block; width: 10px; height: 10px; border-radius: 50%; background: var(--success); margin-right: 8px; }
.dot.brand { background: var(--brand); }
.dot.neutral { background: #DBDBDB; }

/* line chart */
.line-chart { width: 100%; height: 180px; }

/* table */
.table table { width: 100%; border-collapse: collapse; }
.table th, .table td { text-align: left; padding: 12px 16px; border-bottom: 1px solid var(--border); }
.table thead th { color: #656665; font-size: 13px; font-weight: 500; background: var(--surface); }

@media (max-width: 900px) {
  .stats { grid-template-columns: 1fr 1fr; }
  .grid-two { grid-template-columns: 1fr; }
}
</style>


