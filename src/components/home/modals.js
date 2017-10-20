import React from 'react';

import * as Constants from '../../util/constants';
import * as Strings from '../../util/localization/strings';

const Modals = () => {
  return (
    <div className='modal fade' id={Constants.MODAL_CHECKOUT_ID} role="dialog">
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <button type='button' className='close' data-dismiss='modal'>&times;</button>
            <h4 className='modal-title'>{Strings.get(Strings.PAYMENT)}</h4>
          </div>
          <div className='modal-body'>
            {Strings.get(Strings.PAYMENT_DESC)}
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-default' data-dismiss='modal'>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modals;
