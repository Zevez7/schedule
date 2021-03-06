import React, { useState } from "react";
import { Button, Checkbox, Form, Container, List } from "semantic-ui-react";
import { connect } from "react-redux";
import uid from "uid";
import { addStaff } from "../../actions/index";

const StaffForm = props => {
  const [formData, setFormData] = useState({
    staffName: "",
    workDay: [],
    service: [],
    staffId: uid()
  });

  const handleSubmit = e => {
    e.preventDefault();
    props.ModalClose();
    props.addStaffFx(formData);
  };

  const handleFormInputData = e => {
    setFormData({
      ...formData,
      staffName: e.target.value
    });
  };

  const workDayChecked = (e, d) => {
    if (d.checked) {
      setFormData({ ...formData, workDay: [...formData.workDay, d.name] });
    } else {
      setFormData({
        ...formData,
        workDay: formData.workDay.filter(item => item !== d.name)
      });
    }
  };

  const WorkDayStringArray = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  const workDayMap = WorkDayStringArray.map(item => {
    return (
      <List.Item key={item}>
        <Checkbox
          name={item}
          label={item}
          onChange={(e, d) => workDayChecked(e, d)}
        />
      </List.Item>
    );
  });

  const serviceChecked = (e, d) => {
    if (d.checked) {
      setFormData({ ...formData, service: [...formData.service, d.name] });
    } else {
      setFormData({
        ...formData,
        service: formData.service.filter(item => item !== d.name)
      });
    }
  };

  const serviceArrayEntries = Object.entries(props.service);

  let ServiceStringArray = [];

  for (let item of serviceArrayEntries) {
    ServiceStringArray = [...ServiceStringArray, ...item[1]];
  }

  const serviceMap = ServiceStringArray.map(item => {
    return (
      <List.Item key={item}>
        <Checkbox
          name={item}
          label={item}
          onChange={(e, d) => serviceChecked(e, d)}
        />
      </List.Item>
    );
  });

  return (
    <Form onSubmit={e => handleSubmit(e)}>
      <Form.Field>
        <label>Staff Name</label>
        <input
          name="staff"
          required
          placeholder="staff"
          value={formData.staffName}
          onChange={e => handleFormInputData(e)}
        />
      </Form.Field>

      <Form.Field>
        <label>Work Days</label>
        <List className="columnCSSSpread">{workDayMap}</List>
      </Form.Field>

      <Form.Field>
        <label>Services</label>
        <List className="columnCSSSpread">{serviceMap}</List>
      </Form.Field>

      <Container textAlign="center">
        <Button color="blue" onClick={props.ModalClose}>
          Cancel
        </Button>
        <Button positive type="submit">
          Submit
        </Button>
      </Container>
    </Form>
  );
};

const mapStateTopProps = state => {
  return {
    staff: state.staff.list,
    service: state.service
  };
};

const mapDispatchToProps = { addStaffFx: addStaff };

export default connect(mapStateTopProps, mapDispatchToProps)(StaffForm);
