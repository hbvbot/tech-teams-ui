import React from 'react';
import { RIEInput, RIETextArea } from 'riek';
import _ from 'lodash';
import axios from 'axios';

class ProjectInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blurbEditOff: true,
      editModeOff: true,
      locationEditOff: true,
      projectImage: this.props.projectImage,
      projectBlurb: this.props.projectBlurb,
      location: this.props.projectLocation,
      description: this.props.projectDescription,
      random: 0,
    };

    this.updateBlurb = this.updateBlurb.bind(this);
    this.toggleBlurbEdit = this.toggleBlurbEdit.bind(this);
    this.toggleAllOtherEdit = this.toggleAllOtherEdit.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log('this is the nextProps in project info. nextProps= ', nextProps)
    const { projectBlurb, projectDescription, projectImage, projectLocation } = nextProps;
    this.setState({
      projectImage,
      projectBlurb,
      location: projectLocation,
      description: projectDescription,
    })
  }

  updateBlurb(event) {
    this.setState({ projectBlurb: event.blurb }, () => console.log('BLURB STATE: ', this.state.projectBlurb));
  }

  toggleBlurbEdit() {
    if (!this.state.blurbEditOff) {
      // CALL ACTION HERE
      this.props.updateProjectBlurb(this.state.projectBlurb);
      // console.log('SENDING ACTION FOR BLURB EDIT');
    }
    this.setState({ blurbEditOff: !this.state.blurbEditOff });
  }

  toggleAllOtherEdit() {
    if (!this.state.editModeOff) {
      // CALL ANOTHER ACTION HERE
      this.props.updateAllOthers({
        headquarters: this.state.location,
        description: this.state.description,
        projectImage: this.state.projectImage,
      });
      // console.log('SENDING ACTION FOR ALL OTHER EDITS');
    }
    this.setState({ editModeOff: !this.state.editModeOff });
  }

  updateLocation(event) {
    this.setState({ location: event.location }, () => console.log('LOCATION STATE: ', this.state.location));
  }

  updateDescription(event) {
    this.setState({ description: event.description }, () => console.log('DESCRIPTION STATE: ', this.state.description));
  }

  render() {
    return (
      <div id="projectProfileBasicInfo-container">
      <div id ="projectProfileBasicInfo-innerContainer">
        <img src={this.props.projectImage} alt={this.props.projectName} height="100" />
        <h1> {this.props.projectName} </h1>
        <RIEInput
          value={this.state.projectBlurb}
          change={this.updateBlurb}
          propName="blurb"
          isDisabled={this.state.blurbEditOff}
        />
        <button onClick={this.toggleBlurbEdit}>
          {this.state.blurbEditOff ? 'Edit' : 'Save'}
        </button>
        <br />
        <button onClick={this.toggleAllOtherEdit}> 
          <i class="fa fa-pencil" aria-hidden="true"></i>
        </button> <br />
        Headquarters:
        <RIEInput
          value={this.state.location}
          change={this.updateLocation}
          propName="location"
          isDisabled={this.state.editModeOff}
        /> <br />
        {/* Description: LOOKS LIKE WE DON'T RENDER THIS IN DB */}
        {/* <RIETextArea
          value={this.state.description}
          change={this.updateDescription}
          propName="description"
          isDisabled={this.state.editModeOff}
        /> */}
        </div>
      </div>
    );
  }
}

export default ProjectInfo;
