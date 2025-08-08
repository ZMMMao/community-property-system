import React from "react";
import { Avatar, List, Divider, Button } from "antd";
import LittleAnnouncement from "./LittleAnnouncement";
import { useState, useEffect } from "react";
import { NotificationOutlined } from "@ant-design/icons";

const handleClick = () => {
  alert("Announcement clicked!");
};
function Announcement() {
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
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
      // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
      // In real scene, you can using public method of react-virtualized:
      // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
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

  return (
    <>
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
      <List
        loading={initLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={list}
        renderItem={(item, index) => (
          <List.Item
            style={{ borderBottomColor: "#006b7eff" }}
            actions={[
              <a key="list-loadmore-more" onClick={handleClick}>
                more
              </a>,
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
export default Announcement;
