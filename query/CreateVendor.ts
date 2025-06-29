import prisma from "@/lib/db";

const createVendor = async (email:any,data:any)=>{
    const user = await prisma.user.findUnique({where:{email}});
    if (!user){
        console.log("User not found");
        return
    }

    const result =  await prisma.vendor.create({
        data:{
            ...data,
            userId:user.id
        }
    })

    return result
}
export default createVendor;