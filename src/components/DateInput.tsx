import React from 'react';
import { Form, FloatingLabel } from "react-bootstrap";
import { format } from "date-fns";

export const DateInput = ({ dates }: any) => {
    return (
        <>
            <div className='row'>
                <div className='col-6 pe-1'>
                    <FloatingLabel label="Start Date" className="mb-3">
                        <Form.Control
                            readOnly
                            value={format(dates[0].startDate, "MM/dd/yyyy")}
                            type="text"
                        />
                    </FloatingLabel>

                </div>
                <div className='col-6 ps-1'>
                    <FloatingLabel label="End Date" className="mb-3">
                        <Form.Control
                            readOnly
                            value={format(dates[0].endDate, "MM/dd/yyyy")}
                            type="text"
                        />
                    </FloatingLabel>

                </div>
            </div>


        </>
    )
}
