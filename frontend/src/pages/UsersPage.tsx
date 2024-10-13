import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import UserList from '../components/UserList/UserList';
import UserForm from '../components/UserForm/UserForm';
import SearchInput from '../components/SearchInput/SearchInput';

const UsersPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Yeni kullanıcı ekleme işlemi için modal açma
  const openAddUserModal = () => {
    setEditingUser(null);  // Yeni kullanıcı ekleme
    setIsModalOpen(true);
  };

  // Kullanıcı düzenleme işlemi için modal açma
  const openEditUserModal = (user: any) => {
    setEditingUser(user);  // Düzenlenecek kullanıcıyı belirle
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>User Management</h1>
      <SearchInput />
      <Button type="primary" onClick={openAddUserModal} style={{ marginBottom: 16 }}>
        Add New User
      </Button>
      <UserList onEditUser={openEditUserModal} />

      {/* Modal (Popup) */}
      <Modal
        title={editingUser ? "Edit User" : "Add New User"}
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
      >
        <UserForm user={editingUser} closeModal={closeModal} />
      </Modal>
    </div>
  );
};

export default UsersPage;
