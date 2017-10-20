import React from 'react';

import * as Constants from '../../util/constants';
import * as Strings from '../../util/localization/strings';

const createModal = (id, title, text, repo) => {
  return (
    <div className='modal fade' id={id} role="dialog">
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <button type='button' className='close' data-dismiss='modal'>&times;</button>
            <h4 className='modal-title'>{title}</h4>
          </div>
          <div className='modal-body'>
            {text}
            {repo !== undefined && <div>Repo: <a href={repo} target='_blank'>{repo}</a></div>}
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-default' data-dismiss='modal'>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const Modals = () => {
  return (
    <span>
      {createModal(
        Constants.MODAL_CHECKOUT,
        Strings.get(Strings.PAYMENT),
        Strings.get(Strings.PAYMENT_DESC))
      }
      {createModal(
        Constants.MODAL_INFO,
        Strings.get(Strings.INFO),
        Strings.get(Strings.INFO_DESC),
        Constants.REPO)
      }
    </span>
  )
};

export default Modals;
