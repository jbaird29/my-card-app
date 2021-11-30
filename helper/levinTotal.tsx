import * as Contacts from "expo-contacts";
import leven from "leven";

export const levinTotal = (c: Contacts.Contact, fName: string, lName: string): number => {
  fName = fName || "";
  lName = lName || "";
  const fNameLevin = leven(c.firstName || "", fName);
  const lNameLevin = leven(c.lastName || "", lName);
  return fNameLevin / 2 + lNameLevin; // weight the last name more heavily than the first name
};
