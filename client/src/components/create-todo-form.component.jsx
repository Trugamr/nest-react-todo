import { Form, Input, Button } from 'antd'
import React from 'react'

const CreateTodoForm = ({ onFinish, onFinishFailed, isLoading }) => {
  return (
    <div>
      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        requiredMark={false}
        className="flex"
        size="large"
      >
        <Form.Item name="text" className="flex-grow">
          <Input placeholder="Add a todo" required />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={isLoading}>
            Create
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default CreateTodoForm
