import { SysAdminApi } from '@/repository/SysAdminApi'
import { Context } from 'common'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', {
    state: () => {
        const _id = ref('')
        const nickname = ref('')
        const username = ref('')
        const avatar = ref('')
        const roles = ref<Array<string>>([])
        const permissions = ref<Array<string>>([])

        return {nickname, username, avatar, _id, roles, permissions}
    },
    actions: {
        init() {
            if (!this._id) {
                this.update()
            }
        },
        update() {
            const api: SysAdminApi = Context.getBean(SysAdminApi.KEY)
            const adminInfo = async () => await api.userInfo()

            adminInfo()
                .then(info => {
                    const {_id, username, nickname, avatar, roles, pers} = info
                    this._id = _id
                    this.username = username
                    this.nickname = nickname!
                    this.avatar = avatar!
                    this.roles = roles
                    this.permissions = pers
                })
        },
    },
})
