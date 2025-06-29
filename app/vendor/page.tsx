"use client"

import React, { useState, useEffect } from "react"
import VendorCard from "@/components/v1/Card";
import Link from "next/link";
import {ArrowLeft} from "lucide-react";

interface UserData {
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

interface ApiResponse {
    result: {
        data: UserData[]
        page: number
        totalPages: number
        totalItems: number
    }
}

export default function UserList() {
    const [users, setUsers] = useState<UserData[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [totalItems, setTotalItems] = useState(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchUsers = async (page: number) => {
        try {
            setLoading(true)
            setError(null)

            const api = process.env.NEXT_PUBLIC_API_URL;
            const url = api+ `?page=${page}&limit=5`;
            const response = await fetch(url)

            if (!response.ok) {
                throw new Error("Failed to fetch users")
            }

            const data: ApiResponse = await response.json()

            setUsers(data.result.data)
            setCurrentPage(data.result.page)
            setTotalPages(data.result.totalPages)
            setTotalItems(data.result.totalItems)
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers(currentPage)
    }, [currentPage])

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page)
        }
    }

    const renderPaginationButtons = () => {
        const buttons = []
        const maxVisiblePages = 5

        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
        const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1)
        }

        buttons.push(
            <button
                key="prev"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Previous
            </button>,
        )


        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`px-3 py-2 text-sm font-medium border-t border-b border-r border-gray-300 hover:bg-gray-50 ${
                        i === currentPage ? "bg-blue-50 text-blue-600 border-blue-500" : "bg-white text-gray-700"
                    }`}
                >
                    {i}
                </button>,
            )
        }

        buttons.push(
            <button
                key="next"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Next
            </button>,
        )

        return buttons
    }

    if (loading) {
        return (
            <div className="p-8 bg-gray-50 min-h-screen">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="p-8 bg-gray-50 min-h-screen">
                <div className="bg-red-50 border border-red-200 rounded-md p-4">
                    <div className="flex">
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">Error</h3>
                            <div className="mt-2 text-sm text-red-700">
                                <p>{error}</p>
                            </div>
                            <div className="mt-4">
                                <button
                                    onClick={() => fetchUsers(currentPage)}
                                    className="bg-red-100 px-3 py-2 rounded-md text-sm font-medium text-red-800 hover:bg-red-200"
                                >
                                    Try Again
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="p-8 ">

            <div>
            <div className="mb-6 flex justify-between">
                <div className="flex items-center justify-center gap-x-6">
                    <Link
                        href={'/'}
                        className="text-gray-600 hover:text-gray-900 flex items-center gap-2 disabled:opacity-50"
                    >
                        <ArrowLeft
                            size={18}
                        />
                        Back
                    </Link>
                    <div>
                <h1 className="text-2xl font-bold text-gray-800">Vendors Management</h1>
                <p className="text-gray-600 mt-1">
                   Click on any Vendor to delete, edit or view details.
                </p>
                    </div>
                </div>

                <div>
                    <Link href={"/vendor/new"} >
                        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                            Add New Vendor
                        </button>
                    </Link>
                </div>
            </div>


            <div className="mb-8">
                {users.length > 0 ? (
                    users.map((user) =>
                        <div key={user.id}>
                        <Link href={`/vendor/${user.id}`}>
                        <VendorCard key={user.id} userData={user} />
                    </Link>
                        </div>
                    )
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No Vendor found</p>
                        <div>
                            <Link href={"/vendor/new"} >
                                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                                    Add New Vendor
                                </button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>


            {totalPages > 0 && (
                <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center mb-4">
                        <div className="flex -space-x-px">{renderPaginationButtons()}</div>
                    </div>

                    <div className="text-sm text-gray-700">
                        Page {currentPage} of {totalPages} ({totalItems} total items)
                    </div>
                </div>
            )}
        </div>
        </div>
    )
}
