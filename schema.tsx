import * as Contacts from "expo-contacts";

import { KeyboardTypeOptions } from "react-native";

// For the form which allows user to input their own profile information
export interface FormRow {
  key: string;
  label: string;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
}

// Extended for purposes of useState hook
export interface FormRowProps extends FormRow {
  value: string; // from useState hook
  setValue: React.Dispatch<React.SetStateAction<string>>; // from useState hook
}

// Extended for purposes of useState hook
export interface IncludeInfoRowProps extends FormRow {
  isEnabled: boolean; // from useState hook
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>; // from useState hook
}

/// The fields included in user's information; intend to add fields in future app versions
export interface InfoSchema {
  firstName: string;
  lastName: string;
  personalEmail: string;
  personalPhone: string;
  workEmail: string;
  workCompany: string;
  workRole: string;
}

// The fields included after a QR code scan; not all fields might be included
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

// The fields for the Professional/Personal Profile edit dialog; on/off switches
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

// Given a profile type (Professional or Personal), returns the default fields to be included
export const getInfoIncludedDefaults = (profile: string): InfoIncludedSchema => {
  if (profile === "Professional") {
    return profileDefaultProfessional;
  } else if (profile === "Personal") {
    return profileDefaultPersonal;
  } else {
    throw Error;
  }
};
