<script setup>
import ApiService from '@/services/ApiService'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { ref } from 'vue'
import { object, string } from 'yup'
import { toast } from 'vue3-toastify'
import { useRouter } from 'vue-router'


const router = useRouter()
const imagePreview = ref(null)
const title = ref('')
const caption = ref('')
const image = ref('')

const onLoadFile = (event) => {
    const file = event.target.files[0]
    console.log(event.target.files[0])

    if(file) {
        imagePreview.value = URL.createObjectURL(file)
    }else {
        imagePreview.value = null
    }
}


const formSchema = object().shape({
  title: string().required('Please fill the title'),
  image: string().required('Please input file with extension: .jpg, .jpeg, .png'),
  caption: string().required('Please fill the caption')

})

const store = async (values, actions) => {
    await ApiService({ requiresAuth : true })
        .request({
            method: 'post',
            url: 'admin/artworks/',
            headers: {'Content-type' : 'multipart/form-data'},
            data: {
                title: title.value,
                image: image.value,
                caption: caption.value
            }
        }).then(() => {
            
            router.push('/dashboard/artworks')
            toast.success('create artwork success')
        }).catch((res) => {
            console.error('jancok:', res)
            actions.setErrors(res.data.errors)
        })
}



</script>

<template>
    <h1 class="mb-8 text-3xl font-bold">Artworks / Create</h1>
    <div class="grid grid-cols-2 gap-5 max-w-6xl">
        
        <div id="imgPreview" class="mt-4">
            <p class="label"> Image Preview </p>
            <div class="bg-gray-400 w-full max-w-[400px] h-full max-h-[300px] rounded-lg bg-cover" :style="{'background-image': `url(${imagePreview})`}"></div>
        </div>
        <Form :validation-schema="formSchema" @submit="store">
            <div class="form-control w-full mt-4">

                <label class="label" for="title"> Title Artwork </label>
                <Field name="title" type="text" class="input input-bordered w-full" placeholder="Title" id="title" required v-model="title" />
                <ErrorMessage name="title" class="mt-2 text-sm text-red-600 dark:text-red-400" />

                <label class="label" for="image"> Upload Artwork </label>
                <Field name="image" type="file" class="input input-bordered w-full" id="image" required @change="onLoadFile" v-model="image" />
                <ErrorMessage name="image" class="mt-2 text-sm text-red-600 dark:text-red-400" />

                <label class="label" for="caption"> Caption Artwork </label>
                <Field name="caption" type="textarea" class="input input-bordered w-full" id="caption" required v-model="caption" />
                <ErrorMessage name="caption" class="mt-2 text-sm text-red-600 dark:text-red-400" />

                <div class="flex justify-end">
                    <button class="btn w-fit btn-primary px-6 mt-4">
                        Save
                    </button>
                </div>
            </div>
        </Form>
    </div>
</template>

