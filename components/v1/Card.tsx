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

interface UserCardProps {
    userData: UserData
}

export default function VendorCard({ userData }: UserCardProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }


    return (
        <div className="mb-2 bg-white border border-gray-500 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 max-w-5xl mx-auto ">
            <div className="flex items-center justify-between gap-6">
                {/* Left Section - User Info */}
                <div className="flex-1">
                    <h3 className="text-xl font-semibold text-black">{userData.name}</h3>
                    <p className="text-sm text-gray-600">ID: {userData.id.slice(0, 8)}...</p>
                </div>

                {/* Middle Section - Bank & Address */}
                <div className="flex-2 grid grid-cols-2 gap-6">
                    {/* Bank Information */}
                    <div>
                        <h4 className="text-sm font-medium text-black mb-2">Bank Details</h4>
                        <div className="bg-gray-50 rounded-md p-3">
                            <p className="text-sm text-black font-medium">{userData.bankName}</p>
                            <p className="text-sm text-gray-600">Account: {userData.bankAccountNo}</p>
                        </div>
                    </div>

                    {/* Address Information */}
                    <div>
                        <h4 className="text-sm font-medium text-black mb-2">Address</h4>
                        <div className="text-sm text-gray-600 space-y-1">
                            <p>{userData.addressLine1}</p>
                            {userData.addressLine2 && <p>{userData.addressLine2}</p>}
                            <p>
                                {userData.city} {userData.country} {userData.zipCode}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Section - Timestamps */}
                <div className="flex-1  text-right">
                    <div className="text-xs text-gray-500">
                        <div className="mb-1">
                            <span className="text-black font-medium">Created:</span>
                            <br />
                            {formatDate(userData.createdAt)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
