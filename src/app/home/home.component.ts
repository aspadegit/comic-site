import { Component, inject, afterNextRender, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { KeySetupComponent } from '../key-setup/key-setup.component';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../environments/environment';
import { SESSION_STORAGE } from '../tokens';
@Component({
  selector: 'app-home',
  imports: [NgbAlertModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  private apiKey : string | null = '';

  constructor(private router : Router) {

    //writes to the DOM after everything else has, using the client-side (since ngbModal accesses the window, which SSR hates)
    afterNextRender({

      //read from DOM, before write
      earlyRead: () => {
        this.apiKey = this.storage.getItem("apiKey");
      },
      //write to DOM
      write: () => {
        this.apiConfirm = false;
        
        // open the api key modal if it's not already set
        if(this.apiKey == null || this.apiKey == '')
        {
          this.open();
        }
      }
    });
  }

  buttonClick(name : string) {
    this.router.navigate([name]);
  }

  // setup popup details on initial launch
  private modalService = inject(NgbModal);
  private storage = inject(SESSION_STORAGE);
  apiConfirm : boolean = false; // when true: shows alert
  apiLength : number = 0; // checks if has been sanitized or not

  // opens the modal window
	open() {
    
		const modalRef = this.modalService.open(KeySetupComponent, {ariaLabelledBy: 'modal-key-setup', beforeDismiss: this.modalBeforeDismiss}).result.then(
      
      // on close
      (reason : string) => {
        if(reason === "no api")
        {
          this.apiConfirm = false;
          environment.apiKey = "";
          this.storage.setItem("apiKey", "");
        }
        // api key is passed as reason
        else
        {
          // check the api key, and set it if it's successful
          let sanitizedKey = this.sanitizeApiKey(reason);
          this.apiLength = sanitizedKey.length;
          this.apiConfirm = true; 

          if(this.apiLength > 0)
          {
            environment.apiKey = sanitizedKey;
            this.storage.setItem("apiKey", sanitizedKey);
  
          }
          
        }
      },
      () => {
        //when dismissed (do nothing)

      },
      
    );

	}



  // clean whitespace from & sanitize the key
  sanitizeApiKey(key : string) : string
  {
    //sanitize special characters
    let specialChars = key.match(/[#-.]|[[-^]|[?|{}]|<|>/g);

    //found a special character, return early
    if(specialChars != null)
    {
      if(specialChars.length > 0)
        return '';
      
      return '';
    }

    let keyNoWhitespace = key.replace(/\s/g, '');

    return keyNoWhitespace;
  }

  // if returns false: the modal will not dismiss
  modalBeforeDismiss() : boolean
  {
    //modal should always be closed, not dismissed
    return false;
  }



}
