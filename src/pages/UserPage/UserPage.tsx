import { useState } from 'react'
import { useUsers } from '../../hooks/useUsers';
import { Spin } from "antd";
import UserTable  from '../../components/UserTable/UserTable'
import './userpage.css';

const UserPage = () => {
  const { data, isLoading } = useUsers()
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);
  console.log(data);

  const handleDialogOpen = () => setIsCreateDialogOpen(true);
  const handleDialogClose = () => setIsCreateDialogOpen(false);

  return (
    <main className="user-page-container">
        <section className="user-page__header">
            <h1>Users</h1>
            <button onClick={handleDialogOpen}>Add user</button>
        </section>
        {data && !isLoading ? (
        <UserTable fetchedData={data}/>
      ) : (
        <Spin/>
      )}
      {
        isCreateDialogOpen && <div> Hello its working </div>
      }
    </main>
  )
}

export default UserPage