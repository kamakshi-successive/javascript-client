import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Snackbar, IconButton, SnackbarContent } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import {
  close,
  Warning,
  CheckCircle,
  Info,
} from '@material-ui/icons';
import ErrorIcon from '@material-ui/icons/Error';
import { green, amber } from '@material-ui/core/colors';

const variantIcon = {
    success: CheckCircle,
    warning: Warning,
    error: ErrorIcon,
    info: Info,
}

const styles = theme => ({
    close : {
        padding: theme.spacing.unit / 2,
    },
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info : {
        backgroundColor: theme.palette.primary.dark,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing.unit,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
});

const ContentWrapper = (props) => {
    const {
        classes,
        className,
        onClose,
        variant,
        action,
        ...rest
    } = props;
    const Icon = variantIcon[variant];
    return (
        <SnackbarContent
        className = {classNames(classes[variant], className)}
        aria-describedby="client-snackbar"
        message={(
            <span id="client-snackbar" className={classes.message}>
                <Icon className={classNames(classes.icon, classes.iconVariant)} />
                {message}
            </span>
        )}
        action= {action}
        {...rest}
        />
    )
}

const SnackbarContentWrapper= withStyles(styles)(ContentWrapper);
const SimpleSnackbar = (props) => {
    const {
        ContentProps,
        action,
        classes,
        TransitionComponent,
        variant,
        onClose,
        ...rest
    }= props;
    const additionalProps = {};
    if(!(action === false)) {
        additionalProps.action= action || [
            <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={onclose}
            >
                <Close />
            </IconButton>
        ]
    }
    if (TransitionComponent) additionalProps.TransitionComponent= TransitionComponent;
    let {anchorOrigin, message} = props;
    message = message || <span id="message-id">SnackBar Notification</span>
    anchorOrigin = anchorOrigin || {
        vertical: 'bottom',
        horizontal: 'left',
    };
    return (
        <Snackbar
        id="snackbar"
        {...rest}
        {...additionalProps}
        anchorOrigin={anchorOrigin}
        autoHideDuration={4000}
        onClose={onClose}
        ContentProps={ContentProps || {
            'aria-describedby': 'message-id',
        }}
        message={message}
        >
            {
                variant && (
                    <SnackbarContentWrapper
                    variant = {variant}
                    message= {message}
                    {...additionalProps}
                    />
                )
            }
        </Snackbar>
    );
};

SimpleSnackbar.defaultProps = {
    open:false,
    onClose: f=> f,
    ContentProps:null,
    message:null,
    classes:null,
    TransitionComponent: null,
    className: null,
    anchorOrigin: null,
    variant: null,
    action: null,
    afterClose: f=>f,
};

SimpleSnackbar.propTypes={
    open: PropTypes.bool,
    onClose: PropTypes.func,
    ContentProps: PropTypes.object,
    message: PropTypes.node,
    classes: PropTypes.object,
    TransitionComponent: ,
    className: ,
    anchorOrigin: ,
    variant: ,
    action: ,
    afterClose: , 
}
export default CustomSnackBar;
