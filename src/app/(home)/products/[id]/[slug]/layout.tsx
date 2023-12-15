import { Metadata, ResolvingMetadata } from "next";

type Params = {
  id: string;
};

type SearchParams = {
  [key: string]: string | string[] | undefined;
};

type Props = {
  params: Params;
  searchParams: SearchParams;
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id;

  const product = await fetch(`http://127.0.0.1:8000/api/products/${id}`).then((res) => res.json());

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: product.name + '| MixiShop',
    description: "Mua ngay sản phẩm " + product.name + " với siêu ưu đãi ngay bây giờ.",
    openGraph: {
      images: ['/some-specific-page-image.jpg', ...previousImages],
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
