import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import { first } from 'rxjs';
import {
  IColumnSorting,
  SortDirection,
} from '../models/gtable/icolumn-sorting.model';

const rotate: { [key in SortDirection]: SortDirection } = {
  asc: 'desc',
  desc: '',
  '': 'asc',
};

@Directive({
  selector: '[tableEnhanced]',
  /* host: {
     '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"', 
     '(click)': 'rotate($event)', 
  }, */
})
export class TableDirective implements OnInit, AfterViewInit, OnDestroy {
  //   @Input() width?: number;
  @Input() scrollX?: boolean;
  @Input() scrollY?: number;
  //@ViewChildren('th') tableHeaders!: QueryList<ElementRef>;
  //@ContentChildren('th') thElements!: QueryList<ElementRef>;

  @Output() changeSort = new EventEmitter<IColumnSorting>();

  /* rotate(event: KeyboardEvent) {
    debugger;
        let sorting: IColumnSorting;

    this.direction = rotate[this.direction];

    sorting = {
      multi: event.shiftKey,
      column: this.column,
      direction: this.direction,
    };   
  } */

  private tableWrapper!: ElementRef<HTMLElement>;
  private headerScroll!: ElementRef<HTMLElement>;
  private header!: ElementRef<HTMLElement>;
  private bodyScroll!: ElementRef<HTMLElement>;
  private body!: ElementRef<HTMLElement>;

