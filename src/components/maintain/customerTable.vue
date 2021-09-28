<template>
  <el-container style="height: 100%">
    <el-header style="height: auto; padding-top: 8px">
      <!-- <v-breadcrumb
        class="qx-breadcrumb-1"
        style="width: 260px"
        selectedNavMenuId="meeting-meetingRoomsBookMine"
      ></v-breadcrumb> -->
    </el-header>
    <el-main
      v-loading="loading"
    >
      <el-row
        type="flex"
        class="searchBox"
        style="text-align: left"
        justify="start"
        align="middle"
      >
        <el-input
          clearable
          size="mini"
          style="width: 270px; margin-right: 16px"
          placeholder="请输入名称/手机号"
          v-model="searchForm.searchKey"
          @keyup.enter.native="getCustomerInfo"
        >
          <el-button
            size="mini"
            slot="append"
            icon="el-icon-search"
            @click="getCustomerInfo"
          ></el-button>
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
        <el-table-column prop="creater" label="公司名称" min-width="180" align="center" > </el-table-column>
        <el-table-column width="50" label="名称" align="center" > </el-table-column>
        <el-table-column width="80" label="手机" align="center" > </el-table-column>
        <el-table-column width="80" label="电话" align="center" > </el-table-column>
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
        pageSize:0,
        currentPage:'',
      },
      customerInfo:[],
      multipleSelection:[],
    };
  },
  watch:{
    customerVisible(val){
      if(val) {
        this.getCustomerInfo()
      }
    }
  },
  mounted() {
    
  },
  methods: {
    getCustomerInfo() {
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