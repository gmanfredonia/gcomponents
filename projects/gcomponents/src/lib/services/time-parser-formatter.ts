import { Injectable } from "@angular/core";
import { NgbTimeStruct } from "@ng-bootstrap/ng-bootstrap";
import { GHelpersService } from "ghelpers";
//import { isNumber, padNumber, toInteger } from "@ng-bootstrap/ng-bootstrap/util/util";
//import { isNumber, padNumber, toInteger } from "import { GHelpersService } from 'ghelpers';";
//import { GHelpersService } from 'ghelpers';

export function NGB_TIMEPICKER_PARSER_FORMATTER_FACTORY() {
  return new TimeISOParserFormatter(new GHelpersService());
}

/**
 * An abstract service for parsing and formatting times for the
 * Converts between the internal `NgbTimeStruct` model presentation and a `string` that is displayed in the
 * input element.
 *
 * When user types something in the input this service attempts to parse it into a `NgbTimeStruct` object.
 * And vice versa, when users selects a tiem in the calendar with the mouse, it must be displayed as a `string`
 * in the input.
 *
 * Default implementation uses the ISO 8601 format, but you can provide another implementation via DI
 * to use an alternative string format or a custom parsing logic.
 */
@Injectable({ providedIn: 'root', useFactory: NGB_TIMEPICKER_PARSER_FORMATTER_FACTORY })
export abstract class TimeParserFormatter {
  /**
   * Parses the given `string` to an `NgbTimeStruct`.
   *
   * Implementations should try their best to provide a result, even
   * partial. They must return `null` if the value can't be parsed.
   */
  abstract parse(value: string, showSecond: boolean, showMeridian: boolean): NgbTimeStruct | null;
  /**
   * Formats the given `NgbTimeStruct` to a `string`.
   *
   * Implementations should return an empty string if the given time is `null`,
   * and try their best to provide a partial result if the given time is incomplete or invalid.
   */
  abstract format(value: NgbTimeStruct | null, showSecond: boolean, showMeridian: boolean): string;

}
@Injectable()
export class TimeISOParserFormatter extends TimeParserFormatter {
  constructor(private ghelpers: GHelpersService) {
    super();
  }

  parse(value: string, showSecond: boolean, showMeridian: boolean): NgbTimeStruct | null {
    let hour: number;
    let minute: number;
    let second: number;
    let meridian: boolean;
    const expression: RegExp = showMeridian ? /^([0]\d|1[0-2]):([0-5]\d)(:([0-5]\d))? (AM|PM)$/ : /^([01]\d|2[0-3]):([0-5]\d)(:([0-5]\d))?$/;
    const matchs = value.match(expression);

    if (matchs && matchs.length > 0) {
      hour = matchs.length >= 1 + 1 ? this.ghelpers.toInteger(matchs[1]) : <any>null;
      minute = matchs.length >= 2 + 1 ? this.ghelpers.toInteger(matchs[2]) : <any>null;
      second = matchs.length >= 4 + 1 ? this.ghelpers.toInteger(matchs[4]) : <any>null;
      meridian = matchs.length >= 5 + 1 && (hour < 12 && matchs[5] === 'AM' || hour >= 12 && matchs[5] === 'PM');

      if (hour >= 0 && minute >= 0 && (showSecond ? second >= 0 : !second) && (showMeridian ? meridian : true))
        return { hour: hour, minute: minute, second: second };
    }

    return null;
  }

  format(value: NgbTimeStruct | null, showSecond: boolean, showMeridian: boolean): string {
    let hour, minute, second, meridian: string;
    let hh: number;

    hour = minute = second = meridian = '';
    if (value) {
      //Hour
      if (this.ghelpers.isNumber(value.hour)) {
        if (showMeridian) {
          if (value.hour < 12) {
            meridian = ' AM';
            hh = (value.hour === 0 ? 12 : value.hour);
          }
          else {
            meridian = ' PM';
            hh = value.hour;
            if (hh > 12) hh -= 12;
          }
        }
        else
          hh = value.hour;
        hour = this.ghelpers.padNumber(hh, 2);
      }

      //Minute
      if (this.ghelpers.isNumber(value.minute))
        minute = `:${this.ghelpers.padNumber(value.minute, 2)}`;

      //Second
      if (showSecond && value.second !== undefined && value.second !== null)
        second = `${this.ghelpers.isNumber(value.second) ? ':' + this.ghelpers.padNumber(value.second, 2) : ':00'}`;
      else
        second = '';
    }

    return hour + minute + second + meridian;
  }
}
