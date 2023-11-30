
import { useEffect, useState, useRef } from 'react';
import { DateRange } from 'react-date-range';
import { LocaleSelect } from './LocaleSelect';
import { DateInput } from './DateInput';
const locales = require("react-date-range/dist/locale")

export const Calendar = ({ dates , setDates } : any) => {
    const dateInputRef = useRef<any>();
    const [locale, setLocale] = useState('enUS');
    const [openCalendar, setOpenCalendar] = useState(false);


    useEffect(() => {
        const handleCalendarPopup = (e: { target: any; }) => {
            if (!dateInputRef.current.contains(e.target)) {
                setOpenCalendar(false)
            }
        }
        document.addEventListener("mousedown", handleCalendarPopup)
        return () => {
            document.removeEventListener("mousedown", handleCalendarPopup)
        }
    })

    return (
        <>
            <div className='position-relative' ref={dateInputRef}>
                {(openCalendar) &&
                    <div className='calendar-cont position-absolute bg-white shadow-lg p-2 border rounded-3'>
                        <LocaleSelect locale={locale} setLocale={setLocale} />
                        <DateRange
                            editableDateInputs={false}
                            onChange={item => setDates([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={dates}
                            locale={locales[locale]}
                        />
                    </div>
                }

                <div onClick={(e) => setOpenCalendar(!openCalendar)}>
                    <DateInput dates={dates} />
                </div>

            </div>

        </>
    )
}
