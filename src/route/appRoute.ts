import Account from "../pages/account/Account";
import Home from "../pages/home/Home";
import UserDetail from "../pages/userDetail/UserDetail";

export const routes = [
  {
    title: "Home",
    path: "/",
    component: Home,
  },
  {
    title: "Account",
    path: "account",
    component: Account,
  },
  {
    title: "User Detail",
    path: "user/:id",
    component: UserDetail,
  },
];
