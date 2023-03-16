<script lang="ts" setup>
import { FormPage, RichTextEditor, SelectProduct, TimePeriod, UploadFile } from '@/components'
import { BargainEditorService } from '@/pages/Marketing/Bargain/BargainEditorService'
import { useRoute } from 'vue-router'

/**
 * BargainEditor
 * @author 冰凝
 * @date 2022-07-11 11:46:25
 **/

const {
    formData, formRule, formIsLoading,
    setFormRef,
} = new BargainEditorService(useRoute())

</script>

<template>
<FormPage title="新增营销活动">
    <el-form
        :ref="setFormRef"
        v-loading="formIsLoading"
        :model="formData"
        :rules="formRule"
        class="page-form"
        label-suffix=":"
        label-width="160px"
    >
        <el-row>
            <el-col :span="12">
                <el-form-item label="封面图" prop="cover">
                    <UploadFile v-model:href="formData.cover" :limit="1" :show-file-list="false" accept="image/*" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="商品" prop="productId">
                    <SelectProduct v-model:value="formData.productId" />
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="标题" prop="title">
                    <el-input></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="时间段" prop="start">
                    <TimePeriod v-model:end="formData.end" v-model:start="formData.start" />
                </el-form-item>
            </el-col>
            <el-col :span="18">
                <el-form-item label="广告图" prop="ads">
                    <UploadFile v-model:hrefs="formData.ads" :limit="5" accept="image/*" list-type="picture-card" />
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="轮播图" prop="carousel">
                    <UploadFile v-model:hrefs="formData.carousel" :limit="10" accept="image/*" list-type="picture-card" />
                </el-form-item>
            </el-col>
            <el-col :span="18">
                <el-form-item label="活动简介" prop="info">
                    <el-input v-model="formData.info" :autosize="{minRows: 4, maxRows: 10}" type="textarea" />
                </el-form-item>
            </el-col>
            <el-col :span="18">
                <el-form-item label="活动规则" prop="rule">
                    <el-input v-model="formData.rule" :autosize="{minRows: 4, maxRows: 10}" type="textarea" />
                </el-form-item>
            </el-col>

            <el-col :span="8">
                <el-form-item label="排序优先级" prop="sort">
                    <el-input-number v-model="formData.sort" :max="999" :min="1" />
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="允许重复参加" prop="repeatable">
                    <el-switch v-model="formData.repeatable" :active-value="true" :inactive-value="false" />
                </el-form-item>
            </el-col>
            <el-col v-if="formData.repeatable" :span="8">
                <el-form-item label="单用户可以参加次数" prop="frequency">
                    <el-input-number v-model="formData.frequency" :max="9999" :min="0" />
                </el-form-item>
            </el-col>

            <el-col :span="24">
                <el-form-item label="商品规格" prop="sort">
                    <!-- TODO: 规格商品 -->
                    <el-table :data="[{}, {}]">
                        <el-table-column align="center" label="ID" type="index" width="100" />
                        <el-table-column align="center" label="测试列" min-width="100" />
                        <el-table-column align="center" label="测试列" min-width="100" />
                        <el-table-column align="center" label="测试列" min-width="100" />
                        <el-table-column align="center" label="测试列" min-width="100" />
                        <el-table-column align="center" label="测试列" min-width="100" />
                    </el-table>
                </el-form-item>
            </el-col>

            <el-col :span="24">
                <el-form-item label="活动描述" prop="desc">
                    <RichTextEditor v-model="formData.desc" />
                </el-form-item>
            </el-col>
        </el-row>


    </el-form>

    <template v-slot:footer>
        <el-button>啊哈?</el-button>
    </template>
</FormPage>
</template>

<style lang="sass" scoped>
.page-form
    min-height: 60vh
</style>
