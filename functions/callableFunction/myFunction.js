const functions = require("firebase-functions");
const admin = require("firebase-admin");

if (admin.app.length === 0) {
    admin.initializeApp()

}

exports.myFunction = functions.https.onCall(async (data, context) => {

    if (!data || !context.auth) {
        throw new functions.https.HttpsError("invalid-argument", "Missing required fields: data object and/or user ID. ")
    }

    try {
        return {
            success: true
        }
    } catch (error) {
        console.error("Error calling myFunction:", error);
        throw new functions.https.HttpsError("internal", "internal server error")
    }

});