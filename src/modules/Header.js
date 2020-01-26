import React from 'react'
import firebase from 'firebase'
import LogoutButton from './LogoutButton'
import logo from '../forklogosmall.png'
class Header extends React.Component {

    render() {
        return (
            <div 
                style={{
                    textAlign: 'center',
                    backgroundColor: 'white',
                    marginBottom: '50px',
                    height: '200px',
                    paddingTop: '100px'
                }}
            >
                <a href='./forku.html'><img src={logo} alt="Logo" /></a>
                <p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p>
                <LogoutButton></LogoutButton>
            </div>
        )
    }
}

export default Header