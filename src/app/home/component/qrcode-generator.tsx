import {useQRCode} from 'next-qrcode';
import {Button} from "@/components/ui/button";
import {formSchema} from "@/components/v-card-form";
import {z} from "zod";

export interface QrcgProps {
    fnCallback: (url: string, form?: z.infer<typeof formSchema>) => void;
    className?: string;
}

export default function QrCodeGenerator({urlString, isValidUrl, form}: {
    urlString: string,
    isValidUrl: boolean,
    form?: z.infer<typeof formSchema>
}) {
    const {SVG, Image} = useQRCode()

    const handleImageDownload = (url: string) => {
        const img = document.querySelector("img") as HTMLImageElement;
        if (!img) return;
        const a = document.createElement("a");
        a.href = img.src;
        a.download = url + ".png";
        a.click();
    };

    const handleDownloadVcf = (vcard: string, form: z.infer<typeof formSchema>) => {
        const blob = new Blob([vcard], {type: 'text/vcard;charset=utf-8'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        const fileName = `${form.firstName || 'contact'}_${form.lastName || ''}.vcf`.replace(/\s+/g, '');
        a.href = url;
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(url);
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
                {!form ?
                    <Button variant="outline" className="w-full" disabled={!isValidUrl} onClick={(e) => {
                        e.preventDefault();
                        handleImageDownload("qr-image")
                    }}> Download QRCode </Button>
                    :
                    <div className="grid grid-cols-2 gap-4">
                        <Button variant="default" disabled={!isValidUrl} onClick={(e) => {
                            e.preventDefault();
                            handleImageDownload("qr-image")
                        }}> Download .png </Button>

                        <Button variant="outline" className="w-full" disabled={!isValidUrl} onClick={(e) => {
                            e.preventDefault();
                            handleDownloadVcf(urlString, form)
                        }}> Download .vcf </Button>
                    </div>

                }
            </div>
        </div>
    )
}