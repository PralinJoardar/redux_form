import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
class FormInputs extends Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div>
          <div style={{ color: "red" }}>{error}</div>
        </div>
      );
    }
  }
  renderInput = ({ label, input, meta }) => {
    console.log("meta", meta);
    return (
      <div>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };
  onSubmit = () => {
    alert("form submitted successfully");
  };
  render() {
    console.log(this.props);
    return (
      <>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Field
            name="firstName"
            component={this.renderInput}
            label="First Name"
          />
          <br />
          <Field
            name="lastName"
            component={this.renderInput}
            label="Last Name"
          />
          <br />
          <Field name="emailId" component={this.renderInput} label="Email Id" />
          <br />
          <Field
            name="contactNumber"
            component={this.renderInput}
            label="Contact Number"
          />
          <br />
          <button>Submit</button>
        </form>
      </>
    );
  }
}
const validate = (formValues) => {
  const errors = {};
  if (!formValues.firstName) {
    errors.firstName = "Please enter the First Name !";
  }
  if (!formValues.lastName) {
    errors.lastName = "please enter the Last Name !";
  }
  if (!formValues.emailId) {
    errors.emailId = "Please enter the Email !";
  }
  if (formValues.emailId) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(formValues.emailId).toLowerCase())) {
      errors.emailId = "Please provide a valid email";
    }
  }
  if (!formValues.contactNumber) {
    errors.contactNumber = "Please enter the Contact Number !";
  }
  if (formValues.contactNumber) {
    const re = /^\d{10}$/;
    if (!re.test(formValues.contactNumber)) {
      errors.contactNumber = "Please provide a valid Contact Number";
    }
  }
  return errors;
};

export default reduxForm({
  form: "myForm",
  validate,
})(FormInputs);
