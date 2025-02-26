import React, { FC, useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
  Alert,
  Modal,
  Spin,
  Table,
  Input,
  Select,
  Avatar,
  Image,
  Divider,
} from "antd";
import { fetchAthletes } from "../../store/reducers/athletes/athleteSlice";
import { IAthlete } from "../../models/IAthlete/IAthlete";
import { calculateAge } from "../../utils/calculateAge";
import Title from "antd/es/typography/Title";
const { Option } = Select;

const Athletes: FC = () => {
  const dispatch = useAppDispatch();
  const [modalOpen, setModalOpen] = useState(true);
  const [selectedAthlete, setSelectedAthlete] = useState<IAthlete | null>(null);
  const { athletes, error, isLoading } = useAppSelector(
    (state) => state.athleteSlice
  );

  const [sortBy, setSortBy] = useState<string>("name");
  const [filterName, setFilterName] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(30);

  useEffect(() => {
    if (!athletes.length) {
      dispatch(fetchAthletes());
    }
  }, [dispatch, athletes.length]);

  const filteredAthletes = athletes.filter((athlete) =>
    athlete.name.toLowerCase().includes(filterName.toLowerCase())
  );

  const sortedAthletes = [...filteredAthletes].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "age":
        return calculateAge(a.date_of_birth) - calculateAge(b.date_of_birth);
      case "gender":
        return a.gender.localeCompare(b.gender);
      case "club":
        return a.club.name.localeCompare(b.club.name);
      default:
        return 0;
    }
  });

  const paginatedAthletes = sortedAthletes.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleRowClick = (athlete: IAthlete) => {
    setSelectedAthlete(athlete);
    setModalOpen(true);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a: IAthlete, b: IAthlete) => a.name.localeCompare(b.name),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      sorter: (a: IAthlete, b: IAthlete) => a.gender.localeCompare(b.gender),
    },
    {
      title: "Class/Subclass",
      dataIndex: "class/subclass",
      key: "class/subclass",
      sorter: (a: IAthlete, b: IAthlete) =>
        a["class/subclass"].localeCompare(b["class/subclass"]),
    },
    {
      title: "Club",
      dataIndex: "club",
      key: "club",
      render: (club: { name: string }) => {
        return <a href={club.name}>{club?.name}</a>;
      },
      sorter: (a: IAthlete, b: IAthlete) =>
        a.club.name.localeCompare(b.club.name),
    },
    {
      title: "Age",
      key: "age",
      render: (text: any, record: IAthlete) => {
        return calculateAge(record.date_of_birth);
      },
      sorter: (a: IAthlete, b: IAthlete) =>
        calculateAge(a.date_of_birth) - calculateAge(b.date_of_birth),
    },
  ];

  // const handlePaginationChange = (page: number) => {
  //   setCurrentPage(page);
  // };

  if (isLoading) {
    return (
      <Spin size="large" style={{ display: "block", margin: "20px auto" }} />
    );
  }

  if (error) {
    return (
      <Alert
        message="Error"
        description={error}
        type="error"
        showIcon
        style={{ margin: "20px auto" }}
      />
    );
  }

  return (
    <div>
      <h2>Athletes</h2>
      <Input
        placeholder="Search by name"
        value={filterName}
        onChange={(e) => setFilterName(e.target.value)}
        style={{ marginBottom: "20px", width: "300px" }}
      />
      <Select
        defaultValue="name"
        style={{ width: 200, marginBottom: "20px" }}
        onChange={(value) => setSortBy(value)}
      >
        <Option value="name">Sort by Name</Option>
        <Option value="age">Sort by Age</Option>
        <Option value="gender">Sort by Gender</Option>
        <Option value="club">Sort by Club</Option>
        <Option value="class/subclass">Sort by Сlass</Option>
      </Select>

      <Table
        bordered
        columns={columns}
        dataSource={paginatedAthletes}
        rowKey="id"
        tableLayout="fixed"
        pagination={false}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
        style={{ cursor: "pointer" }}
      />

      <div className="custom-pagination">
        <button
          className="pagination-button"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>

        <div className="page-numbers">
          {Array.from(
            { length: Math.ceil(sortedAthletes.length / pageSize) },
            (_, index) => (
              <button
                key={index}
                className={`page-number ${
                  currentPage === index + 1 ? "active" : ""
                }`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            )
          )}
        </div>

        <button
          className="pagination-button"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === Math.ceil(sortedAthletes.length / pageSize)}
        >
          {">"}
        </button>
      </div>

      {selectedAthlete && (
        <Modal
          open={modalOpen}
          footer={null}
          onCancel={() => setModalOpen(false)}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            {selectedAthlete.photo ? (
              <img
                src={`http://127.0.0.1:8000/storage/${selectedAthlete.photo}`}
                alt="Athlete"
                style={{
                  objectFit: "contain",
                  width: "auto",
                  marginTop: "40px",
                  maxWidth: "500px",
                  height: "auto",
                  maxHeight: "300px",
                  border: "1px solid #1890ff",
                }}
              />
            ) : (
              <img
                src="https://banner2.cleanpng.com/20180516/bvq/avc60qvam.webp"
                alt="Competition"
                style={{
                  objectFit: "contain",
                  marginTop: "40px",
                  width: "auto",
                  maxWidth: "500px",
                  height: "auto",
                  maxHeight: "300px",
                  border: "1px solid #1890ff",
                }}
              />
            )}
          </div>
          <Divider />
          <Title style={{ display: "flex", justifyContent: "center" }}>
            <strong></strong> {selectedAthlete.name}
          </Title>
          <p>
            <strong>Gender:</strong> {selectedAthlete.gender}
          </p>
          <p>
            <strong>Class/Subclass:</strong> {selectedAthlete["class/subclass"]}
          </p>
          <p>
            <strong>Club:</strong> {selectedAthlete.club.name}
          </p>
          <p>
            <strong>Age:</strong> {calculateAge(selectedAthlete.date_of_birth)}
          </p>
          <p>
            <strong>Role:</strong> {selectedAthlete.role}
          </p>
        </Modal>
      )}
    </div>
  );
};

export default Athletes;
