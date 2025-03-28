<script>
export default {
  name: 'HeavyComponent',
  data() {
    return {
      loadTime: 0,
      startTime: null,
      // 통계 데이터
      stats: [],
      processedStats: [],

      // 차트 데이터
      chartData: [],
      months: [
        '1월',
        '2월',
        '3월',
        '4월',
        '5월',
        '6월',
        '7월',
        '8월',
        '9월',
        '10월',
        '11월',
        '12월',
      ],

      // 테이블 데이터
      tableData: [],
      tableColumns: ['ID', 'Name', 'Region', 'Sales', 'Profit', 'Growth'],
      currentPage: 1,
      itemsPerPage: 10,

      // 로딩 상태 추적
      statsLoaded: false,
      chartLoaded: false,
      tableLoaded: false,
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.tableData.length / this.itemsPerPage)
    },
    displayedTableData() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.tableData.slice(start, end)
    },
    allDataLoaded() {
      return this.statsLoaded && this.chartLoaded && this.tableLoaded
    },
  },
  async created() {
    this.startTime = performance.now()

    try {
      // 첫 번째 무거운 작업: 통계 데이터 생성 (2초 지연)
      await this.simulateHeavyTask(2000)
      this.generateStatData()
      this.statsLoaded = true

      // 두 번째 무거운 작업: 차트 데이터 생성 (3초 지연)
      await this.simulateHeavyTask(3000)
      this.generateChartData()
      this.chartLoaded = true

      // 세 번째 무거운 작업: 테이블 데이터 생성 (4초 지연)
      await this.simulateHeavyTask(4000)
      this.generateTableData()
      this.tableLoaded = true

      // 로딩 시간 계산
      const endTime = performance.now()
      this.loadTime = ((endTime - this.startTime) / 1000).toFixed(2)
    } catch (error) {
      console.error('데이터 로딩 중 오류 발생:', error)
    }
  },
  methods: {
    // 무거운 작업 시뮬레이션
    simulateHeavyTask(ms) {
      return new Promise((resolve) => {
        // CPU를 실제로 사용하게 하는 무거운 계산 (선택 사항)
        if (ms > 3000) {
          const start = Date.now()
          while (Date.now() - start < 500) {
            // 실제로 CPU를 사용하는 계산
            for (let i = 0; i < 1000000; i++) {
              Math.sqrt(i) * Math.random()
            }
          }
        }

        setTimeout(resolve, ms)
      })
    },

    // 통계 데이터 생성
    generateStatData() {
      const statTypes = ['매출', '이익', '고객', '거래']
      const trendOptions = ['up', 'down']

      this.stats = statTypes.map((type) => {
        const value = Math.floor(Math.random() * 10000)
        const trend = trendOptions[Math.floor(Math.random() * 2)]
        const change = Math.floor(Math.random() * 30)

        return {
          label: type,
          value: type === '고객' ? value : `₩${value.toLocaleString()}`,
          trend,
          change,
        }
      })

      // 데이터 처리 시뮬레이션 (실제 무거운 컴포넌트처럼)
      this.processedStats = this.stats.map((stat) => {
        // 복잡한 계산 시뮬레이션
        for (let i = 0; i < 200000; i++) {
          Math.sqrt(i) * Math.random()
        }
        return stat
      })
    },

    // 차트 데이터 생성
    generateChartData() {
      const seriesNames = ['매출', '이익', '비용']
      const colors = ['#4CAF50', '#2196F3', '#FF5722']

      this.chartData = seriesNames.map((name, index) => {
        const data = Array.from({ length: 12 }, () => Math.floor(Math.random() * 150) + 20)

        return {
          name,
          data,
          color: colors[index],
        }
      })
    },

    // 테이블 데이터 생성
    generateTableData() {
      const regions = ['서울', '부산', '대구', '인천', '광주', '대전', '울산', '세종']
      const names = ['김철수', '이영희', '박지민', '최민준', '정다은', '강준호', '윤서연', '오민수']

      this.tableData = Array.from({ length: 200 }, (_, i) => {
        const sales = Math.floor(Math.random() * 100000) + 10000
        const profit = Math.floor(sales * (Math.random() * 0.4 + 0.1))
        const growth = Math.floor(Math.random() * 40) - 10

        return {
          id: i + 1,
          name: names[Math.floor(Math.random() * names.length)],
          region: regions[Math.floor(Math.random() * regions.length)],
          sales: `₩${sales.toLocaleString()}`,
          profit: `₩${profit.toLocaleString()}`,
          growth: `${growth}%`,
        }
      })
    },
  },
}
</script>

