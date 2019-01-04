import React, { Component } from 'react';
import classes from './Event.module.css';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
// colorToggleHexes: [
//   {color: 'Salmon', hex: '#FF5733'},
//   {color: 'Mint', hex: '#07E796'},
//   {color: 'Brass', hex: '#E79007'},
//   {color: 'Royal', hex: '#7117C7'}
// ],
// const styles = {
//   Salmon: {
//     borderBottom:'5px solid #FF5733',
//   },
//   Mint: {
//     borderBottom:'5px solid #07E796',
//   },
//   Brass: {
//     borderBottom:'5px solid #E79007',
//   },
//   Royal: {
//     borderBottom:'5px solid #7117C7',
//   }
// };

class Event extends Component {
  constructor(props){
    super(props);
    this.state = {
      color:'blue'
    };
  }

  render(){
    // const { classes } = this.props;
    return(

    <div className={
      classNames(
        classes.Event,
        {
          [classes.Salmon]: this.props.colorHex === '#FF5733', 
          [classes.Mint]: this.props.colorHex === '#07E796',
          [classes.Brass]: this.props.colorHex === '#E79007', 
          [classes.Royal]: this.props.colorHex === '#7117C7'
        }
        
        )} onClick={(e) => this.props.open(this.props.event)}>
        <div className={classes.EventFlexBox}>
          <h5 className={classNames(classes.grow, classes.Title)}>{this.props.name}</h5>
          <p className={classes.Date}>{this.props.date}</p>
        </div>
    </div>

    // <Card className={
    //   classNames(
    //     classes.Event,
    //     {
    //       [classes.Salmon]: this.props.colorHex === '#FF5733', 
    //       [classes.Mint]: this.props.colorHex === '#07E796',
    //       [classes.Brass]: this.props.colorHex === '#E79007', 
    //       [classes.Royal]: this.props.colorHex === '#7117C7'
    //     }
        
    //     )}>
    //   <CardActionArea onClick={(e) => this.props.open(this.props.event)}>
    //     <CardContent>
    //       <Typography gutterBottom variant="h5" component="h2">
    //         {this.props.name}
    //       </Typography>
    //       <Typography component="p">
    //         {this.props.snippet}
    //       </Typography>
    //       {this.props.colorHex}
    //       {this.props.date}
    //     </CardContent>
    //   </CardActionArea>
    // </Card>
    )}
  }

export default withStyles(classes)(Event);
