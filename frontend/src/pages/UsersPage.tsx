import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import UserList from '../components/UserList/UserList';
import UserForm from '../components/UserForm/UserForm';
import SearchInput from '../components/SearchInput/SearchInput';
import { containerStyle, buttonStyle, titleStyle } from '../styles/UsersPage.styles';

const UsersPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);  // Düzenlenen kullanıcı bilgisi
  const [searchTerm, setSearchTerm] = useState('');            // Arama terimi

  // Yeni kullanıcı ekleme için modal açma
  const openAddUserModal = () => {
    setEditingUser(null);  // Yeni kullanıcı ekleme
    setIsModalOpen(true);
  };

  // Kullanıcı düzenleme için modal açma
  const openEditUserModal = (user: any) => {
    setEditingUser(user);  // Düzenlenen kullanıcı
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

      {/* Arama inputu */}
      <SearchInput onSearch={handleSearch} />

      {/* Yeni kullanıcı eklemek için buton */}
      <Button type="primary" onClick={openAddUserModal} style={buttonStyle}>
        Add New User
      </Button>

      {/* Kullanıcı listesi */}
      <UserList onEditUser={openEditUserModal} searchTerm={searchTerm} />

      {/* Kullanıcı ekleme/düzenleme için modal */}
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
