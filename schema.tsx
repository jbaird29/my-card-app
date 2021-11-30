import * as Contacts from "expo-contacts";

import { KeyboardTypeOptions } from "react-native";

export interface FormRow {
  key: string;
  label: string;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
}

export interface FormRowProps extends FormRow {
  value: string; // from useState hook
  setValue: React.Dispatch<React.SetStateAction<string>>; // from useState hook
}

export interface IncludeInfoRowProps extends FormRow {
  isEnabled: boolean; // from useState hook
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>; // from useState hook
}

// TODO - update the schema to match expo-contacts
export interface InfoSchema {
  firstName: string;
  lastName: string;
  personalEmail: string;
  personalPhone: string;
  workEmail: string;
  workCompany: string;
  workRole: string;
}

export interface InfoToSaveSchema {
  m: "c"; // an ID to confirm that the scanned QR code is a mycard QR
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
    autoCapitalize: "words", // 'none', 'sentences', 'words', 'characters'
  },
  {
    key: "lastName",
    label: "Last Name",
    keyboardType: "default",
    autoCapitalize: "words",
  },
  {
    key: "personalEmail",
    label: "Personal Email",
    keyboardType: "email-address",
    autoCapitalize: "none",
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
    autoCapitalize: "none",
  },
  {
    key: "workCompany",
    label: "Company",
    keyboardType: "default",
    autoCapitalize: "words",
  },
  {
    key: "workRole",
    label: "Job Title",
    keyboardType: "default",
    autoCapitalize: "words",
  },
];

const profileDefaultProfessional: InfoIncludedSchema = {
  firstName: true,
  lastName: true,
  personalEmail: false,
  personalPhone: false,
  workEmail: true,
  workCompany: true,
  workRole: true,
};

const profileDefaultPersonal: InfoIncludedSchema = {
  firstName: true,
  lastName: true,
  personalEmail: true,
  personalPhone: true,
  workEmail: false,
  workCompany: false,
  workRole: false,
};

export const getInfoIncludedDefaults = (profile: string): InfoIncludedSchema => {
  if (profile === "Professional") {
    return profileDefaultProfessional;
  } else if (profile === "Personal") {
    return profileDefaultPersonal;
  } else {
    throw Error;
  }
};
