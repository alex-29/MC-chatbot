loginAdmin = "mongoAdmin";
passwordAdmin = "mongoAdmin";
loginUser = "mongoUser";
passwordUser = "mongoUser";

database="chatbotdb";

db = connect("localhost:27017/admin");
if(db.system.users.find({user: loginAdmin}).count() === 0) {
	db.createUser(
		{
			user: loginAdmin,
			pwd: passwordAdmin,
			roles: [ "root" ]
		}
	);
}

db = db.getSiblingDB(database);

try {

	if(db.system.users.find({user: loginUser}).count() === 0) {
		db.createUser({
			user: loginUser,
			pwd: passwordUser,
			roles: [ { role: "readWrite", db: database } ]
		});
	} else {
		db.grantRolesToUser(loginUser, [{ role: "readWrite", db: database }]);
	}
} catch(err) {
	print(err);
}
