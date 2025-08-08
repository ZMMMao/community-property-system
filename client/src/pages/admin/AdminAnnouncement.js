import React from "react";
import { List, Divider, Button, Modal } from "antd";
import { useState, useEffect } from "react";
import { NotificationOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Popup from "./Popup";
import "./AdminAnnouncement.css";

const handleClick = () => {
  alert("Announcement clicked!");
};
function AdminAnnouncement() {
  const navigate = useNavigate();
  const handleUpload = () => {
    navigate("/admin/AnnouncementCenter");
  };
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [popup, setPopup] = useState({
    show: false,
    id: null,
  });
  const fetchData = (currentPage) => {
    const fakeDataUrl = `https://660d2bd96ddfa2943b33731c.mockapi.io/api/users?page=${currentPage}&limit=3`;
    return fetch(fakeDataUrl).then((res) => res.json());
  };
  useEffect(() => {
    fetchData(page).then((res) => {
      const results = Array.isArray(res) ? res : [];
      setInitLoading(false);
      setData(results);
      setList(results);
    });
  }, []);
  const onLoadMore = () => {
    setLoading(true);
    setList(
      data.concat(Array.from({ length: 3 }).map(() => ({ loading: true })))
    );
    const nextPage = page + 1;
    setPage(nextPage);
    fetchData(nextPage).then((res) => {
      const results = Array.isArray(res) ? res : [];
      const newData = data.concat(results);
      setData(newData);
      setList(newData);
      setLoading(false);
      window.dispatchEvent(new Event("resize"));
    });
  };
  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: "center",
          marginTop: 12,
          height: 32,
          lineHeight: "32px",
        }}
      >
        <Button onClick={onLoadMore}>loading more</Button>
      </div>
    ) : null;
  const handleDelete = (id) => {
    setPopup({
      show: true,
      id: id,
    });
  };
  const handleDeleteTrue = () => {
    if (popup.show && popup.id) {
      let filteredData = data.filter((item) => item.id !== popup.id);
      setData(filteredData);
      setList(filteredData);
      alert("Delete successfully!");
      setPopup({
        show: false,
        id: null,
      });
    }
  };
  const handleDeleteFalse = () => {
    setPopup({
      show: false,
      id: null,
    });
  };
  return (
    <>
      <Modal
        visible={popup.show}
        footer={null}
        onCancel={handleDeleteFalse}
        style={{ textAlign: "center" }}
      >
        <Popup
          handleDeleteTrue={handleDeleteTrue}
          handleDeleteFalse={handleDeleteFalse}
        />
      </Modal>
      <Divider
        orientation="left"
        style={{
          borderColor: "#78cfc8ff",
          fontSize: "30px",
          color: "#3f5f54ff",
        }}
      >
        Announcements
      </Divider>
      <div className="upload-container">
        <Button className="upload-button" onClick={handleUpload}>
          upload
        </Button>
      </div>
      <List
        loading={initLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={list}
        renderItem={(item) => (
          <List.Item
            style={{ borderBottomColor: "#006b7eff" }}
            actions={[
              <Button
                type="link"
                key="list-loadmore-edit"
                onClick={() => handleDelete(item.id)}
              >
                delete
              </Button>,
              <Button
                type="link"
                key="list-loadmore-more"
                onClick={handleClick}
              >
                more
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={<NotificationOutlined />}
              title={item.name}
            />
          </List.Item>
        )}
      />
    </>
  );
}
export default AdminAnnouncement;
