import {getServerSession} from "next-auth";
import {NextRequest, NextResponse} from "next/server";
import getVendors from "@/query/getVendor";
import createVendor from "@/query/CreateVendor";
import {authOptions} from "@/lib/auth";


export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
        return NextResponse.json(
            { error: "You must be signed in to submit a contribution" },
            { status: 401 }
        );
    }

    const email = session.user.email;

    try {
        const {searchParams} = new URL(req.url);
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "5");

        const result = await getVendors(email, page, limit);

        if (!result) {
            return NextResponse.json(
                {error: "You don't have access to contribution"},
                {status: 403}
            );
        }

        return NextResponse.json({result}, {status: 200});
    }catch (e){
        console.error(e);
        return NextResponse.json({error: e},{status:500});
    }
}


export async function POST(req:NextRequest){
    try{
        const data = await req.json();
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.email) {
            return NextResponse.json(
                { error: "You must be signed in to submit a contribution" },
                { status: 401 }
            );
        }
        const email = session.user.email;
        const result = await createVendor(email,data);
        if (!result) {
            return NextResponse.json({
                error: "You must be signed in to submit a contribution",
            },{
                status:403
            })
        }
        return NextResponse.json({result:result },{status:200});
    }
    catch (e){
        NextResponse.json({error:"Something went wrong"},{status:500});
    }
}