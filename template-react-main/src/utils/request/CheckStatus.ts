import { Toast } from 'react-vant';
import { i18n } from '@/locales';

/**
 * 校验网络请求状态码
 * @param {number} status 状态码
 * @param {string | string[]} msg 错误提示信息
 */
export const checkStatus = (status: number, msg?: string | Array<string>): void => {
  let errMsg = ''; // 错误提示信息
  if (msg) {
    errMsg = typeof msg === 'string' ? msg : msg[0];
  }

  switch (status) {
    case 400:
      Toast.fail(errMsg || i18n.t('api.errMsg400'));
      break;
    case 401:
      Toast.fail(errMsg || i18n.t('api.errMsg401'));
      break;
    case 403:
      Toast.fail(errMsg || i18n.t('api.errMsg403'));
      break;
    case 404:
      Toast.fail(errMsg || i18n.t('api.errMsg404'));
      break;
    case 405:
      Toast.fail(errMsg || i18n.t('api.errMsg405'));
      break;
    case 408:
      Toast.fail(errMsg || i18n.t('api.errMsg408'));
      break;
    case 500:
      Toast.fail(errMsg || i18n.t('api.errMsg500'));
      break;
    case 501:
      Toast.fail(errMsg || i18n.t('api.errMsg501'));
      break;
    case 502:
      Toast.fail(errMsg || i18n.t('api.errMsg502'));
      break;
    case 503:
      Toast.fail(errMsg || i18n.t('api.errMsg503'));
      break;
    case 504:
      Toast.fail(errMsg || i18n.t('api.errMsg504'));
      break;
    default:
      Toast.fail(errMsg || i18n.t('api.errMsgDefault'));
  }
};
