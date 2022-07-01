import {BsDatepickerConfig, BsDatepickerInlineConfig} from 'ngx-bootstrap/datepicker';

export function grootConfigBsDatePicker(): BsDatepickerConfig {
  const conf = new BsDatepickerConfig();
  conf.containerClass = 'theme-primary';
  conf.dateInputFormat = 'DD/MM/YYYY';
  conf.showWeekNumbers = false;
  conf.customTodayClass = 'bs-datepicker-today';
  return conf;
}

export const GROOT_DEFAULT_BS_DATE_PICKER_INLINE_CONFIG: Partial<BsDatepickerInlineConfig> = {
  containerClass: 'theme-primary',
  dateInputFormat: 'DD/MM/YYYY',
  showWeekNumbers: false,
  customTodayClass: 'bs-datepicker-today',
};

/**
 * NgBootstrap expects years and days to be written as "YYYY" and "DD", rather than "yyyy" and "dd"
 * as the angular date pipe. This function takes in input the NgBootstrap format and outputs the
 * standard angular date pipe format.
 */
export function normalizeNgBootstrapDateFormat(dateFormat: string): string {
  return dateFormat
    .replace('YYYY', 'yyyy')
    .replace('DD', 'dd');
}
