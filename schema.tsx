import * as Contacts from "expo-contacts";

import { KeyboardTypeOptions } from "react-native";

export interface FormRow {
  key: string;
  label: string;
  keyboardType?: KeyboardTypeOptions;
}

export interface FormRowProps extends FormRow {
  value: string; // from useState hook
  setValue: React.Dispatch<React.SetStateAction<string>>; // from useState hook
}

export interface IncludeInfoRowProps extends FormRow {
  isEnabled: boolean; // from useState hook
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>; // from useState hook
}

export interface InfoSchema {
  firstName: string;
  lastName: string;
  personalEmail: string;
  personalPhone: string;
  workEmail: string;
  workCompany: string;
  workRole: string;
}

export interface SomeInfoSchema {
  firstName?: string;
  lastName?: string;
  personalEmail?: string;
  personalPhone?: string;
  workEmail?: string;
  workCompany?: string;
  workRole?: string;
}

export interface InfoIncludedSchema {
  firstName: boolean;
  lastName: boolean;
  personalEmail: boolean;
  personalPhone: boolean;
  workEmail: boolean;
  workCompany: boolean;
  workRole: boolean;
}

export const schema: FormRow[] = [
  {
    key: "firstName",
    label: "First Name",
    keyboardType: "default",
  },
  {
    key: "lastName",
    label: "Last Name",
    keyboardType: "default",
  },
  {
    key: "personalEmail",
    label: "Personal Email",
    keyboardType: "email-address",
  },
  {
    key: "personalPhone",
    label: "Personal Phone",
    keyboardType: "phone-pad",
  },
  {
    key: "workEmail",
    label: "Work Email",
    keyboardType: "email-address",
  },
  {
    key: "workCompany",
    label: "Company",
    keyboardType: "default",
  },
  {
    key: "workRole",
    label: "Job Title",
    keyboardType: "default",
  },
];
