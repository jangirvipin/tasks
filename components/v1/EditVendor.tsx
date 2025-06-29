"use client"

import type React from "react"

import { useState } from "react"
import axios from "axios";
import {toast} from "sonner";
import {PopupConfirmation} from "@/components/v1/Popup";
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

interface EditVendorProps {
    vendor: VendorData
}

export default function EditVendor({ vendor }: EditVendorProps) {
    const [formData, setFormData] = useState<VendorData>({ ...vendor })
    const [errors, setErrors] = useState<Partial<VendorData>>({})
    const [showPopup, setShowPopup] = useState(false)

    const validateForm = (): boolean => {
        const newErrors: Partial<VendorData> = {}

        if (!formData.name.trim()) {
            newErrors.name = "Name is required"
        }

        if (!formData.bankAccountNo.trim()) {
            newErrors.bankAccountNo = "Bank account number is required"
        } else if (!/^\d{10,20}$/.test(formData.bankAccountNo.replace(/\s/g, ""))) {
            newErrors.bankAccountNo = "Bank account number must be 10-20 digits"
        }

        if (!formData.bankName.trim()) {
            newErrors.bankName = "Bank name is required"
        }

        if (!formData.addressLine1.trim()) {
            newErrors.addressLine1 = "Address line 1 is required"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleInputChange = (field: keyof VendorData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }))
        }
    }

    const handleSubmit = async (e?: React.FormEvent) => {
        if(e){e.preventDefault()}

        if (!validateForm()) {
            setShowPopup(false)
            return
        }

        try {
            const api = process.env.NEXT_PUBLIC_API_URL;
            const url = api + `/${formData.id}`;
            const result = await axios.put(url,formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            if(result.status === 200) {
                console.log("Vendor updated successfully:", result.data)
                toast.success("Vendor updated successfully")
            }
        } catch (error) {
            console.error("Error updating vendor:", error)
            toast.error("Failed to update vendor")
        }finally {
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
                            <Link
                                href={`/vendor/${formData.id}`}
                                className="text-gray-600 hover:text-gray-900 flex items-center gap-2 disabled:opacity-50"
                            >
                                <ArrowLeft
                                size={18}
                                />
                                Back
                            </Link>
                            <div>
                                <h1 className="text-2xl font-bold text-black">Edit Vendor</h1>
                                <p className="text-sm text-gray-600">Update vendor information</p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <Link
                                href={`/vendor/${formData.id}`}
                                className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Cancel
                            </Link>
                            <button
                                onClick={()=> setShowPopup(true)}
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                              Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div>
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
                                            <label htmlFor="name" className="block text-sm font-medium text-black mb-1">
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                value={formData.name}
                                                className="border p-1 rounded w-full focus:outline-none focus:ring-1 focus:ring-gray-100 text-black"
                                                onChange={(e) => handleInputChange("name", e.target.value)}
                                                placeholder="Enter full name"
                                            />
                                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-black mb-1">Vendor ID</label>
                                            <p className="text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded border font-mono">
                                                {formData.id}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">ID cannot be changed</p>
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
                                            <label htmlFor="bankName" className="block text-sm font-medium text-black mb-1">
                                                Bank Name *
                                            </label>
                                            <input
                                                type="text"
                                                id="bankName"
                                                value={formData.bankName}
                                                onChange={(e) => handleInputChange("bankName", e.target.value)}
                                                className="text-black border p-1 rounded w-full focus:outline-none focus:ring-1 focus:ring-gray-100"
                                                placeholder="Enter bank name"

                                            />
                                            {errors.bankName && <p className="text-red-500 text-xs mt-1">{errors.bankName}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="bankAccountNo" className="block text-sm font-medium text-black mb-1">
                                                Account Number *
                                            </label>
                                            <input
                                                type="text"
                                                id="bankAccountNo"
                                                value={formData.bankAccountNo}
                                                onChange={(e) => handleInputChange("bankAccountNo", e.target.value)}
                                                className="border text-black p-1 rounded w-full focus:outline-none focus:ring-1 focus:ring-gray-100"
                                                placeholder="Enter account number"

                                            />
                                            {errors.bankAccountNo && <p className="text-red-500 text-xs mt-1">{errors.bankAccountNo}</p>}
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
                                            <label htmlFor="addressLine1" className="block text-sm font-medium text-black mb-1">
                                                Address Line 1 *
                                            </label>
                                            <input
                                                type="text"
                                                id="addressLine1"
                                                value={formData.addressLine1}
                                                onChange={(e) => handleInputChange("addressLine1", e.target.value)}
                                                className="border text-black p-1 rounded w-full focus:outline-none focus:ring-1 focus:ring-gray-100"
                                                placeholder="Enter street address"

                                            />
                                            {errors.addressLine1 && <p className="text-red-500 text-xs mt-1">{errors.addressLine1}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="addressLine2" className="block text-sm font-medium text-black mb-1">
                                                Address Line 2
                                            </label>
                                            <input
                                                type="text"
                                                id="addressLine2"
                                                value={formData.addressLine2}
                                                onChange={(e) => handleInputChange("addressLine2", e.target.value)}
                                                className="border p-1 text-black rounded w-full focus:outline-none focus:ring-1 focus:ring-gray-100"
                                                placeholder="Apartment, suite, etc. (optional)"

                                            />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div>
                                                <label htmlFor="city" className="block text-sm font-medium text-black mb-1">
                                                    City
                                                </label>
                                                <input
                                                    type="text"
                                                    id="city"
                                                    value={formData.city}
                                                    onChange={(e) => handleInputChange("city", e.target.value)}
                                                    className="border text-black p-1 rounded w-full focus:outline-none focus:ring-1 focus:ring-gray-100"
                                                    placeholder="Enter city"

                                                />
                                                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                                            </div>
                                            <div>
                                                <label htmlFor="country" className="block text-sm font-medium text-black mb-1">
                                                    Country
                                                </label>
                                                <input
                                                    type="text"
                                                    id="country"
                                                    value={formData.country}
                                                    onChange={(e) => handleInputChange("country", e.target.value)}
                                                    className="border p-1 text-black rounded w-full focus:outline-none focus:ring-1 focus:ring-gray-100"
                                                    placeholder="Enter country"

                                                />
                                                {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
                                            </div>
                                            <div>
                                                <label htmlFor="zipCode" className="block text-sm font-medium text-black mb-1">
                                                    Zip Code
                                                </label>
                                                <input
                                                    type="text"
                                                    id="zipCode"
                                                    value={formData.zipCode}
                                                    onChange={(e) => handleInputChange("zipCode", e.target.value)}
                                                    className="border p-1 text-black rounded w-full focus:outline-none focus:ring-1 focus:ring-gray-100"
                                                    placeholder="Enter zip code"

                                                />
                                                {errors.zipCode && <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>}
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
                                    <h2 className="text-lg font-semibold text-black">Actions</h2>
                                </div>
                                <div className="px-6 py-4 space-y-3">
                                    <button
                                        onClick={()=>setShowPopup(true)}
                                        className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                       Save Changes
                                    </button>
                                    <Link
                                    href={`/vendor/${formData.id}`}
                                    >
                                    <button
                                        className="w-full px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Cancel Changes
                                    </button>
                                    </Link>
                                </div>
                            </div>




                            <div className="bg-white rounded-lg border border-blue-500 shadow-sm">
                                <div className="px-6 py-4 border-b border-gray-200">
                                    <h2 className="text-lg font-semibold text-black">Help</h2>
                                </div>
                                <div className="px-6 py-4">
                                    <div className="text-sm text-gray-600 space-y-2">
                                        <p>• Fields marked with * are required</p>
                                        <p>• Bank account number must be 10-20 digits</p>
                                        <p>• Zip code format: 12345 or 12345-6789</p>
                                        <p>• Changes will be saved immediately</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <PopupConfirmation
                isOpen={showPopup}
                onClose={() => setShowPopup(false)}
                onConfirm={handleSubmit}
                title="Save Item"
                message="Are you sure you want to Save this item? This action cannot be undone."
                actionText="save"
            />
        </div>
    )
}
