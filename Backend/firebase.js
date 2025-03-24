import admin from "firebase-admin";
// import serviceAccount from './firebaseServiceAccountKey.json' assert { type: 'json' };

const serviceAccount = {
  type: "service_account",
  project_id: "ai-news-service-20290",
  private_key_id: "ca0db85b5b6fb0ea628ef9b93f85fb42e980186a",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDdNysOWMzEelkr\nvVGjTkXsEilpeE07ISMoFk6wMgWvfuII5NWCLTKuPm/BnZV51QVgu3c2DFlht2pq\nwwmz+7Q658r5fdSZei+2+oNXzC+LP/0UsrgFdVs2oXARlG3ftYAdKvOEc2R+Zygv\nYdOQhWWDLOjjIvTaKOnwOVz/HBfb8Ai8m2oFyJtoQJuSHEwuzQigbIcvyZYW3Du3\n1wH/g1uluYx3XVct27j7ArWXkgyLtYAKXxSXQeRcYC2PzHaw1nCckrpNvBRcnQyE\n6GwalN5PG3niPYaR/Jth3NwOw49KFh82VxXLRPm5cIIBJZCszRnJ1br9SRm/nGEt\nTeteIq5RAgMBAAECggEASi4cRZDYhZBDg6vWCu2N+/YxJdl+CHR5vhEQ7PuxNWLW\neEYIJMF0S8LLJgFqZPLefUwP0zN7640eZdOmVtDyZIhi45vi5V54TqMd1Ry22rqn\n6r9tfwMWBbFIC9UarRhHcEB9bW5mhg6ghpcG42EgI8c1BymrMtbib7hEq5VnmMv6\nqAchH0BzDOK1n+UJEtznhkmr28zgA8j2ZO80ea3KYdqf4vrwfGVlXseMQ9zgyRyQ\n54MJZzN1kDCD2M+e65uzXG07D0hZKZIHLVgrVIcRpKF7ayZk4uiwWpbpHQIInq4d\nsUy/UABcF0FKMg0IOOkSdSBpgH/MknmQisM3xW5dOwKBgQD+HscnigAyE9AO89SY\nED0Lm5kaD0MCsxGirtwLbpdgKtVrMAg6i4ufcO67wsT+iWmiIbFmX4SuuAspkGjT\nF9rsPDmtb/H96Ot7nwCljSIVYwYGaeZXWtf9/S/9EBS5Rav1vjiZ03TzhU6lYWfX\nD71IARVEW16kp6H43klPV6CAawKBgQDe2hRKnCXypdydeo0keqh+MLLmrsQ8KuGk\nkw1u8jubZ6K1HkW/WjDQVJTzcuEkMDwy8bxvSz8jItTWaXspP1xph7s8+0qENTsB\n5Jo9NfeOU42IPoMijLPf5h0d2k7OvXWFZBP4SvcxOKpAoAGiaOadBMMcrPSVz91X\n7rVeOg2LMwKBgQC2WPmJisIXLRZoFFliAIz9blrPU1I/dqVZ+mWVonbnH/Vi4+WT\ntRysfYohm2JmT85H9CtrDXGVOiVwXtqJVx3V1GWC6chY7bFEVNVO9lYVyKfDJGyQ\nFHTXIb40tjxYsgDx5tyQrSbHs8m6bInpzbaCG5zaH0JrnopgnYk3cOaQHwKBgQC/\nBHDmLwf8AB2lQnme7iBk4ftG7kC4Tg1Rktat5aYgI+n8k3E3fuheelGehzbiXRIM\nnNZnEzmQNXf4PTvbdDsTHcvpjoAl6LamfbuTgiGq9oVXZjXjNHWuEkGc6BYq8Yy9\nhLX1WtSddTPB5yTfgElEB+PyPXH8w8q3Z55AoUQgrwKBgQD08lhtCIFGbB21m9TQ\n7gusCZptFxI/YkzoIKUabKgWIXM+nBjOqx0hL/OlEhTUw6bHnl7iK+G9ZPn5d0ji\nE+kyHsBpw7nniV52NU6hzMbhyZjV5vt7UPwlADw8UdnhnBHyJR2xnq6whtE3fIld\nhY13Z9ksskFKWm92HX0Kfme3UQ==\n-----END PRIVATE KEY-----\n",
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
