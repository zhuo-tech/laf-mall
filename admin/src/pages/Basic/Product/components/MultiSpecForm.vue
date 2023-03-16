<script lang="ts" setup>
import { SelectSpec } from '@/components'
import { ArrayTool, StrTool } from '@es-tool/core'
import { BasicSpec, BasicSpecProduct } from 'common'
import { ref } from 'vue'

const formData = ref<{ spec?: Array<BasicSpec> }>({})
const list = ref<Array<BasicSpecProduct>>([])

function initList() {
  const { spec = [] } = formData.value
  if (ArrayTool.isEmpty(spec)) {
    return
  }

  const res = []
  // TODO: 规格商品 BasicSpecProduct 设计有点问题, 暂时按照设计做
  for (const { _id, item = [], name } of spec) {
    for (const iItem of item) {
      const s = `${ name } - ${ iItem }`
      const specProduct = {
        _id: StrTool.EMPTY,
        productId: '',
        specGroupId: _id,
        specName: s,
        display: s,
        cover: StrTool.EMPTY,
        carousel: new Array<string>(),
        barCode: StrTool.EMPTY,
        stock: 0,
        sales: 0,
        price: 0,
        cost: 0,
        originalPrice: 0,
        postage: 0,
      } as BasicSpecProduct
      res.push(specProduct)
    }
  }
  list.value = res
}

</script>

<template>
<el-form ref="form" label-width="140px">
  <el-form-item label="选择规格">
    <SelectSpec v-model:spec="formData.spec" @change="initList" />
  </el-form-item>

  <el-form-item label="设置规格参数">
    <el-table :data="list" height="500px">
      <el-table-column align="center" header-align="center" type="index" width="100" />
      <el-table-column align="center" header-align="center" label="组ID" min-width="100" prop="specGroupId" />
      <el-table-column align="center" header-align="center" label="名称 只读" min-width="100" prop="specName" />
      <el-table-column align="center" header-align="center" label="名称 可写" min-width="100" prop="display" />
      <el-table-column align="center" header-align="center" label="封面" prop="cover" width="100" />
      <el-table-column align="center" header-align="center" label="轮播图" prop="carousel" />
    </el-table>
  </el-form-item>
</el-form>
</template>

<style lang="sass" scoped>
</style>
