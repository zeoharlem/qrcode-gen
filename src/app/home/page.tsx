"use client"

import {LoginForm} from "@/components/login-form"
import QrCodeGenerator from "@/app/home/component/qrcode-generator";
import {useState} from "react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {formSchema, VCardForm} from "@/components/v-card-form";
import {z} from "zod";

export default function HomePageContent() {
    const [urlString, setUrlString] = useState("");
    const [vcfForms, setVcfForms] = useState<z.infer<typeof formSchema> | null>(null);

    const handleDownloadEvent = (url: string, form?: z.infer<typeof formSchema>) => {
        setUrlString(url);
        if (form) {
            setVcfForms(form);
        }
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
                <div className="flex flex-1 justify-center md:pt-20">
                    <div className="w-full max-w-lg">
                        <Tabs defaultValue="website">
                            <TabsList className="w-full">
                                <TabsTrigger value="website">Website Address</TabsTrigger>
                                <TabsTrigger value="vcard">Basic Contact(VCard)</TabsTrigger>
                            </TabsList>
                            <TabsContent value="website">
                                <LoginForm fnCallback={(url) => {
                                    setVcfForms(null)
                                    handleDownloadEvent(url)
                                }}/>
                            </TabsContent>
                            <TabsContent value="vcard">
                                <VCardForm fnCallback={(url, form) => handleDownloadEvent(url, form)}/>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
                <div
                    className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                    By using this app, you agree to our <a href="#">Terms of Service</a>{" "}
                    and <a href="#">Privacy Policy</a>.
                </div>
            </div>

            <div className="bg-muted flex items-center justify-center">
                {urlString.trim().length === 0 ? <div>No QrCode Image</div> :
                    <QrCodeGenerator urlString={urlString} isValidUrl={urlString.trim().length > 0}
                                     form={vcfForms || undefined}/>}
            </div>
        </div>
    )
}
