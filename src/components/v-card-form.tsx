import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {QrcgProps} from "@/app/home/component/qrcode-generator";
import {createZodFormSchema} from "@/components/utils/form-utils";

export const formSchema = createZodFormSchema()

export function VCardForm({className, fnCallback, ...props}: QrcgProps) {

    const esc = (s: string) =>
        (s ?? '')
            .replace(/\\/g, '\\\\')
            .replace(/;/g, '\\;')
            .replace(/,/g, '\\,')
            .replace(/\n/g, '\\n');

    function vcardBuilder(d: z.infer<typeof formSchema>) {
        const N = `${esc(d.lastName)};${esc(d.firstName)};;;`;
        const FN = `${esc(d.firstName)} ${esc(d.lastName)}`.trim();

        return [
            'BEGIN:VCARD',
            'VERSION:3.0',
            `N:${N}`,
            `FN:${FN}`,
            //d.org ? `ORG:${esc(d.org)}` : '',
            //d.title ? `TITLE:${esc(d.title)}` : '',
            d.phoneNumber ? `TEL;TYPE=CELL,VOICE:${esc(d.phoneNumber)}` : '',
            d.email ? `EMAIL;TYPE=INTERNET:${esc(d.email)}` : '',
            //d.url ? `URL:${esc(d.url)}` : '',
            //d.note ? `NOTE:${esc(d.note)}` : '',
            'END:VCARD',
        ].filter(Boolean).join('\n');
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "", lastName: "", email: "", phoneNumber: "",
        },
    })

    function onSubmitHandler(values: z.infer<typeof formSchema>) {
        const vcard = vcardBuilder(values);
        fnCallback(vcard, values)
        form.reset();
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmitHandler)}>
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col items-center gap-2">
                            <h1 className="text-xl font-bold">Generate Virtual Contact</h1>
                            <div className="text-center text-sm">
                                Enter the details you want to use for virtual contact.
                            </div>
                        </div>
                        <div className="flex gap-6">
                            <div className="grid gap-2 w-full">
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>First Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="pt-6 pb-6"
                                                    type="text"
                                                    placeholder="e.g John"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription className="text-xs">
                                                This is your public display name.
                                            </FormDescription>
                                            <FormMessage className="text-xs"/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid gap-2 w-full">
                                <FormField
                                    control={form.control}
                                    name="lastName"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Last Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="pt-6 pb-6"
                                                    type="text"
                                                    placeholder="e.g Doe"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription className="text-xs">
                                                This is your public display name.
                                            </FormDescription>
                                            <FormMessage className="text-xs"/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2 w-full">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="pt-6 pb-6"
                                                    type="email"
                                                    placeholder="e.g john.doe@example.com"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className="text-xs"/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid gap-2 w-full">
                                <FormField
                                    control={form.control}
                                    name="phoneNumber"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Phone Number</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="pt-6 pb-6"
                                                    type="tel"
                                                    placeholder="e.g +2348056748833"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className="text-xs"/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                Generate Contact(VCard)
                            </Button>
                        </div>

                    </div>
                </form>
            </Form>
        </div>
    )
}