import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.scss'],
})
export class TrackerComponent {
  @Input() title: string;

  @Input() barId = 'magic';

  private _valueName: string = '';

  private _maxValue: number = 100;

  private _value: number = 60;

  private _amountString: string;

  style: string;

  titleId: string;

  amountId: string;

  barBGId: string;

  barBGClass: string;

  get valueName(): string {
    return this._valueName;
  }

  @Input()
  set valueName(value: string) {
    this._valueName = value;
    this.titleId = this._valueName + 'Title';
    this.amountId = this._valueName + 'Number';
    this.barBGId = this._valueName + 'BGBar';
    this.barBGClass = 'backgroundBar ' + this._valueName;
  }

  get value(): number {
    return this._value;
  }

  @Input()
  set value(value: number) {
    this.amountString = Math.floor(value).toString();
    this._value = value;
    console.log(this._value);
    this.updateStyle();
  }

  get maxValue(): number {
    return this._maxValue;
  }

  @Input()
  set maxValue(value: number) {
    this._maxValue = value;
    console.log(this._maxValue);
    this.updateStyle();
  }

  get amountString(): string {
    return this._amountString;
  }

  set amountString(value: string) {
    let finalResult: string = '000';

    try {
      parseInt(value);
      finalResult = value;
    } catch (err) {
      console.log('El ' + this._valueName + ' facilitado no es un número');
      // TODO: add a configurable logger
      this._amountString = finalResult;
      return;
    }
    while (finalResult.length < 3) {
      finalResult = '0' + finalResult;
    }
    this._amountString = finalResult;
  }

  private updateStyle() {
    let amount = (this._value / this._maxValue) * 100;
    this.style = `width: ${amount}%;`;
    console.log(this.style);
  }

  public increment(amount: number) {
    const auxAmount: number = Math.floor(amount);
    this.value = Math.max(0, Math.min(this.maxValue, this.value + auxAmount));
  }
}
