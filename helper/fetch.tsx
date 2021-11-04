import { InfoSchema, SomeInfoSchema } from "../schema";

export const fetchQR = async (profileInfo: SomeInfoSchema) => {
  const response = await fetch("http://localhost:3000", {
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
};
