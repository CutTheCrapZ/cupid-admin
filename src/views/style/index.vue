<!--  -->
<template>
  <div class="ootd">
    <div class="header">
      <p>
        outfit of the day recrod
      </p>
      <div class="btn">
        <div @click="hanlerSearch" style="display: flex;align-items: center;">
          <input class="inp" ref="inp" type="text" v-model="search_value" placeholder="Please input">
          <div ref="search_icon">
            <el-icon>
              <Search />
            </el-icon>
          </div>
        </div>
        <div>
          <el-icon>
            <Filter />
          </el-icon>
        </div>
        <div>
          <el-icon @click="dialogVisible = true">
            <Up />
          </el-icon>
        </div>
      </div>
    </div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column type="index" width="80" label="No." align="center" />
      <el-table-column prop="desc" label="title" />
      <el-table-column prop="src" label="image">
        <template #default="scope">
          <div style="display: flex; align-items: center;height: 3.2rem;width: 100%;" @click="console.log(scope)">
            <el-image :preview-teleported="true" :preview-src-list="[scope.row.showImage]" :src="scope.row.showImage"
              fit="fill" style="height: 3.2rem;" />
            <!-- <img :src="scope.row.showImage" style="height: 3.2rem;"> -->
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="created_d" label="created">
        <template #default="scope">
          {{ scope.row.created_d.slice(0, 10) }}
        </template>
      </el-table-column>
      <el-table-column label="action" fixed="right" width="120">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="edit(scope.row)">Edit</el-button>
          <el-button link type="danger" size="small" @click="deleteItem(scope.row._id)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination layout="prev, pager, next" @current-change="currentChange" :total="reqData.total"
        :page-size="reqData.pageSize" />
    </div>
  </div>
  <el-dialog v-model="dialogVisible" width="60%" :fullscreen="(isMobile as boolean)">
    <Upload v-if="dialogVisible" :editData="editData" @close="close" />
  </el-dialog>
</template>

<script lang='ts' setup>
import {
  Search, Filter, Upload as Up
} from '@element-plus/icons-vue'
import { ref, onMounted } from 'vue'
// import { ElMessageBox } from 'element-plus'
import Upload from "./components/Upload.vue";
import { getStyleList, deleteById } from "@/api/style";
import { getItemById } from "@/api/oneDrive";
import { disposeOneDriveImage } from "@/utils/common";
import { storeToRefs } from 'pinia';
import { useThemeConfig } from '@/stores';
const storesThemeConfig = useThemeConfig();
const { isMobile } = storeToRefs(storesThemeConfig)
const editData = ref({})
const edit = (row: object) => {
  editData.value = row
  dialogVisible.value = true
}
const deleteItem = async (id: string) => {
  await deleteById(id);
  getList();
}
const tableData = ref<any>([])
const search_icon = ref<HTMLElement>()
const inp = ref<HTMLInputElement>()
const search_value = ref('')
const hanlerSearch = () => {
  search_icon.value!.style.display = "none"
  inp.value!.style.visibility = "visible"
  inp.value!.style.width = "17rem"

}
const dialogVisible = ref(false)

const close = () => {
  dialogVisible.value = false
  getList();
}
const currentChange = (num: number) => {
  reqData.value.curPage = num
  getList()
}
const reqData = ref<{ curPage: number, pageSize: number, total: number }>({ curPage: 1, pageSize: 20, total: 0 })
const iii = ref<HTMLImageElement>()
const getList = async () => {
  let res = await getStyleList(reqData.value)
  if (res.code === 200) {
    reqData.value = res.pagination
    let arr = res.list.map(async (ele: { imgIdList: string[], _id: string, showImage: string }) => {
      let buffer = await getItemById(ele.imgIdList[0])
      ele.showImage = disposeOneDriveImage(buffer)
      return ele
    })
    Promise.all(arr).then(res => {
      tableData.value = [...res];
      (iii.value as HTMLImageElement).src = tableData.value[0].showImage
    })
 
  }
}
onMounted(() => {
  getList();
})
</script>
<style lang='scss' scoped>
.ootd {
  padding: 0 1.5rem;

  :deep(.el-table td.el-table__cell, .el-table__body) {
    border: 0;
    outline: 0;
  }

  :deep(.el-table__row) {
    height: 3.2rem;
  }

  :deep(.el-table__row--striped) {
    background-color: #fbfcfd !important;
  }

  :deep(.el-table__inner-wrapper::before) {
    display: none;
  }

  :deep(.cell) {
    padding: 0;
    height: 100%;
    width: 100%;
  }

  .header {
    @include flex(space-between, center);

    margin-bottom: 1.5rem;

    .btn {
      @include flex(start, center);

      >div:not(:last-child) {
        margin-right: 2rem;

      }

      i {
        cursor: pointer;
        color: #9b9ca1;
      }

      .inp {
        visibility: hidden;
        transition: all 0.5s ease-out;
        width: 0rem;
        height: 1.3rem;
        // height: 1.5rem;
        border: 1.5px solid #dcdfe6;
        border-radius: 4px;
        padding: 0 .5rem;
        color: #606266;
        box-shadow: 0px 12px 32px 4px rgba(0, 0, 0, 0.04), 0px 8px 20px rgba(0, 0, 0, 0.08);
      }

      .inp::placeholder {
        color: #a8abb2;
      }

      .inp:focus,
      .inp:hover {
        border: 1.5px solid #c0c4cc;
        outline: none;
      }

    }
  }

  .pagination {
    margin-top: 1rem;
    @include flex(flex-end, center)
  }
}
</style>