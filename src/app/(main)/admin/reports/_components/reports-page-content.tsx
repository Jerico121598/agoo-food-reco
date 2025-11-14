"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Download, Filter } from "lucide-react";
import { ReportsTable } from "./reports-table";
import { ReportsStatistics } from "./reports-statistics";
import { generatePDFFromElement, openPDFInNewTab } from "@/lib/pdf-generator";
import { toast } from "sonner";

interface ReviewData {
  reviews: Array<{
    id: string;
    rating: number;
    comment: string | null;
    createdAt: Date;
    user: {
      id: string;
      name: string | null;
      email: string;
    };
    restaurant: {
      id: string;
      name: string;
      address: string;
    };
  }>;
  statistics: {
    totalReviews: number;
    averageRating: number;
    ratingDistribution: {
      5: number;
      4: number;
      3: number;
      2: number;
      1: number;
    };
  };
}

interface ReportsPageContentProps {
  initialData: ReviewData | null;
  initialStartDate?: string;
  initialEndDate?: string;
}

export function ReportsPageContent({
  initialData,
  initialStartDate,
  initialEndDate,
}: ReportsPageContentProps) {
  const router = useRouter();
  const [startDate, setStartDate] = useState(initialStartDate || "");
  const [endDate, setEndDate] = useState(initialEndDate || "");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleFilter = () => {
    const params = new URLSearchParams();
    if (startDate) params.set("startDate", startDate);
    if (endDate) params.set("endDate", endDate);
    router.push(`/admin/reports?${params.toString()}`);
  };

  const handleClear = () => {
    setStartDate("");
    setEndDate("");
    router.push("/admin/reports");
  };

  const handleGeneratePDF = async () => {
    if (!initialData) {
      toast.error("No data available to generate PDF");
      return;
    }

    setIsGenerating(true);
    try {
      toast.info("Generating PDF report...");

      const filename = `ratings-report-${initialStartDate || "all"}_${initialEndDate || "all"}.pdf`;

      const pdfUrl = await generatePDFFromElement("report-content", {
        filename,
        title: "Restaurant Ratings Report",
        name: "Agoo Food Recommendation System",
        generatedAt: new Date(),
      });

      openPDFInNewTab(pdfUrl);
      toast.success("PDF report generated successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF report. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Ratings Report</h1>
              <p className="text-muted-foreground text-sm">
                Generate comprehensive reports of restaurant ratings and reviews
              </p>
            </div>
            {initialData && (
              <Button
                onClick={handleGeneratePDF}
                disabled={isGenerating}
                className="bg-green-600 hover:bg-green-700"
              >
                <Download className="mr-2 h-4 w-4" />
                {isGenerating ? "Generating..." : "Export PDF"}
              </Button>
            )}
          </div>

          {/* Date Filter Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filter by Date Range
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <div className="relative">
                    <Calendar className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                    <Input
                      id="startDate"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <div className="relative">
                    <Calendar className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                    <Input
                      id="endDate"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex items-end gap-2">
                  <Button onClick={handleFilter} className="flex-1">
                    Apply Filter
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleClear}
                    className="flex-1"
                  >
                    Clear
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Report Content - This will be used for PDF generation */}
          <div id="report-content" className="space-y-6">
            {/* Statistics Section */}
            {initialData && (
              <ReportsStatistics statistics={initialData.statistics} />
            )}

            {/* Reviews Table */}
            {initialData && initialData.reviews.length > 0 ? (
              <ReportsTable reviews={initialData.reviews} />
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground text-lg">
                    No reviews found for the selected date range.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
