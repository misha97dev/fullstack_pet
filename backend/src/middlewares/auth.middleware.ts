import { verify } from "jsonwebtoken";
import { UNAUTHORIZED } from "../constants/httpStatus";

export default (req: any, res: any, next: any) => {
  const token = req.headers.access_token as string;
  if (!token) {
    res.status(UNAUTHORIZED).send("Unauthorized!");
  }
  try {
    const decodedUser = verify(token, process.env.JWT_SECRET!);
    req.user = decodedUser;
  } catch (error) {
    res.status(UNAUTHORIZED).send("Unauthorized!");
  }
  return next();
};
