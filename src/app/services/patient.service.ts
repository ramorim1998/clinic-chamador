import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, updateDoc, doc, query, where, orderBy, onSnapshot, limit } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class PatientService {

  constructor(private firestore: Firestore) {}

  addPatient(data: { nome: string; sala: string; senha: string }) {
    const ref = collection(this.firestore, 'pacientes');
    return addDoc(ref, {
      ...data,
      status: 'aguardando',
      createdAt: new Date(),
      chamadoAt: null
    });
  }

  callPatient(id: string) {
    const ref = doc(this.firestore, 'pacientes', id);
    return updateDoc(ref, { 
      status: 'chamado',
      chamadoAt: new Date()
    });
  }

  listenToCalled(callback: (paciente: any) => void) {
    const ref = collection(this.firestore, 'pacientes');

    const q = query(
      ref,
      where('status', '==', 'chamado'),
      orderBy('chamadoAt', 'desc'),
      limit(1)
    );

    return onSnapshot(q, snapshot => {
      snapshot.docChanges().forEach(change => {
        callback({ id: change.doc.id, ...change.doc.data() });
      });
    });
  }

  listenToHistory(callback: (pacientes: any[]) => void) {
    const ref = collection(this.firestore, 'pacientes');

    const q = query(
      ref,
      where('status', '==', 'chamado'),
      orderBy('chamadoAt', 'desc'),
      limit(5)
    );

    return onSnapshot(q, snap => {
      const lista = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      callback(lista);
    });
  }
}
