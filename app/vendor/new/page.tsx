"use client"

import { useState } from "react"
import CreateVendorForm from "@/components/v1/CreateVendorForm";
import axios from "axios";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

export default function DemoWithPopup() {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter();

    const handleCreateVendor = async (data:any) => {
        setIsLoading(true)

        try {
            const api = process.env.NEXT_PUBLIC_API_URL;
            const url = api +"/"
            const response = await axios.post(url, data,{
                headers: {
                    "Content-Type": "application/json",
                },
            })
            if(response.status === 200) {
                toast.success("Vendor created successfully!")
                router.push("/vendor")
            }
        } catch (error) {
            console.error("Error creating vendor:", error)
            alert("Failed to create vendor. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center ">
                <CreateVendorForm onSubmit={handleCreateVendor} onCancel={()=>router.push("/vendor")} isLoading={isLoading} />
        </div>
    )
}
