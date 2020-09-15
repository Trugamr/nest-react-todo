import { Form, Input, Button } from 'antd'
import React from 'react'

const SignInForm = ({ onFinish, onFinishFailed, isLoading }) => {
  return (
    <div
      className="bg-white rounded shadow-md p-6 pb-2 w-7/12"
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
          rules={[{ required: true, message: 'Please input your password!' }]}
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
    </div>
  )
}

export default SignInForm
