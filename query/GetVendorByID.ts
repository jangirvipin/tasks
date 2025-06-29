import prisma from "@/lib/db";

const GetVendorByID=async (id:any)=>{
    prisma.$connect();
    try{
        const result = await prisma.vendor.findUnique({where:{id:id}});
        return result;
    }catch (e){
        console.error(e);
    }
}

export default GetVendorByID;