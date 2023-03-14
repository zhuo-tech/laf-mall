// noinspection JSXNamespaceValidation

import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        service: {
            type: [ Object ],
            required: true,
        },
    },
    render() {
        const { page } = this.$props.service
        return (
            <el-row justify="end" type={ 'flex' } { ...this.$attrs }>
                <el-col span={ 6 }>
                    <el-row justify="end" type={ 'flex' }>
                        <el-pagination
                            v-model:current-page={ page.currentPage }
                            v-model:page-size={ page.pageSize }
                            page-sizes={ [ 10, 20, 50, 100 ] }
                            total={ page.total }
                            layout="total, sizes, prev, pager, next"
                        />
                    </el-row>
                </el-col>
            </el-row>
        )
    },
})
