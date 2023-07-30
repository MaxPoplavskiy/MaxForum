const bcrypt = require("bcrypt");
const LocalStrategy = require('passport-local').Strategy;
const client = require("./db.jsx");


const matchPassword = async (password, hashPassword) => {
  const match = await bcrypt.compare(password, hashPassword);
  return match
};

const emailExists = async (email) => {
  const data = await client.query("SELECT * FROM users WHERE email=$1", [
    email,
  ]);
 
  if (data.rowCount == 0) return false; 
  return data.rows[0];
};

const createUser = async (email, password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
 
  const data = await client.query(
    "INSERT INTO users(email, password) VALUES ($1, $2) RETURNING user_id, email, password",
    [email, hash]
  );
 
  if (data.rowCount == 0) return false;
  return data.rows[0];
};

module.exports = (passport) => {
    passport.use(
        "local-signup",
        new LocalStrategy(
        async (email, password, done) => {
            try {
            const userExists = await emailExists(email)

            if (userExists) {
                return done(null, false);
            }

            const user = await createUser(email, password);
            return done(null, user);
            } catch (error) {
                done(error);
            }
        }
        )
    );
    passport.use(
        "local-login",
        new LocalStrategy(
            async (email, password, done) => {
                try {
                const user = await emailExists(email);
                if (!user) return done(null, false);
                const isMatch = await matchPassword(password, user.password);
                if (!isMatch) return done(null, false);
                return done(null, {id: user.user_id, email: user.email});
                } catch (error) {
                    return done(error, false);
                }
            }
        )
    );
};