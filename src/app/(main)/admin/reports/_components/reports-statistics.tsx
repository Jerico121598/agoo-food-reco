"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, TrendingUp, MessageCircle, BarChart3 } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface ReportsStatisticsProps {
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

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#dc2626"];

export function ReportsStatistics({ statistics }: ReportsStatisticsProps) {
  const chartData = [
    { name: "5 Stars", value: statistics.ratingDistribution[5] },
    { name: "4 Stars", value: statistics.ratingDistribution[4] },
    { name: "3 Stars", value: statistics.ratingDistribution[3] },
    { name: "2 Stars", value: statistics.ratingDistribution[2] },
    { name: "1 Star", value: statistics.ratingDistribution[1] },
  ].filter((item) => item.value > 0);

  const barChartData = [
    { rating: "5", count: statistics.ratingDistribution[5] },
    { rating: "4", count: statistics.ratingDistribution[4] },
    { rating: "3", count: statistics.ratingDistribution[3] },
    { rating: "2", count: statistics.ratingDistribution[2] },
    { rating: "1", count: statistics.ratingDistribution[1] },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
          <MessageCircle className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{statistics.totalReviews}</div>
          <p className="text-muted-foreground text-xs">
            Reviews in selected period
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
          <Star className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {statistics.averageRating.toFixed(2)}
          </div>
          <p className="text-muted-foreground text-xs">
            Out of 5.0 rating scale
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">5 Star Reviews</CardTitle>
          <TrendingUp className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {statistics.ratingDistribution[5]}
          </div>
          <p className="text-muted-foreground text-xs">
            {statistics.totalReviews > 0
              ? (
                  (statistics.ratingDistribution[5] / statistics.totalReviews) *
                  100
                ).toFixed(1)
              : 0}
            % of total reviews
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Rating Score</CardTitle>
          <BarChart3 className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {((statistics.averageRating / 5) * 100).toFixed(0)}%
          </div>
          <p className="text-muted-foreground text-xs">Overall satisfaction</p>
        </CardContent>
      </Card>

      {/* Charts */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Rating Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="rating" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Rating Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${((percent || 0) * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
