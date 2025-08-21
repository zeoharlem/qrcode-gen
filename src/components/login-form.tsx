import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {z} from "zod"
import {useRef, useState} from "react";
import {QrcgProps} from "@/app/home/component/qrcode-generator";
import {isValidUrlWithShortenLink} from "@/components/utils/form-utils";

const schema = z.string().refine((url) => {
        return isValidUrlWithShortenLink(url)
    },
    {
        message: "Please enter a valid URL (http, https, www, or short link)"
    }
);

export function LoginForm({
                              className,
                              fnCallback,
                              ...props
                          }: QrcgProps) {

    const svgRef = useRef<SVGSVGElement>(null);

    const [validUrlState, setValidUrlState] = useState(false);
    const [url, setUrl] = useState("");

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        const validate = schema.safeParse(value)
        setUrl(value)
        setValidUrlState(validate.success)
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
                <h1 className="text-xl font-bold">Generate Qr Code for your Website</h1>
                <p className="text-center text-sm">
                    Enter your url and download a qr code for your url.
                </p>
            </div>
            <div className="grid gap-6">
                <div className="grid gap-3">
                    <Label htmlFor="url">Website Address</Label>
                    <Input className={`pt-6 pb-6`} id="url" value={url} maxLength={100} type="url"
                           placeholder="https://example.com"
                           onChange={handleUrlChange}/>

                </div>
                <Button className="w-full" disabled={!validUrlState} onClick={(e) => {
                    e.preventDefault();
                    fnCallback(url)
                    setUrl("")
                    setValidUrlState(false);
                }}> Generate QRCode </Button>
            </div>
            <div className="text-center text-sm">
                Free QR Code Generator. Generate as much as you want
            </div>
        </form>
    )
}
