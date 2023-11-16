<!--  -->
<template>
    <div class="dialog">
        <el-form action="" :model="form" label-width="80px">
            <el-form-item label="type">
                <el-radio-group v-model="form.tag">
                    <el-radio-button v-for="item in cities" :key="item.label" :label="item.value">{{
                        item.label
                    }}</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="content">
                <textarea class="txt" v-model="form.sentences" rows="10"></textarea>
            </el-form-item>
        </el-form>
        <el-button class="submit" type="primary" @click="submit">
            Confirm
        </el-button>
    </div>
</template>

<script lang='ts' setup>
import { reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { createSentence } from "@/api/sentence";
const emit = defineEmits(['close'])

const cities = [{ label: "一言", value: 0 }, { label: "一言©", value: 1 }, { label: "想法", value: 2 }, { label: "生活", value: 3 }]
const props = defineProps({
    editData: {
        type: Object
    }
})
onMounted(() => {
    let { editData } = props
    if (JSON.stringify(editData) !== "{}") {
        console.log(editData);
        form.tag = editData!.tag
        form.sentences = editData!.sentences
        form.id = editData!._id
    }
    console.log(form);

})
const form = reactive<{ id?: string, tag: number, sentences: string }>({
    tag: 0,
    sentences: "",
})

const submit = async () => {
    console.log(form);
    let res = await createSentence(form)
    if (res.code) {
        ElMessage.success('Save success!')
        emit('close')
    } else {
        ElMessage.error('Save failed!')

    }

}



</script>
<style lang='scss' scoped>
.dialog {

    :deep(.avatar-uploader) {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

    }

    :deep(.el-icon.avatar-uploader-icon) {
        font-size: 2rem
    }

    :deep(.shadow>.el-upload) {
        padding: 6rem;
        border: 2px dashed #ccc;
        border-radius: 6px;
    }

    :deep(.shadow>.el-carousel__item) {
        box-shadow: rgba(0, 0, 0, 0.45) 0px 5px 45px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
    }

    :deep(.el-dialog__headerbtn) {
        z-index: 9999
    }

    @include flex(space-between, null, column);
    height: 18rem;

    padding:3rem;

    .form {
        width: 100%;
    }

    .exhibit {
        div {
            width: 100%;
            height: 100%;
            padding: 0 1px;
        }

        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }



    .txt {
        width: 100%;
        height: 100%;
        font-size: .8rem;
        line-height: 1.1rem;
        resize: none
    }

    form {
        overflow-y: scroll;
        height: calc(100% - 2.5rem);

        >div {
            width: 100%;
            @include flex(space-between, center);

            >input:first-child {
                width: 25%;
                margin-right: .5rem;
            }

            >input:last-child {
                width: 65%;
            }
        }


    }

    .submit {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: .8rem;
    }


}
</style>
