import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { createBrowserHistory } from 'history';
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

import PrivateRoute from '../../PrivateRoute';

import KitchenSinkApp from '../../defaultPages/KitchenSinkApp';
import HomePage from '../../defaultPages/HomePage';

import * as actions from '../../store/action';

import {
    CometChatUI,
    CometChatConversationList,
    CometChatConversationListWithMessages,
    CometChatUserList,
    CometChatUserListWithMessages,
    CometChatGroupList,
    CometChatGroupListWithMessages,
    CometChatMessages
} from '../../cometchat-chat-uikit-react-master/CometChatWorkspace/src';
import {
    wrapperStyle
} from "./style";
import LandingPage from './LandingPage';
import FarmDoc from './FarmDoc';
import Chatbot from './Chatbot';

const history = createBrowserHistory();

class App extends React.Component {
    state = {
        isLoggedin: false
    }

    componentDidMount() {
        this.props.getLoggedinUser();
    }

    render() {

        return (
            <div css={wrapperStyle()} className=' bg-gradient-to-r from-green-400 via-green-200 to-green-200'>
                <Router history={history}>
                    <Switch>
                        <PrivateRoute path="/embedded-app" component={CometChatUI} />
                        <PrivateRoute path="/conversations" component={CometChatConversationListWithMessages} />
                        <PrivateRoute path="/groups" component={CometChatGroupListWithMessages} />
                        <PrivateRoute path="/users" component={CometChatUserListWithMessages} />
                        <PrivateRoute path="/conversation-list" component={CometChatConversationList} />
                        <PrivateRoute path="/group-list" component={CometChatGroupList} />
                        <PrivateRoute path="/user-list" component={CometChatUserList} />
                        <PrivateRoute path="/messages" component={CometChatMessages} chatWithGroup="supergroup" />
                        <PrivateRoute exact path="/" component={HomePage} />
                        <Route path="/disease" component={FarmDoc}/>
                        <Route path="/login" component={KitchenSinkApp} />
                        <Route path="/explore" component={LandingPage} />
                        <Route path="/chat" component={Chatbot} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getLoggedinUser: () => dispatch(actions.authCheckState())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
