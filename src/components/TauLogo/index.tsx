import React from "react"
import Image from "../Image"

const TauLogo = () => {
    return (
        <>
            <div className="mt-4 mb-4 sm:hidden"></div>
            <div className="flex justify items-center mt-8 mb-12 hidden sm:block" style={{ minHeight: 80 }}>
                <Image src="/eta-logo.png" alt="Eta Logo" width={656} height={80} />
            </div>
        </>
    )
}

export default TauLogo
