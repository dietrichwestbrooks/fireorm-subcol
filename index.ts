import 'es6-shim';
import * as admin from 'firebase-admin';
import * as fireorm from 'fireorm';
import { GetRepository } from 'fireorm';
import { Group } from './entities';

import serviceAccount from './serviceAccountKey.json';

const main = async () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://fireorm-geopoint.firebaseio.com'
  });

  const db = admin.firestore();

  const settings = { timestampsInSnapshots: true };
  db.settings(settings);

  fireorm.Initialize(db);

  const repository = GetRepository(Group);

  const group = (await repository.find())[0];
  console.log(group.name);

  const name = group.name;
  group.name = 'New name';
  await repository.update(group);

  group.name = name;
  await repository.update(group);
};

main().then(
  () => {
    process.exit();
  },
  err => {
    console.log(err);
    process.exit();
  }
);
