import { Cliente } from "../../models/Cliente";
import { db } from "../../firebase";
import { collection, deleteDoc, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";


const useCliente = () => {

    const post = async (cliente: Cliente, resetForm: () => void) => {
        if (cliente) {
            const usersRef = collection(db, "clientes");
            const q = query(
                usersRef,
                where("cpf", "==", cliente.cpf),
                where("idUsuario", "==", cliente.idUsuario)
            );
    
            const querySnapshot = await getDocs(q);
    
            if (querySnapshot.empty) {
                const novoDocRef = doc(usersRef);
                await setDoc(novoDocRef, cliente);
                resetForm();
                alert('Cliente cadastrado com sucesso!');
            } else {
                alert('Cpf já cadastrado para um cliente')
            }
        }
    }
    
    const update = async (cliente: Partial<Cliente>) => {
        const usersRef = collection(db, "clientes");
        const q = query(
            usersRef,
            where("cpf", "==", cliente.cpf),
            where("idUsuario", "==", cliente.idUsuario)
        );
        const snapshot = await getDocs(q);
        const docRef = doc(db, "clientes", snapshot.docs[0].id);
        await updateDoc(docRef, cliente);
        alert('Cliente atualizado com sucesso!')
    }
    
    const get = async (idUsuario: string): Promise<Cliente[]> => {
        const usersRef = collection(db, "clientes");
        const q = query(usersRef, where('idUsuario', '==', idUsuario));
        const querySnapshot = await getDocs(q);
        const data: Cliente[] = new Array
        querySnapshot.forEach(doc => data.push(doc.data() as Cliente));
        return data;
    }
    
    const delet = async (cliente: Cliente) => {
        const usersRef = collection(db, "clientes");
        const q = query(
            usersRef,
            where("cpf", "==", cliente.cpf),
            where("idUsuario", "==", cliente.idUsuario)
        );
    
        const querySnapshot = await getDocs(q);
        const deletePromises = querySnapshot.docs.map((documento) => 
            deleteDoc(doc(db, "clientes", documento.id))
        );
    
        await Promise.all(deletePromises);
        alert('Cliente deletado com sucesso!');
    };

    return {
        post,
        update,
        get,
        delet
    }

}

export default useCliente;