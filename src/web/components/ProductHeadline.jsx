import Link from "@/web/components/ui/Link"

const ProductHeadline = ({ id, name, description }) => (
  <article className="flex flex-col gap-4 p-4 bg-[#C6EBC9] shadow-md rounded-md">
    <h1 className="text-2xl font-semibold">
      <Link href={`/products/${id}`} className="text-blue-500 hover:underline">
        {name}
      </Link>
    </h1>
    <p className="text-gray-600">
      {description.split(/\s+/u).slice(0, 7).join(" ")}...
    </p>
  </article>
)

export default ProductHeadline
