import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';

export default () => {
  addLocaleData(en);
  addLocaleData(zh);
  addLocaleData({
    locale: 'en-us',
    parentLocale: 'en',
  });
  addLocaleData({
    locale: 'zh-tw',
    parentLocale: 'zh',
  });
};
