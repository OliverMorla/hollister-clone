"use client";

import { useSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const { data: session } = useSession();
  const prisma = new PrismaClient();

  const getUser = async () => {
    if (session?.user) {
      const userPrisma = await prisma.users.findUnique({
        where: {
          email: session?.user.email ?? "",
        },
      });

      setUser(userPrisma);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  return <main className="flex h-full"></main>;
};

export default Dashboard;
