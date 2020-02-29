import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class SharedService {

  isVisible: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {}
}
