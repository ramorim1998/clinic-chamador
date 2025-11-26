import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, query, orderBy, limit } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class CallsService {
constructor(private firestore: Firestore) {}


  addCall(call: any) {
    const col = collection(this.firestore, 'calls');
    return addDoc(col, { ...call, createdAt: new Date() });
  }


  latestCall(): Observable<any[]> {
    const q = query(collection(this.firestore, 'calls'), orderBy('createdAt', 'desc'), limit(1));
    return collectionData(q, { idField: 'id' }) as Observable<any[]>;
  }


  lastFive(): Observable<any[]> {
    const q = query(collection(this.firestore, 'calls'), orderBy('createdAt', 'desc'), limit(5));
    return collectionData(q, { idField: 'id' }) as Observable<any[]>;
  }
}