<template>
  <el-container style="height: 100%">
    <el-header style="height: auto; padding-top: 8px">
      <!-- <v-breadcrumb
        class="qx-breadcrumb-1"
        style="width: 260px"
        selectedNavMenuId="meeting-meetingRoomsBookMine"
      ></v-breadcrumb> -->
    </el-header>
    <el-main v-loading="loading">
      <el-row type="flex" class="searchBox" style="text-align: left" justify="start" align="middle" >
        <el-select size="mini" v-model="searchForm.type" style="width: 140px; margin-right: 5px" >
          <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select size="mini" v-model="searchForm.field" style="width: 140px; margin-right: 5px" >
          <el-option v-for="item in fieldOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select size="mini" v-model="searchForm.level" style="width: 140px; margin-right: 5px" >
          <el-option v-for="item in levelOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select size="mini" v-model="searchForm.importance" style="width: 140px; margin-right: 5px" >
          <el-option v-for="item in importanceOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-input clearable size="mini" style="width: 270px; margin-right: 16px" placeholder="请输入名称/手机号" 
           v-model="searchForm.searchKey" @keyup.enter.native="getCustomerInfo"
        >
          <el-button  size="mini" slot="append" icon="el-icon-search" @click="getCustomerInfo" ></el-button>
        </el-input>
      </el-row>
        <!-- :header-cell-style="_tableStyle.headerCell"
        :cell-style="_tableStyle.cell" -->
      <el-table
        class="qx-table-1"
        border
        :data="customerInfo"
        style="width: 100%; font-size: 12px"
        :row-style="{ height: '20px' }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="40" align="center"> </el-table-column>
        <el-table-column min-width="50" label="名称" prop="" align="center" > </el-table-column>
        <el-table-column min-width="180" label="公司" prop="" align="center" > </el-table-column>
        <el-table-column min-width="100" label="邮箱" prop="" align="center" > </el-table-column>
        <el-table-column min-width="80" label="类型" prop="" align="center" > </el-table-column>
        <el-table-column min-width="80" label="级别" prop="" align="center" > </el-table-column>
        <el-table-column min-width="80" label="重要" prop="" align="center" > </el-table-column>
        <el-table-column min-width="80" label="职务" prop="" align="center" > </el-table-column>
        <el-table-column min-width="80" label="电话" prop="" align="center" > </el-table-column>
        <el-table-column min-width="80" label="手机" prop="" align="center" > </el-table-column>
        <el-table-column min-width="80" label="区域" prop="" align="center" > </el-table-column>
        <el-table-column min-width="80" label="公司主页" align="center" > </el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作" min-width="100px" fixed="right" align="center" >
          <template slot-scope="scope">
            <el-button
              style="font-size: 1em"
              icon="el-icon-edit"
              class="icon-button btn"
              :class="scope.row.set_times > 0 ? 'btn-grey':''"
              type="text"
              :disabled="scope.row.set_times > 0"
              @click="openEditDialog(scope.row)"
            ></el-button>
            <el-button
              style="font-size: 1em"
              icon="el-icon-close"
              class="icon-button btn"
              type="text"
              @click="delRuleHandler(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <div style="text-align: right; height: auto; padding: 8px 0">
        <el-pagination
          class="qx-pagination-1"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="searchForm.currentPage"
          :page-sizes="[10, 50, 100, 200, 500]"
          :page-size="searchForm.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="searchForm.total"
        >
        </el-pagination>
      </div> -->
    </el-main>
  </el-container>
</template>

<script>
// import vBreadcrumb from '@src/pages/index/components/home/breadcrumb.vue';


export default {
  components: {
    // vBreadcrumb
  },
  data() {
    return {
      loading: false,
      searchForm:{
        searchKey:'',
        type:'',
        field:'',
        level:'',
        importance:'',
        pageSize:0,
        currentPage:'',
      },
      typeOptions:[
        {label:'所有',value:'0'},
        {label:'工程商',value:'1'},
        {label:'集成商',value:'2'},
        {label:'经销商',value:'3'},
        {label:'运营商',value:'4'},
        {label:'设备商',value:'5'},
        {label:'国外',value:'6'},
        {label:'其他',value:'7'},
      ],
      fieldOptions:[
        {label:'所有',value:'0'},
        {label:'公安',value:'1'},
        {label:'消防',value:'2'},
        {label:'城管',value:'3'},
        {label:'银行',value:'4'},
        {label:'电力',value:'5'},
        {label:'交通',value:'6'},
        {label:'环保',value:'7'},
        {label:'电信',value:'8'},
        {label:'其他领域',value:'9'},
      ],
      levelOptions:[
        {label:'所有',value:'0'},
        {label:'直接客户',value:'1'},
        {label:'二级客户',value:'2'},
      ],
      importanceOptions:[
        {label:'所有',value:'0'},
        {label:'非常忠诚客户',value:'1'},
        {label:'重要客户',value:'2'},
        {label:'一般客户',value:'3'},
        {label:'新客户',value:'4'},
        {label:'待发展客户',value:'5'},
      ],
      contactList:[],
      multipleSelection:[],
    };
  },

  mounted() {
    this.getContactList()
  },
  methods: {
    getContactList() {
      console.log('11111111111');
    },
    // // 选择页数
    // handleSizeChange(val) {
    //   this.searchForm.pageSize = val;
    //   this.searchForm.currentPage = 1;
    //   this.getCustomerInfo();
    // },
    // handleCurrentChange(val) {
    //   this.searchForm.currentPage = val;
    //   this.getCustomerInfo();
    // },
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
};
</script>
<style>

</style>