export default {
  title: {
    text: ''
  },
  legend: {
    icon: 'circle',
    bottom: 0
  },
  color: ['#59a8d8', '#0077FF', '#0ACD7F', '#FF3B30', '#34B53A'],
  toolbox: {
    left: 'right',
    feature: {
      dataZoom: {
        yAxisIndex: 'none'
      },
      restore: {},
    }
  },
  grid: {
    left: 10,
    right: 10,
    bottom: 40,
    top: 30,
    containLabel: true,
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
    },
    padding: [5, 10],
  },
  xAxis: {
    boundaryGap: false,
    splitLine: {
      show: false,
    },
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
  },
  yAxis: {
    splitLine: {
      show: false,
    },
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
  },
}