  private scrollListener: (event: any) => void;
  //private sortListener: (event: any) => void;

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private ngZone: NgZone
  ) {


    // Crea la funzione di gestione dell'evento scroll
    this.scrollListener = (event: any) => {
      //solo se orizzintale deve eseguire il codice
      const target = event.target as HTMLElement;
      const htmlHeaderScroll = this.headerScroll as unknown as HTMLElement;

      htmlHeaderScroll.scrollLeft = target.scrollLeft;
    };
    // Crea la funzione di gestione dell'evento sort
    /* this.sortListener = (event: KeyboardEvent) => {
      debugger;
      const target = event.target as HTMLElement;
      const sortDirection = target.getAttribute('direction') as SortDirection;
      const column = target.getAttribute('column') ?? '';
      this.renderer.setAttribute(target, 'direction', rotate[sortDirection]);
      this.changeSort.emit({
        multi: event.shiftKey,
        column: column,
        direction: rotate[sortDirection],
      });
    }; */
  }

  ngOnDestroy(): void {
    // Rimuovi l'ascoltatore di evento scroll quando la direttiva viene distrutta
    (this.bodyScroll as unknown as HTMLElement).removeEventListener(
      'scroll',
      this.scrollListener
    );
    // Rimuovi l'ascoltatore di evento sort quando la direttiva viene distrutta
    /* (this.header as unknown as HTMLElement)
      .querySelectorAll('[sortable]')
      .forEach((element) =>
        element.removeEventListener('click', this.sortListener)
      ); */
  }
  ngAfterViewInit(): void {}

  ngOnInit() {
    const nativeElement = this.elementRef.nativeElement; //this is the element to wrap
    const parentNode = nativeElement.parentNode; //this is the parent containing el
    this.tableWrapper = this.renderer.createElement('div');

    //Scrollable wrapper for header
    this.headerScroll = this.renderer.createElement('div');
    this.renderer.addClass(this.headerScroll, 'overflow-hidden');
    this.renderer.addClass(this.headerScroll, 'header-scroll');

    //Header
    this.header = this.renderer.createElement('div');
    this.renderer.addClass(this.header, 'fw-bold');
    this.renderer.addClass(this.header, 'mb-2');

    //Columns of header
    const thElementsRef = Array.from(
      this.elementRef.nativeElement.getElementsByTagName('th')
    ).map((element) => new ElementRef(element));
    thElementsRef.forEach((elementRef: ElementRef) => {
      const div = this.renderer.createElement('div');
      this.renderer.addClass(div, 'd-inline-block');
      this.renderer.addClass(div, 'ps-2');
      this.renderer.setProperty(
        div,
        'innerHTML',
        elementRef.nativeElement.innerHTML
      );
      this.renderer.appendChild(this.header, div);
    });

    //Scrollable wrapper for body
    this.bodyScroll = this.renderer.createElement('div');
    (this.bodyScroll as unknown as HTMLElement).addEventListener(
      'scroll',
      this.scrollListener
    );

    //Body
    this.body = this.renderer.createElement('div');
    this.renderer.setStyle(this.body, 'height', this.scrollY + 'px');

    //Add table wrapper
    this.renderer.appendChild(parentNode, this.tableWrapper); //set width external, if required, otherwise use parentNode

    //Add scrollable header
    this.renderer.appendChild(this.headerScroll, this.header);
    this.renderer.appendChild(this.tableWrapper, this.headerScroll);

    //Wrap table
    this.renderer.appendChild(this.body, nativeElement);
    this.renderer.appendChild(this.bodyScroll, this.body);
    this.renderer.appendChild(this.tableWrapper, this.bodyScroll);

    //When table rendered, set width for header scrollable columns
    this.ngZone.onStable.pipe(first()).subscribe(() => {
      let totalWidth = 0;
      let totalHeight = 0;

      if (this.scrollX) {
        const thElements: HTMLElement[] =
          this.elementRef.nativeElement.querySelectorAll('thead > tr > th');

        //Take total width
        thElements.forEach((header: HTMLElement, index: number) => {
          let cW = parseInt(header.getAttribute('width') ?? '');
          cW = isNaN(cW) ? header.clientWidth : cW;
          totalWidth += cW;
        });
      }

      if (this.scrollY) {
        const trElements: HTMLElement[] =
          this.elementRef.nativeElement.querySelectorAll('tbody > tr');

        //Take total height
        trElements.forEach((header: HTMLElement, index: number) => {
          let cH = parseInt(header.getAttribute('height') ?? '');
          cH = isNaN(cH) ? header.clientHeight : cH;
          totalHeight += cH;
        });
      }

      const overflowXScroll = this.scrollX
        ? totalWidth > parentNode.offsetWidth
        : false;
      //const overflowYScroll = this.scrollY ? totalHeight > this.scrollY : false;
      const overflowYScroll = this.scrollY;

      if (overflowXScroll) {
        this.renderer.setStyle(
          this.header,
          'width',
          totalWidth + (overflowYScroll ? 25 : 0) + 'px'
        );
        this.renderer.setStyle(this.body, 'width', totalWidth + 'px');
      }

      if (overflowXScroll && overflowYScroll)
        this.renderer.addClass(this.bodyScroll, 'overflow-scroll');
      else if (overflowXScroll)
        this.renderer.addClass(this.bodyScroll, 'overflow-x-scroll');
      else if (overflowYScroll)
        this.renderer.addClass(this.bodyScroll, 'overflow-y-scroll');

      //Set header column
      const thElements: HTMLElement[] =
        this.elementRef.nativeElement.querySelectorAll('thead > tr > th');
      thElements.forEach((header: HTMLElement, index: number) => {
        const htmlHeader = this.header as unknown as HTMLElement;
        const el = htmlHeader.childNodes[index] as HTMLElement;
        this.renderer.addClass(el, 'column-header');
        const column = header.getAttribute('column');
        if (column) this.renderer.setAttribute(el, 'column', column);
        if (header.hasAttribute('sortable'))
          this.renderer.setAttribute(el, 'sortable', '');
        const direction = header.getAttribute('direction');
        if (direction) this.renderer.setAttribute(el, 'direction', direction);
        el.style.width = header.clientWidth + 'px';
      });
      /*  (this.header as unknown as HTMLElement)
        .querySelectorAll('[sortable]')
        .forEach((element) =>
          element.addEventListener('click', this.sortListener)
        ); */

      this.renderer.setStyle(
        this.elementRef.nativeElement.getElementsByTagName('thead')[0],
        'visibility',
        'collapse'
      );
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    //Set header column width
    const thElements: HTMLElement[] =
      this.elementRef.nativeElement.querySelectorAll('thead > tr > th');
    thElements.forEach((header: HTMLElement, index: number) => {
      const htmlHeader = this.header as unknown as HTMLElement;
      const el = htmlHeader.childNodes[index] as HTMLElement;
      el.style.width = header.clientWidth + 'px';
    });
  }
  @HostListener('body:click', ['$event'])
  onSort(event: KeyboardEvent) {
    let v = Array.from(
      (this.header as unknown as HTMLElement).querySelectorAll('[sortable]')
    );
    if (v.some((elem) => event.target === elem)) {
      debugger;
      const target = event.target as HTMLElement;
      const sortDirection =
        (target.getAttribute('direction') as SortDirection) ?? '';
      const column = target.getAttribute('column') ?? '';
      this.renderer.setAttribute(target, 'direction', rotate[sortDirection]);

      if (!event.shiftKey) {
        v.forEach((elem) => {
          if (target !== elem) this.renderer.removeAttribute(elem, 'direction');
        });
      }

      this.changeSort.emit({
        multi: event.shiftKey,
        column: column,
        direction: rotate[sortDirection],
      });
    }

    /* if (event.target) {
      this.rotate(event as KeyboardEvent);
    } */
  }
}

//this.renderer.insertBefore(parentNode, divScrollable, nativeElement); //here we place div before el
