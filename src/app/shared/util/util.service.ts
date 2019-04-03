import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { AutofillMonitor } from '@angular/cdk/text-field';

export enum Day {
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
  Sunday = 7,
}

@Injectable({
    providedIn: 'root'
})
export class UtilService {

    ValidateCpf(control: AbstractControl) {
        const cpf = control.value;
        if (cpf) {
          let numbers, digits, sum, i, result, equalDigits;
          equalDigits = 1;
          if (cpf.length < 11) {
          return null;
          }
    
          for (i = 0; i < cpf.length - 1; i++) {
            if (cpf.charAt(i) !== cpf.charAt(i + 1)) {
              equalDigits = 0;
              break;
            }
          }
    
          if (!equalDigits) {
            numbers = cpf.substring(0, 9);
            digits = cpf.substring(9);
            sum = 0;
            for (i = 10; i > 1; i--) {
              sum += numbers.charAt(10 - i) * i;
            }
    
            result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    
            if (result !== Number(digits.charAt(0))) {
              return { cpfNotValid: true };
            }
            numbers = cpf.substring(0, 10);
            sum = 0;
    
            for (i = 11; i > 1; i--) {
              sum += numbers.charAt(11 - i) * i;
            }
            result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    
            if (result !== Number(digits.charAt(1))) {
              return { cpfNotValid: true };
            }
            return null;
          } else {
            return { cpfNotValid: true };
          }
      }
      return null;
    }

    callDialog(dialog, component, title, content, buttonConfirm, buttonCancel, width, person) {
      return dialog.open(component, 
        { panelClass: 'custom-dialog-container', 
          width: width,
          disableClose: true, 
          data: {
            person: person,
            title: title,
            content: content,
            buttonCancel: buttonCancel,
            buttonConfirm: buttonConfirm
          }
      });
    }

    callDialogConfirm(dialog, component, title, content, buttonConfirm, buttonCancel, width) {
      return dialog.open(component, 
        { panelClass: 'custom-dialog-container', 
          width: width,
          disableClose: true, 
          data: {
            title: title,
            content: content,
            buttonCancel: buttonCancel,
            buttonConfirm: buttonConfirm
          }
      });
    }

    getStates() {
      return [ { name: "Acre", initials: "AC"},
              { name: "Alagoas", initials: "AL"},
              { name: "Amapá", initials: "AP"},
              { name: "Amazonas", initials: "AM"},
              { name: "Bahia", initials: "BA"},
              { name: "Ceará", initials: "CE"},
              { name: "Distrito Federal", initials: "DF"},
              { name: "Espírito Santo", initials: "ES"},
              { name: "Goiás", initials: "GO"},
              { name: "Maranhão", initials: "MA"},
              { name: "Mato Grosso", initials: "MT"},
              { name: "Mato Grosso do Sul", initials: "MS"},
              { name: "Minas Gerais", initials: "MG"},
              { name: "Pará", initials: "PA"},
              { name: "Paraíba", initials: "PB"},
              { name: "Paraná", initials: "PR"},
              { name: "Pernambuco", initials: "PE"},
              { name: "Piauí", initials: "PI"},
              { name: "Rio de Janeiro", initials: "RJ"},
              { name: "Rio Grande do Norte", initials: "RN"},
              { name: "Rio Grande do Sul", initials: "RS"},
              { name: "Rondônia", initials: "RO"},
              { name: "Roraima", initials: "RR"},
              { name: "Santa Catarina", initials: "SC"},
              { name: "São Paulo", initials: "SP"},
              { name: "Sergipe", initials: "SE"},
              { name: "Tocantins", initials: "TO"}];
    }    
}