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
      out: 0
    };
  }
  componentDidMount(){
    const participantsRef = fire.database().ref('events').child(this.props.eventId).child('participants');
    
    participantsRef.once('value', snap => {
      console.log(snap);
      let countGoing = 0;
      let countInterested = 0;
      let countOut = 0;
      snap.forEach((participant) => {
        console.log(participant);
        switch(participant.val()){
          case 'Going':
            countGoing++;
            this.setState((prevState, props) => {return{going: prevState.going + 1}});
            break;
          case 'Interested':
            countInterested++;
            this.setState((prevState, props) => {return{interested: prevState.interested + 1}});
            break;
          case 'Out':
            countOut++;
            this.setState((prevState, props) => {return{out: prevState.out + 1}});
            break;
          default: return;
        }
        console.log(participant.val() + "Going: " + countGoing + " -- Interested: " + countInterested + " -- Out: " + countOut);
      })
      // counter++;
      // this.setState({
      //   count: this.state.count + 1
      // })
      // console.log(counter)
    })
  }

  handleRSVP(choice){
    console.log(choice);
    const eventsRef = fire.database().ref('events').child(this.props.eventId);
    const user = fire.auth().currentUser.uid;
    // if(eventsRef.hasChild('participants')){
    //   eventsRef.child('participants').push(user);
    // }
    eventsRef.child('participants').child(user).set(choice);
    
    const participantsRef = fire.database().ref('events').child(this.props.eventId).child('participants');
    
    participantsRef.once('value', snap => {
      console.log(snap);
      let countGoing = 0;
      let countInterested = 0;
      let countOut = 0;
      snap.forEach((participant) => {
        console.log(participant);
        switch(participant.val()){
          case 'Going':
            countGoing++;
            // this.setState((prevState, props) => {return{going: prevState.going + 1}});
            break;
          case 'Interested':
            countInterested++;
            // this.setState((prevState, props) => {return{interested: prevState.interested + 1}});
            break;
          case 'Out':
            countOut++;
            // this.setState((prevState, props) => {return{out: prevState.out + 1}});
            break;
          default: return;
        }
        console.log(participant.val() + "Going: " + countGoing + " -- Interested: " + countInterested + " -- Out: " + countOut);
        this.setState({
          going: countGoing,
          interested: countInterested,
          out: countOut
        });
      })
    })

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
              <h1 className={classes.title} >{this.props.name}</h1>
              <p className={classes.text}>{this.props.description}</p>
              <label className={classes.menubutton} onClick={(e) => this.props.open(this.props.event)}><span></span></label>
            </div>
            {/* <input type="checkbox" id={classes.showmenu} /> */}
            <ul className={classes.menucontent}>
              <li>
                <div className={classNames(classes.Button, classes.NotGoing)}  onClick={(e) => this.handleRSVP('Out')}>
                  <span >{this.state.out}</span>
                  <Clear/>
                  <p className={classes.Label}>Out</p>
                </div>
              </li>
              <li>
                <div className={classNames(classes.Button, classes.Interested)}  onClick={(e) => this.handleRSVP('Interested')}>
                  <span>{this.state.interested}</span>
                  <Grade/>
                  <p className={classes.Label}>Interested</p>
                </div>
              </li>
              <li>
                <div className={classNames(classes.Button, classes.Going)} onClick={(e) => this.handleRSVP('Going')}>
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
