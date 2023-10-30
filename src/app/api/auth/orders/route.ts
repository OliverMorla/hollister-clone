import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { client } from "../../../../../sanity/lib/client";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const isAuthenticated = await getToken({
    req,
    secret: process.env.OAUTH_SECRET,
  });

  if (isAuthenticated) {
    const OrdersWithImages: any[] = [];

    try {
      const orders = await prisma.orders.findMany({
        where: {
          user_id: isAuthenticated.id!,
        },

        select: {
          order_id: true,
          total_price: true,
          order_date: true,
          product_id: true,
          order_status: true,
          total_quantity: true,
        },
      });

      await Promise.all(
        orders.map(async (order) => {
          if (!order.product_id.includes(":")) {
            const product = await client.fetch(
              `*[_type == "product" && _id ==  $product_id][0]{
                name,
                "primaryImage": image[0].asset -> url,
                "secondaryImage": image[1].asset -> url,
              }`,
              {
                product_id: order.product_id,
              }
            );

            OrdersWithImages.push({
              ...order,
              product: product,
            });
          } else {
            const productIDsJSON = JSON.parse(order.product_id);
            const productIDsArray = [];

            for (const key in productIDsJSON) {
              productIDsArray.push(productIDsJSON[key]);
            }

            const product = await client.fetch(
              `*[_type == "product" && _id in $product_id]{
                name,
                "primaryImage": image[0].asset -> url,
                "secondaryImage": image[1].asset -> url,
              }`,
              {
                product_id: productIDsArray,
              }
            );

            OrdersWithImages.push({
              ...order,
              product: product,
            });
          }
        })
      );

      return NextResponse.json(
        {
          ok: true,
          orders: OrdersWithImages,
          message: "Successfully fetched orders",
        },
        { status: 200 }
      );
    } catch (err) {
      return NextResponse.json(
        {
          ok: false,
          message: "Failed to fetch orders",
          error: err instanceof Error ? err.message : "Internal Server Error",
        },
        { status: 500 }
      );
    }
  }

  return NextResponse.json(
    {
      ok: false,
      message: "You are not authenticated",
    },
    { status: 401 }
  );
}
