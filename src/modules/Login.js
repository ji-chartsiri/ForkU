import React from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase'
import Console from './Console'
import logo from '../forklogosmall.png'

class Login extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (!this.props.isSignedIn) {
            return (
                <div 
                    className={''}
                    style={{
                        textAlign: 'center',
                        backgroundColor: 'white',
                        opacity: '50%',
                        height: '500px'
                    }}
                >
                    <div
                    style={{
                        marginTop: '12.5%',
                        paddingTop: '8%'
                    }}>
                        <a href='./forku.html'><img src={logo} alt="Logo" /></a>
                        <div style={{
                            paddingTop:'12px',
                            paddingBottom:'24px'
                        }}>
                            <h1>Earning or Eating ?</h1>
                        <p>You can save the Enviroment with ForkU !</p>
                        </div>
                        <StyledFirebaseAuth uiConfig={this.props.uiConfig} firebaseAuth={firebase.auth()}/>
                    </div>
                </div>
            )
        }
        return (
            <Console 
            items={this.props.items} 
            requests={this.props.requests}
            categories={this.props.categories}
            updateItems={this.props.updateItems} 
            updateRequests={this.props.updateRequests}
            ></Console>
        )
    }
}

export default Login