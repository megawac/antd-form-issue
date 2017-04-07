import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
const mountNode = document.getElementById('root');

import {
  Form, Select, Button
} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

function ReusableCountrySelect({countries, ...props}) {
  return (
    <Select
      {...props}
    >
      {
        countries.map(c => (
          <Select.Option
            value={c.id}
            key={c.id}
          >{c.name}</Select.Option>
        ))
      }
    </Select>
  );
}

class Demo extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit}>

        <FormItem
          label="Select Country"
          hasFeedback
        >
          {getFieldDecorator('select', {
            rules: [
              { required: true, message: 'Please select your country!' },
            ],
          })(
            <ReusableCountrySelect
              countries={[
                {name: 'china', id: 'china'},
                {name: 'india', id: 'india'},
                {name: 'britain', id: 'britain'}
              ]}
              placeholder="Please select a country"
            />
          )}
        </FormItem>

        <FormItem
          wrapperCol={{ span: 12, offset: 6 }}
        >
          <Button type="primary" htmlType="submit">Submit</Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedDemo = Form.create()(Demo);

ReactDOM.render(<WrappedDemo />, mountNode);