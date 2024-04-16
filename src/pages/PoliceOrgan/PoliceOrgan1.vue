<!--协助冻结/解除冻结 电子数据通知书-->
<template>
  <div id="PoliceOrgan1">
      <!--    标题-->
      <h3>* * * 公安局</h3>
      <h2>协助冻结/解除冻结</h2>
      <h2>电子数据通知书</h2>
      <!--    <h3>（存 根）</h3>-->
      <!--    <h5>x公( {{No1}})协字[ {{No2}}]号</h5>-->
      <h5>x公( )冻x/解冻x字[ ]号</h5>
      <!--    表单class="demo-form-inline":inline="true"-->
      <el-form :label-position="labelPosition"   ref="PoliceOrgan1" :model="PoliceOrgan1" label-width="90px">
        <el-form-item label="案件名称">
          <el-input v-model="PoliceOrgan1.name"></el-input>
        </el-form-item>
        <el-form-item label="案件编号">
          <el-input v-model="PoliceOrgan1.ID"></el-input>
        </el-form-item><br>
        <el-form-item label="持有人（单位）">
          <el-input v-model="PoliceOrgan1.holder"></el-input>
        </el-form-item>
        <el-form-item label="持有人（单位）情况">
          <el-input v-model="PoliceOrgan1.hSituation"></el-input>
        </el-form-item>
        <el-form-item label="协助冻结单位">
          <el-input v-model="PoliceOrgan1.cHelper"></el-input>
        </el-form-item>
        <el-form-item label="处理情况">
          <el-radio-group v-model="PoliceOrgan1.situation1">
            <el-radio label="冻结"></el-radio>
            <el-radio label="解除冻结"></el-radio>
          </el-radio-group>
        </el-form-item><br>
        <el-form-item label="原因">
          <el-input v-model="PoliceOrgan1.reason"></el-input>
        </el-form-item>

        <el-form-item label="电子数据类别">
          <el-input v-model="PoliceOrgan1.category"></el-input>
        </el-form-item>
        <el-form-item label="数量" prop="quantity">
          <el-input-number v-model="PoliceOrgan1.quantity" :min="0" :max="100"></el-input-number>
        </el-form-item>
        <el-form-item label="处理情况">
          <el-radio-group v-model="PoliceOrgan1.situation2">
            <el-radio label="冻结"></el-radio>
            <el-radio label="解除冻结"></el-radio>
          </el-radio-group>
        </el-form-item><br>
        <el-form-item label="时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="PoliceOrgan1.birth" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="批准人">
          <el-input v-model="PoliceOrgan1.approver"></el-input>
        </el-form-item>

        <el-form-item label="批准时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="PoliceOrgan1.approveDate" style="width: 100%;"></el-date-picker>
        </el-form-item><br>

        <el-form-item label="办案人">
          <el-input v-model="PoliceOrgan1.pHand"></el-input>
        </el-form-item>

        <el-form-item label="办案单位">
          <el-input v-model="PoliceOrgan1.uHand"></el-input>
        </el-form-item><br>

        <el-form-item label="填发时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="PoliceOrgan1.fillingDate" style="width: 100%;"></el-date-picker>
        </el-form-item>

        <el-form-item label="填发人">
          <el-input v-model="PoliceOrgan1.fillingPer"></el-input>
        </el-form-item><br>
        <el-form-item>
          <el-button type="primary" @click="generate">导出</el-button>
          <el-button type="success" @click="next">下一步</el-button>
          <el-button type="danger" @click="clearAll">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script >
import {export2Word} from "../../../static/utils/Export2Word";

export default {
  name: 'PoliceOrgan1',
  data() {
    return {
      PoliceOrgan1: {
        name: '',
        ID: '',
        holder: '',
        hSituation: '',
        cHelper: '',
        situation1: '',
        reason: '',
        category: '',
        quantity: '',
        situation2: '',
        time: '',
        approver: '',
        approveDate: '',
        pHand: '',
        uHand: '',
        fillingDate: '',
        fillingPer: ''
      },
      labelPosition: 'right'
    }
  },
  methods: {
    methods: {
      // 导出word
      generate() {
        let that = this.PoliceOrgan1
        export2Word("民警/协助冻结\/解除冻结电子数据通知书", "协助冻结/解除冻结电子数据通知书", that)
      },
    }
  }
}
</script>

<style >
#PoliceOrgan1 {
  padding: 0;
  margin: 0;
  background-color: #f7f8f9;
}

</style>
