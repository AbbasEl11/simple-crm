import { Injectable, inject, Injector, runInInjectionContext } from '@angular/core';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
import { User } from '../models/user.class';

@Injectable({ providedIn: 'root' })
export class UserService {
  private injector = inject(Injector);
  private firestore = inject(Firestore);

  addUser(user: User) {
    return runInInjectionContext(this.injector, () => {
      const usersCol = collection(this.firestore, 'users');
      return addDoc(usersCol, { ...user });
    });
  }

  getUsers() {
    return runInInjectionContext(this.injector, () => {
      const usersCol = collection(this.firestore, 'users');
      return collectionData(usersCol, { idField: 'id' });
    });
  }
}
