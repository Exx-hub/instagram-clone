import { Avatar } from "@material-ui/core";
import React from "react";
import "../styles/Header.css";

import { auth } from "../firebase";
import Button from "@material-ui/core/Button";

function Header({ user, setOpen, setOpenLogin }) {
	return (
		<div className="header">
			<img
				src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
				alt=""
			/>
			<div className="header__right">
				{user ? (
					<Button onClick={() => auth.signOut()}>Signout</Button>
				) : (
					<div>
						<Button onClick={() => setOpen(true)}>Signup</Button>
						<Button onClick={() => setOpenLogin(true)}>Login</Button>
					</div>
				)}
				<Avatar />
			</div>
		</div>
	);
}

export default Header;
