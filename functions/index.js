const admin = require('firebase-admin');
const functions = require('firebase-functions');
const express = require('express')
const cors = require('cors')

admin.initializeApp({
    credential: admin.credential.cert(require('./admin.json'))
});
const db = admin.firestore();

const userApp = express()
userApp.use(cors())
userApp.get('/check', (req, res) => {
    let username = req.query.username
    let name = req.query.name
    let docRef = db.collection('users').doc(username)
    docRef.get().then(doc => {
        if (doc.exists) {
            res.send(true)
        } else {
            docRef.set({
                name: name
            })
            res.send(false)
        }
        return null
    }).catch(error => {
        console.log("Error getting document:", error);
    })
})

const user = functions.https.onRequest(userApp)


const itemApp = express()

itemApp.use(cors())

itemApp.get('/add', (req, res) => {
    let username = req.query.username
    let name = req.query.name
    let category = req.query.category
    let quantity = req.query.quantity
    db.collection('items').add({
        name: name,
        category: category,
        ownerId: username,
        quantity: parseInt(quantity)
    }).then(
        ref => {
            db.collection('users').doc(username).collection('itemIds').doc(ref.id).set({id: ref.id})
            db.collection('categories').doc(category).collection('itemIds').doc(ref.id).set({id: ref.id})

            return db.collection('categories').doc(category).get()
    }).then(
        doc => {
            if (doc.exists) {
                return db.collection('categories').doc(category).set({
                    quantity: (parseInt(quantity) + parseInt(doc.data().quantity)),
                    available: (parseInt(quantity) + parseInt(doc.data().quantity))
                })
            } else {
                return db.collection('categories').doc(category).set({
                    quantity: parseInt(quantity),
                    available: parseInt(quantity)
                })
            }
        }
    ).then(
        () => {
            res.send(true)
            return null
        }
    ).catch(error => {
        console.log("Error getting document:", error);
        res.send(false)
    })
})

itemApp.get('/get', (req, res) => {
    let username = req.query.username
    db.collection('users').doc(username).collection('itemIds').get()
    .then(snapshot => {
        let promises = []
        snapshot.forEach(doc => {
            promises.push(db.collection('items').doc(doc.data().id).get())
        })
        return Promise.all(promises)
    }).then(allDocs => {
        results = []
        allDocs.forEach(doc => {
            results.push(doc.data())
        })
        console.log(results)
        res.send(JSON.stringify(results))
        return null
    }).catch(error => {
        console.log("Error getting document:", error);
        res.send(false)
    })
})

const item = functions.https.onRequest(itemApp)

const requestApp = express()
requestApp.use(cors())

requestApp.get('/add', (req, res) => {
    let username = req.query.username
    let name = req.query.name
    let category = req.query.category
    let quantity = req.query.quantity
    let date = req.query.date

    db.collection('categories').doc(category).get()
    .then(doc => {
        console.log("Test0")
        if (doc.exists) {
            console.log("Test1")
            console.log(doc.data())
            console.log(date)
            if (doc.data().available >= quantity) {
                db.collection('requests').add({
                    name: name,
                    category: category,
                    renteeId: username,
                    quantity: parseInt(quantity),
                    date: date
                }).then(ref =>
                    db.collection('users').doc(username).collection('requestIds').doc(ref.id).set({id: ref.id})
                ).then(() => 
                    db.collection('categories').doc(category).update({
                        available: (parseInt(doc.data().available)- parseInt(quantity))
                })
                ).then(() => {
                    res.send(true)
                    return null
                }).catch(error =>
                    console.log(error)
                )
            }
            else {
                res.send(false)
            }
        } else {
                res.send(false)
        }
        return null
    }).catch(error => {
        console.log("Error getting document:", error);
        res.send(false)
    })
})

requestApp.get('/get', (req, res) => {
    let username = req.query.username
    db.collection('users').doc(username).collection('requestIds').get()
    .then(snapshot => {
        let promises = []
        snapshot.forEach(doc => {
            promises.push(db.collection('requests').doc(doc.data().id).get())
        })
        return Promise.all(promises)
    }).then(allDocs => {
        results = []
        allDocs.forEach(doc => {
            results.push(doc.data())
        })
        console.log(results)
        res.send(JSON.stringify(results))
        return null
    }).catch(error => {
        console.log("Error getting document:", error);
        res.send(false)
    })
})

const request = functions.https.onRequest(requestApp)


const categoryApp = express()
categoryApp.use(cors())

categoryApp.get('/get', (req, res) => {
    db.collection('categories').get()
    .then(snapshot => {
        let results = []
        snapshot.forEach(doc => {
            let temp = doc.data()
            temp.id = doc.id
            results.push(temp)
        })
        res.send(JSON.stringify(results))
        return null
    }).catch(error => {
        console.log(error)
    })
})

const category = functions.https.onRequest(categoryApp)

module.exports = {
  user,
  item,
  request,
  category
}
