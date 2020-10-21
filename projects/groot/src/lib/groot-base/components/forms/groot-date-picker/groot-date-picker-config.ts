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
