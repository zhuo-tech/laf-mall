<script lang="ts" setup>
import FormPage from '@/components/PageContainer/FormPage.vue'
import RichTextEditor from '@/components/RichTextEditor/index.vue'
import Tags from '@/components/Tags/Tags.vue'
import UploadFile from '@/components/Upload/UploadFile.vue'
import SpecForm from '@/pages/Basic/Product/components/SpecForm/SpecForm.vue'
import { EditorService } from '@/pages/Basic/Product/EditorService'
import { useBasicRouter } from '@/pages/Basic/Router'
import { SpecType } from 'common'
import { RouteLocationNormalizedLoaded, useRoute } from 'vue-router'

/**
 * ProductForm
 * @author 冰凝
 * @date 2022-07-07 下午 06:10
 **/
const route: RouteLocationNormalizedLoaded = useRoute()
const {
    specData,
    channelList,
    categoryOption,
    setFormRef,
    formIsLoading,
    formData,
    formRule,
    channelValueList,
    formSubmit,
    changeChannel,
} = new EditorService(route)

const router = useBasicRouter()

</script>

<template>
<FormPage title="新增商品">
    <el-form
        :ref="setFormRef"
        v-loading="formIsLoading"
        :model="formData"
        :rules="formRule"
        label-width="140px"
    >

        <el-row>
            <el-col :span="8">
                <el-form-item label="所属分类" prop="categoryId">
                    <el-cascader
                        v-model="formData.categoryId"
                        :options="categoryOption"
                        :props="{value:'_id',label: 'name',emitPath: false}"
                        class="w-full"
                        clearable
                    />
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="一级栏目" prop="channelId">
                    <el-select v-model="formData.channelId" class="w-full" placeholder="请选择一级栏目" @change="changeChannel">
                        <el-option v-for="item in channelList" :key="item._id" :label="item.name" :value="item._id"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="二级栏目" prop="channelValue">
                    <el-select v-model="formData.channelValue" :disabled="!formData.channelId" class="w-full" placeholder="请选择二级栏目">
                        <el-option v-for="item in channelValueList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-form-item label="商品名称" prop="name">
            <el-input v-model="formData.name" placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item label="关键字" prop="keyword">
            <el-select
                v-model="formData.keyword"
                :reserve-keyword="false"
                allow-create
                default-first-option
                filterable
                multiple
                placeholder="请输入关键字"
                style="width: 100%"
            >
                <el-option v-for="item in formData.keyword" :key="item.value" :label="item" :value="item" />
            </el-select>
        </el-form-item>
        <el-form-item label="商品标签" prop="tags">
            <Tags v-model:value="formData.tags" />
        </el-form-item>
        <el-form-item label="简介" prop="info">
            <el-input v-model="formData.info" placeholder="请输入简介"></el-input>
        </el-form-item>
        <el-form-item label="封面图" prop="cover">
            <UploadFile
                v-model:href="formData.cover"
                :limit="1"
                :show-file-list="false"
            />
        </el-form-item>
        <el-form-item label="轮播图" prop="carousel">
            <UploadFile
                v-model:hrefs="formData.carousel"
                :limit="10"
                list-type="picture-card"
            />
        </el-form-item>
        <el-row>
            <el-col :span="12">
                <el-form-item label="规格类型" prop="specType">
                    <el-radio-group v-model="formData.specType">
                        <el-radio-button :label="SpecType.SingleSpec">单规格</el-radio-button>
                        <el-radio-button :label="SpecType.MultipleSpec">多规格</el-radio-button>
                    </el-radio-group>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="规格" prop="format">
                    <el-input v-model="formData.format" placeholder="请输入商品规格(个 / 箱 / 瓶 / 只 / 套 等)"></el-input>
                </el-form-item>
            </el-col>
        </el-row>

        <!--规格表单-->
        <SpecForm v-model:specType="formData.specType" v-model:value="specData" />

        <el-row>
            <el-col :span="12">
                <el-form-item label="虚拟销量" prop="virtualSales">
                    <el-input-number v-model="formData.virtualSales" :min="0"></el-input-number>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="浏览量" prop="browseCount">
                    <el-input-number v-model="formData.browseCount" :min="0"></el-input-number>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item label="排序" prop="sort">
                    <el-input-number v-model="formData.sort" :min="0"></el-input-number>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="是否上架" prop="onTheShelf">
                    <el-switch v-model="formData.onTheShelf" :active-value="true" :inactive-value="false"></el-switch>
                </el-form-item>
            </el-col>
        </el-row>
        <el-form-item label="产品描述" prop="desc">
            <RichTextEditor v-model:value="formData.desc" />
        </el-form-item>

    </el-form>

    <template v-slot:footer>
        <div slot="footer" class="drawer-body-footer" style="text-align: right">
            <el-button @click="router.toProduct()">取 消</el-button>
            <el-button :loading="formIsLoading" type="primary" @click="formSubmit">
                {{ formIsLoading ? '提交中 ...' : '确 定' }}
            </el-button>
        </div>
    </template>
</FormPage>
</template>

<style lang="sass" scoped>
</style>
