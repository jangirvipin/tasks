import prisma from "@/lib/db";

const DeleteVendor= async (id:any)=>{
    prisma.$connect();
    try{
        const result = await prisma.vendor.delete({
            where:{
                id:id,
            }
        });
        return result;
    }catch (e){
        console.error(e);
    }
}
export default DeleteVendor;