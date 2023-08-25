import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  CheckBoxComponent,
  DatePickerComponent,
  DropdownComponent,
  IDecimalOptions,
  IDropdownItem,
  IDropdownStatus,
  IDropdownType,
  InputComponent,
  RadioBoxComponent,
  TextAreaComponent,
  TimePickerComponent,
} from 'gcomponents';
import { IName } from './models/ilanguage.model';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

import { DateParserFormatterService } from './services/date-parser-formatter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  title = 'gcomponents';
  param = { value: 'world', value2: 'gian' };
  language: string = 'en';
  titleTranslated: string = '';

  decimalOptions: IDecimalOptions;

  names: IName[] = [
    {
      id: 57,
      name: 'Claudia',
    },
    {
      id: 58,
      name: 'Richard',
    },
    {
      id: 59,
      name: 'Edna',
    },
    {
      id: 60,
      name: 'Devin',
    },
    {
      id: 61,
      name: 'Esther',
    },
    {
      id: 62,
      name: 'Douglas',
    },
    {
      id: 63,
      name: 'Gene',
    },
    {
      id: 64,
      name: 'Rena',
    },
    {
      id: 65,
      name: 'Lida',
    },
    {
      id: 66,
      name: 'Lulu',
    },
    {
      id: 67,
      name: 'Rosalie',
    },
    {
      id: 68,
      name: 'Fred',
    },
    {
      id: 69,
      name: 'Adele',
    },
    {
      id: 70,
      name: 'Wayne',
    },
    {
      id: 71,
      name: 'Curtis',
    },
    {
      id: 72,
      name: 'Duane',
    },
    {
      id: 73,
      name: 'Lela',
    },
    {
      id: 74,
      name: 'Willie',
    },
    {
      id: 75,
      name: 'Roy',
    },
    {
      id: 76,
      name: 'Alfred',
    },
    {
      id: 77,
      name: 'Eugenia',
    },
    {
      id: 78,
      name: 'Nelle',
    },
    {
      id: 79,
      name: 'Martha',
    },
    {
      id: 80,
      name: 'Henry',
    },
    {
      id: 81,
      name: 'Herman',
    },
    {
      id: 82,
      name: 'Curtis',
    },
    {
      id: 83,
      name: 'Mason',
    },
    {
      id: 84,
      name: 'Ernest',
    },
    {
      id: 85,
      name: 'Belle',
    },
    {
      id: 86,
      name: 'Billy',
    },
    {
      id: 87,
      name: 'Sally',
    },
    {
      id: 88,
      name: 'Aaron',
    },
    {
      id: 89,
      name: 'Harriett',
    },
    {
      id: 90,
      name: 'Lulu',
    },
    {
      id: 91,
      name: 'Eric',
    },
    {
      id: 92,
      name: 'Dominic',
    },
    {
      id: 93,
      name: 'Helena',
    },
    {
      id: 94,
      name: 'Alberta',
    },
    {
      id: 95,
      name: 'Nannie',
    },
    {
      id: 96,
      name: 'Louis',
    },
    {
      id: 97,
      name: 'Connor',
    },
    {
      id: 98,
      name: 'Bettie',
    },
    {
      id: 99,
      name: 'Viola',
    },
    {
      id: 100,
      name: 'Myrtie',
    },
    {
      id: 101,
      name: 'Violet',
    },
    {
      id: 102,
      name: 'Emily',
    },
    {
      id: 103,
      name: 'Bruce',
    },
    {
      id: 104,
      name: 'Luke',
    },
    {
      id: 105,
      name: 'Ryan',
    },
    {
      id: 106,
      name: 'Timothy',
    },
    {
      id: 107,
      name: 'Larry',
    },
    {
      id: 108,
      name: 'Louisa',
    },
    {
      id: 109,
      name: 'Pauline',
    },
    {
      id: 110,
      name: 'Viola',
    },
    {
      id: 111,
      name: 'Mabel',
    },
    {
      id: 112,
      name: 'Bernard',
    },
    {
      id: 113,
      name: 'Martin',
    },
    {
      id: 114,
      name: 'Adeline',
    },
    {
      id: 115,
      name: 'Georgie',
    },
    {
      id: 116,
      name: 'Curtis',
    },
    {
      id: 117,
      name: 'Cordelia',
    },
    {
      id: 118,
      name: 'Elva',
    },
    {
      id: 119,
      name: 'Flora',
    },
    {
      id: 120,
      name: 'Philip',
    },
    {
      id: 121,
      name: 'Tommy',
    },
    {
      id: 122,
      name: 'Lydia',
    },
    {
      id: 123,
      name: 'Hulda',
    },
    {
      id: 124,
      name: 'Maurice',
    },
    {
      id: 125,
      name: 'Shawn',
    },
    {
      id: 126,
      name: 'Herman',
    },
    {
      id: 127,
      name: 'Francis',
    },
    {
      id: 128,
      name: 'Willie',
    },
    {
      id: 129,
      name: 'Landon',
    },
    {
      id: 130,
      name: 'Michael',
    },
    {
      id: 131,
      name: 'Pearl',
    },
    {
      id: 132,
      name: 'Celia',
    },
    {
      id: 133,
      name: 'William',
    },
    {
      id: 134,
      name: 'Dale',
    },
    {
      id: 135,
      name: 'Brian',
    },
    {
      id: 136,
      name: 'Mark',
    },
    {
      id: 137,
      name: 'Paul',
    },
    {
      id: 138,
      name: 'Janie',
    },
    {
      id: 139,
      name: 'Ian',
    },
    {
      id: 140,
      name: 'Flora',
    },
    {
      id: 141,
      name: 'Luke',
    },
    {
      id: 142,
      name: 'Jesse',
    },
    {
      id: 143,
      name: 'Betty',
    },
    {
      id: 144,
      name: 'Jared',
    },
    {
      id: 145,
      name: 'Christina',
    },
    {
      id: 146,
      name: 'Eric',
    },
    {
      id: 147,
      name: 'Noah',
    },
    {
      id: 148,
      name: 'Kevin',
    },
    {
      id: 149,
      name: 'Jack',
    },
    {
      id: 150,
      name: 'Lucinda',
    },
    {
      id: 151,
      name: 'Mario',
    },
    {
      id: 152,
      name: 'Lilly',
    },
    {
      id: 153,
      name: 'Ella',
    },
    {
      id: 154,
      name: 'Ellen',
    },
    {
      id: 155,
      name: 'Rodney',
    },
    {
      id: 156,
      name: 'Miguel',
    },
  ].slice(0, 20).sort((a, b) => {
    let x = a.name.toLowerCase();
    let y = b.name.toLowerCase();
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  });

  selectedTab: string = 'tabDropdown';
  formInput: FormGroup;
  inputTypes: IDropdownItem[];
  formTextArea: FormGroup;
  formCheckBox: FormGroup;
  checkBoxTypes: IDropdownItem[];
  formRadioBox: FormGroup;
  formDropdown: FormGroup;
  dropdownStatus: IDropdownStatus;
  dropdownNames: IDropdownItem[];
  dropdownTypes: IDropdownItem[];
  formDatePicker: FormGroup;
  formTimePicker: FormGroup;

  @ViewChild('input') input!: InputComponent;
  @ViewChild('textArea') textArea!: TextAreaComponent;
  @ViewChild('checkBox') checkBox!: CheckBoxComponent;
  @ViewChild('radioBox1') radioBox1!: RadioBoxComponent;
  @ViewChild('radioBox2') radioBox2!: RadioBoxComponent;
  @ViewChild('dropdown') dropdown!: DropdownComponent;
  @ViewChild('datePicker') datePicker!: DatePickerComponent;
  @ViewChild('timePicker') timePicker!: TimePickerComponent;
  @ViewChild('chkShowMeridian') chkShowMeridian!: CheckBoxComponent;

  changeDropdownType = (value: string): IDropdownType => {
    let result: IDropdownType;

    switch (value) {
      case '1':
        result = { multiSelect: false, autoClose: false, open: true };
        break;
      case '2':
        result = { multiSelect: false, autoClose: true, open: true };
        break;
      case '3':
        result = { multiSelect: false, autoClose: true, open: false };
        break;
      case '4':
        result = { multiSelect: false, autoClose: 'outside', open: true };
        break;
      case '5':
        result = { multiSelect: false, autoClose: 'outside', open: false };
        break;
      case '6':
        result = { multiSelect: true, autoClose: false, open: true };
        break;
      default: //'7'
        result = { multiSelect: true, autoClose: 'outside', open: true };
        break;
    }

    return result;
  };

  constructor(
    private fb: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private translateService: TranslateService
  ) {
    // this language will be used as a fallback when a translation isn't found in the current language
    //translate.setDefaultLang('en');
    //this.titleTranslated = '';
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    //translateService.use(this.language);
    //await this.translate.use('en').toPromise<void>();

    this.onChangeLanguage(this.language);

    //Configurations
    this.decimalOptions = {};
    this.dropdownStatus = {};
    this.inputTypes = [];
    [
      'text',
      'password',
      'alphabetic',
      'alphanumeric',
      'numeric',
      'decimal',
    ].forEach((value) => {
      this.inputTypes.push({ id: value, name: value, enabled: true });
    });
    this.checkBoxTypes = [];
    ['standard', 'switch'].forEach((value) => {
      this.checkBoxTypes.push({ id: value, name: value, enabled: true });
    });
    this.dropdownNames = [];
    this.names.forEach((item) => {
      this.dropdownNames.push({
        id: item.id.toString(),
        name: item.name,
        enabled: true,
      });
    });
    this.dropdownTypes = [
      { id: '1', name: 'Single select / no autoclose / stay opened' },
      { id: '2', name: 'Single select / autoclose / starts opened' },
      { id: '3', name: 'Single select / autoclose / starts closed' },
      { id: '4', name: 'Single select / outside / starts opened' },
      { id: '5', name: 'Single select / outside / starts closed' },
      { id: '6', name: 'Multi select / no autoclose / stay opened' },
      { id: '7', name: 'Multi select / outside / starts opened' },
    ];

    //Tab Input
    this.formInput = this.fb.group({
      input: [{ disabled: false }, [Validators.required]],
      label: ['example.input.label'],
      placeholder: ['example.input.placeholder'],
      type: ['text'],
      maxLength: [undefined],
      text: [''],
      feedback: [''],
      disabled: [false],
      toUpperCase: [false],
      showLengthProgressBar: [false],
      showLengthProgressNumeric: [false],
    });
    //Tab TextArea
    this.formTextArea = this.fb.group({
      textArea: [{ disabled: false }, [Validators.required]],
      label: ['example.textArea.label'],
      placeholder: ['example.textArea.placeholder'],
      maxLength: [undefined],
      text: [''],
      feedback: [''],
      disabled: [false],
      toUpperCase: [false],
      showLengthProgressBar: [false],
      showLengthProgressNumeric: [false],
    });
    //Tab CheckBox
    this.formCheckBox = this.fb.group({
      checkBox: [{ value: false, disabled: false }, [Validators.required]],
      label: ['example.checkBox.label'],
      type: ['standard'],
      disabled: [false],
      checked: [false],
    });
    //Tab RadioBox
    this.formRadioBox = this.fb.group({
      radioBox: [{ value: 'female', disabled: false }, [Validators.required]],
      label1: ['example.radioBox.label1'],
      label2: ['example.radioBox.label2'],
      value1: ['male'],
      value2: ['female'],
      disabled1: [false],
      disabled2: [false],
      checked1: [false],
      checked2: [false]
    });
    //Tab Dropdown
    this.formDropdown = this.fb.group({
      dropdown: [
        {
          value: this.dropdownNames.find((r) => r.id === '155'),
          disabled: false,
        },
        [Validators.required],
      ],
      label: ['example.dropdown.label'],
      placeholderToggle: ['example.dropdown.placeholderToggle'],
      placeholderSearch: ['example.dropdown.placeholderSearch'],
      feedback: [''],
      disabled: [false],
      showSearch: [false],
      type: [
        { value: this.dropdownTypes[2], disabled: false },
        [Validators.required],
      ],
      statusShow: [false],
      statusCount: [false],
      statusFiltered: [false],
      statusSelected: [false],
      statusJumpToFirst: [false],
      statusSelectAll: [false],
      statusCancel: [false],
    });

    //Tab DatePicker
    this.formDatePicker = this.fb.group({
      datePicker: [{ disabled: false }, [Validators.required]],
      //datePicker: [{ value: new Date(2023, 7-1, 6), disabled: false }, [Validators.required]],
      //datePicker: [{ value: { year: 2023, month:7, day:6 }, disabled: false }, [Validators.required]],
      label: ['example.datepicker.label'],
      placeholder: ['example.datepicker.placeholder'],
      disabled: [false],
      showCalendar: [false],
      feedback: [''],
    });
    this.formDatePicker.controls['disabled'].valueChanges.subscribe((value) => {
      this.datePicker.disabled = value;
    });
    this.formDatePicker.controls['showCalendar'].valueChanges.subscribe(
      (value) => {
        this.datePicker.showCalendar = value;
      }
    );
    this.formDatePicker.controls['feedback'].valueChanges.subscribe((value) => {
      this.datePicker.feedback = value;
    });

    //Tab TimePicker
    this.formTimePicker = this.fb.group({
      timePicker: [{ disabled: false }, [Validators.required]],
      label: ['example.timepicker.label'],
      placeholder: ['example.timepicker.placeholder'],
      disabled: [false],
      open: [false],
      showSecond: [false],
      showMeridian: [false],
      feedback: [''],
    });
   /*  this.formTimePicker.controls['disabled'].valueChanges.subscribe((value) => {
      this.timePicker.disabled = value;
    });
    this.formTimePicker.controls['showCalendar'].valueChanges.subscribe(
      (value) => {
        this.timePicker.open = value;
      }
    );
    this.formTimePicker.controls['showSecond'].valueChanges.subscribe(
      (value) => {
        this.timePicker.showSecond = value;
      }
    );
    this.formTimePicker.controls['showMeridian'].valueChanges.subscribe(
      (value) => {
        this.timePicker.showMeridian = value;
      }
    );
    this.formTimePicker.controls['feedback'].valueChanges.subscribe((value) => {
      this.timePicker.feedback = value;
    }); */
  }

  ngAfterViewInit(): void {
    this.subscribeToLangageChange();
    this.changeDetectorRef.detectChanges();
  }

  onChangeLanguage = (value: string) => {
    this.translateService.use(value);
    this.translateService.onLangChange.subscribe((value: LangChangeEvent) => {
      this.subscribeToLangageChange();
    });
  };

  subscribeToLangageChange = () => {
    this.translateService
      .get('hello', { value: 'gian', value2: 'Enza' })
      .subscribe((res: string) => {
        //  4
        this.titleTranslated = res; // 5
      });
    if (this.translateService.currentLang === 'it') {
      this.decimalOptions = { digitGroupSeparator: '.', decimalCharacter: ',' };
      if (this.timePicker) this.timePicker.showMeridian = false;
      if (this.chkShowMeridian) this.chkShowMeridian.checked = false;
    } else {
      this.decimalOptions = { digitGroupSeparator: ',', decimalCharacter: '.' };
      if (this.timePicker) this.timePicker.showMeridian = true;
      if (this.chkShowMeridian) this.chkShowMeridian.checked = true;
    }
    this.datePicker.updateFormat(
      new DateParserFormatterService(this.translateService)
    );
  };

  /* onSubmit = () => {
    console.log(this.form.value);
    console.log(this.form.get('languageDDL')?.value.id)
  }
  onSubmit2 = (form: NgForm) => {
    console.log(form.value);
  } */
  /* onEnable = () => {
    let formControl = this.form.get('languageDDL');
    if (formControl?.enabled)
      formControl.disable();
    else
      formControl?.enable();
    //this.changeDetectorRef.detectChanges();
  }; */
  /* onChangeLabel = () => {
    //this.dropdown.showSearch = !this.dropdown.showSearch;


    this.dropdown.label = 'ciao!';


    //let v = this.languagesDDL.find(r => r.id === '135')!;
    //v.name= 'Gianluca Manfredonia';

   //  this.languagesDDL = [];
//
   // this.languages.forEach((itemL, index) => {
   //   this.languagesDDL.push({ id: itemL.id.toString(), name: 'Gian', enabled: true });
   // });

    let v = [...this.languagesDDL];
    v[0].enabled = !v[0].enabled;
    this.languagesDDL = v;

    //this.languagesDDL[0].enabled = false;

    //this.dropdown.open();

    //this.dropdown.autoClose = !this.dropdown.autoClose;

  } */
  /* onTimePickerEnable = () => {
    this.timepicker.disabled = !this.timepicker.disabled;
  }
  onTimepickerLabelChange = () => { }
  onTimepickerPlaceholderChange = () => { }


  onTimepickerShowSecond = () => { }
  onTimepickerShowMeridian = () => { } */
}