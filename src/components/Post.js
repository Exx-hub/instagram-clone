import React, { useEffect, useState } from "react";
import "../styles/Post.css";
import Avatar from "@material-ui/core/Avatar";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { db } from "../firebase";
import firebase from "firebase/app";

function Post({ user, username, image, caption, postId }) {
	const [comments, setComments] = useState([]);
	const [commentInput, setCommentInput] = useState("");

	const [like, setLike] = useState(false);

	const postComment = (e) => {
		e.preventDefault();

		if (user) {
			db.collection("posts").doc(postId).collection("comments").add({
				text: commentInput,
				username: user.displayName,
				timestamp: firebase.firestore.FieldValue.serverTimestamp(),
			});
		} else {
			alert("Please log in or sign up to add a comment :)");
		}

		setCommentInput("");
	};

	useEffect(() => {
		let unsubscribe;
		if (postId) {
			unsubscribe = db
				.collection("posts")
				.doc(postId)
				.collection("comments")
				.orderBy("timestamp", "asc")
				.onSnapshot((snapshot) => {
					setComments(snapshot.docs.map((doc) => doc.data()));
				});
		}
	}, [postId]);
	return (
		<div className="post">
			<div className="post__header">
				<div className="post__headerLeft">
					<Avatar alt={username} src="asdasd" />
					<h3>{username}</h3>
				</div>
				<MoreHorizIcon fontSize="small" />
			</div>
			<img src={image} alt="post" className="post__image" />

			<div className="post__bottom">
				<div className="post__bottomHeart">
					{like ? (
						<FavoriteIcon color="secondary" onClick={() => setLike(!like)} />
					) : (
						<FavoriteBorderIcon onClick={() => setLike(!like)} />
					)}
				</div>
				<div className="post__bottomTop">
					<h4>{username}</h4>
					<p>{caption}</p>
				</div>
				{comments && (
					<div className="post__comments">
						{comments?.map((comment, index) => (
							<p key={index}>
								<strong>{comment.username}</strong> {comment.text}
							</p>
						))}
					</div>
				)}

				<form className="post__commentForm">
					<input
						className="post__input"
						type="text"
						placeholder="add a comment..."
						value={commentInput}
						onChange={(e) => setCommentInput(e.target.value)}
					/>
					<button
						className="post__button"
						disabled={!commentInput}
						type="submit"
						onClick={postComment}
					>
						Post
					</button>
				</form>
			</div>
		</div>
	);
}

export default Post;
