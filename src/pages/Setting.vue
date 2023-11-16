<template>
  <div id="setting">
    <span style="font-size:14px">请选择需要修改的内容：</span>
    <el-select v-model="setting" placeholder="请选择需要修改的内容" size="middle" @change="change">
      <el-option
        v-for="item in settings"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <OrgSetting :tableData="orgDatas" :isShowOrg="isShowOrg"></OrgSetting>
    <TypeSetting :tableData="typeDatas" :isShowType="isShowType"></TypeSetting>
  </div>
</template>

<script>

import OrgSetting from "../components/Setting/orgSetting.vue";
import TypeSetting from "../components/Setting/typeSetting.vue";

export default ({
  name: "setting",
  components: {
    OrgSetting,
    TypeSetting
  },
  data() {
    return {
      setting: '',
      settings: [
        {"label": "机构", "value": "org"},
        {"label": "业务", "value": "type"}
      ],
      orgDatas: [],
      typeDatas: [],
      isShowOrg: false,
      isShowType: false
    }
  },
  created() {
    this.getOrgList()
  },
  methods: {
    //TODO: 根据列表内容显示表格
    change() {
      console.log(this.setting)
      if (this.setting === 'org') {
        this.isShowOrg = true
        this.isShowType = false
      }else if(this.setting === 'type'){
        this.isShowOrg = false
        this.isShowType = true
      }
    },
    //TODO: 获取列表清单、
    getOrgList() {

    }
    //TODO: 列表项的删除修改||添加（按钮）
  }
})

</script>

<style>

</style>
