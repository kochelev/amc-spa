import React from 'react';
import PropTypes from 'prop-types';

// Material-UI

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';

// Custom Styles

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    boxShadow: 'none',
    borderRadius: 0,
    backgroundColor: 'white',
  },
  cardActionArea: {
    borderRight: '1px solid rgba(0,0,0,0.1)'
  },
  cardContent: {
    padding: theme.spacing(1),
  },
  cardActions: {
    width: 40,
    padding: theme.spacing(0),
  },
  title: {
    fontSize: '0.8rem',
  },
  description: {
    fontSize: '0.7rem',
  }
}));

const MortgageShortPreview = (props) => {

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea
        className={classes.cardActionArea}
        onClick={(event) => props.setMortgageScheme(event, props.scheme)}>
          
        <CardContent className={classes.cardContent}>
          
          <Typography
            className={classes.title}
            variant="subtitle2"
            component="p">
            
            {props.scheme.title}

          </Typography>

          <Typography
            className={classes.description}
            variant="body2"
            component="p"
            color="textSecondary">

            {props.scheme.schedule.length === 1 ? 
            '' + Math.round(props.scheme.schedule[0].months / 12, 0) + ' years for ' +
            props.scheme.schedule[0].interest_rate + '\u2009%'
            : 'First ' + props.scheme.schedule[0].months + ' months for ' +
            props.scheme.schedule[0].interest_rate + '\u2009%'}

          </Typography>

        </CardContent>

      </CardActionArea>
      <CardActionArea
        className={classes.cardActions}
        onClick={event => props.deleteMortgageScheme(event, props.scheme.id)}
        disabled={props.isSettingMortgageScheme.isShown}>
        
        <DeleteIcon fontSize="small" />

      </CardActionArea>
    </Card>
  )
}

MortgageShortPreview.propTypes = {
  scheme: PropTypes.object.isRequired,
  isSettingMortgageScheme: PropTypes.object.isRequired,
  setMortgageScheme: PropTypes.func.isRequired,
  deleteMortgageScheme: PropTypes.func.isRequired,
};

export default MortgageShortPreview;