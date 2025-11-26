import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Firestore, collection, query, where, orderBy, limit } from '@angular/fire/firestore';
import { collectionData } from '@angular/fire/firestore';

@Component({
  selector: 'app-chamador',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chamador.component.html',
  styleUrls: ['./chamador.component.scss']
})
export class ChamadorComponent {
  temaStyles: any = {};
temaCores: any = {
  espaco: {
    texto: '#ffffff',
    sombra: 'rgba(0,0,0,0.6)',
    destaque: '#9ecbff'
  },
  princesa: {
    texto: '#ff72c6',
    sombra: 'rgba(255,255,255,0.8)',
    destaque: '#ffd6f3'
  },
  robo: {
    texto: '#b6e2ff',
    sombra: 'rgba(0,0,0,0.5)',
    destaque: '#7fb8d8'
  },
  dinossauro: {
    texto: '#c2ffb8',
    sombra: 'rgba(0,70,0,0.7)',
    destaque: '#8ee48c'
  },
  floresta: {
    texto: '#d4ffcb',
    sombra: 'rgba(0,0,0,0.6)',
    destaque: '#a6e89c'
  }
};
  ultimoChamado: any = null;
  historico: any[] = [];
  tema = '';

  constructor(private firestore: Firestore) {
    this.listenChamados();
  }

  listenChamados() {
    const col = collection(this.firestore, 'chamados');

    const q1 = query(
      col,
      where('status', '==', true),
      orderBy('chamadoAt', 'desc'),
      limit(1)
    );

    collectionData(q1, { idField: 'id' }).subscribe((result: any[]) => {

      if (result.length === 0) return;

      const novo = result[0];

      const mudouChamado =
        !this.ultimoChamado ||
        this.ultimoChamado.id !== novo.id ||
        this.ultimoChamado.chamadoAt !== novo.chamadoAt;

      if (mudouChamado) {
        this.ultimoChamado = novo;
        this.sortearTema();
        this.falarChamado(novo);
      }
    });

    const q2 = query(
      col,
      where('status', '==', true),
      orderBy('chamadoAt', 'desc'),
      limit(6)       
    );

    collectionData(q2, { idField: 'id' }).subscribe((result: any[]) => {
      this.historico = result.slice(1);  
      this.historico = [...this.historico];
    });
  }
  desbloquearVoz() {
    const test = new SpeechSynthesisUtterance(" ");
    test.lang = 'pt-BR';
    speechSynthesis.speak(test);
  }

  sortearTema() {
    const temas = Object.keys(this.temaCores);

    this.tema = '';

    setTimeout(() => {
      const escolhido = temas[Math.floor(Math.random() * temas.length)];
      this.tema = escolhido;

      this.temaStyles = this.temaCores[escolhido];
    }, 80);
  }

  falarChamado(paciente: any) {
    if (!paciente) return;

    const frase = `Chamando ${paciente.nome}. Por favor dirigir-se à ${paciente.sala}. Senha ${paciente.senha}.`;

    const utterance = new SpeechSynthesisUtterance(frase);

    utterance.lang = 'pt-BR';
    utterance.rate = 0.95;
    utterance.pitch = 1.1;
    utterance.volume = 1;

    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  }
}
