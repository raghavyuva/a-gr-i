import React from 'react';
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { Global } from "@emotion/react";

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { CometChatAvatar } from '../../cometchat-chat-uikit-react-master/CometChatWorkspace/src';
import { COMETCHAT_CONSTANTS } from '../../consts';

import {
  wrapperStyle,
  errorStyle,
  titleStyle,
  subtitleStyle,
  userContainerStyle,
  userWrapperStyle,
  thumbnailWrapperStyle,
  uidWrapperStyle,
  inputWrapperStyle,
  loginBtn,
} from "./style";

import { loaderStyle } from "./loader";

import * as actions from '../../store/action';

class KitchenSinkApp extends React.PureComponent {

  constructor(props) {
    super(props);

    this.myRef = React.createRef();
  }

  login = (uid) => {
    
    if(!uid) {
      uid = this.myRef.current.value;
    }

    this.uid = uid;
    this.props.onLogin(this.uid, COMETCHAT_CONSTANTS.AUTH_KEY);
  }
  
  render() {

    let loader = null;
    if (this.props.loading) {
      loader = (<div className="loading">Loading...</div>);
    }

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = (<p css={errorStyle()}>{this.props.error.message}</p>);
    }

    let authRedirect = null;
    if (this.props.isLoggedIn) {
      authRedirect = <Redirect to="/" />
    }

    return (
      <React.Fragment>
      <Global styles={loaderStyle} />
      <div css={wrapperStyle()}>
          {authRedirect}
          {loader}
          {errorMessage}
          <p css={titleStyle()}>AGRII</p>
          <p css={subtitleStyle()}>Login with one of our sample users</p>
          <div css={userContainerStyle()}>
            <div css={userWrapperStyle()} onClick={()=>this.login('superhero1')}>
              <div css={thumbnailWrapperStyle()}>
                <CometChatAvatar image='https://www.istockphoto.com/photo/happy-woman-working-gm163067728-23255582?phrase=farmers' />
              </div>
              <p>farmer1</p>
            </div>
            <div css={userWrapperStyle()} onClick={()=>this.login('superhero2')}>
              <div css={thumbnailWrapperStyle()}>
                <CometChatAvatar image='https://www.istockphoto.com/photo/indian-farmer-showing-a-mobile-screen-at-agriculture-field-gm1280271119-378623524?phrase=farmers' />
              </div>
              <p>farmer2</p>
            </div>
            <div css={userWrapperStyle()} onClick={()=>this.login('superhero3')}>
              <div css={thumbnailWrapperStyle()}>
                <CometChatAvatar image='https://www.istockphoto.com/photo/woman-farming-in-agricultural-field-gm1155205784-314415244?phrase=farmers' />
              </div>
              <p>farmer3</p>
            </div>
            <div css={userWrapperStyle()} onClick={()=>this.login('superhero4')}>
              <div css={thumbnailWrapperStyle()}>
                <CometChatAvatar image='https://www.istockphoto.com/photo/farmer-holding-indian-rupee-notes-in-field-gm1093196934-293375860?phrase=farmers' />
              </div>
              <p>farmer4</p>
            </div>
            <div css={userWrapperStyle()} onClick={()=>this.login('superhero5')}>
              <div css={thumbnailWrapperStyle()}>
                <CometChatAvatar image='https://media.istockphoto.com/id/1313421433/photo/farmer-holding-indian-rupee-notes-in-agriculture-field.jpg?s=2048x2048&w=is&k=20&c=UobRAL4elM6qwJgTYC2whKdoEhWHQO3Lq2ys5UfNuY8=' />
              </div>
              <p>farmer5</p>
            </div>
          </div><br/>
          <div css={uidWrapperStyle()}>
            <div>
              <p css={subtitleStyle()}>Login with UID</p>
            </div>
            <div css={inputWrapperStyle()}>
              <input ref={this.myRef} type="text" placeholder="Enter your UID here" />
            </div>
            <div css={loginBtn()}><button type="button" onClick={() => this.login()}>Login</button></div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading,
    error: state.error,
    isLoggedIn: state.isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: ( uid, authKey ) => dispatch( actions.auth( uid, authKey ) )
  };
};

export default connect( mapStateToProps, mapDispatchToProps )( KitchenSinkApp );
