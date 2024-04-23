<template>
  <div id="graph">
    <div class="echart-box" ref="box"></div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name:'graph',
  data(){
    return{

    }
  },
  mounted() {
    // 挂在完成dom后进行初始化
    this.showEcharts();
  },
  methods: {
    showEcharts(){
      // 获得各类文书数量
      var allCount = []
      axios.get('http://localhost:3000/api/user/getCount', {}).then((res) => {
        console.log("res.data" + res.data)
        var all = res.data
        console.log("all " + typeof all)
        console.log(all[0])
        for (var i = 0; i < all.length; i++) {
          let e = all[i]
          console.log(e)
          allCount.push(e)
        }
        var cList = allCount
        console.log("list"+cList)
        //饼图
        const mypie = this.$echarts.init(this.$refs.box)
        mypie.setOption({
          title: {
            text: '文书数量统计',
            subtext: '',
            left: 'center'
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left'
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: '60%',
              data: [
                { value: cList[0], name: '现场提取笔录' },
                { value: cList[1], name: '电子数据固定提取清单' },
                { value: cList[2], name: '网络提取笔录' },
                { value: cList[3], name: '扣押清单' },
                { value: cList[4], name: '电子数据检查笔录' },
                { value: cList[5], name: '远程勘验笔录' },
                { value: cList[6], name: '电子数据固定提取清单' },
                { value: cList[7], name: '侦察实验笔录' },
                { value: cList[9], name: '办案协作函' },
                { value: cList[10], name: '调取证据通知书' },
                { value: cList[11], name: '协助冻结/解除冻结电子数据通知书' }
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 0,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        })
      })

    }
  }
}
</script>

<style>

</style>
