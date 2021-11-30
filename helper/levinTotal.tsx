import * as Contacts from "expo-contacts";
import leven from "leven";

export default function levinTotal(c: Contacts.Contact, fName: string, lName: string): number {
  fName = fName || "";
  lName = lName || "";
  const fNameLevin = leven(c.firstName || "", fName);
  const lNameLevin = leven(c.lastName || "", lName);
  return fNameLevin / 2 + lNameLevin; // scale down first name, so "Tom" and "Thomas" differences matter less
}
