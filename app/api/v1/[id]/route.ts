import {NextResponse} from "next/server";
import DeleteVendor from "@/query/DeleteVendor";
import UpdatedVendor from "@/query/UpdatedVendor";
import GetVendorByID from "@/query/GetVendorByID";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        console.log("Params received:", params);
        const { id } =await params;
        console.log("ID:", id);

        if (!id) {
            return NextResponse.json(
                { error: "Bad Request" },
                { status: 400 }
            );
        }

        const result = await GetVendorByID(id);
        return NextResponse.json({ result }, { status: 200 });
    }
    catch (e) {
        console.error("Error:", e);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
){
    try {
        const {id} = await params;
        if (!id) {
            return NextResponse.json(
                {error: "Bad Request"},
                {status: 401})
        }

        const data = await request.json();
        if (!data) {
            return NextResponse.json({error: "Bad Request"}, {status: 401})
        }

        const result = await UpdatedVendor(id, data);
        return NextResponse.json({result: result}, {status: 200});
    }catch (e){
        console.error(e);
        return NextResponse.json({error: "Internal Server Error", status: 500});
    }
}

export async function DELETE(  request: Request,
                               { params }: { params: Promise<{ id: string }> }){
    try {
        const {id} =await params;
        if (!id) {
            return NextResponse.json({error: "Bad Request"}, {status: 401})
        }
        const result = await DeleteVendor(id);
        return NextResponse.json({result:result},{status:200})

    }catch (e){
        console.error(e);
        return NextResponse.json({error: "Internal Server Error", status: 500});
    }

}