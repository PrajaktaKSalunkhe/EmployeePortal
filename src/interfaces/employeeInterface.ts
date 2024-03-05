export interface Employee {
    id: string;
    first_name: string;
    last_name: string;
    name: string;
    display_name: string;
    date_of_birth?: Date | string;
    avatar_url?: string;
    personal_phone_number: string;
    work_email: string;
    job_title?: string;
    department: string;
    hire_date?: Date | string;
    tenure?: string | number;
    work_anniversary?: string;
    employments: {
      start_date: string | number;
      title: string;
      manager_id: string;
    };
  }