"use server";

import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function getReviewsByDateRange(startDate?: Date, endDate?: Date) {
  try {
    const whereClause: Prisma.ReviewWhereInput = {};

    if (startDate || endDate) {
      whereClause.createdAt = {} as Prisma.DateTimeFilter;
      if (startDate) {
        whereClause.createdAt.gte = startDate;
      }
      if (endDate) {
        const endOfDay = new Date(endDate);
        endOfDay.setHours(23, 59, 59, 999);
        whereClause.createdAt.lte = endOfDay;
      }
    }

    const reviews = await prisma.review.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        restaurant: {
          select: {
            id: true,
            name: true,
            address: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const totalReviews = reviews.length;
    const averageRating =
      totalReviews > 0
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
        : 0;

    const ratingDistribution = {
      5: reviews.filter((r) => r.rating === 5).length,
      4: reviews.filter((r) => r.rating === 4).length,
      3: reviews.filter((r) => r.rating === 3).length,
      2: reviews.filter((r) => r.rating === 2).length,
      1: reviews.filter((r) => r.rating === 1).length,
    };

    return {
      success: true,
      data: {
        reviews,
        statistics: {
          totalReviews,
          averageRating,
          ratingDistribution,
        },
      },
    };
  } catch (error) {
    console.error("Error fetching reviews by date range:", error);
    return {
      success: false,
      error: "Failed to fetch reviews",
    };
  }
}
