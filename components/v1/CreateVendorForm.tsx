"use client"

import type React from "react"
import { useState } from "react"

interface VendorFormData {
    name: string
    bankAccountNo: string
    bankName: string
    addressLine1: string
    addressLine2: string
    city: string
    country: string
    zipCode: string
}

interface CreateVendorFormProps {
    onSubmit: (data: VendorFormData) => Promise<void>
    onCancel: () => void
    isLoading?: boolean
}

export default function CreateVendorForm({ onSubmit, onCancel, isLoading = false }: CreateVendorFormProps) {
    const [formData, setFormData] = useState<VendorFormData>({
        name: "",
        bankAccountNo: "",
        bankName: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        country: "",
        zipCode: "",
    })

    const [errors, setErrors] = useState<Partial<VendorFormData>>({})

    const validateForm = (): boolean => {
        const newErrors: Partial<VendorFormData> = {}

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

    const handleInputChange = (field: keyof VendorFormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        try {
            await onSubmit(formData)
        } catch (error) {
            console.error("Error creating vendor:", error)
        }
    }

    const inputClassName = (field: keyof VendorFormData) =>
        `w-full px-2 py-1.5 border rounded text-sm  ${
            errors[field] ? "border-red-500" : "border-gray-300"
        }`

    return (
        <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full py-8 px-4 flex flex-col ">
            {/* Header */}
            <div className="border-b border-gray-200 px-4 py-3 flex-shrink-0">
                <h2 className="text-lg font-semibold text-black">Create New Vendor</h2>
                <p className="text-xs text-gray-600">Fill in the vendor information below</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
                <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Personal Information */}
                        <div className="md:col-span-3">
                            <h3 className="text-sm font-medium text-black mb-2 border-b border-blue-200 pb-1">
                                Personal Information
                            </h3>
                        </div>

                        <div>
                            <label htmlFor="name" className="block text-xs font-medium text-black mb-1">
                                Full Name *
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={formData.name}
                                onChange={(e) => handleInputChange("name", e.target.value)}
                                className={inputClassName("name")}
                                placeholder="Enter full name"
                                disabled={isLoading}
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-0.5">{errors.name}</p>}
                        </div>

                        {/* Bank Information */}
                        <div className="md:col-span-3 mt-3">
                            <h3 className="text-sm font-medium text-black mb-2 border-b border-blue-200 pb-1">Bank Information</h3>
                        </div>

                        <div>
                            <label htmlFor="bankName" className="block text-xs font-medium text-black mb-1">
                                Bank Name *
                            </label>
                            <input
                                type="text"
                                id="bankName"
                                value={formData.bankName}
                                onChange={(e) => handleInputChange("bankName", e.target.value)}
                                className={inputClassName("bankName")}
                                placeholder="Enter bank name"
                                disabled={isLoading}
                            />
                            {errors.bankName && <p className="text-red-500 text-xs mt-0.5">{errors.bankName}</p>}
                        </div>

                        <div>
                            <label htmlFor="bankAccountNo" className="block text-xs font-medium text-black mb-1">
                                Bank Account Number *
                            </label>
                            <input
                                type="text"
                                id="bankAccountNo"
                                value={formData.bankAccountNo}
                                onChange={(e) => handleInputChange("bankAccountNo", e.target.value)}
                                className={inputClassName("bankAccountNo")}
                                placeholder="Enter account number"
                                disabled={isLoading}
                            />
                            {errors.bankAccountNo && <p className="text-red-500 text-xs mt-0.5">{errors.bankAccountNo}</p>}
                        </div>

                        {/* Address Information */}
                        <div className="md:col-span-3 mt-3">
                            <h3 className="text-sm font-medium text-black mb-2 border-b border-blue-200 pb-1">Address Information</h3>
                        </div>

                        <div className="md:col-span-2">
                            <label htmlFor="addressLine1" className="block text-xs font-medium text-black mb-1">
                                Address Line 1 *
                            </label>
                            <input
                                type="text"
                                id="addressLine1"
                                value={formData.addressLine1}
                                onChange={(e) => handleInputChange("addressLine1", e.target.value)}
                                className={inputClassName("addressLine1")}
                                placeholder="Enter street address"
                                disabled={isLoading}
                            />
                            {errors.addressLine1 && <p className="text-red-500 text-xs mt-0.5">{errors.addressLine1}</p>}
                        </div>

                        <div>
                            <label htmlFor="addressLine2" className="block text-xs font-medium text-black mb-1">
                                Address Line 2
                            </label>
                            <input
                                type="text"
                                id="addressLine2"
                                value={formData.addressLine2}
                                onChange={(e) => handleInputChange("addressLine2", e.target.value)}
                                className={inputClassName("addressLine2")}
                                placeholder="Apt, suite, etc."
                                disabled={isLoading}
                            />
                        </div>

                        <div>
                            <label htmlFor="city" className="block text-xs font-medium text-black mb-1">
                                City
                            </label>
                            <input
                                type="text"
                                id="city"
                                value={formData.city}
                                onChange={(e) => handleInputChange("city", e.target.value)}
                                className={inputClassName("city")}
                                placeholder="Enter city"
                                disabled={isLoading}
                            />
                            {errors.city && <p className="text-red-500 text-xs mt-0.5">{errors.city}</p>}
                        </div>

                        <div>
                            <label htmlFor="country" className="block text-xs font-medium text-black mb-1">
                                Country
                            </label>
                            <input
                                type="text"
                                id="country"
                                value={formData.country}
                                onChange={(e) => handleInputChange("country", e.target.value)}
                                className={inputClassName("country")}
                                placeholder="Enter country"
                                disabled={isLoading}
                            />
                            {errors.country && <p className="text-red-500 text-xs mt-0.5">{errors.country}</p>}
                        </div>

                        <div>
                            <label htmlFor="zipCode" className="block text-xs font-medium text-black mb-1">
                                Zip Code
                            </label>
                            <input
                                type="text"
                                id="zipCode"
                                value={formData.zipCode}
                                onChange={(e) => handleInputChange("zipCode", e.target.value)}
                                className={inputClassName("zipCode")}
                                placeholder="Enter zip code"
                                disabled={isLoading}
                            />
                            {errors.zipCode && <p className="text-red-500 text-xs mt-0.5">{errors.zipCode}</p>}
                        </div>
                    </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end gap-3 px-4 py-3 border-t border-gray-200 flex-shrink-0">
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={isLoading}
                        className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 border border-transparent rounded hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isLoading && <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>}
                        {isLoading ? "Creating..." : "Create Vendor"}
                    </button>
                </div>
            </form>
        </div>
    )
}
