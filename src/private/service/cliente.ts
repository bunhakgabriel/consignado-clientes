import { Cliente } from "../../models/Cliente";
import { db } from "../../firebase";
import { collection, deleteDoc, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";

export const postCliente = async (cliente: Cliente, resetForm: () => void) => {
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

export const updateCliente = async (cliente: Partial<Cliente>) => {
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

export const getCliente = async (idUsuario: string): Promise<Cliente[]> => {
    const usersRef = collection(db, "clientes");
    const q = query(usersRef, where('idUsuario', '==', idUsuario));
    const querySnapshot = await getDocs(q);
    const data: Cliente[] = new Array
    querySnapshot.forEach(doc => data.push(doc.data() as Cliente));
    return data;
}

export const deleteCliente = async (cliente: Cliente) => {
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