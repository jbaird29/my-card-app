import { InfoSchema, InfoToSaveSchema } from "../schema";

export const fetchQR = async (profileInfo: InfoToSaveSchema) => {
  console.log(`Fetching QR for: ${JSON.stringify(profileInfo)}`);
  try {
    const response = await fetch("https://qr-generator290.herokuapp.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileInfo),
    });
    if (response.ok) {
      return await response.text();
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};
