import admin from "firebase-admin";
// import serviceAccount from './firebaseServiceAccountKey.json' assert { type: 'json' };

const serviceAccount = {
  type: "service_account",
  project_id: "ai-news-service-20290",
  private_key_id: "a2132a703b16ef7dc9d3169439256b6b96105d22",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC4x7brNb1qLfaC\ncyAO7bO3wEG1FGn+ckxWnEe1ayaJyWCQ4fRo3RI87LubA+UiQtA3NQImORGmJzF1\nER43WHNDppIAa6rt7rbY490QnA+gJ8AWtVbFG9ZILTApdBOzyl1XzSF+AxiIvtHZ\nMk8Q16jRM/F/Ysvex1RehGwnDeB8Jli6dQBr+1guUPXNY6VY6s83SYjwCphArmah\ngUPZwUNNtD+q3dMNbcL7Q/7lvreJJY7dtndyOBmrMbn2Iffzqf1Wb2vcsRMKI2RK\nkFJz1ej6xg9y0EFoP7v5GdS7dPOd7wYbvm/7/Swt2trn/Ejs0Xeywufq/NdSIdEa\nqrNJHmqfAgMBAAECggEAAxwpxyDept23FjX9vxhlMwNQg3CU1nxgoqNG1BAuTkfW\n/6ZbwW22wNLwefSVyDM/9LjT6AYmsPCiNQ61BLb/iI7pkHKz1L903NhNsbbrFJc4\nI5VXrHvlO3EfoIgTwP9UzyKNUVlpiRKUCPln7nPGaU0tjlWjlW10cB5FGKTQ1JMq\nKXptYOyAxeQ3h92NPR+S9WAKwVmi0kt1DxYkwgNQVpL88Sf3sD+jwapFidWrZbUu\nyAsWeUEtNDt0TCLFV09G+R/qpVL/Y+z7WXcTnauWo1kJw/lSYoymyz8Znd/D0vmT\nJSmN35R1ToRdc3UlQUeemA2hLq317UDQ2PCEZjRWKQKBgQD7iotD+WT7zTrFJn5F\neFpULcNlVR24HzJzpP6D0J5qQ8RzdknPeYeKeGbBTzi6WnXy2Z9R9RO0fzn8SOYy\nYIQpDisR4jUV/G6KLRYzCwRJfFJkghg7A5bH8/PXJd25Lrh4NHD3B1m0p4JaT7+X\nr6d7QzG2kv2rjuukP8K6m/pieQKBgQC8DjgLkf++s8DdPZWQ4VtYis48AniKRogt\nmUTEUxdaGppNZqJwda8L9Dsn7+7pSzQJkh/+TZfd8LUKlNEtKSxzrGUbi2YEaeUV\nNtABwueZeXwBzO0GmjiLZQjXyswY+ssXogrYaACs23W4g/h2fG+sJauNtHsh3CAi\nrdbbC22v1wKBgD3HaSzos8SkQyroqVqmlIjYNIVOwl3WS63beCcntcCjpDw3cSlj\nz8ZSi+ouauBaF13t1RNr/cr29GbiAKeezNbIhAuAY0ljFkMZj7o5mnPx9Mp6qTjV\nSNMTN3A//JTexK/BMX16cK3N9lX4ADZhDeFYP3133JWmJHnSryDl7jkBAoGAHt3i\nmxuSs7WDcYz7MLWcrbLS2Qy6xk9/aKSgoezVh2eYbh3ribP3UGn9D7gVKdu7JdsD\nP1VzGO26eYslrlj0v+PLELNXwl+zR0Eg8TkRlKJZFV6ShSPpJhAmXG0gBPWdQjrJ\ntu2TNswqzWdz79bK6aGhP/ggwdUEvUx1WKzOiy8CgYEAhjkbXYYGMGbxZS4MT6J0\njQbZjrrDAhY8h3kRWTxY8AmELE5Tp6c99fXVILkdtUeJ+KFphFtxLoDy1fTZ/+7O\naRU7TWD32VMJpygjNogiWRFP220HP5xv361tSb+pj8dlIvo6h4yHgeq6kve8NrUE\n92In+jUzYyUKff/i8uhEzoI=\n-----END PRIVATE KEY-----\n",
  client_email:
    "firebase-adminsdk-fbsvc@ai-news-service-20290.iam.gserviceaccount.com",
  client_id: "113390740631115290554",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40ai-news-service-20290.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://news-db-1ea0a-default-rtdb.firebaseio.com/",
});

const db = admin.firestore();
const auth = admin.auth();

export { auth, db };
