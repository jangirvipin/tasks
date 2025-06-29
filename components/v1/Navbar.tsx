'use client';

import Link from "next/link";
import {signIn, signOut, useSession} from "next-auth/react";
import {useState,useEffect} from "react";


interface State {
    name : string;
    email : string;
    image : string;
}


export default function Navbar(){
    const [user,setUser]=useState<State | null>(null)
    const {data:session}= useSession();

    useEffect(()=>{
        if(session && session.user){
            setUser({
                name: session.user.name || "Guest",
                email: session.user.email || "",
                image: session.user.image || ""
            });
        } else {
            setUser(null);
        }
    },[])
    console.log(user?.name)

    return (
        <nav className=" shadow-sm rounded-md  ">
            <div className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <h1 className="text-2xl font-bold text-gray-900">VendorHub</h1>
                    </div>

                    <nav className="hidden md:flex space-x-8">
                        <Link href={"/vendor"} className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                            Vendors
                        </Link>
                        <Link href={"/vendor/new"} className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                            Add Vendor
                        </Link>
                    </nav>

                    <div className="flex items-center space-x-4">
                        {session ? (
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2">
                                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                        <span className="text-black text-sm font-medium">{user?.name.charAt(0)}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => signOut()}
                                    className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={()=>signIn("google")}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
                            >
                                <span>Login with Google</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}