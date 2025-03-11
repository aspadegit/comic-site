import { Component, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { inject, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-key-setup',
  imports: [],
  templateUrl: './key-setup.component.html',
  styleUrl: './key-setup.component.css'
})
export class KeySetupComponent {
	activeModal = inject(NgbActiveModal);

  confirmationModalService = inject(NgbModal);
    
    open(content: TemplateRef<any>) {
      this.confirmationModalService.open(content, { ariaLabelledBy: 'modal-continue-confirmation', size: 'lg' }).result.then(
        () => {
          //when hitting "confirm"
          this.activeModal.close('no api');
        },
        () => {
          // when dismissing the modal (do nothing)
        },
      );
    }

  // get the pages of the modal
  @ViewChild('pageOne') pageOne!: ElementRef<HTMLDivElement>;
  @ViewChild('pageTwo') pageTwo!: ElementRef<HTMLDivElement>;

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
