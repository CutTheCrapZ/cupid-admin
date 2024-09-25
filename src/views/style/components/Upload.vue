<!--  -->
<template>
    <div>
        <div class="dialog">
            <div class="exhibit">
                <el-carousel :autoplay="false" height="30rem">
                    <el-carousel-item v-for="item in imageUrl" :key="item">
                        <el-upload v-if="item === 'upload'" class="avatar-uploader shadow" :http-request="uploadCustom"
                            :show-file-list="false" :before-upload="beforeAvatarUpload">
                            <el-icon class="avatar-uploader-icon">
                                <Plus />
                            </el-icon>
                        </el-upload>
                        <div>
                            <img :src="item" alt="" srcset="">
                        </div>
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class="form">
                <form action="">
                    <input type="text" placeholder="desc" v-model="desc">
                    <div v-for="(item, index) in descList" :key="index">
                        <input type="text" placeholder="name" v-model="item.name">
                        <input type="text" placeholder="description" v-model="item.desc">
                        <el-icon @click="addDesc" v-if="index === descList.length - 1"
                            style="font-size: 20px;cursor: pointer;">
                            <CirclePlus />
                        </el-icon>
                        <el-icon style="font-size: 20px;cursor: pointer;" @click="removeDesc(index)" v-else>
                            <Remove />
                        </el-icon>
                    </div>

                </form>
                <el-button class="submit" type="primary" @click="submit">
                    Confirm
                </el-button>
            </div>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus, CirclePlus, Remove } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'
// import { getAssetsImage } from "@/utils/common";
import { uploadOneDrive } from "@/api/oneDrive";
import { upload } from "@/api/style";
const emit = defineEmits(['close'])
const props = defineProps({
    editData: {
        type: Object
    }
})
let created_d: string | null = null
let id: string | null = null
onMounted(() => {
    console.log(props.editData);
    let { editData } = props
    if (JSON.stringify(editData) !== "{}") {
        console.log(editData);

        imageUrl.value = [...editData!.imgUrl, "upload"]
        desc.value = editData!.desc
        descList.value = [...editData!.links, { name: "", desc: "" }]
        created_d = editData!.created_d as string
        id = editData!._id
    }
})
const imageUrl = ref(["upload"])
const descList = ref([{ name: "", desc: "" }])
const desc = ref("")

const submit = async () => {
    console.log({ imgUrl: imageUrl.value.slice(0, -1), desc: desc.value, links: descList.value[descList.value.length - 1].desc ? descList.value : descList.value.slice(0, -1), id, created_d });

    if (!imageUrl.value.length) return ElMessage.error('Images must be uploaded')
    let res = await upload({ imgUrl: imageUrl.value.slice(0, -1), desc: desc.value, links: descList.value[descList.value.length - 1].desc ? descList.value : descList.value.slice(0, -1), id, created_d })
    if (res.code) {
        ElMessage.success('Save success!')
        imageUrl.value = ["upload"];
        descList.value = [{ name: "", desc: "" }]
        desc.value = ""
        emit('close')
    } else {
        ElMessage.error('Save failed!')

    }

}
const addDesc = () => {
    descList.value.push({ name: "", desc: "" })
}
const removeDesc = (i: number) => {
    descList.value.splice(i, 1)
}
const uploadCustom: any = async (e: any) => {
    let res = await uploadOneDrive({ parentId: "B0216913AC49F0AD!2054", filename: e.file.name, data: e.file })
    let arr = imageUrl.value.slice(0, -1)
    imageUrl.value = [...arr, res["@microsoft.graph.downloadUrl"], "upload"]
    console.log(imageUrl.value);
    console.log(res);

}
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (!rawFile.type.includes("image")) {
        ElMessage.error('must be Image format!')
        return false
    } else if (rawFile.size / 1024 / 1024 > 4) {
        ElMessage.error('picture size can not exceed 2MB!')
        return false
    }
    return true
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

    @include flex(space-between, center);
    height: 30rem;

    .exhibit,
    .form {
        width: 50%;

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

    .form {
        height: 100%;
        padding: 2rem;
        box-sizing: border-box;
        position: relative;

        input {
            border: 0;
            outline: 0;
            border-bottom: 2px solid #ccc;
            width: 100%;
            padding: .5rem;
            color: #606266;
            font-size: .8rem;
            box-sizing: border-box;
        }

        form {
            padding: 1rem;
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

    @media (max-width: 768px) {
        padding: 3rem 0rem;
        @include flex(start, center, column);

        .exhibit,
        .form {
            width: 100%;

        }

        .exhibit {
            div {
                width: 100%;
                height: 100%;
                padding: 0;
            }

        }

        .submit {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: 14rem;
        }
    }

}
</style>
