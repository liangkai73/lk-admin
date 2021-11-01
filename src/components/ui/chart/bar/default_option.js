export default {
  legend: {
    icon: 'circle',
    bottom: 0
  },
  color: ['#0ACD7F', '#0077FF', '#FF3B30', '#34B53A', '#3390FF'],
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
    axisLabel: {
      inside: false,
    },
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    },
    z: 10
  },
  yAxis: {
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      textStyle: {
        color: '#999'
      }
    }
  },
}