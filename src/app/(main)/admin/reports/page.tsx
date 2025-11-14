import { ReportsPageContent } from "./_components/reports-page-content";
import { getReviewsByDateRange } from "@/data/review/get-reviews-by-date";

interface ReportsPageProps {
  searchParams: Promise<{
    startDate?: string;
    endDate?: string;
  }>;
}

export default async function ReportsPage({ searchParams }: ReportsPageProps) {
  const params = await searchParams;

  const startDate = params?.startDate ? new Date(params.startDate) : undefined;
  const endDate = params?.endDate ? new Date(params.endDate) : undefined;

  const result = await getReviewsByDateRange(startDate, endDate);

  return (
    <ReportsPageContent
      initialData={result.success && result.data ? result.data : null}
      initialStartDate={params?.startDate}
      initialEndDate={params?.endDate}
    />
  );
}
