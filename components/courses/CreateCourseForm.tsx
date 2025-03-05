"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import axios from "axios"

import {Button} from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Combobox} from "@/components/custom/ComboBox"
import {useRouter} from "next/navigation"
import toast from "react-hot-toast"
import {Loader2} from "lucide-react"

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title is required and minimum 2 characters",
  }),
  categoryId: z.string().min(1, {
    message: "CategoryId is required",
  }),
  subCategoryId: z.string().min(1, {
    message: "subCategory is required",
  }),
})

interface CreateCourseFormProp {
  categories: {
    label: string // name of category
    value: string // categoryId
    subCategories: {label: string; value: string}[]
  }[]
}

function CreateCourseForm({categories}: CreateCourseFormProp) {
  const router = useRouter()

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      categoryId: "",
      subCategoryId: "",
    },
  })

  const {isValid, isSubmitting} = form.formState

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      //use axios to make http post request to "/api/courses"
      const response = await axios.post("/api/courses", values)
      router.push(`/instructor/courses/${response.data.id}/basic`)
      toast.success("New Course Created")
    } catch (err) {
      console.log("Failed to create new course", err)
      toast.error("Something went wrong!")
    }
  }

  return (
    <div className="p-10">
      <h1 className="text-xl font-bold">
        Let give some basics for your course
      </h1>
      <p className="text-sm mt-3 mb-3">
        It is ok if you cannot think of a good title or correct category now.
        You can change it later.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({field}) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ex: Web Development for Beginners"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoryId"
            render={({field}) => (
              <FormItem className="flex flex-col">
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Combobox options={categories} {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subCategoryId"
            render={({field}) => (
              <FormItem className="flex flex-col">
                <FormLabel>Subcategory</FormLabel>
                <FormControl>
                  <Combobox
                    options={
                      categories.find(
                        (category) =>
                          category.value === form.watch("categoryId") // name of Category FormField
                      )?.subCategories || []
                    }
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={!isValid || isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Create"
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default CreateCourseForm
