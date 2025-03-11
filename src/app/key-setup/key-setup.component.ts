import { Component, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { inject } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../environments/environment';
import { FormsModule } from '@angular/forms';
import { SESSION_STORAGE } from '../tokens';

@Component({
  selector: 'app-key-setup',
  imports: [FormsModule],
  templateUrl: './key-setup.component.html',
  styleUrl: './key-setup.component.css'
})
export class KeySetupComponent {

  // get the pages of the modal
  @ViewChild('pageOne') pageOne!: ElementRef<HTMLDivElement>;
  @ViewChild('pageTwo') pageTwo!: ElementRef<HTMLDivElement>;

  // modals
	activeModal = inject(NgbActiveModal);
  confirmationModalService = inject(NgbModal);
  private storage = inject(SESSION_STORAGE);

  //variables
  apiEntry : string = '';
    
    open(content: TemplateRef<any>) {
      this.confirmationModalService.open(content, { ariaLabelledBy: 'modal-continue-confirmation', size: 'lg' }).result.then(
        () => {
          //when hitting "confirm"
          this.activeModal.close('no api');
          environment.apiKey = "";
          this.storage.setItem("apiKey", "");
        },
        () => {
          // when dismissing the modal (do nothing)
        },
      );
    }

  changePage(showFirst : boolean)
  {
    this.changePageDisplay(this.pageOne, showFirst);
    this.changePageDisplay(this.pageTwo, !showFirst);

  }

  // makes a passed in element either visible or invisible
  changePageDisplay(page : ElementRef<HTMLDivElement>, shouldShow : boolean)
  {
    if(!shouldShow)
    {
      page.nativeElement.classList.remove('d-block');
      page.nativeElement.classList.add('d-none');

    }
    else
    {
      page.nativeElement.classList.add('d-block');
      page.nativeElement.classList.remove('d-none');

    }
  }
}