<template>
  <div class="heavy-component">
    <h2>데이터 집약적 컴포넌트</h2>
    <p v-if="allDataLoaded">로딩 시간: {{ loadTime }}초</p>
    <p v-else>데이터 로딩 중...</p>

    <!-- 통계 데이터 섹션 -->
    <div v-if="statsLoaded" class="stats-section">
      <h3>데이터 통계</h3>
      <div class="stats-grid">
        <div v-for="(stat, index) in processedStats" :key="index" class="stat-card">
          <h4>{{ stat.label }}</h4>
          <p class="stat-value">{{ stat.value }}</p>
          <div class="trend" :class="stat.trend">
            {{ stat.trend === 'up' ? '↑' : '↓' }} {{ stat.change }}%
          </div>
        </div>
      </div>
    </div>
    <div v-else class="section-loading">통계 데이터 로딩 중...</div>

    <!-- 차트 데이터 섹션 -->
    <div v-if="chartLoaded" class="chart-section">
      <h3>복잡한 데이터 시각화</h3>
      <div class="chart-container">
        <div class="chart-legend">
          <div v-for="(series, index) in chartData" :key="index" class="legend-item">
            <span class="color-marker" :style="{ backgroundColor: series.color }"></span>
            <span>{{ series.name }}</span>
          </div>
        </div>
        <div class="chart">
          <div
            v-for="(series, seriesIndex) in chartData"
            :key="'series-' + seriesIndex"
            class="chart-series"
          >
            <div
              v-for="(value, valueIndex) in series.data"
              :key="'value-' + valueIndex"
              class="chart-bar"
              :style="{
                height: `${value}px`,
                backgroundColor: series.color,
                left: `${valueIndex * 40 + seriesIndex * 15}px`,
              }"
              :title="`${series.name}: ${value}`"
            ></div>
          </div>
        </div>
        <div class="x-axis">
          <div v-for="month in months" :key="month" class="x-label">{{ month }}</div>
        </div>
      </div>
    </div>
    <div v-else class="section-loading">차트 데이터 로딩 중...</div>

    <!-- 테이블 데이터 섹션 -->
    <div v-if="tableLoaded" class="data-table">
      <h3>대용량 데이터 테이블</h3>
      <table>
        <thead>
          <tr>
            <th v-for="column in tableColumns" :key="column">{{ column }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in displayedTableData" :key="index">
            <td v-for="column in tableColumns" :key="column">{{ row[column.toLowerCase()] }}</td>
          </tr>
        </tbody>
      </table>
      <div class="pagination">
        <button
          v-for="page in totalPages"
          :key="page"
          @click="currentPage = page"
          :class="{ active: currentPage === page }"
        >
          {{ page }}
        </button>
      </div>
    </div>
    <div v-else class="section-loading">테이블 데이터 로딩 중...</div>
  </div>
</template>

<style scoped>
.heavy-component {
  font-family: Arial, sans-serif;
}

.heavy-component h2 {
  margin-bottom: 10px;
  color: #333;
}

.section-loading {
  padding: 30px;
  text-align: center;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin: 20px 0;
  color: #666;
  font-style: italic;
}

.stats-section,
.chart-section,
.data-table {
  margin-top: 30px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* 통계 카드 스타일 */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.stat-card {
  background-color: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.stat-value {
  font-size: 1.5em;
  font-weight: bold;
  margin: 10px 0;
}

.trend {
  font-weight: bold;
}

.trend.up {
  color: #4caf50;
}

.trend.down {
  color: #f44336;
}

/* 차트 스타일 */
.chart-container {
  position: relative;
  height: 250px;
  margin-top: 20px;
}

.chart {
  position: relative;
  height: 200px;
  border-left: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  margin-left: 40px;
  overflow: visible; /* 차트 바가 차트 영역을 벗어날 수 있도록 설정 */
}

.chart-legend {
  display: flex;
  margin-bottom: 10px;
}

.legend-item {
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.color-marker {
  display: inline-block;
  width: 12px;
  height: 12px;
  margin-right: 5px;
  border-radius: 2px;
}

.chart-series {
  position: absolute;
  height: 100%;
}

.chart-bar {
  position: absolute;
  bottom: 0;
  width: 10px;
  transition: height 0.5s ease;
  z-index: 1; /* 다른 요소 위에 표시되도록 z-index 설정 */
}

.x-axis {
  display: flex;
  margin-left: 40px;
  flex-wrap: wrap; /* x축 라벨이 줄 바꿈되도록 설정 */
}

.x-label {
  width: 40px;
  text-align: center;
  font-size: 0.8em;
  color: #666;
}

/* 테이블 스타일 */
.data-table {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  table-layout: fixed; /* 테이블 레이아웃 고정 */
}

th,
td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
}

tr:hover {
  background-color: #f5f5f5;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  flex-wrap: wrap; /* 페이지 버튼이 줄 바꿈되도록 설정 */
}

.pagination button {
  margin: 5px;
  padding: 5px 10px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  cursor: pointer;
  color: #333;
}

.pagination button.active {
  background-color: #4caf50;
  color: white;
  border-color: #4caf50;
}
</style>
