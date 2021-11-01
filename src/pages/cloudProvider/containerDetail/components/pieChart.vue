<template>
  <div class="chart12">
  </div>
</template>
<script>
import echarts from "echarts";

export default {
  props: ['dataArr', 'seriesName', 'dataLabel'],
  mounted () {
    this.initChart()
  },
  methods: {
    initChart () {
      this.chart = echarts.init(this.$el);
      this.setOptions();
    },
    setOptions () {
      this.chart.setOption(this.dealOption());
    },
    dealOption () {
      var option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          bottom: '1%',
          left: 'center',
          orient: 'vertical'
        },
        color: ['#0ACD7F', '#F7B500'],
        series: [
          {
            name: $i18n('cloudProvider.containerDetail.components.pieChart.部署'),
            type: 'pie',
            radius: ['65%', '75%'],
            label: {
              show: true,
              position: 'center',
              formatter (obj) {
                if (obj.name === $i18n('cloudProvider.containerDetail.components.pieChart.正常') && obj.value !== undefined) {
                  return obj.name + ':' + obj.value
                } else {
                  return ''
                }
              },

              fontSize: 16,
              fontWeight: 'bold'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
              }
            },
            labelLine: {
              show: false
            },
            bottom: 45,
            data: [
              { value: 10, name: $i18n('cloudProvider.containerDetail.components.pieChart.正常') },
              { value: 20, name: $i18n('cloudProvider.containerDetail.components.pieChart.异常') }
            ]
          }
        ]
      };
      option.series[0].name = this.seriesName
      for (let i = 0; i < this.dataArr.length; i++) {
        option.series[0].data[i].value = this.dataArr[i]
        if (this.dataLabel) {
          option.series[0].data[i].name = this.dataLabel[i]
        }
      }
      return option
    }
  },
  watch: {
    dataArr: {
      deep: true,
      handler () {
        this.setOptions()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.chart12 {
  width: 240px;
  height: 240px;
}
</style>
