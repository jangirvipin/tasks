"use client"

import { signIn, useSession } from "next-auth/react"
import { UserPlus, FileText, Shield } from "lucide-react"
import Navbar from "@/components/v1/Navbar";
import Footer from "@/components/v1/Footer";


export default function HomePage() {
    const { status } = useSession()


    const features = [
        {
            icon: UserPlus,
            title: "Easy Vendor Creation",
            description: "Quickly add new vendors with all necessary banking and contact information.",
            bgColor: "bg-green-100",
            iconColor: "text-green-600",
        },
        {
            icon: FileText,
            title: "Comprehensive Management",
            description: "View, edit, and manage all your vendors in one centralized location.",
            bgColor: "bg-purple-100",
            iconColor: "text-purple-600",
        },
        {
            icon: Shield,
            title: "Secure & Reliable",
            description: "Your vendor data is protected with enterprise-grade security measures.",
            bgColor: "bg-orange-100",
            iconColor: "text-orange-600",
        },
    ]

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 px-4 sm:px-6 lg:px-8">
                <div className="text-center py-16">
                    <div className="max-w-md mx-auto">
                        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <UserPlus className="w-12 h-12 text-blue-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to VendorHub</h2>
                        <p className="text-gray-600 mb-8">
                            Your comprehensive vendor management solution. Streamline your vendor relationships, manage banking
                            information, and keep track of all your business partners in one place.
                        </p>
                    </div>

                    <div className="space-y-4 max-w-md mx-auto">
                        <button
                            onClick={() => signIn("google")}
                            disabled={status === "loading"}
                            className="w-full bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {status === "loading" ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <span>Get Started with Google</span>
                                </>
                            )}
                        </button>

                        <div className="text-sm text-gray-500">Secure authentication powered by Google</div>
                    </div>

                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-left ">
                        {features.map((feature, index) => {
                            const IconComponent = feature.icon
                            return (
                                <div key={index}>
                                    <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                                        <IconComponent className={`w-6 h-6 ${feature.iconColor}`} />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                                    <p className="text-sm text-gray-600">{feature.description}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
