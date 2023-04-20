const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const UserModel = require("./models/users.models");
const passport = require("passport");

const GOOGLE_CLIENT_ID =
  '385363050778-p5uriguv5ovdl0t8ephutnod4losdrq1.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

GITHUB_CLIENT_ID = "your id";
GITHUB_CLIENT_SECRET = "your id";

FACEBOOK_APP_ID = "2483293181809291";//"4338773492806334"//
FACEBOOK_APP_SECRET = "43c03cf2d9e62dbb3ca52d531fd8328e";//"19c25cda602ef306bb5031950b360de7"//

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(profile);
      UserModel.findOne({ email: profile.emails[0].value })
        .then(async function (user) {
          if (user) {
            const updatedUser = {
      
              image: { url: profile.photos[0].value },
              email: profile.emails[0].value,
              firstName: profile.name.givenName,
              lastName: profile.name.familyName,
              googleId:profile.id,
              secret: accessToken,
            };
            const result = await UserModel.findOneAndUpdate(
              { _id: user.id },
              { $set: updatedUser },
              { new: true }
            );
            return cb(null, result);
          } else {
            const newUser = new UserModel({
              googleId: profile.id,
              image: { url: profile.photos[0].value },
              email: profile.emails[0].value,
              firstName: profile.name.givenName,
              lastName: profile.name.familyName,
              secret: accessToken,
              role:"PARTICULAR"
            });
            const result = await newUser.save();
            return cb(null, result);
          }
        })
        .catch(function (err) {
          return cb(err);
        });
    }
    
  )
);

passport.use(
  new GithubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback",
      profileFields: [
        "id",
        "displayName",
        "name",
        "picture.type(large)",
        "email",
      ],

    },
    function (accessToken, refreshToken, profile, cb) {
 
     //const email = profile.emails[0].value;
    const image = profile._json.picture.data.url;
    const firstName = profile._json.first_name;
    const lastName = profile._json.last_name;
    console.log("bio: " + profile.emails[0].value);
    cb(null, profile);
    console.log("fb" + Object.entries(profile));

      console.log(JSON.stringify(profile))
      UserModel.findOne({ email: profile.emails[0].value })
      .then(async function (user) {
        if (user) {
          const updatedUser = {
    
            image: { url: profile.photos[0].value },
            email: profile.emails[0].value,
            firstName: profile.displayName,
            googleId:profile.id,
            secret: accessToken,
          };
          const result = await UserModel.findOneAndUpdate(
            { _id: user.id },
            { $set: updatedUser },
            { new: true }
          );
          return cb(null, result);
        } else {
          const newUser = new UserModel({
            googleId: profile.id,
            image: { url: profile.photos[0].value },
            email: profile.emails[0].value,
            firstName: profile.displayName,
            secret: accessToken,
            role:"PARTICULAR"
          });
          const result = await newUser.save();
          return cb(null, result);
        }
      })
      .catch(function (err) {
        return cb(err);
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
