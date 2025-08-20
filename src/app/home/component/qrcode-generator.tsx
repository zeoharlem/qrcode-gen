import {useQRCode} from 'next-qrcode';
import {Button} from "@/components/ui/button";

export interface QrcgProps {
    fnCallback: (url: string) => void;
    className?: string;
}

export default function QrCodeGenerator({urlString, isValidUrl}: { urlString: string, isValidUrl: boolean }) {
    const {SVG, Image} = useQRCode()


    const handleImageDownload = (url: string) => {
        const img = document.querySelector("img") as HTMLImageElement;
        if (!img) return;
        const a = document.createElement("a");
        a.href = img.src;
        a.download = url + ".png";
        a.click();
    };

    return (
        <div className="grid gap-6">
            <div className="grid gap-3">
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <Image
                    text={urlString}
                    options={{
                        type: 'image/png',
                        quality: 0.3,
                        level: 'M',
                        margin: 3,
                        scale: 4,
                        width: 500,
                        color: {
                            dark: '#000000',
                            light: '#ffffff',
                        },
                    }}
                />

                <Button variant="outline" className="w-full" disabled={!isValidUrl} onClick={(e) => {
                    e.preventDefault();
                    console.log("downloading")
                    handleImageDownload("qr-image")
                }}> Download QRCode </Button>

            </div>
        </div>
    )
}