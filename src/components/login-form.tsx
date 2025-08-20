import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {z} from "zod"
import {useRef, useState} from "react";
import {QrcgProps} from "@/app/home/component/qrcode-generator";

const schema = z.url().refine((url) => {
        return url.startsWith("https://") || url.startsWith("http://")
    },
    {
        message: "URL must start with https:// or http://"
    }
);

export function LoginForm({
                              className,
                              fnCallback,
                              ...props
                          }: QrcgProps) {

    const svgRef = useRef<SVGSVGElement>(null);

    const [urlErrorMsg, setErrorUrlMsg] = useState("");
    const [validUrlState, setValidUrlState] = useState(false);
    const [url, setUrl] = useState("");

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        const validate = schema.safeParse(value)
        setUrl(value)
        setErrorUrlMsg(validate.error?.message ?? "")
        setValidUrlState(validate.success)
        console.log(validate)
    }

    const handleSvgDownload = () => {
        if (!svgRef.current) return;
        const serializer = new XMLSerializer();
        const source = serializer.serializeToString(svgRef.current);
        const blob = new Blob([source], {type: "image/svg+xml;charset=utf-8"});
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "qrcode.svg";
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <form className={cn("flex flex-col gap-6", className)} {...props}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Get QR Code For your URL</h1>
                <p className="text-muted-foreground text-sm text-balance">
                    Enter your url and download a qr code for your url.
                </p>
            </div>
            <div className="grid gap-6">
                <div className="grid gap-3">
                    <Label htmlFor="url">Website Address</Label>
                    <Input className={`pt-6 pb-6`} id="url" value={url} type="url" placeholder="https://example.com"
                           onChange={handleUrlChange}/>

                </div>
                <Button className="w-full" disabled={!validUrlState} onClick={(e) => {
                    e.preventDefault();
                    console.log("downloading")
                    fnCallback(url)
                    setUrl("")
                    setValidUrlState(false);
                }}> Generate QRCode </Button>

                {/*<div className="grid grid-cols-2 gap-4">
                    <Button className="w-full" disabled={!validUrlState} onClick={(e) => {
                        e.preventDefault();
                        console.log("downloading")
                        handleImageDownload("qr-image")
                    }}>
                        Download PNG
                    </Button>
                    <Button variant="outline" className="w-full" disabled={!validUrlState} onClick={(e) => {
                        e.preventDefault();
                        console.log("downloading")
                        handleImageDownload("qr-image")
                    }}>
                        Download SVG
                    </Button>
                </div>*/}
            </div>
            <div className="text-center text-sm">
                Free QR Code Generator. Generate as much as you want
            </div>
        </form>
    )
}
