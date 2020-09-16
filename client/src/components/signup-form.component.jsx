import { Form, Input, Button, Alert } from 'antd'
import React from 'react'

const SignUpForm = ({ onFinish, onFinishFailed, isLoading, error }) => {
  return (
    <div
      className="bg-white rounded shadow-md p-6 w-7/12"
      style={{ minWidth: 300 }}
    >
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        requiredMark={false}
        className=""
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            {
              type: 'email',
              message: 'Please enter a valid email!'
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: 'Please input your password!' },
            {
              min: 4,
              message: 'Password should atleast have 4 characters!'
            },
            {
              max: 20,
              message: "Password can't have more than 20 characters!"
            }
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!'
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(
                  'The two passwords that you entered do not match!'
                )
              }
            })
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="mt-4"
            disabled={isLoading}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
      {error && <Alert type="error" message={error} banner />}
    </div>
  )
}

export default SignUpForm
