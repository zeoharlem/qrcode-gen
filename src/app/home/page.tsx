"use client"

import {LoginForm} from "@/components/login-form"
import QrCodeGenerator from "@/app/home/component/qrcode-generator";
import {useState} from "react";

export default function HomePageContent() {
    const [urlString, setUrlString] = useState("");

    const handleDownloadEvent = (url: string) => {
        console.log(url);
        setUrlString(url);
    }

    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <a href="#" className="flex items-center gap-2 font-medium">
                        <div
                            className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                            {/*<GalleryVerticalEnd className="size-4" />*/}
                        </div>
                        QrCode
                    </a>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-lg">
                        <LoginForm fnCallback={handleDownloadEvent}/>
                    </div>
                </div>
            </div>
            <div className="bg-muted flex items-center justify-center">
                {urlString.trim().length === 0 ? <div>No QrCode Image</div> :
                    <QrCodeGenerator urlString={urlString} isValidUrl={urlString.trim().length > 0}/>}
            </div>
        </div>
    )
}
