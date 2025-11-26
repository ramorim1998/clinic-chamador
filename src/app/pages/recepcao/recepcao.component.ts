import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Firestore, collection, addDoc, updateDoc, doc, serverTimestamp } from '@angular/fire/firestore';
import { collectionData } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-recepcao',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './recepcao.component.html',
  styleUrls: ['./recepcao.component.scss'],
})
export class RecepcaoComponent {

  nome = '';
  senha = '';
  sala = '';
  salas = ['Sala ursinho', 'Sala robô', 'Sala princesa'];
  fila: any[] = [];

  constructor(private firestore: Firestore) {
    this.loadFila();
  }

  loadFila() {
    const col = collection(this.firestore, 'chamados');
    collectionData(col, { idField: 'id' })
      .subscribe((items: any[]) => {
        this.fila = items.filter(i => !i.status);
      });
  }

  async cadastrar() {
    const colRef = collection(this.firestore, 'chamados');

    await addDoc(colRef, {
      nome: this.nome,
      sala: this.sala,
      senha: this.senha,
      status: false,
      createdAt: serverTimestamp(),
      chamadoAt: null
    });

    this.nome = '';
    this.senha = '';
    this.sala = '';
  }

  async chamar(p: any) {
    const docRef = doc(this.firestore, 'chamados', p.id);

    await updateDoc(docRef, {
      status: true,
      chamadoAt: serverTimestamp()
    });
  }
}
