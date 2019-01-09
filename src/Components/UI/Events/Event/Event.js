import React, { Component } from 'react';
import classes from './Event.module.scss';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import fire from '../../../../firebase';
import Grade from '@material-ui/icons/Grade';
import Done from '@material-ui/icons/Done';
import Clear from '@material-ui/icons/Clear';

class Event extends Component {
  constructor(props){
    super(props);
    this.state = {
      count: 0,
      going: 0,
      interested: 0,
      out: 0,
      userRSVP: ''
    };
  }
  componentDidMount(){
    const participantsRef = fire.database().ref('events').child(this.props.eventId).child('participants');
    const user = fire.auth().currentUser.uid;
    participantsRef.once('value', snap => {
      snap.forEach((participant) => {
        console.log(participant);
        if(participant.key === user){
          this.setState({userRSVP: participant.val()});
          console.log("Participant: " + participant + "valeu: " +  participant.val());
        }
        switch(participant.val()){
          case 'Going':
            this.setState((prevState, props) => {return{going: prevState.going + 1}});
            break;
          case 'Interested':
            this.setState((prevState, props) => {return{interested: prevState.interested + 1}});
            break;
          case 'Out':
            this.setState((prevState, props) => {return{out: prevState.out + 1}});
            break;
          default: return;
        }
      })
    })
  }

  handleRSVP(choice){
    const eventsRef = fire.database().ref('events').child(this.props.eventId);
    const user = fire.auth().currentUser.uid;
    eventsRef.child('participants').child(user).set(choice);
    const participantsRef = fire.database().ref('events').child(this.props.eventId).child('participants');
    participantsRef.once('value', snap => {
      let countGoing = 0;
      let countInterested = 0;
      let countOut = 0;
      snap.forEach((participant) => {
        switch(participant.val()){
          case 'Going':
            countGoing++;
            break;
          case 'Interested':
            countInterested++;
            break;
          case 'Out':
            countOut++;
            break;
          default: return;
        }
        this.setState({
          going: countGoing,
          interested: countInterested,
          out: countOut,
          userRSVP: choice
        });
      })
    })
  }
  render(){
    return(
    
    <div className={classes.row}>
      <div className={classes.card}>
        <div className={classNames(
          classes.wrapper,
            {
              [classes.Birthday]: this.props.event.eventType === 'birthday',
              [classes.Entertainment]: this.props.event.eventType === 'entertainment',
              [classes.FoodDrink]: this.props.event.eventType === 'fooddrink',
              [classes.GameNight]: this.props.event.eventType === 'gamenight',
              [classes.Meetup]: this.props.event.eventType === 'meetup',
              [classes.Outdoors]: this.props.event.eventType === 'outdoors',
              [classes.Party]: this.props.event.eventType === 'party',
              [classes.Travel]: this.props.event.eventType === 'travel',
              
            })}>
          <div className={classNames(
            classes.date, classes.Default,
              // {
              //   [classes.Salmon]: this.props.event.colorHex === '#FF5733', 
              //   [classes.Mint]: this.props.event.colorHex === '#07E796',
              //   [classes.Brass]: this.props.event.colorHex === '#E79007', 
              //   [classes.Royal]: this.props.event.colorHex === '#7117C7',
              // }
          )}>
            <span className={classes.day}>{this.props.day}</span> 
            <span className={classes.month}>{this.props.month}</span>
            <span className={classes.year}>{this.props.year}</span>
          </div>
          <div className={classes.data}>
            <div className={classes.content}>
              {/* <span className={classes.author}>Jane Doe</span> */}
              <h1 className={classes.title} >{this.props.name}</h1>
              <p className={classes.text}>{this.props.description}</p>
              <label className={classes.menubutton} onClick={(e) => this.props.open(this.props.event)}><span></span></label>
            </div>
            {/* <input type="checkbox" id={classes.showmenu} /> */}
            <ul className={classes.menucontent}>
              <li>
                <div className={classNames(classes.Button, classes.NotGoing, {[classes.NotGoingSelected]: this.state.userRSVP === 'Out'})}  onClick={(e) => this.handleRSVP('Out')}>
                  <span >{this.state.out}</span>
                  <Clear/>
                  <p className={classes.Label}>Out</p>
                </div>
              </li>
              <li>
                <div className={classNames(classes.Button, classes.Interested, {[classes.InterestedSelected]: this.state.userRSVP === 'Interested'})}  onClick={(e) => this.handleRSVP('Interested')}>
                  <span>{this.state.interested}</span>
                  <Grade/>
                  <p className={classes.Label}>Interested</p>
                </div>
              </li>
              <li>
                <div className={classNames(classes.Button, classes.Going, {[classes.GoingSelected]: this.state.userRSVP === 'Going'})} onClick={(e) => this.handleRSVP('Going')}>
                  <span>{this.state.going}</span>
                  <Done/>
                  <p className={classes.Label}>Going</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    )}
  }

export default withStyles(classes)(Event);
