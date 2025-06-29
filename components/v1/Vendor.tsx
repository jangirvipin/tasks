"use client"
import {useRouter} from "next/navigation";
import {PopupConfirmation} from "@/components/v1/Popup";
import {useState} from "react";
import axios from "axios";
import {toast} from "sonner";
import Link from "next/link";
import {ArrowLeft} from "lucide-react";

interface VendorData {
    id: string
    userId: string
    name: string
    bankAccountNo: string
    bankName: string
    addressLine1: string
    addressLine2: string
    city: string
    country: string
    zipCode: string
    createdAt: string
    updatedAt: string
}

interface VendorDetailsProps {
    vendor: VendorData
}

export default function VendorDetails({ vendor }: VendorDetailsProps) {
    const router = useRouter();
    const [showPopup, setShowPopup] = useState(false);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    const handleDelete = async () => {
        try{
            const api = process.env.NEXT_PUBLIC_API_URL;
            const url = api + `/${vendor.id}`;
            const result = await axios.delete(url,{
                headers: {
                    "Content-Type": "application/json",
                },
            })
            if (result.status === 200) {
                console.log("Item deleted!")
                toast.success("Vendor deleted successfully")
                setShowPopup(false)
                router.push("/vendor")
            }
        }catch (e:any){
            toast.error("Error deleting Vendor")
            setShowPopup(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between py-6">
                        <div className="flex items-center gap-4">
                            <Link href={'/vendor'}
                                  className="text-gray-600 hover:text-gray-900 flex items-center gap-2 disabled:opacity-50"
                            >
                                <ArrowLeft size={18} />
                                Back
                            </Link>
                            <div>
                                <h1 className="text-2xl font-bold text-black">Vendor Details</h1>
                                <p className="text-sm text-gray-600">View and manage vendor information</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Information */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Personal Information */}
                        <div className="bg-white rounded-lg border border-blue-500 shadow-sm">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h2 className="text-lg font-semibold text-black">Personal Information</h2>
                            </div>
                            <div className="px-6 py-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-black mb-1">Full Name</label>
                                        <p className="text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded ">
                                            {vendor.name || "Not provided"}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-black mb-1">Vendor ID</label>
                                        <p className="text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded  font-mono">{vendor.id}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bank Information */}
                        <div className="bg-white rounded-lg border border-blue-500 shadow-sm">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h2 className="text-lg font-semibold text-black">Bank Information</h2>
                            </div>
                            <div className="px-6 py-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-black mb-1">Bank Name</label>
                                        <p className="text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded ">
                                            {vendor.bankName || "Not provided"}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-black mb-1">Account Number</label>
                                        <p className="text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded  font-mono">
                                            {vendor.bankAccountNo ? vendor.bankAccountNo : "Not provided"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Address Information */}
                        <div className="bg-white rounded-lg border border-blue-500 shadow-sm">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h2 className="text-lg font-semibold text-black">Address Information</h2>
                            </div>
                            <div className="px-6 py-4">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-black mb-1">Address Line 1</label>
                                        <p className="text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded ">
                                            {vendor.addressLine1 || "Not provided"}
                                        </p>
                                    </div>
                                    {vendor.addressLine2 && (
                                        <div>
                                            <label className="block text-sm font-medium text-black mb-1">Address Line 2</label>
                                            <p className="text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded ">{vendor.addressLine2}</p>
                                        </div>
                                    )}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-black mb-1">City</label>
                                            <p className="text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded ">
                                                {vendor.city || "Not provided"}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-black mb-1">Country</label>
                                            <p className="text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded ">
                                                {vendor.country || "Not provided"}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-black mb-1">Zip Code</label>
                                            <p className="text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded ">
                                                {vendor.zipCode || "Not provided"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="space-y-6">
                        {/* Quick Actions */}
                        <div className="bg-white rounded-lg border border-blue-500 shadow-sm">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h2 className="text-lg font-semibold text-black">Quick Actions</h2>
                            </div>
                            <div className="px-6 py-4 space-y-3">
                                <button
                                    onClick={()=>router.push(`/vendor/${vendor.id}/edit`)}
                                    className="w-full px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    Edit Information
                                </button>
                                <button
                                    onClick={() => setShowPopup(true)}
                                    className="w-full px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                                >
                                    Delete Vendor
                                </button>
                            </div>
                        </div>

                        {/* Timestamps */}
                        <div className="bg-white rounded-lg border border-blue-500 shadow-sm">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h2 className="text-lg font-semibold text-black">Record Information</h2>
                            </div>
                            <div className="px-6 py-4 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-black mb-1">Created At</label>
                                    <p className="text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded ">
                                        {formatDate(vendor.createdAt)}
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <PopupConfirmation
                    isOpen={showPopup}
                    onClose={() => setShowPopup(false)}
                    onConfirm={handleDelete}
                    title="Delete Item"
                    message="Are you sure you want to delete this item? This action cannot be undone."
                    actionText="delete"
                />
            </div>
        </div>
    )
}
