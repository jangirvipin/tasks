import axios from "axios";
import { headers } from "next/headers";
import EditVendor from "@/components/v1/EditVendor";


async function getVendorByID(id: string) {
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

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const result = await getVendorByID(id);

    return (
        <EditVendor vendor={result.result} />
    );
};

export default page;