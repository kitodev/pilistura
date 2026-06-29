import { notFound } from "next/navigation";
import RouteDetailPage from "@/components/pilistura/RouteDetailPage";
import { ROUTE_PAGES, ROUTE_PAGE_SLUGS } from "@/data/routePages";

export function generateStaticParams() {
  return ROUTE_PAGE_SLUGS.map((slug) => ({ slug }));
}

export default function TrailRoutePage({ params }: { params: { slug: string } }) {
  const route = ROUTE_PAGES[params.slug];
  if (!route) notFound();
  return <RouteDetailPage route={route} />;
}
