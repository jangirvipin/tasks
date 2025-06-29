import axios from "axios";
import { headers } from "next/headers";
import VendorDetails from "@/components/v1/Vendor";

async function getVendorbyID(id: string) {
    const cookieValue = (await headers()).get("cookie") || "";

    const api = process.env.NEXT_PUBLIC_API_URL;
    const url = api + `/${id}`;
    const response = await axios.get(url, {
        headers: {
            'Content-Type': 'application/json',
            'Cookie': cookieValue,
        },
    });

    if (response.status === 200) {
        return response.data;
    }

    return null;
}

const Page = async ({ params }: { params:Promise<{ id: string }> }) => {
    const { id } = await params;
    const result = await getVendorbyID(id);

    return (
        <VendorDetails vendor={result.result}/>
    );
};

export default Page;
