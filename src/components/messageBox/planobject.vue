<template>
        <el-dialog title="查看发送对像" center class="seedobject" :visible.sync="dialogTableVisible" width="40%">
            <div>

            </div>
        </el-dialog>
</template>

<script>
    import { addressbookList, } from "@/api/eventManagement/event.js";

export default {
    data() {
        return {
            dialogTableVisible:false,
            tableData: [],
            multipleSelection: [],
            currentPage4: 1,
            page:1,
            limit:10,
            total:0,
        }
    },
    created() {

    },
    methods: {
        show (data) {
            this.dialogTableVisible = true
            this.addressbookList(data)
        },

        toggleSelection() {
            this.dialogTableVisible = false
        },

    }
}
</script>

<style scoped>

</style>
