<script lang="ts" setup>
import { SelectSpec, UploadFile } from '@/components'
import { Delete } from '@element-plus/icons-vue'
import { ArrayTool } from '@es-tool/core'
import { BasicSpec, BasicSpecProduct } from 'common'
import { ref } from 'vue'

const formData = ref<{ spec?: Array<BasicSpec> }>({})
const list = ref<Array<BasicSpecProduct>>([])

const delLine = (row: BasicSpecProduct, index: number) => {
    console.debug('删除', row)
    list.value.splice(index, 1)
}

const initList = () => {
    const { spec = [] } = formData.value
    if (ArrayTool.isEmpty(spec)) {
        return
    }

    // TODO: 规格商品 BasicSpecProduct 设计有点问题, 暂时按照设计做
    list.value = spec.flatMap(({ _id, item = [], name }) =>
        item.map(iItem => {
            const s = `${ name } - ${ iItem }`
            const product = BasicSpecProduct.getDefault()
            product.specGroupId = _id
            product.specName = s
            product.display = s

            return product
        }))
}

</script>

<template>
<el-form ref="form" label-width="140px">
    <el-form-item label="选择规格">
        <SelectSpec v-model:spec="formData.spec" @change="initList" />
    </el-form-item>

    <el-form-item label="设置规格参数">
        <el-table :data="list" border highlight-current-row>
            <el-table-column align="center" header-align="center" label="详细信息" type="expand" width="120">
                <template #default="{row}">
                    <el-form :model="row" label-position="right" label-suffix=":" label-width="100px">
                        <el-form-item label="轮播图" prop="carousel">
                            <UploadFile v-model:hrefs="row.carousel" :limit="10" />
                        </el-form-item>

                        <el-row :gutter="20">
                            <el-col :lg="6" :sm="8" :xs="12">
                                <el-form-item label="条码" prop="barCode">
                                    <el-input v-model="row.barCode" />
                                </el-form-item>
                            </el-col>
                            <el-col :lg="6" :sm="8" :xs="12">
                                <el-form-item label="库存" prop="stock">
                                    <el-input-number v-model="row.stock" />
                                </el-form-item>
                            </el-col>
                            <el-col :lg="6" :sm="8" :xs="12">
                                <el-form-item label="销量" prop="sales">
                                    <el-input-number v-model="row.sales" />
                                </el-form-item>
                            </el-col>
                            <el-col :lg="6" :sm="8" :xs="12">
                                <el-form-item label="价格" prop="price">
                                    <el-input-number v-model="row.price" />
                                </el-form-item>
                            </el-col>
                            <el-col :lg="6" :sm="8" :xs="12">
                                <el-form-item label="成本价" prop="cost">
                                    <el-input-number v-model="row.cost" />
                                </el-form-item>
                            </el-col>
                            <el-col :lg="6" :sm="8" :xs="12">
                                <el-form-item label="原价" prop="originalPrice">
                                    <el-input-number v-model="row.originalPrice" />
                                </el-form-item>
                            </el-col>
                            <el-col :lg="6" :sm="8" :xs="12">
                                <el-form-item label="邮费" prop="postage">
                                    <el-input-number v-model="row.postage" />
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column align="center" header-align="center" label="序号" type="index" width="100" />
            <el-table-column align="center" header-align="center" label="名称 只读" min-width="100" prop="specName" />
            <el-table-column align="center" header-align="center" label="名称 可写" min-width="100" prop="display">
                <template #default="{row}">
                    <el-input v-model="row.display" />
                </template>
            </el-table-column>
            <el-table-column align="center" header-align="center" label="封面" prop="cover">
                <template #default="{row}">
                    <UploadFile v-model:href="row.cover" :height="50" :show-file-list="false" :tips="null" :width="50" />
                </template>
            </el-table-column>
            <el-table-column align="center" header-align="center" label="操作" prop="action" width="100">
                <template #default="{row, $index}">
                    <el-button :icon="Delete" plain type="danger" @click="delLine(row, $index)" />
                </template>
            </el-table-column>
        </el-table>
    </el-form-item>
</el-form>
</template>

<style lang="sass" scoped>
</style>
