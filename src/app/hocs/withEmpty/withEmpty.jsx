import React, { forwardRef } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import DefaultEmpty from '../../utils/Empty';

import styles from './withEmpty.module.scss';

const propTypes = {
  className: PropTypes.string,
  dataTestId: PropTypes.string,
  emptyClassName: PropTypes.string,
  emptyMsg: PropTypes.string,
  id: PropTypes.string,
  isEmpty: PropTypes.bool,
};

const defaultProps = {
  className: '',
  dataTestId: undefined,
  emptyClassName: '',
  emptyMsg: 'Empty.title',
  id: undefined,
  isEmpty: false,
};

const withEmpty = (WrappedComponent, {
  Empty = DefaultEmpty,
} = {
  Empty: DefaultEmpty,
}) => {
  const WithEmptyComponent = forwardRef(({
    className, emptyClassName, isEmpty, emptyMsg, ...props
  }, ref) => {
    const emptyClassNames = classnames(styles.Empty, emptyClassName);
    const emptyContainerClassNames = classnames(className, styles.EmptyContainer);

    if (isEmpty) {
      return (
        <div className={ emptyContainerClassNames }>
          <Empty
            className={ emptyClassNames }
            texts={ {
              title: emptyMsg,
            } }
          />
        </div>
      );
    }

    // When is not empty, use the wrapper component
    return (
      <WrappedComponent
        ref={ ref }
        className={ className }
        // eslint-disable-next-line react/jsx-props-no-spreading
        { ...props }
      />
    );
  });

  WithEmptyComponent.propTypes = propTypes;
  WithEmptyComponent.defaultProps = defaultProps;

  return WithEmptyComponent;
};

export default withEmpty;
