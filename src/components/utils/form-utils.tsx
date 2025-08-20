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
            email: z.email({message: "Invalid email address."}),
            //country: z.string().min(2, {message: "Country is required."}), // keep track of selected country
        }
    );
}