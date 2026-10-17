// Shared Firebase setup + helpers for editor.html, driver.html, index.html, history.html.
// Note: pages import this as an ES module, so serve the folder over http(s) (not file://).
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
export { ref, get, set, update, remove, onValue, onDisconnect, query, orderByKey, limitToLast }
    from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const app = initializeApp({
    apiKey: "AIzaSyAVvYAjwplQaH82ehNXpfK25W3ORikigvE",
    authDomain: "bike-trackerv7.firebaseapp.com",
    databaseURL: "https://bike-trackerv7-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "bike-trackerv7",
    storageBucket: "bike-trackerv7.firebasestorage.app",
    messagingSenderId: "829142915200",
    appId: "1:829142915200:web:cd37f3234ecb850421ae65"
});
export const db = getDatabase(app);

export async function loadMasterData() {
    const snap = await get(ref(db, 'master_transit_data'));
    const d = snap.exists() ? snap.val() : {};
    return { ...d, stops: d.stops || [], routes: d.routes || [], trips: d.trips || [], departures: d.departures || [] };
}

export const esc = (v) => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
