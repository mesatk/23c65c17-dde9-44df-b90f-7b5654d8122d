import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { saveUser, updateUser } from '../../api/users';

const UserForm: React.FC<{ user?: any; closeModal: () => void }> = ({ user, closeModal }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (user) {
      form.setFieldsValue(user);  // Eğer düzenleniyor ise formu doldur
    } else {
      form.resetFields();  // Yeni kullanıcı ekleme ise formu sıfırla
    }
  }, [user, form]);

  const onFinish = async (values: any) => {
    try {
      if (user) {
        await updateUser({ ...user, ...values });
      } else {
        await saveUser(values);
      }
      closeModal();  // İşlem bitince modalı kapat
    } catch (error) {
      console.error("Error saving/updating user:", error);
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input the name!' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please input the email!' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="password" label="Password">
        <Input.Password />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        {user ? 'Update User' : 'Add User'}
      </Button>
    </Form>
  );
};

export default UserForm;
