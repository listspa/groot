import {BsDatepickerConfig} from 'ngx-bootstrap';

export function grootConfigBsDatePicker(): BsDatepickerConfig {
  const conf = new BsDatepickerConfig();
  conf.containerClass = 'theme-primary';
  conf.dateInputFormat = 'DD/MM/YYYY';
  return conf;
}
