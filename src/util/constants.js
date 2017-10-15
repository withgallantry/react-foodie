// admin route page styling
const ADMIN_MARGIN_LEFT_VALUE           = 200;
const ADMIN_LABEL_MARGIN_VALUE          = 20;
const ADMIN_MENU_BUTTON_MARGIN_VALUE    = 10;
const ADMIN_FORM_ROW_MARGIN_TOP_VALUE   = 2;
const ADMIN_SECTION_MARGIN_HEIGHT_VALUE = 16;
const ADMIN_FORM_TOP_VALUE              = 156;

const HOME_HEADER_HEIGHT_VALUE = 70;

const toPx = (value) => {
  return `${value}px`;
};

//const STORES_URL = 'https://agile-taiga-67906.herokuapp.com/';
export const STORES_URL = 'http://localhost:5000/foodplace';

export const ADMIN_MARGIN_LEFT            = toPx(ADMIN_MARGIN_LEFT_VALUE);
export const ADMIN_LABEL_WIDTH            = toPx(ADMIN_MARGIN_LEFT_VALUE-ADMIN_LABEL_MARGIN_VALUE);
export const ADMIN_LABEL_MARGIN           = toPx(ADMIN_LABEL_MARGIN_VALUE);
export const ADMIN_FORM_TOP               = toPx(ADMIN_FORM_TOP_VALUE-5);
export const ADMIN_MENU_HEIGHT            = toPx(ADMIN_FORM_TOP_VALUE-42);
export const ADMIN_MENU_BUTTON_MARGIN     = toPx(ADMIN_MENU_BUTTON_MARGIN_VALUE);
export const ADMIN_FORM_ROW_MARGIN_TOP    = toPx(ADMIN_FORM_ROW_MARGIN_TOP_VALUE);
export const ADMIN_SECTION_MARGIN_HEIGHT  = toPx(ADMIN_SECTION_MARGIN_HEIGHT_VALUE);

export const HOME_HEADER_HEIGHT = toPx(HOME_HEADER_HEIGHT_VALUE);
export const HOME_MARGIN_LEFT   = '7.5%';
export const HOME_MARGIN_TOP    = '20px';
