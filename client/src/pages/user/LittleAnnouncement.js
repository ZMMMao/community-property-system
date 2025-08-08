import React from "react";
import { Avatar, List, Divider } from "antd";
import { NotificationOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
const LittleAnnouncement = () => {
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

  return (
    <>
      <List
        style={{ width: "100%", backgroundColor: "#f0f2f5" }}
        loading={initLoading}
        itemLayout="horizontal"
        dataSource={list}
        renderItem={(item, index) => (
          <List.Item style={{ borderBottomColor: "#006b7eff" }}>
            <List.Item.Meta
              avatar={<NotificationOutlined />}
              title={item.name}
            />
          </List.Item>
        )}
      />
    </>
  );
};
export default LittleAnnouncement;
