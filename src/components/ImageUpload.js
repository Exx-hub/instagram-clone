import React, { useState } from "react";
import "../styles/ImageUpload.css";

import Button from "@material-ui/core/Button";
import { db } from "../firebase";
import { storage } from "../firebase";
import firebase from "firebase/app";

function ImageUpload({ username, setShow }) {
	const [caption, setCaption] = useState("");
	const [image, setImage] = useState(null);
	const [progress, setProgress] = useState(0);

	const handleChange = (e) => {
		if (e.target.files[0]) {
			setImage(e.target.files[0]);
		}
	};

	const handleUpload = () => {
		if (image !== null) {
			const uploadTask = storage.ref(`image/${image.name}`).put(image);
			// uploads the file or image to storage

			uploadTask.on(
				"state_changed",
				(snapshot) => {
					//progress function
					const progress = Math.round(
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100
					);
					setProgress(progress);
				},
				(error) => {
					// error function
					console.log(error);
					alert(error.message);
				},
				() => {
					// complete function
					storage
						.ref("image") // go to images ref above
						.child(image.name) // go to the image name
						.getDownloadURL() // get the download link ready to use
						.then((url) => {
							//post image to db

							db.collection("posts").add({
								timestamp: firebase.firestore.FieldValue.serverTimestamp(),
								caption: caption,
								image: url,
								username: username,
							});

							setProgress(0);
							setImage(null);
							setCaption("");
							setShow(false);
						});
				}
			);
		}
	};
	return (
		<div className="imageUpload">
			<progress value={progress} max="100" />
			<input
				type="text"
				placeholder="enter a caption"
				value={caption}
				onChange={(e) => setCaption(e.target.value)}
				className="imageUpload__caption"
			/>

			<input
				type="file"
				onChange={handleChange}
				className="imageUpload__filePicker"
			/>
			<Button onClick={handleUpload}>Upload</Button>
		</div>
	);
}

export default ImageUpload;
