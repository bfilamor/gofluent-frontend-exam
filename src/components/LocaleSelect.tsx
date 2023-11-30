import React from 'react';
import { localeNameMapper } from "../data/localeNameWrapper";
import { Form } from 'react-bootstrap';
const locales = require("react-date-range/dist/locale")

export const LocaleSelect = ({ locale, setLocale } : any) => {
    const localeOptions = Object.keys(locales)
        .map((key : any) => ({
            value: key,
            label: `${key} - ${localeNameMapper[key] || ''}`
        }))
        .filter(item => localeNameMapper[item.value]);

    return (
        <>
            <Form.Select
                className='mb-3'
                onChange={e => setLocale(e.target.value)}
                value={locale}
            >
                {localeOptions.map((option, i) => (
                    <option value={option.value} key={i}>
                        {option.label}
                    </option>
                ))}

            </Form.Select>
        </>
    )
}

