"use client"
import { signIn } from "next-auth/react"

export default function SignInPage() {
    const handleSignIn = () => {
        signIn("google", { callbackUrl: "/vendor" })
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
                    <p className="text-gray-600">Sign in to Vendor Management System</p>
                </div>

                <div className="space-y-6">
                    <button
                        onClick={handleSignIn}
                        className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 rounded-lg px-6 py-4 text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fill="#4285F4"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="#34A853"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="#FBBC05"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                                fill="#EA4335"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                        </svg>
                        Continue with Google
                    </button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Secure authentication</span>
                        </div>
                    </div>

                    <div className="text-center text-sm text-gray-500">
                        By continuing, you agree to our{" "}
                        <a href="/#" className="text-blue-600 hover:text-blue-800 underline">
                            Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="/#" className="text-blue-600 hover:text-blue-800 underline">
                            Privacy Policy
                        </a>
                    </div>

                    <div>
                        <p className="text-center text-sm text-gray-500">
                            Cancel the process?{" "}
                            <a href="/" className="text-blue-600 hover:text-blue-800 underline">
                                Cancel
                            </a>
                        </p>
                    </div>
                </div>

            </div>


        </div>
    )
}
