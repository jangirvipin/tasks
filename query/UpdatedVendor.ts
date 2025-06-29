import prisma from "@/lib/db";

const UpdatedVendor=async (id:any,data:any)=>{
        prisma.$connect();
        try{
            const result = await prisma.vendor.update({
                where:{
                    id:id
                },
                data:{
                    ...data
                }
            })
            return result;
        }catch (e){
            console.error(e);
        }
}

export default UpdatedVendor;