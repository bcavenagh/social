import React, { Component } from 'react';
import classes from './Event.module.scss';
// import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardContent from '@material-ui/core/CardContent';
// import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

class Event extends Component {
  constructor(props){
    super(props);
    this.state = {
      
    };
  }
  getNameFromHex(hex){
      console.log(hex)
  }

  render(){
    // const { classes } = this.props;
    return(
    
    <div className={classes.row}>
      <div className={classes.card}>
        <div className={classes.wrapper}>
          <div className={classNames(
            classes.date, 
              {
                [classes.Salmon]: this.props.colorHex === '#FF5733', 
                [classes.Mint]: this.props.colorHex === '#07E796',
                [classes.Brass]: this.props.colorHex === '#E79007', 
                [classes.Royal]: this.props.colorHex === '#7117C7',
                [classes.Default]: this.props.colorHex === '',
              }
          )}>
            <span className={classes.day}>{this.props.day}</span>
            <span className={classes.month}>{this.props.month}</span>
            <span className={classes.year}>{this.props.year}</span>
          </div>
          <div className={classes.data}>
            <div className={classes.content}>
              {/* <span className={classes.author}>Jane Doe</span> */}
              <h1 className={classes.title}><a onClick={(e) => this.props.open(this.props.event)}>{this.props.name}</a></h1>
              <p className={classes.text}>{this.props.description}</p>
              {/* <label htmlFor="show-menu" className={classes.menubutton}><span></span></label> */}
            </div>
            {/* <input type="checkbox" id={classes.showmenu} /> */}
            <ul className={classes.menucontent}>
              <li><a href="#" className="fa fa-bookmark-o"></a></li>
              <li><a href="#" className="fa fa-heart-o"><span>47</span></a></li>
              <li><a href="#" className="fa fa-comment-o"><span>8</span></a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>


    // <div className={
    //   classNames(
    //     classes.Event,
    //     {
    //       [classes.Salmon]: this.props.colorHex === '#FF5733', 
    //       [classes.Mint]: this.props.colorHex === '#07E796',
    //       [classes.Brass]: this.props.colorHex === '#E79007', 
    //       [classes.Royal]: this.props.colorHex === '#7117C7'
    //     }
        
    //     )} onClick={(e) => this.props.open(this.props.event)}>
    //     <div className={classes.EventVitals}>
    //       <h5 className={classNames(classes.grow, classes.Title)}>{this.props.name}</h5>
    //       <p className={classes.Date}>{this.props.date}</p>
    //     </div>
    //     <div className={classes.EventExtras} onClick={(e) => this.props.open(this.props.event)}>
    //       <p>{this.props.snippet}</p>
    //       <p>{this.props.date}</p>
    //     </div>
    // </div>
    )}
  }

export default withStyles(classes)(Event);
