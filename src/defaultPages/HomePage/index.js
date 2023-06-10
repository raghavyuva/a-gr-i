import React from "react";
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { wrapperStyle, titleStyle, subTitleStyle, componentStyle, boxStyle, titleWrapperStyle, thumbnailWrapperStyle, componentTitleStyle, UIComponentStyle, descWrapperStyle, linkWrapperStyle, linkStyle, logoutBtn } from "./style";

import * as actions from "../../store/action";

import CometChatUI from "./resources/CometChatUI.png";
import Component from "./resources/components.png";
import listComponent from "./resources/wall.png";

class HomePage extends React.Component {
	render() {
		let authRedirect = null;
		if (!this.props.isLoggedIn) {
			authRedirect = <Redirect to="/login" />;
		}

		return (
			<div css={wrapperStyle()} className="">
				{authRedirect}
				<div css={UIComponentStyle()}>
					<div css={boxStyle()}>
						<div css={titleWrapperStyle()}>
							<div css={thumbnailWrapperStyle}>
								{/* <img src={CometChatUI} alt="CometChatUI" /> */}
							</div>
							<h2 css={componentTitleStyle()}>A-GR-I</h2>
						</div>
						<div css={descWrapperStyle()}>
							<p>
								The <code>AGRI</code> component launches a fully working chat application.
							</p>
						</div>
						<ul css={linkWrapperStyle()}>
							<li>
								<Link css={linkStyle()} to="/embedded-app">
									Launch
								</Link>
							</li>
						</ul>
					</div>
				</div>

				<div css={componentStyle()}>
					<div css={boxStyle()}>
						<div css={titleWrapperStyle()}>
							<div css={thumbnailWrapperStyle}>
								{/* <img src={Component} alt="Conversations" /> */}
							</div>
							<h2 css={componentTitleStyle()}>Conversations</h2>
						</div>
						<div css={descWrapperStyle()}>
							<p>
								component launches Conversation list with messaging.
							</p>
						</div>
						<ul css={linkWrapperStyle()}>
							<li>
								<Link css={linkStyle()} to="/conversations">
									Launch
								</Link>
							</li>
						</ul>
					</div>

					<div css={boxStyle()}>
						<div css={titleWrapperStyle()}>
							<div css={thumbnailWrapperStyle}>
								{/* <img src={Component} alt="Groups" /> */}
							</div>
							<h2 css={componentTitleStyle()}>Groups</h2>
						</div>
						<div css={descWrapperStyle()}>
							<p>
								component launches Group list with messaging.
							</p>
						</div>
						<ul css={linkWrapperStyle()}>
							<li>
								<Link css={linkStyle()} to="/groups">
									Launch
								</Link>
							</li>
						</ul>
					</div>

					<div css={boxStyle()}>
						<div css={titleWrapperStyle()}>
							<div css={thumbnailWrapperStyle}>
								{/* <img src={Component} alt="Users" /> */}
							</div>
							<h2 css={componentTitleStyle()}>Users</h2>
						</div>
						<div css={descWrapperStyle()}>
							<p>
								 component launches User list with messaging.
							</p>
						</div>
						<ul css={linkWrapperStyle()}>
							<li>
								<Link css={linkStyle()} to="/users">
									Launch
								</Link>
							</li>
						</ul>
					</div>
				</div>

				<div css={componentStyle()}>
					<div css={boxStyle()}>
						<div css={titleWrapperStyle()}>
							<div css={thumbnailWrapperStyle}>
								{/* <img src={listComponent} alt="Conversation List" /> */}
							</div>
							<h2 css={componentTitleStyle()}>Conversation List</h2>
						</div>
						<div css={descWrapperStyle()}>
							<p>
						 component launches Conversation list.
							</p>
						</div>
						<ul css={linkWrapperStyle()}>
							<li>
								<Link css={linkStyle()} to="/conversation-list">
									Launch
								</Link>
							</li>
						</ul>
					</div>

					<div css={boxStyle()}>
						<div css={titleWrapperStyle()}>
							<div css={thumbnailWrapperStyle}>
								{/* <img src={listComponent} alt="Group List" /> */}
							</div>
							<h2 css={componentTitleStyle()}>Group List</h2>
						</div>
						<div css={descWrapperStyle()}>
							<p>
								
							</p>
						</div>
						<ul css={linkWrapperStyle()}>
							<li>
								<Link css={linkStyle()} to="/group-list">
									Launch
								</Link>
							</li>
						</ul>
					</div>

					<div css={boxStyle()}>
						<div css={titleWrapperStyle()}>
							<div css={thumbnailWrapperStyle}>
								{/* <img src={listComponent} alt="User List" /> */}
							</div>
							<h2 css={componentTitleStyle()}>User List</h2>
						</div>
						<div css={descWrapperStyle()}>
							<p>
								
							</p>
						</div>
						<ul css={linkWrapperStyle()}>
							<li>
								<Link css={linkStyle()} to="/user-list">
									Launch
								</Link>
							</li>
						</ul>
					</div>
				</div>

				<div css={componentStyle()}>
					<div css={boxStyle()} style={{ maxWidth: "33%" }}>
						<div css={titleWrapperStyle()}>
							<div css={thumbnailWrapperStyle}>
								{/* <img src={listComponent} alt="CometChatMessages" /> */}
							</div>
							<h2 css={componentTitleStyle()}>Farmers adda</h2>
						</div>
						<div css={descWrapperStyle()}>
							<p>
							</p>
						</div>
						<ul css={linkWrapperStyle()}>
							<li>
								<Link css={linkStyle()} to="/messages">
									Launch
								</Link>
							</li>
						</ul>
					</div>
				</div>
				
				<div css={logoutBtn()}>
					<button type="button" onClick={this.props.onLogout}>
						Logout
					</button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		loading: state.loading,
		error: state.error,
		isLoggedIn: state.isLoggedIn,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onLogout: () => dispatch(actions.logout()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
