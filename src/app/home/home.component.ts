import { Component, inject, afterNextRender } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { KeySetupComponent } from '../key-setup/key-setup.component';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-home',
  imports: [NgbAlertModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router : Router) {

    //writes to the DOM after everything else has, using the client-side (since ngbModal accesses the window, which SSR hates)
    afterNextRender({
      write: () => {
        this.apiSuccess = false;
        this.open();
      }
    });
  }

  buttonClick(name : string) {
    this.router.navigate([name]);
  }

  // setup popup details on initial launch
  private modalService = inject(NgbModal);
  apiSuccess : boolean = false;

  // opens the modal window
	open() {
    
		const modalRef = this.modalService.open(KeySetupComponent, {ariaLabelledBy: 'modal-key-setup', beforeDismiss: this.modalBeforeDismiss}).result.then(
      
      (reason : string) => {
        //when confirmed
        if(reason === "submit api")
        {
          this.apiSuccess = true;

        }
        else
        {
          this.apiSuccess = false;
        }
      },
      () => {
        //when dismissed (do nothing)

      },
      
    );

	}

  // if returns false: the modal will not dismiss
  modalBeforeDismiss() : boolean
  {
    //modal should always be closed, not dismissed
    return false;
  }



}
