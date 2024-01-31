import Link from "@/web/components/ui/Link"

const ProductHeadline = ({ id, name, description }) => (
  <article className="flex flex-col gap-4">
    <h1 className="text-2xl">
      <Link href={`/products/${id}`}>{name}</Link>
    </h1>
    <p>{description.split(/\s+/u).slice(0, 7).join(" ")}...</p>
  </article>
)

export default ProductHeadline
