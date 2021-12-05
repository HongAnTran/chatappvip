import React, { useContext, useState } from 'react';
import { Form, Modal, Select, Spin, Avatar } from 'antd';
import { AppContext } from '../../context/AppProvider';
import { debounce } from 'lodash';
import { db } from '../../Filebase/config';
import { collection,query,where,orderBy ,limit,getDocs,doc,updateDoc} from "firebase/firestore"
function DebounceSelect({
  fetchOptions,
  debounceTimeout = 300,
  curMembers,
  ...props
}) {
  // Search: abcddassdfasdf

  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);

  const debounceFetcher = React.useMemo(() => {
    const loadOptions = (value) => {
      setOptions([]);
      setFetching(true);

      fetchOptions(value, curMembers).then((newOptions) => {
        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [debounceTimeout, fetchOptions, curMembers]);

  React.useEffect(() => {
    return () => {
      // clear when unmount
      setOptions([]);
    };
  }, []);

  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size='small' /> : null}
      {...props}
    >
      {options.map((opt) => (
        <Select.Option key={opt.value} value={opt.value} title={opt.label}>
          <Avatar size='small' src={opt.photoURL}>
            {opt.photoURL ? '' : opt.label?.charAt(0)?.toUpperCase()}
          </Avatar>
          {` ${opt.label}`}
        </Select.Option>
      ))}
    </Select>
  );
}
///////////////////////////////
async function fetchUserList(search, curMembers) {
  
  const use = query(collection(db,'users'), where("keywords", "array-contains", search?.toLowerCase()),limit(20),orderBy('displayName'))
  const anc = await getDocs(use)
  let arrAA = []
      anc.forEach((doc) =>{

         arrAA.push({
          label: doc.data().displayName,
          value: doc.data().uid,
          photoURL: doc.data().photoURL,
       })
      })
      
      return arrAA.filter(opt => !curMembers.includes(opt.value))

}

export default function InviteMemberModal() {
  const {
    isInviteMemberVisible,
    setIsInviteMemberVisible,
    selectedRoomId,
    selectedRoom,
  } = useContext(AppContext);
  const [value, setValue] = useState([]);
  const form= Form.useForm();

  const handleOk = async () => {
    // reset form value
    form[0].resetFields();
    setValue([]);

    // update members in current room
    const roomRef = doc(db, "rooms", selectedRoomId);
    await updateDoc(roomRef, {
      members: [...selectedRoom.members, ...value.map((val) => val.value)],
    });
    setIsInviteMemberVisible(false);
  };

  const handleCancel = () => {
    // reset form value
    form[0].resetFields();
    setValue([]);
    setIsInviteMemberVisible(false);
  };


  return (
    <div>
      <Modal
        title='Mời thêm thành viên'
        visible={isInviteMemberVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        <Form form={form[0]} layout='vertical'>
          <DebounceSelect
            mode='multiple'
            name='search-user'
            label='Tên các thành viên'
            placeholder='Nhập tên thành viên'
            style={{ width: '100%' }}
            value={value}
            fetchOptions={fetchUserList}
            onChange={(newValue) => setValue(newValue)}
            curMembers={selectedRoom.members}
          />
        </Form>
      </Modal>
    </div>
  );
}
