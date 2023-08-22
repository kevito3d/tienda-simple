import jwt from "jsonwebtoken";
import { ifExist } from "../controllers/userController";

export const isAuthenticated = async (req, res, next) => {
  // const errors = validationResult(req)
  // if (!errors.isEmpty()) {
  //     return res.status(422).json({ errors: errors.array() })
  // }
  var token = req.headers.authorization;
  console.log("este es el token que esta llegando : ", token);
  if (!token) {
    console.log("por lo tanto debo salir");
    return res.sendStatus(403);
  }
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (decoded) {
      console.log(decoded);
      const { ci } = decoded;
      const user = await ifExist(ci, ci);
      if (user) {
        req.username = user.username;
        next();
      } else {
        res.sendStatus(403);
      }
      /* User.findOne({ _id }).exec()
                .then(users => {
                    console.log("el usuario en el didelware:\n",users);
                    req.user = users;
                    next();
                }) */
    } else {
      res.sendStatus(403);
    }
  });
};
