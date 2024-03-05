// src/controllers/employeeController.ts
import { Request, Response } from 'express';
import axios, { AxiosResponse } from 'axios';
import { Employee } from '../interfaces/employeeInterface';


interface BambooHRResponse {
    fields: Array<{
        id: string;
        type: string;
        name: string;
    }>;
    employees?: {
        id: string;
        displayName: string;
        firstName: string;
        lastName: string;
        jobTitle: string;
        mobilePhone: string;
        supervisor: string;
        photoUrl: string;
        workEmail: string;
        department: string
    }[];
}

export const getEmployee = async (req: Request, res: Response): Promise<void> => {
    try {
        const apiUrl : string = process.env.GETEMPLOYEEURL ? process.env.GETEMPLOYEEURL : '' ;

        if(apiUrl == '') {
            res.status(404).send('Not found');
        }
        const headers = {
            'accept': 'application/json',
            'authorization': 'Basic MDA0ZDNmMmE5NmU4ZGNiYTc3NzAyOTEwMDgzNDBlODZhNmU5YWNmZDpQcmFqYWt0YUAyMDI0',
        };

        const response: AxiosResponse<BambooHRResponse> = await axios.get(apiUrl, { headers });

        if (response.data && response.data.employees) {
            const employees: Employee[] = response.data.employees.map((bambooHREmployee: any) => ({
                id: bambooHREmployee.id,
                first_name: bambooHREmployee.firstName,
                last_name: bambooHREmployee.lastName,
                name: bambooHREmployee.displayName,
                display_name: bambooHREmployee.displayName,
                date_of_birth: bambooHREmployee.dateOfBirth ? bambooHREmployee.dateOfBirth : '',
                avatar_url: bambooHREmployee.photoUrl,
                personal_phone_number: bambooHREmployee.mobilePhone ? bambooHREmployee.mobilePhone : '',
                work_email: bambooHREmployee.workEmail,
                job_title: bambooHREmployee.jobTitle,
                department: bambooHREmployee.department,
                hire_date: bambooHREmployee.hireDate ? bambooHREmployee.hireDate : "",
                tenure: "",
                work_anniversary: "",
                employments: {
                    start_date: '',
                    title: bambooHREmployee.jobTitle,
                    manager_id: bambooHREmployee.supervisor
                }
            }));

            if (employees.length > 0) {
                res.json(employees);
            } else {
                res.status(404).send('No employees found');
            }
        } else {
            res.status(404).send('Unexpected response structure from the BambooHR API');
        }
    } catch (error: any) {
        console.error('Error calling BambooHR API:', error.message);
        res.status(500).send('Internal Server Error');
    }
};
