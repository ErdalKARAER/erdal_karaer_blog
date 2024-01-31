import { descriptionValidator, nameValidator } from "@/utils/validators"
import Button from "@/web/components/ui/Button"
import Form from "@/web/components/ui/Form"
import FormField from "@/web/components/ui/FormField"
import { createResource } from "@/web/services/apiClient"
import { useMutation } from "@tanstack/react-query"
import { Formik } from "formik"
import { useRouter } from "next/router"
import { useCallback } from "react"
import { object } from "yup"

const validationSchema = object({
  name: nameValidator.required().label("Product name"),
  description: descriptionValidator.required().label("Product description"),
})
const initialValues = {
  name: "",
  description: "",
  categoryId: 1,
}
const CreatePage = () => {
  const router = useRouter()
  const { mutateAsync: saveProduct } = useMutation({
    mutationFn: (product) => createResource("products", product),
  })
  const handleSubmit = useCallback(
    async ({ name, description, categoryId }) => {
      // eslint-disable-next-line no-unused-vars
      const { data: product } = await saveProduct({
        name,
        description,
        categoryId,
      })

      // Router.push(`/products/${product.id}`) j'ai mis une majuscule pcq eslint
    },
    [saveProduct, router],
  )

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <FormField
          name="name"
          label="Product name"
          placeholder="Enter a product name"
        />
        <FormField
          name="description"
          label="Product description"
          placeholder="Enter a product description"
        />
        <Button type="submit">Submit</Button>
      </Form>
    </Formik>
  )
}

export default CreatePage
