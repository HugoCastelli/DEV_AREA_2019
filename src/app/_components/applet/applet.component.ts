import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, NgForm} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MatStepper} from '@angular/material/stepper';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-applet',
  templateUrl: './applet.component.html',
  styleUrls: ['./applet.component.css']
})
export class AppletComponent implements OnInit {

  @ViewChild('swalSucess', {static: false}) private swalAdd: SwalComponent;
  @ViewChild('swalError', {static: false}) private swalError: SwalComponent;
  @ViewChild('stepper', {static: false}) public stepper: MatStepper;
  // baseUrl = 'http://10.101.52.237:3000';
  baseUrl = 'http://localhost:8080';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }),
    observe: 'response' as 'response'
  };
  isEditable = true;
  services_activated;
  action_input;
  actions_name;
  reaction_input;
  reaction_name;
  actions_var;
  actions;
  reactions;
  isDisabled = {
    name: '',
    disabled: false,
    next: false
  };
  isDisabledReact = {
    name: '',
    disabled: false,
    next: false
  };
  formActions;
  formReactions;
  inputReaction: FormGroup;
  selectDynamic = [];
  selectDynamicReactions = [];

  constructor(public http: HttpClient, private elementRef: ElementRef, private cdr: ChangeDetectorRef, private route: Router) {}

  selectServices(service): void {
    const requestServiceAction = this.baseUrl + '/services/' + service + '/actions';

    if (!this.isDisabled.next) {
      this.http.get(requestServiceAction, this.httpOptions)
        .subscribe((success: any) => {
          this.actions = success.body;
          this.isDisabled = {
            name: service,
            disabled: true,
            next: true
          };
        }, error => {
          console.log(error);
        });
    } else {
      this.isDisabled = {
        name: '',
        disabled: false,
        next: false
      };
      this.actions = undefined;
    }
  }

  selectServicesReact(service): void {
    const requestServiceAction = this.baseUrl + '/services/' + service + '/reactions';

    if (!this.isDisabledReact.next) {
      this.http.get(requestServiceAction, this.httpOptions)
        .subscribe((success: any) => {
          this.reactions = success.body;
          this.isDisabledReact = {
            name: service,
            disabled: true,
            next: true
          };
        }, error => {
          console.log(error);
        });
    } else {
      this.isDisabledReact = {
        name: '',
        disabled: false,
        next: false
      };
      this.reactions = undefined;
    }
  }

  selectActions(actionName): void {
    const requestGetInput = this.baseUrl + '/services/' + this.isDisabled.name + '/actions/' + actionName + '/inputs';

    this.http.get(requestGetInput, this.httpOptions)
      .subscribe((success: any) => {
        this.actions_name = actionName;
        this.action_input = success.body;
        for (let each of this.action_input) {
          if (each.type === 'selectDynamic') {
            this.dynamicSelector(each['function'], each.key, 0, undefined, 0);
            return;
          }
        }
      }, error => {
        console.log(error);
      });
  }

  createReactionForm(nb_input): void {
    this.inputReaction = new FormGroup({});
    for (const formModule of nb_input) {
      this.inputReaction.addControl(formModule.key, new FormControl(''));
    }
    this.inputReaction.valueChanges.subscribe(() => {
      this.cdr.detectChanges();
    });
  }

  test(): void {
    console.log('testdsqqs');
  }

  selectReactions(reactionName) {
    const requestGetInput = this.baseUrl + '/services/' + this.isDisabledReact.name + '/reactions/' + reactionName + '/inputs';

    this.http.get(requestGetInput, this.httpOptions)
      .subscribe((success: any) => {
        this.reaction_input = success.body;
        this.createReactionForm(this.reaction_input);
        this.reaction_name = reactionName;
        for (let each of this.reaction_input) {
          if (each.type === 'selectDynamic') {
            this.dynamicSelectorReact(each['function'], each.key, 0, undefined, 0);
            return;
          }
        }
      }, error => {
        console.log(error);
      });
  }

  dynamicSelectorReact(funct, key, value, form, index): void {
    let body;
    const requestDynamic = this.baseUrl + '/services/' + this.isDisabledReact.name + '/functions/' + funct;

    if (form) {
      body = form;
    } else {
      body = {[key]: value};
    }
    this.http.post(requestDynamic, body, this.httpOptions)
      .subscribe((success: any) => {
        if (this.selectDynamicReactions[index + 1]) {
          for (let each of this.selectDynamicReactions) {
            this.selectDynamicReactions.splice(index + 1, 1);
            if (!this.selectDynamicReactions[index + 1]) {
              this.cdr.detectChanges();
              break;
            }
          }
        }
        this.selectDynamicReactions.push(success.body);
      }, error => {
        console.log(error);
      });
  }

  ngOnInit(): void {
    const requestServices = this.baseUrl + '/users/services';

    this.http.get(requestServices, this.httpOptions)
      .subscribe((success: any) => {
        this.services_activated = Object.keys(success.body);
      }, error => {
        console.log(error);
      });
  }

  onSubmit(form: NgForm): void {
    this.formActions = form.value;
    const requestServices = this.baseUrl + '/services/' + this.isDisabled.name + '/actions/' + this.actions_name + '/outputs';

    this.http.post(requestServices, form.value, this.httpOptions)
      .subscribe((success: any) => {
        this.actions_var = success.body;
        this.stepper.next();
      }, error => {
        console.log(error);
      });
  }

  submitReaction(form: FormGroup): void {
    const input = form.value;

    for (const each of Object.keys(input)) {
      input[each] = input[each].split('<span class="var-bg" contenteditable="false"><img class="var-img" src="assets/services/' + this.isDisabled.name + '.png" alt="">').join('');
      input[each] = input[each].split('<span class="text-capitalize">').join('${');
      input[each] = input[each].split('</span></span>').join('}');
      input[each] = input[each].split('&nbsp;').join(' ');
      input[each] = input[each].split('<div>').join(' ');
      input[each] = input[each].split('</div>').join(' ');
      input[each] = input[each].split('<br>').join(' ');
    }
    this.formReactions = input;
    this.stepper.next();
  }

  formatTitle(text): string {
    let index = 0;
    const newText = text.split('')
      .map(char => {
        const newChar = [];
        if (char === char.toUpperCase()) {
          newChar.push(' ');
        }
        newChar.push(index === 0 ? char.toUpperCase() : char.toLowerCase());
        index += 1;
        return newChar.join('');
      }).join('');

    return newText;
  }

  isDisabledSelector(): any {
  }

  appendDiv(element, variable): void {
    const img = 'assets/services/' + this.isDisabled.name + '.png';

    const template = '<span class="var-bg" contenteditable="false">' + '<img class="var-img" src="' + img + '" alt />' + '<span class="text-capitalize">' + variable + '</span></span>';
    const d1 = this.elementRef.nativeElement.querySelector('#' + element);

    d1.insertAdjacentHTML('beforeend', template);
    this.inputReaction.get(element).setValue(d1.innerHTML);
  }

  dynamicSelector(funct, key, value, form: NgForm, index): void {
    let body;
    const requestDynamic = this.baseUrl + '/services/' + this.isDisabled.name + '/functions/' + funct;

    if (form) {
      body = form;
    } else {
      body = {[key]: value};
    }
    this.http.post(requestDynamic, body, this.httpOptions)
      .subscribe((success: any) => {
        if (this.selectDynamic[index + 1]) {
          for (let each of this.selectDynamic) {
            this.selectDynamic.splice(index + 1, 1);
            if (!this.selectDynamic[index + 1]) {
              this.cdr.detectChanges();
              break;
            }
          }
        }
        this.selectDynamic.push(success.body);
      }, error => {
        console.log(error);
      });
  }

  createArea(name): void {
    const requestArea = this.baseUrl + '/users/areas';

    const body = {
      activated: true,
      name: name.name,
      action: {
        inputData: this.formActions,
        name: this.actions_name,
        serviceName: this.isDisabled.name
      },
      reaction: {
        inputData: this.formReactions,
        name: this.reaction_name,
        serviceName: this.isDisabledReact.name
      }
    };

    this.http.post(requestArea, body, this.httpOptions)
      .subscribe((success: any) => {

        this.swalAdd.fire();
      }, error => {
        console.log(error);
        this.swalError.fire();
      });
  }
}
