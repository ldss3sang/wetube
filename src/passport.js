import passport from "passport";
import GithubStrategy from "passport-github";
import FacebookStrategy from "passport-facebook";
import dotenv from "dotenv";
import User from "./models/User";
import {
  githubLoginCallback,
  facebookLoginCallback
} from "./controllers/userController";
import routes from "./routes";

dotenv.config();

const hostURL = process.env.PRODUCTION
  ? process.env.HOST_URL_PRD
  : process.env.HOST_URL;

passport.use(User.createStrategy());

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `${hostURL}${routes.githubCallback}`
    },
    githubLoginCallback
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FB_ID,
      clientSecret: process.env.FB_SECRET,
      callbackURL: `${hostURL}${routes.facebookCallback}`,
      profileFields: ["id", "displayName", "photos", "email"],
      scope: ["public_profile", "email"]
    },
    facebookLoginCallback
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
