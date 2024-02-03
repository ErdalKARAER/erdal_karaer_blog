/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable max-lines-per-function */
/* eslint-disable no-console */
import { descriptionValidator, nameValidator } from "@/utils/validators"
import Button from "@/web/components/ui/Button"
import Form from "@/web/components/ui/Form"
import FormField from "@/web/components/ui/FormField"
import { createResource } from "@/web/services/apiClient"
import { useMutation } from "@tanstack/react-query"
import { Formik } from "formik"
import { useRouter } from "next/router"
import { useCallback, useEffect, useState } from "react"
import { object } from "yup"
import { useSession } from "@/web/components/SessionContext"

const validationSchema = object({
  name: nameValidator.required().label("Product name"),
  description: descriptionValidator.required().label("Product description"),
})
const initialValues = {
  name: "",
  description: "",
  categoryId: 1,
  userId: "",
}
const CreatePage = () => {
  const { session } = useSession()
  const router = useRouter()
  const [user, setUser] = useState(null)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users?id=${session.user.id}`)
        const data = await response.json()

        if (data && data.result && data.result.length > 0) {
          const userWithMatchingId = data.result.find(
            (user) => user.id === session.user.id,
          )

          if (userWithMatchingId) {
            setUser(userWithMatchingId)
          } else {
            console.error("User not found")
          }
        } else {
          console.error("No user in the database")
        }
      } catch (error) {
        console.error("Error fetching user data", error)
      }
    }
    fetchUser()
  }, [])

  const { mutateAsync: saveProduct } = useMutation({
    mutationFn: (product) => createResource("products", product),
  })
  const handleSubmit = useCallback(
    async ({ name, description, categoryId, userId }) => {
      const { data: product } = await saveProduct({
        name,
        description,
        categoryId,
        userId: session.user.id,
      })
      const productId = product.result[0].id

      router.push(`/products/${productId}`)
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
