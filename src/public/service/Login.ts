import { User } from "../../models/User";
import { collection, query, where, getDocs, setDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

export const checkAndCreateUser = async (user: User) => {
        if (user) {
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("email", "==", user.email));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {  
                await setDoc(doc(db, "users", user.id), {
                    id: user.id,
                    email: user.email,
                    photoUrl: user.photoUrl,
                });
            }
        }
}