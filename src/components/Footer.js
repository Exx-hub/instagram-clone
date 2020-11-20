import React, { useState } from "react";
import "../styles/Footer.css";
import ImageUpload from "./ImageUpload";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";

function Footer({ user }) {
	const [show, setShow] = useState(false);
	return (
		<div className="footer">
			{user ? (
				<AddToPhotosIcon
					className="footer__icon"
					onClick={() => setShow(!show)}
				/>
			) : (
				<h3>Sign up or login to upload :)</h3>
			)}
			{show && <ImageUpload username={user?.displayName} setShow={setShow} />}
		</div>
	);
}

export default Footer;
