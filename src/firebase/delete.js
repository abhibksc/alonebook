const admin = require('./firebaseAdmin');

async function deleteAllUsers(nextPageToken) {
  try {
    const listUsersResult = await admin.auth().listUsers(1000, nextPageToken);
    const deleteUserPromises = listUsersResult.users.map(userRecord => 
      admin.auth().deleteUser(userRecord.uid)
        .then(() => console.log('Successfully deleted user', userRecord.uid))
        .catch(error => console.log('Error deleting user:', userRecord.uid, error))
    );

    await Promise.all(deleteUserPromises);

    if (listUsersResult.pageToken) {
      await deleteAllUsers(listUsersResult.pageToken);
    }
  } catch (error) {
    console.error('Error listing users:', error);
  }
}

// Start the deletion process
deleteAllUsers();
