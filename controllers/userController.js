import routes from "../routes";


export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });
export const postJoin = (req, res) => {
    console.log(req.body);
    const { body: { name, email, password, password2 }} = req;
    if(password !== password2) {
        res.status(400);
    } else {
        // Todo: Register User
        // Todo: Log user in
        res.redirect(routes.home);
    }
};

export const getLogin = (req, res) => res.render("login",{ pageTitle: "Log In" });
export const postLogin = (req, res) => {
    // todo: compare input password with database stored password 
    res.redirect(routes.home);
}

export const logout = (req, res) => {
    // todo: Process Log Out
    res.redirect(routes.home);
};

export const userDetail = (req, res) => res.render("userDetail", { pageTitle: "User Detail" });
export const editProfile = (req, res) => res.render("editProfile", { pageTitle: "Edit Profile" });
export const changePassword = (req, res) => res.render("changePassword", { pageTitle: "Change Password" });