import React from 'react';

import gaisLogo from '../../assets/images/gais.png';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo} style={{ height: props.height }}>
        <img src={gaisLogo} alt="GaisLogo" />
    </div>
);

export default logo;