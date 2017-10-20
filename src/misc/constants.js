// admin route page styling
const ADMIN_MARGIN_LEFT_VALUE           = 200;
const ADMIN_LABEL_MARGIN_VALUE          = 20;
const ADMIN_MENU_BUTTON_MARGIN_VALUE    = 10;
const ADMIN_FORM_ROW_MARGIN_TOP_VALUE   = 2;
const ADMIN_SECTION_MARGIN_HEIGHT_VALUE = 16;
const ADMIN_FORM_TOP_VALUE              = 156;
const HOME_STORE_WIDTH_VALUE            = 72;
const BANNER_HEIGHT                     = 360;

const HOME_HEADER_HEIGHT_VALUE = 70;

const toPx = (value) => {
  return `${value}px`;
};
const toPc = (value) => {
  return `${value}%`;
};

//export const STORES_URL = 'https://agile-taiga-67906.herokuapp.com/store';
export const STORES_URL = 'http://localhost:5000/store';

export const REPO = 'https://github.com/jesperc/react-foodie';
export const DEFAULT_ADDRESS = 'Svarvargatan 13, 112 49, Stockholm';
export const CURRENCY = 'SEK';
export const DELIVERY_FEE = 49;
export const STORE_ID = 'storeContainer';
export const TOP_ID = 'topId';
export const SCROLL_THRESHOLD = 500;
export const MODAL_CHECKOUT = 'modalCheckout';
export const MODAL_INFO = 'modalInfo';
export const COOKIE_LATEST  = 'latest';
export const COOKIE_ADDRESS = 'address';
export const COOKIE_ITEMS   = 'items';

export const ADMIN_MARGIN_LEFT            = toPx(ADMIN_MARGIN_LEFT_VALUE);
export const ADMIN_LABEL_WIDTH            = toPx(ADMIN_MARGIN_LEFT_VALUE-ADMIN_LABEL_MARGIN_VALUE);
export const ADMIN_LABEL_MARGIN           = toPx(ADMIN_LABEL_MARGIN_VALUE);
export const ADMIN_FORM_TOP               = toPx(ADMIN_FORM_TOP_VALUE-5);
export const ADMIN_MENU_HEIGHT            = toPx(ADMIN_FORM_TOP_VALUE-42);
export const ADMIN_MENU_BUTTON_MARGIN     = toPx(ADMIN_MENU_BUTTON_MARGIN_VALUE);
export const ADMIN_FORM_ROW_MARGIN_TOP    = toPx(ADMIN_FORM_ROW_MARGIN_TOP_VALUE);
export const ADMIN_SECTION_MARGIN_HEIGHT  = toPx(ADMIN_SECTION_MARGIN_HEIGHT_VALUE);

export const HOME_HEADER_HEIGHT               = toPx(HOME_HEADER_HEIGHT_VALUE);
export const HOME_GALLERY_MARGIN_LEFT         = '7.2%';
export const HOME_GALLERY_MARGIN_TOP          = '20px';
export const HOME_GALLERY_WIDTH               = '89%';
export const HOME_STORE_WIDTH                 = toPc(HOME_STORE_WIDTH_VALUE);
export const HOME_STORE_MARGIN_LEFT           = '5%';
export const HOME_STORE_MARGIN_VERTICAL       = '20px';
export const HOME_STORE_ITEM_MARGIN_VERTICAL  = '10px';
export const HOME_ORDER_WIDTH                 = toPc(100-HOME_STORE_WIDTH_VALUE);
export const HOME_ORDER_MARGIN_LEFT           = '5%';
