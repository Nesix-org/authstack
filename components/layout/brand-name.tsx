import Link from "next/link";

export function BrandName ({margin}: {margin?: boolean}) {
  return (
    <Link
      href="/"
      className={`${margin && 'mb-12'} inline-block font-space text-xl font-bold tracking-tight`}
    >
      AUTHSTACK
    </Link>
  )
}