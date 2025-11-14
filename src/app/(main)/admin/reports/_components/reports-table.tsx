"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface Review {
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
}

interface ReportsTableProps {
  reviews: Review[];
}

export function ReportsTable({ reviews }: ReportsTableProps) {
  const getRatingColor = (rating: number) => {
    if (rating >= 4) return "bg-green-500";
    if (rating >= 3) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Review Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Restaurant</TableHead>
                <TableHead>User</TableHead>
                <TableHead className="text-center">Rating</TableHead>
                <TableHead>Comment</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell className="font-medium">
                    <div>
                      <div>{review.restaurant.name}</div>
                      <div className="text-muted-foreground text-xs">
                        {review.restaurant.address}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div>{review.user.name || "Anonymous"}</div>
                      <div className="text-muted-foreground text-xs">
                        {review.user.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      className={`${getRatingColor(review.rating)} text-white flex items-center justify-center gap-1 w-fit mx-auto`}
                    >
                      <Star className="h-3 w-3 fill-current" />
                      {review.rating}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-md">
                    <p className="line-clamp-2 text-sm">
                      {review.comment || (
                        <span className="text-muted-foreground italic">
                          No comment
                        </span>
                      )}
                    </p>
                  </TableCell>
                  <TableCell>
                    {new Date(review.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

