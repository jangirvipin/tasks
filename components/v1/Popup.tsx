"use client"

import type React from "react"

interface PopupConfirmationProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    title?: string
    message?: string
    actionText: "delete" | "save"
    confirmButtonColor?: "red" | "blue" | "green"
}

export function PopupConfirmation({
                                      isOpen,
                                      onClose,
                                      onConfirm,
                                      title,
                                      message,
                                      actionText,
                                      confirmButtonColor = actionText === "delete" ? "red" : "blue",
                                  }: PopupConfirmationProps) {
    if (!isOpen) return null

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    const getConfirmButtonStyles = () => {
        const baseStyles =
            "px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"

        switch (confirmButtonColor) {
            case "red":
                return `${baseStyles} bg-red-600 text-white hover:bg-red-700 focus:ring-red-500`
            case "green":
                return `${baseStyles} bg-green-600 text-white hover:bg-green-700 focus:ring-green-500`
            default:
                return `${baseStyles} bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500`
        }
    }

    return (
        <div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
            onClick={handleBackdropClick}
        >
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
                {title && <h2 className="text-lg font-semibold text-gray-900 mb-2">{title}</h2>}

                {message && <p className="text-gray-600 mb-6">{message}</p>}

                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                        Cancel
                    </button>

                    <button onClick={onConfirm} className={getConfirmButtonStyles()}>
                        {actionText === "delete" ? "Delete" : "Save"}
                    </button>
                </div>
            </div>

        </div>


    )
}
