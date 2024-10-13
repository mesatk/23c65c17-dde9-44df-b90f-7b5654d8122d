import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import UserList from '../components/UserList/UserList';
import UserForm from '../components/UserForm/UserForm';
import SearchInput from '../components/SearchInput/SearchInput';
import { containerStyle, buttonStyle, titleStyle } from '../styles/UsersPage.styles';

const UsersPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);  
  const [searchTerm, setSearchTerm] = useState('');

  // Yeni kullanıcı ekleme için modal açma
  const openAddUserModal = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  // Kullanıcı düzenleme için modal açma
  const openEditUserModal = (user: any) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);  // Arama terimini güncelle
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>User Management</h1>

      <SearchInput onSearch={handleSearch} />

      <Button type="primary" onClick={openAddUserModal} style={buttonStyle}>
        Add New User
      </Button>

      <UserList onEditUser={openEditUserModal} searchTerm={searchTerm} />

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
