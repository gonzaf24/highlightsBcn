import React, { useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import {
  AvocadoIcon, BarIcon, BeachIcon, BurguerIcon, SushiIcon,
} from 'assets/icons';
import { RoundCheckbox } from 'modules/common/components';

import styles from './MapFilters.module.scss';

const propTypes = {
  className: PropTypes.string,
  closeDescription: PropTypes.func,
  dataTestId: PropTypes.string,
  filters: PropTypes.shape({
    cat0: PropTypes.bool,
    cat1: PropTypes.bool,
    cat2: PropTypes.bool,
    cat3: PropTypes.bool,
    cat4: PropTypes.bool,
  }),
  id: PropTypes.string,
  onFilterChange: PropTypes.func,
};

const defaultProps = {
  className: '',
  dataTestId: '',
  id: undefined,
  onFilterChange: () => {},
  filters: {
    cat0: true,
    cat1: true,
    cat2: true,
    cat3: true,
    cat4: true,
  },
  closeDescription: () => {},
};

const MapFilters = ({
  className, dataTestId, id, onFilterChange, filters, closeDescription,
}) => {
  const [cat0Checked, setCat0Checked] = useState(filters.cat0);
  const [cat1Checked, setCat1Checked] = useState(filters.cat1);
  const [cat2Checked, setCat2Checked] = useState(filters.cat2);
  const [cat3Checked, setCat3Checked] = useState(filters.cat3);
  const [cat4Checked, setCat4Checked] = useState(filters.cat4);

  const handleCat0Change = e => {
    const isChecked = e.target.checked;
    setCat0Checked(e.target.checked);
    onFilterChange(0, isChecked);
    closeDescription();
  };

  const handleCat1Change = e => {
    const isChecked = e.target.checked;
    setCat1Checked(e.target.checked);
    onFilterChange(1, isChecked);
    closeDescription();
  };

  const handleCat2Change = e => {
    const isChecked = e.target.checked;
    setCat2Checked(e.target.checked);
    onFilterChange(2, isChecked);
    closeDescription();
  };

  const handleCat3Change = e => {
    const isChecked = e.target.checked;
    setCat3Checked(e.target.checked);
    onFilterChange(3, isChecked);
    closeDescription();
  };

  const handleCat4Change = e => {
    const isChecked = e.target.checked;
    setCat4Checked(e.target.checked);
    onFilterChange(4, isChecked);
    closeDescription();
  };

  const mapFiltersClassNames = classnames(styles.MapFilters, className);

  return (
    <div
      className={ mapFiltersClassNames }
      data-testid={ dataTestId }
      id={ id }
    >
      <div className={ styles.Wrapper }>
        <BeachIcon className={ styles.Icon } />
        <RoundCheckbox
          className={ styles.Checkbox }
          isChecked={ cat0Checked }
          onChange={ handleCat0Change }
        />
      </div>
      <div className={ styles.Wrapper }>
        <AvocadoIcon className={ styles.Icon } />
        <RoundCheckbox
          className={ styles.Checkbox }
          isChecked={ cat1Checked }
          onChange={ handleCat1Change }
        />
      </div>
      <div className={ styles.Wrapper }>
        <BurguerIcon className={ styles.Icon } />
        <RoundCheckbox
          className={ styles.Checkbox }
          isChecked={ cat2Checked }
          onChange={ handleCat2Change }
        />
      </div>
      <div className={ styles.Wrapper }>
        <SushiIcon className={ styles.Icon } />
        <RoundCheckbox
          className={ styles.Checkbox }
          isChecked={ cat3Checked }
          onChange={ handleCat3Change }
        />
      </div>
      <div className={ styles.Wrapper }>
        <BarIcon className={ styles.Icon } />
        <RoundCheckbox
          className={ styles.Checkbox }
          isChecked={ cat4Checked }
          onChange={ handleCat4Change }
        />
      </div>
    </div>
  );
};

MapFilters.propTypes = propTypes;
MapFilters.defaultProps = defaultProps;

export default MapFilters;
