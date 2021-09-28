<template>
    <div class="container">
      <!-- 商务 -->
      <div class="container-tree">
        <div class="area-header" :class="treeVisible ? '':'area-header-thin'">
          <div v-show="treeVisible">商务</div>
          <div class="img-wrapper" @click="toggleTreeVisible">
            <img src="@/assets/icons/arrow.png" alt="">
          </div>
        </div>
        <el-tree v-show="treeVisible" :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </div>
      <!-- 客户信息 -->
      <div class="container-customer">
        <div class="area-header" :class="customerVisible ? '':'area-header-thin'">
          <div v-show="customerVisible">客户信息</div>
          <div class="img-wrapper" @click="toggleCustomerVisible">
            <img src="@/assets/icons/arrow.png" alt="">
          </div>
        </div>
        <CustomerTable v-show="customerVisible" :customerVisible="customerVisible" />
      </div>
      <!-- 维修设备列表 -->
      <div class="container-maintain">
        <div class="area-header">
          <div>维修设备列表</div>
        </div>
        <MaintainTable />
      </div>
    </div>
</template>

<script>
import CustomerTable from './customerTable.vue';
import MaintainTable from './maintainTable.vue';

export default {
    name:'',
    components: {
        CustomerTable,
        MaintainTable,
    },
    data() {
        return {
          treeVisible: true,  // 商务
          customerVisible: true,  // 客户信息

          data: [],
          defaultProps: {
            children: 'children',
            label: 'label'
          }
        };
    },
    mounted() {
      this.data = [{
            label: '一级 1',
            children: [{
              label: '二级 1-1',
              children: [{
                label: '三级 1-1-1'
              }]
            }]
          }, {
            label: '一级 2',
            children: [{
              label: '二级 2-1',
              children: [{
                label: '三级 2-1-1'
              }]
            }, {
              label: '二级 2-2',
              children: [{
                label: '三级 2-2-1'
              }]
            }]
          }, {
            label: '一级 3',
            children: [{
              label: '二级 3-1',
              children: [{
                label: '三级 3-1-1'
              }]
            }, {
              label: '二级 3-2',
              children: [{
                label: '三级 3-2-1'
              }]
            }]
          }]
    },
    methods: {
      handleNodeClick(data) {
        console.log(data);
      },

      toggleTreeVisible() {
        this.treeVisible = !this.treeVisible
      },
      toggleCustomerVisible() {
        this.customerVisible = !this.customerVisible
      }
    },
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  .area-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #F8F8F8;
    padding: 10px;
    transition: all 0.4s ease;
    .img-wrapper {
      width: 20px;
      height: 20px;
      cursor: pointer;
      img{
        width: 20px;
        height: 20px;
      }
    }
  }

}

.container-tree {
  .area-header {
    width: 180px;
  }
  .area-header-thin {
    width: 40px;
    transition: all 0.4s ease;
    img {
      transform: rotate(180deg)
    }
  }  
}


.container-customer {
  .area-header {
    width: 600px;
  }
  .area-header-thin {
    width: 40px;
    transition: all 0.4s ease;
    img {
      transform: rotate(180deg)
    }
  }  
}

.container-maintain {
  flex: 1;
}
</style>
