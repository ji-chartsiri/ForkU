import React from 'react'
import './App.css'
import Login from './modules/Login'
import firebase from 'firebase'
import axios from 'axios'
import LoadingAnination from './modules/LoadingAnimation'

const config = {
  apiKey: 'AIzaSyAlYM4jI_wDeaYcnzzozsXG1pWyhj0b0hQ',
  authDomain: 'forku-dc443.firebaseapp.com'
}
firebase.initializeApp(config)

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false
  }
};

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isSignedIn: false,
      items: [],
      requests: [],
      categories: [],
      isLoaded: false
    }
    this.updateItems = this.updateItems.bind(this)
    this.updateRequests = this.updateRequests.bind(this)
    this.updateCategories = this.updateCategories.bind(this)
  }

  updateItems() {
    axios.get(`https://us-central1-forku-dc443.cloudfunctions.net/item/get?username=${firebase.auth().currentUser.email}`)
    .then(result => {
      this.setState({items: result.data})
      this.updateCategories()
    })
  }

  updateRequests() {
    axios.get(`https://us-central1-forku-dc443.cloudfunctions.net/request/get?username=${firebase.auth().currentUser.email}`)
    .then(result => {
      this.setState({requests: result.data})
      this.updateCategories()
    })
  }

  updateCategories() {
    axios.get(`https://us-central1-forku-dc443.cloudfunctions.net/category/get`)
    .then(result => {
      this.setState({categories: result.data})
    })
  }

  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
      (user) => {
        this.setState({isSignedIn: !!user})
        if (this.state.isSignedIn) {
          axios.get(`https://us-central1-forku-dc443.cloudfunctions.net/user/check?username=${user.email}&name=${user.displayName}`)
          .then(() => {
            return axios.get(`https://us-central1-forku-dc443.cloudfunctions.net/item/get?username=${firebase.auth().currentUser.email}`)
          }
          ).then(result => {
            this.setState({items: result.data})
            return axios.get(`https://us-central1-forku-dc443.cloudfunctions.net/request/get?username=${firebase.auth().currentUser.email}`)
          }).then(result2 => {
            this.setState({requests: result2.data})
            return axios.get(`https://us-central1-forku-dc443.cloudfunctions.net/category/get`)
          }).then(result3 => {
            this.setState({categories: result3.data, isLoaded: true})
          })
        } else {
          this.setState({
            items: [],
            requests: []
          })
        }
      }
    );
  }

  componentWillUnmount() {
    this.unregisterAuthObserver();
  } 

  render() {
    console.log(this.state.categories)
    return (
      <>
        {(this.state.isLoaded || !this.state.isSignedIn) ? <></> : <LoadingAnination></LoadingAnination>}
      <div
      style={{
        height: '100%',
        width: '100%',
        position: 'relative'
      }}>
        <Login 
          config={config} 
          uiConfig={uiConfig} 
          isSignedIn={this.state.isSignedIn} 
          items={this.state.items}
          requests={this.state.requests}
          categories={this.state.categories}
          updateItems={this.updateItems}
          updateRequests={this.updateRequests}>
        </Login>
      </div>
      </>
    );
  }
}

export default App
