import z from "zod";
import {CountryCode, parsePhoneNumberFromString} from "libphonenumber-js";

export function createZodFormSchema(defaultCountry: CountryCode = "NG") {
    return z.object(
        {
            firstName: z.string().min(2, {message: "First Name must be at least 2 characters."}),
            lastName: z.string().min(2, {message: "Last Name must be at least 2 characters."}),
            phoneNumber: z.string().refine((value) => {
                    const phoneNumber = parsePhoneNumberFromString(value, defaultCountry);
                    return phoneNumber ? phoneNumber.isValid() : false;
                }, {
                    message: "Invalid international phone number."
                }
            ).transform((value) => {
                    const phoneNumber = parsePhoneNumberFromString(value, defaultCountry);
                    return phoneNumber ? phoneNumber.number : value;
                }
            ),
            email: z.string().refine((value) => {
                return isValidEmail(value);
            }, {
                message: "Invalid email address."
            }),
            //country: z.string().min(2, {message: "Country is required."}), // keep track of the selected country
        }
    );
}

export function isValidUrl(url: string) {
    const pattern = /^(https?:\/\/|www\.)[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})(\/.*)?$/;
    return pattern.test(url);
}

export function normalizeUrl(url: string) {
    if (!/^https?:\/\//i.test(url)) {
        return "https://" + url.replace(/^www\./, "");
    }
    return url;
}

export function isValidEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}