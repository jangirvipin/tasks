import prisma from "@/lib/db";

const getVendors = async (email: string, page: number = 1, limit: number = 5) => {
    await prisma.$connect();

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        console.log("User not found");
        return;
    }

    const skip = (page - 1) * limit;

    const vendors = await prisma.vendor.findMany({
        where: {
            userId: user.id,
        },
        skip,
        take: limit,
        orderBy: {
            createdAt: 'desc',
        },
    });

    const total = await prisma.vendor.count({
        where: {
            userId: user.id,
        },
    });

    return {
        data: vendors,
        page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
    };
};

export default getVendors;
